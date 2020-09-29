import React, {useState }from 'react';

export default function CityInput(props) {
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
