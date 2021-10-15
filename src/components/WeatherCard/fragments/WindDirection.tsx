import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { IWind } from '../../../types/types';

// Explanation of wind degree: https://www.fondriest.com/news/wind-speed-and-direction.htm

const WindDirection:React.FC<IWind> = ({ speed, deg }: IWind) : JSX.Element => {
  const degrees = deg - 45;
  const description = `${deg}°, ${speed} m/s`;
  return (
    <div data-testid="wind-direction-component" className="weather-card__details__wind">
      <FontAwesomeIcon
        data-testid="wind-icon-svg"
        icon={faLocationArrow}
        style={{ transform: `rotate(${degrees}deg)` }}
      />
      <h3>Wind direction</h3>
      <span>{description}</span>
    </div>
  );
};

export default WindDirection;
