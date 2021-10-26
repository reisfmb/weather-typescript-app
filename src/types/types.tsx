export interface ICoordinates {
  lon: number;
  lat: number;
}

export interface IMain {
  temp: number;
  'temp_max': number;
  'temp_min': number;
}

export interface IWeather {
  icon: string;
  main: string;
  description: string;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IWeatherData {
  name: string;
  coord: ICoordinates;
  main: IMain;
  weather: IWeather[];
  wind: IWind;
}

///

export interface IServiceConfig {
  API_URL: string,
  API_KEY: string,
}

export interface IServiceCacheData {
  time: number,
  data: IWeatherData
}

export interface IServiceCache {
  IDENTIFIER: null | string,
  LIFETIME: number,
  DATA: IServiceCacheData | Record<string, never>
}
