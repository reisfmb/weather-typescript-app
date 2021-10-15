import React from 'react';
import { render, screen } from '@testing-library/react';

import GoogleMapsIframe from '../components/WeatherCard/fragments/GoogleMapsIframe';

test('Should have the proper src attribute in the iframe tag.', () => {
  render(<GoogleMapsIframe lat={145.77} lon={-16.92} />);

  expect(screen.getByTestId('google-iframe'))
    .toHaveAttribute('src', 'https://maps.google.com/maps?q=145.77, -16.92&z=4&output=embed');
});
