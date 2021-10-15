import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import WeatherCard from '../components/WeatherCard';

test('Should properly render child components if a valid city name was passed as props.', async () => {
  render((<WeatherCard cityName="Oslo" />));

  expect(screen.getByTestId('loading-text')).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Oslo')).toBeInTheDocument(), {
    timeout: 3000,
  });

  expect(screen.getByTestId('weather-temperature-component')).toBeInTheDocument();
  expect(screen.getByTestId('weather-details-component')).toBeInTheDocument();
  expect(screen.getByTestId('wind-direction-component')).toBeInTheDocument();
  expect(screen.getByTestId('google-iframe')).toBeInTheDocument();
});

test('Should display an error if an invalid city name was passed as props.', async () => {
  render((<WeatherCard cityName="an-invalid-city-name" />));

  expect(screen.getByTestId('loading-text')).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Error: Not Found')).toBeInTheDocument(), {
    timeout: 3000,
  });
});
