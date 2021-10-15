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

  ///

  private city : string

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
    const cacheExpired = this.hasCacheExpired();

    if (!cacheExpired) {
      this.setWeatherData(this.cache.data);
    } else {
      fetch(`${this.API_URL}?q=${this.city}&APPID=${this.API_KEY}`)
        .then((response) => {
          if (!response.ok) { throw Error(response.statusText); }

          return response.json();
        })
        .then((data) => {
          this.setWeatherData(data);
          this.updateCache({ time: (+new Date()), data });
        })
        .catch((error) => {
          this.showErrorDialog(error);
        });
    }
  }
}

export {
  ServiceWeatherCard,
};
