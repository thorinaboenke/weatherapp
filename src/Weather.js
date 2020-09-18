import React, { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('Vienna');
  const endpoint = 'api.openweathermap.org/data/2.5/weather?q=';
  //const key = '&APPID=' + env.local.REACT_APP_WEATHER_APP_API_KEY;
  //const location = city
  const url = endpoint + city; //+ key;
  const example =
    'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d66544c370c6e030eacf1c872ea3ce14';

  // 4) Function that is passed to the child to handle submit event, will update the parent state to the current childs state
  const selectCity = (newCity) => {
    setCity(newCity);
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
            props.handleSubmit(value);
            event.preventDefault();
          }}
        >
          <label htmlFor="city">Enter City:</label>
          <input
            value={value}
            id="city"
            type="text"
            label="Enter City"
            onChange={handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }

  // pass function to handle Submit as prop to the child
  return (
    <div>
      <CityInput handleSubmit={selectCity} />
      <p>Displaying the weather for {city}</p>
    </div>
  );
}
