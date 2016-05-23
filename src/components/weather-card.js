import React from 'react';

const WeatherCard = (props) => {

  let frontSide = props.collection.humidity === undefined ? <div className="weather-card-front-loading">Loading...</div> :
        <div>
          <div className="weather-card-front-weather">
            <i className={props.collection.icon}></i>
          </div>
          <div className="weather-card-front-temperature">{props.collection.temp}</div>
        </div>,
      backside = props.collection.humidity === undefined ? <div className="weather-card-back-loading">Loading...</div> :
        <div>
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
        </div>;

  return (
    <div id="content">
      <div className={"weather-card " + props.flipOverValue} onClick={() => props.flipOver()}>
        <div className="weather-card-front">
          {frontSide}
        </div>
        <div className="weather-card-back">
          {backside}
        </div>
      </div>
    </div>
  );

}

WeatherCard.propTypes = {
  flipOver: React.PropTypes.func.isRequired,
  flipOverValue: React.PropTypes.string.isRequired,
  collection: React.PropTypes.object.isRequired
};


export default WeatherCard;
