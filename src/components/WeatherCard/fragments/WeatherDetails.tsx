import React from 'react';

import { IWeather } from '../../../types/types';

const WeatherDetails:React.FC<IWeather[]> = (weathers: IWeather[]) : JSX.Element => {
  const weathersArray = Object.values(weathers);

  const getIconUrl = (icon:string): string => `http://openweathermap.org/img/w/${icon}.png`;

  return (
    <div data-testid="weather-details-component" className="weather-card__details__info">
      {
          weathersArray.map((weather, index) => (
            <div key={`details-${index}`}>
              <img src={getIconUrl(weather.icon)} alt={weather.icon} />
              <h3>{weather.main}</h3>
              <span>{weather.description}</span>
            </div>
          ))
      }
    </div>
  );
};

export default WeatherDetails;
