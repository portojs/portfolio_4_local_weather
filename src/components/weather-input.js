import React from 'react';

const WeatherInput = (props) => {

  function handleChange(city) {
    props.changeCity(city);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.submitSearch(props.cityName);
  }

  return (
    <form id="input" role="form" name="search-form" onSubmit={event => handleSubmit(event)}>
      <input id="input-field" type="text" placeholder="Enter city here" value={props.cityName} onChange={event => handleChange(event.target.value)}></input>
      <button id="input-button" type="submit"><i className="fa fa-search fa-flip-horizontal"></i></button>
    </form>
  );

}

export default WeatherInput;
