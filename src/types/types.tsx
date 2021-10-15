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
