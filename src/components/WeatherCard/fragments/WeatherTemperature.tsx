/* eslint-disable camelcase */
import React, { useState } from 'react';

import { IMain } from '../../../types/types';

const convertTemperatureToScale = (scale: string, temperature: number) : number => {
  const kelvinToKelvin = (k:number): number => parseFloat(k.toFixed(2));
  const kelvinToFarenheit = (k: number): number => parseFloat(((k - 273.15) * (9 / 5) + 32).toFixed(2));
  const kelvinToCelsius = (k: number): number => parseFloat((k - 273.15).toFixed(2));

  if (scale === 'k') return kelvinToKelvin(temperature);
  if (scale === 'f') return kelvinToFarenheit(temperature);
  if (scale === 'c') return kelvinToCelsius(temperature);

  return 0;
};

const WeatherTemperature:React.FC<IMain> = ({ temp, temp_min, temp_max }: IMain) : JSX.Element => {
  const availableScales = [
    { label: 'Celsius', value: 'c' },
    { label: 'Farenheit', value: 'f' },
    { label: 'Kelvin', value: 'k' },
  ];
  const [scale, setScale] = useState('c');

  return (
    <div data-testid="weather-temperature-component" className="weather-card__temperature">

      <select onChange={(e) => setScale(e.target.value)}>
        { availableScales.map((s, i) => <option key={`opt-${i}`} value={s.value}>{s.label}</option>) }
      </select>

      <div className="weather-card__temperature__temperatures">
        <span>
          { `${convertTemperatureToScale(scale, temp_min)} ${scale.toUpperCase()}`}
        </span>
        <span>
          { `${convertTemperatureToScale(scale, temp)} ${scale.toUpperCase()}` }
        </span>
        <span>
          { `${convertTemperatureToScale(scale, temp_max)} ${scale.toUpperCase()}`}
        </span>
      </div>

    </div>
  );
};

export default WeatherTemperature;
