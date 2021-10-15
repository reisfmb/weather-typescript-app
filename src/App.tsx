import React from 'react';
import WeatherCard from './components/WeatherCard';

import './App.scss';

function App() : JSX.Element {
  return (
    <section className="weather-cards">
      <WeatherCard cityName="Oslo" />
      <WeatherCard cityName="São Paulo" />
    </section>
  );
}

export default App;
