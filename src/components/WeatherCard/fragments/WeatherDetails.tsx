import React from 'react';

import { IWeather } from '../../../types/types';

const WeatherDetails:React.FC<IWeather[]> = (weathers: IWeather[]) : JSX.Element => {
  const weathersArray = Object.values(weathers);

  const getIconUrl = (icon:string): string => `http://openweathermap.org/img/w/${icon}.png`;

  const weatherIcons = weathersArray.map((weather) => weather.icon);
  const weatherTitles = weathersArray.map((weather) => weather.main);
  const weatherDescriptions = weathersArray.map((weather) => weather.description);

  return (
    <div data-testid="weather-details-component" className="weather-card__details__info">
      <div className="icons">
        { weatherIcons.map((icon) => <img key={icon} src={getIconUrl(icon)} alt={icon} />) }
      </div>
      <h3>{ weatherTitles.join(', ') }</h3>
      <span>{ weatherDescriptions.join(', ') }</span>
    </div>
  );
};

export default WeatherDetails;
