import React from 'react';
import WeatherCard from './components/WeatherCard';

import './App.scss';

function renderCityWeathers(): JSX.Element[] {
  const cities = (process.env.REACT_APP_CITIES || '').split(',');

  return cities.map((city) => <WeatherCard key={city.replace(' ', '-')} cityName={city} />);
}

function App() : JSX.Element {
  return (
    <section className="weather-cards">{ renderCityWeathers() }</section>
  );
}

export default App;
