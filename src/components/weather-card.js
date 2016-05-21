import React from 'react';

const WeatherCard = (props) => {

  return (
    <div id="content">

      <div className={"weather-card " + props.flipOverValue} onClick={() => props.flipOver()}>
        <div className="weather-card-front">
          <div className="weather-card-front-weather">
            <i className={props.collection.icon}></i>
          </div>
          <div className="weather-card-front-temperature">{props.collection.temp}</div>
        </div>
        <div className="weather-card-back">

          <div className="weather-card-back-humidity">
            <div>Humidity</div>
            <div className="weather-card-back-humidity-value">{props.collection.humidity}</div>
          </div>

          <div className="weather-card-back-wind">

            <div className="weather-card-back-wind-card">
              <div className="weather-card-back-wind-card-title">Wind direction</div>
              <div className="weather-card-back-wind-card-direction">
                <i className={props.collection.windDirection}></i>
              </div>
            </div>

            <div className="weather-card-back-wind-card">
              <div className="weather-card-back-wind-card-title">Wind speed</div>
              <div className="weather-card-back-wind-card-speed">{props.collection.windSpeed}</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );

}

export default WeatherCard;
