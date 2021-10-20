import Swal from 'sweetalert2';

import {
  IWeatherData,
  IServiceConfig, IServiceCache, IServiceCacheData,
} from '../types/types';

class ServiceWeatherCard {
  private CONFIG: IServiceConfig = {
    API_URL: process.env.REACT_APP_API_URL || '',
    API_KEY: process.env.REACT_APP_API_KEY || '',
  }

  private CACHE: IServiceCache = {
    IDENTIFIER: null,
    DATA: {},
    // Cache's lifetime in seconds
    LIFETIME: parseInt(process.env.REACT_APP_CACHE_LIFETIME_IN_SECONDS || '0'),
    // Trigger: difference between cache's temperature and current data temperature
    THRESHOLD_TEMP: parseInt(process.env.REACT_APP_CACHE_THRESHOLD_TIME || '1'),
  }

  // Function that mutates the weatherData in the WeatherCard component
  private setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>

  private city: string

  private currentTime: number = (+new Date())

  constructor(city: string, setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>) {
    const citySlug = city.split(' ').map((c) => c.toLowerCase()).join('-');

    this.CACHE.IDENTIFIER = `wta-${citySlug}`; // wta stands for [W]eather [T]ypescript [A]pp
    this.CACHE.DATA = JSON.parse(localStorage.getItem(this.CACHE.IDENTIFIER) || '{}');

    this.setWeatherData = setWeatherData;
    this.city = city;
  }

  /**
   * Check if the cache exists.
   */
  private cacheExists() : boolean {
    return Object.keys(this.CACHE.DATA).length > 0;
  }

  /**
   * Check if the cache has expired based on the cache threshold time.
   */
  private hasCacheExpired() : boolean {
    return this.cacheExists()
      ? ((this.currentTime - this.CACHE.DATA.time) / 1000) >= this.CACHE.LIFETIME
      : true;
  }

  /**
   * Updates the cache data.
   */
  private updateCache(cacheData: IServiceCacheData): void {
    if (this.CACHE.IDENTIFIER) { localStorage.setItem(this.CACHE.IDENTIFIER, JSON.stringify(cacheData)); }
  }

  /**
   * Returns the abs value of the difference between the cached temperature and the current temperature.
   */
  private diffCachedTempAndCurrentTemp(currentTemp:number): number {
    return Math.abs(currentTemp - this.CACHE.DATA.data.main.temp);
  }

  /**
   * Gets the weather data from API or from the Cache.
   *
   * Cache is updated following its lifetime value.
   *
   * API data is only used if its abs diff from the cached temperature is >= then the cache threshold temp.
   */
  public execute(): void {
    if (this.cacheExists() && !this.hasCacheExpired()) {
      this.setWeatherData(this.CACHE.DATA.data);
      return;
    }

    const endpoint = `${this.CONFIG.API_URL}?q=${this.city}&APPID=${this.CONFIG.API_KEY}`;

    fetch(endpoint)
      .then((response: Response) => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      .then((data: IWeatherData) => {
        const cacheData = { time: this.currentTime, data };

        !this.cacheExists() && (this.CACHE.DATA = cacheData);

        this.diffCachedTempAndCurrentTemp(data.main.temp) >= this.CACHE.THRESHOLD_TEMP
          ? this.setWeatherData(data)
          : this.setWeatherData(this.CACHE.DATA.data);

        this.updateCache(cacheData);
      })
      .catch((error: string) => {
        Swal.fire({ text: error, icon: 'error', showConfirmButton: false });
      });
  }
}

export { ServiceWeatherCard };
