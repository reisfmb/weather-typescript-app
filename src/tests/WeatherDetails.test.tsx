import React from 'react';
import { render, screen } from '@testing-library/react';

import WeatherDetails from '../components/WeatherCard/fragments/WeatherDetails';

const weathers = [
  {
    icon: 'a',
    main: 'Sunny',
    description: 'Today is sunny.',
  },
  {
    icon: 'b',
    main: 'Rainy',
    description: 'Today is rainy.',
  },
];

test('Should display an image, main and description for each weather data in the provided array of weathers.', () => {
  render(<WeatherDetails {...weathers} />);

  expect(screen.getByAltText('a')).toHaveAttribute('src', 'http://openweathermap.org/img/w/a.png');
  expect(screen.getByAltText('b')).toHaveAttribute('src', 'http://openweathermap.org/img/w/b.png');
  expect(screen.getByText('Sunny, Rainy')).toBeInTheDocument();
  expect(screen.getByText('Today is sunny., Today is rainy.')).toBeInTheDocument();
});
