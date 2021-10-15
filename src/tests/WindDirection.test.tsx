import React from 'react';
import { render, screen } from '@testing-library/react';

import WindDirection from '../components/WeatherCard/fragments/WindDirection';

test('Should have the proper rotation in the wind arrow.', () => {
  render(<WindDirection speed={5} deg={45} />);

  expect(screen.getByTestId('wind-icon-svg')).toHaveStyle('transform: rotate(0deg)');
});
