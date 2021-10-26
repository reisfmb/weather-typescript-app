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
  }

  // Function that mutates the weatherData in the WeatherCard component
  private setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>

  // Function that mutates the errorMessage in the WeatherCard component
  private setErrorMessage: React.Dispatch<React.SetStateAction<string>>

  private city: string

  private currentTime: number = (+new Date())

  constructor(
    city: string,
    setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const citySlug = city.split(' ').map((c) => c.toLowerCase()).join('-');

    this.CACHE.IDENTIFIER = `wta-${citySlug}`; // wta stands for [W]eather [T]ypescript [A]pp
    this.CACHE.DATA = JSON.parse(localStorage.getItem(this.CACHE.IDENTIFIER) || '{}');

    this.city = city;
    this.setWeatherData = setWeatherData;
    this.setErrorMessage = setErrorMessage;
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
   * Gets the weather data from API or from the Cache.
   *
   * Cache is updated following its lifetime value.
   *
   */
  public execute(): void {
    if (this.cacheExists() && !this.hasCacheExpired()) {
      this.setWeatherData(this.CACHE.DATA.data);
    }

    const endpoint = `${this.CONFIG.API_URL}?q=${this.city}&APPID=${this.CONFIG.API_KEY}`;

    fetch(endpoint)
      .then((response: Response) => {
        if (!response.ok) { throw new Error(response.statusText); }
        return response.json();
      })
      .then((data: IWeatherData) => {
        this.setWeatherData(data);
        this.updateCache({ time: this.currentTime, data });
      })
      .catch((error: Error) => {
        const message = `${this.city}: ${error.message}`;
        this.setErrorMessage(message);
      });
  }
}

export { ServiceWeatherCard };
