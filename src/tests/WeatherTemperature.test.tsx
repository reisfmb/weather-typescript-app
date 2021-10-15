import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WeatherTemperature from '../components/WeatherCard/fragments/WeatherTemperature';

test('Should have by default the temperatures in Celsius scale.', () => {
  render(<WeatherTemperature temp={273.15} temp_min={253.15} temp_max={293.15} />);

  const minTemperatureElement = screen.getByText('-20 C');
  const temperatureElement = screen.getByText('0 C');
  const maxTemperatureElement = screen.getByText('20 C');

  expect((screen.getByRole('option', { name: 'Celsius' }) as HTMLOptionElement).selected).toBe(true);
  expect(minTemperatureElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
  expect(maxTemperatureElement).toBeInTheDocument();
});

test('Should properly convert and show the temperature in Kelvin scale.', () => {
  render(<WeatherTemperature temp={273.15} temp_min={253.15} temp_max={293.15} />);

  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Kelvin' }),
  );

  const minTemperatureElement = screen.getByText('253.15 K');
  const temperatureElement = screen.getByText('273.15 K');
  const maxTemperatureElement = screen.getByText('293.15 K');

  expect((screen.getByRole('option', { name: 'Kelvin' }) as HTMLOptionElement).selected).toBe(true);
  expect(minTemperatureElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
  expect(maxTemperatureElement).toBeInTheDocument();
});

test('Should properly convert and show the temperature in Farenheit scale.', () => {
  render(<WeatherTemperature temp={273.15} temp_min={253.15} temp_max={293.15} />);

  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Farenheit' }),
  );

  const minTemperatureElement = screen.getByText('-4 F');
  const temperatureElement = screen.getByText('32 F');
  const maxTemperatureElement = screen.getByText('68 F');

  expect((screen.getByRole('option', { name: 'Farenheit' }) as HTMLOptionElement).selected).toBe(true);
  expect(minTemperatureElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
  expect(maxTemperatureElement).toBeInTheDocument();
});
