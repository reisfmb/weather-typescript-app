import React from 'react';

import { ICoordinates } from '../../../types/types';

const GoogleMapsIframe:React.FC<ICoordinates> = ({ lat, lon } : ICoordinates) : JSX.Element => {
  const src = `https://maps.google.com/maps?q=${lat}, ${lon}&z=4&output=embed`;

  return (
    <iframe
      data-testid="google-iframe"
      className="weather-card__maps"
      title="map"
      src={src}
      width="500"
      height="250"
      frameBorder="0"
    />
  );
};

export default GoogleMapsIframe;
