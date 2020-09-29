import React, { useState, useEffect } from 'react';

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

  function CityInput(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    // INPUT FORM WITH SUBMIT BUTTON needs
    // 1) functions to handle change of the input text i.e. onChange={handleChange}, this function is defined in the child and updates a state in the child component, here called value
    // 2) this value needs to be also in the input field , i.e. value={value}

    // 3) needs function to hande submit click, i.e. onSubmit={(event) => {props.handleSubmit(value); event.preventDefault();}}
    // in case of an event (the submit click, the handle Submit function (passed as a prop from the parent component is called on the current state of value) This replaces the state of the parent component with the current state of the child component). event.preventDefault() prevent rerendering

    return (
      <>
        <form
          onSubmit={(event) => {
            handleSubmit(value);
            event.preventDefault();
          }}
        >
          <input
            value={value}
            id="city"
            type="text"
            label="Enter City"
            onChange={handleChange}
            placeholder="City"
          ></input>
          <br />
          <button type="submit">Get Weather</button>
        </form>
      </>
    );
  }
  const kelvinToCelsius = (tempInKelvin) => {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.round(tempInCelsius);
  };
  // pass function to handle Submit as prop to the child
  return (
    <div>
      <CityInput handleSubmit={selectCity} />
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
