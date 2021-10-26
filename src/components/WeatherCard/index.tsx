import React, { useState, useEffect } from 'react';

import { IWeatherData } from '../../types/types';

import { ServiceWeatherCard } from '../../services/ServiceWeatherCard';

import GoogleMapsIframe from './fragments/GoogleMapsIframe';
import WeatherDetails from './fragments/WeatherDetails';
import WindDirection from './fragments/WindDirection';
import WeatherTemperature from './fragments/WeatherTemperature';

interface IProps {
  cityName: string
}

const WeatherCard = ({ cityName }: IProps) : JSX.Element => {
  const [weatherData, setWeatherData] = useState({} as IWeatherData);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceWeatherCard = new ServiceWeatherCard(cityName, setWeatherData, setErrorMessage);

  const serviceExecutionInterval = parseInt(
    process.env.REACT_APP_SERVICE_EXECUTION_INTERVAL_IN_SECONDS || '60',
  ) * 1000;

  useEffect(() => {
    serviceWeatherCard.execute(); // First execution
    setInterval(() => { serviceWeatherCard.execute(); }, serviceExecutionInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Error
  if (errorMessage) {
    return (
      <div className="weather-card weather-card--error">
        <p data-testid="error-text">{ errorMessage }</p>
      </div>
    );
  }

  // Loading
  if (Object.keys(weatherData).length === 0) {
    return (
      <div className="weather-card weather-card--loading">
        <p data-testid="loading-text" />
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h2 className="weather-card__name">{weatherData.name}</h2>
      <WeatherTemperature {...weatherData.main} />
      <div className="weather-card__details">
        <WeatherDetails {...weatherData.weather} />
        <WindDirection {...weatherData.wind} />
      </div>
      <GoogleMapsIframe {...weatherData.coord} />
    </div>
  );
};

export default WeatherCard;
