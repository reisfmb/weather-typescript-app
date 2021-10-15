import Swal from 'sweetalert2';

import { IWeatherData } from '../types/types';

interface ICache {
  time: number,
  data: IWeatherData
}

class ServiceWeatherCard {
  private API_URL = process.env.REACT_APP_API_URL;

  private API_KEY = process.env.REACT_APP_API_KEY;

  private CACHE_THRESHOLD_TIME = process.env.REACT_APP_CACHE_THRESHOLD_TIME || 0;

  private CURRENT_TIME = (+new Date())

  private city : string

  // This is the mutator of the weatherData state that is going to be used
  // in the WeatherCard component
  private setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>

  private localStorageItemName : string

  private cache: ICache

  constructor(city: string, setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>) {
    this.city = city;
    this.localStorageItemName = `wta-${city}`; // wta stands for [W]eather [T]ypescript [A]pp
    this.setWeatherData = setWeatherData;
    this.cache = JSON.parse(localStorage.getItem(this.localStorageItemName) || '{}');
  }

  private hasCacheExpired() : boolean {
    return Object.keys(this.cache).length > 0
      ? ((this.CURRENT_TIME - this.cache.time) / 1000) >= this.CACHE_THRESHOLD_TIME
      : true;
  }

  private updateCache(cache: ICache): void {
    localStorage.setItem(this.localStorageItemName, JSON.stringify(cache));
  }

  // eslint-disable-next-line class-methods-use-this
  private showErrorDialog(errorMessage: string): void {
    Swal.fire({
      title: 'Oops',
      text: errorMessage,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  public execute() : void {
    if (this.hasCacheExpired()) { // Cache has expired
      fetch(`${this.API_URL}?q=${this.city}&APPID=${this.API_KEY}`)
        .then((response: Response) => {
          if (!response.ok) { throw Error(response.statusText); }

          return response.json();
        })
        .then((data: IWeatherData) => {
          const diffCurrentTempAndCachedTemp = Math.abs(data.main.temp - this.cache.data.main.temp) || 0;

          // eslint-disable-next-line no-unused-expressions
          (diffCurrentTempAndCachedTemp >= 1)
            ? this.setWeatherData(data)
            : this.setWeatherData(this.cache.data);

          this.updateCache({ time: this.CURRENT_TIME, data });
        })
        .catch((error: string) => {
          this.showErrorDialog(error);
        });
    } else { // Cache hasn't expired
      this.setWeatherData(this.cache.data);
    }
  }
}

export {
  ServiceWeatherCard,
};
