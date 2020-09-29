import React, { useState, useEffect } from 'react';
import CityInput from './Cityinput';

export default function Weather() {
  const [city, setCity] = useState('Vienna');
  const [weather, setWeather] = useState('');
  const key = process.env.REACT_APP_WEATHER_APP_API_KEY;

  // this function fetches data from API for given city and outputs json (assign to state 'weather')
  function getWeatherInfo(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,
    )
      .then((response) => response.json())
      .then((res) => {
        setWeather(res);
        console.log(JSON.stringify(res));
      });
  }

  // whenever the city is changed (and only then), call the getWeatherfunction to update the weather state
  useEffect(() => {
    getWeatherInfo(city);
  }, []);

  // 4) Function that is passed to the child to handle submit event, will update the parent state to the current childs state
  const selectCity = (newCity) => {
    setCity(newCity);
  };

  const handleSubmit = (city) => {
    getWeatherInfo(city);
  };

  const kelvinToCelsius = (tempInKelvin) => {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.round(tempInCelsius);
  };
  // pass function to handle Submit as prop to the child
  return (
    <div>
      <CityInput handleSubmit={handleSubmit} />
      <div className="weather-container">
        <div className="weather">
          {weather ? (
            <>
              <p>
                {weather?.name}, {weather?.sys?.country}
              </p>
              <p>{weather?.weather?.[0]?.description}</p>
              <p>{kelvinToCelsius(weather?.main?.temp)} °C</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
