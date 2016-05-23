import React from 'react';

const WeatherUnitsButton = (props) => {

  function changeTempUnits(event) {
    event.preventDefault();
    props.changeTempUnits();
  }

  return (
    <div className={"toggle-temp-unit " + props.temperatureUnits} onClick={(event) => changeTempUnits(event)}>
      <div className="cel">Celcius</div>
      <div className="fah">Fahrenheit</div>
    </div>
  );

}

WeatherUnitsButton.propTypes = {
  changeTempUnits: React.PropTypes.func.isRequired,
  temperatureUnits: React.PropTypes.string.isRequired
};

export default WeatherUnitsButton;
