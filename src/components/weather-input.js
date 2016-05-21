import React from 'react';

const WeatherInput = (props) => {

  function handleSubmit(event) {
    event.preventDefault();
    props.getWeather(props.cityName);
  }

  return (
    <form id="input" role="form" name="search-form" onSubmit={event => handleSubmit(event)}>
      <input id="input-field" type="text" placeholder="Enter city here" value={props.cityName} onChange={event => props.changeCity(event.target.value)}></input>
      <button id="input-button" type="submit"><i className="fa fa-search fa-flip-horizontal"></i></button>
    </form>
  );

}

export default WeatherInput;
