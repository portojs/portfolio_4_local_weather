import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  render() {

    window.onload = function() {

      var weatherTemp = 0;

      // check time of day at user location
      function dayOrNight() {
        var today = new Date(),
            hour = today.getHours();

        if(hour > 6 && hour < 20) {
          // day time
          return 'day-';
        } else {
          // night time
          return 'night-';
        }
      }

      // successfull geolocation
      function success(pos) {
        var link = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                pos.coords.latitude + '&lon=' + pos.coords.longitude +
                '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';

        // api call to check weather
        $.getJSON(link, function(data) {
          var prefix = 'wi wi-owm-',
              weatherCode = data.weather[0].id,
              weatherHumidity = data.main.humidity,
              weatherWindSpeed = data.wind.speed,
              weatherWindDirection = data.wind.deg,
              weatherClass = '';

          console.log(data);

          weatherTemp = Math.round(data.main.temp);
          weatherClass = prefix + dayOrNight() + weatherCode;
          document.querySelector('#input-field').value = data.name;
          document.querySelector('.weather-card-front-temperature').innerHTML = weatherTemp + '\u00B0C';
          document.querySelector('.weather-card-front-icon').className = weatherClass;
          document.querySelector('.weather-card-back-humidity-value').innerHTML = weatherHumidity + '%';
          document.querySelector('.weather-card-back-wind-card-speed').innerHTML = Math.round(weatherWindSpeed) + ' m/s';
          document.querySelector('.wi-wind').classList.add('towards-' + Math.round(weatherWindDirection) + '-deg');

        });
      };

      // failed geolocation
      function error(err) {
        document.querySelector('.weather-card-front-temperature').innerHTML('Cannot get weather for your location. Try again later.');
      };

      // toggle Celcius-Fahrenheit
      document.querySelector('#toggle-temp-unit').addEventListener('click', function() {
        var displayedTemperature = document.querySelector('.weather-card-front-temperature').innerHTML;
        $('.weather-card-front-temperature').animate({
          opacity: 0
        }, 500, function() {
          if (displayedTemperature[3] === 'C') {
            document.querySelector('.weather-card-front-temperature').innerHTML = Math.round((weatherTemp * 9/5 + 32)) + '\u00B0F';
          } else {
            document.querySelector('.weather-card-front-temperature').innerHTML = weatherTemp + '\u00B0C';
          }
          $('.weather-card-front-temperature').animate({
            opacity: 1
          }, 500);
        });
      });

      // onclick event to show the back side of the weather card
      document.querySelector('.weather-card').addEventListener('click', function() {
        document.querySelector('.weather-card').classList.toggle('flip-over');
      });

      // get user's current position
      navigator.geolocation.getCurrentPosition(success, error);

    };

    return (
      <div>


        <div id="input">
          <input id="input-field" type="text" placeholder="Enter city here"></input>
          <button id="input-button"><i className="fa fa-search fa-flip-horizontal"></i></button>
        </div>

        <div id="content">

          <div className="weather-card">
            <div className="weather-card-front">
              <div className="weather-card-front-weather">
                <i className="weather-card-front-icon"></i>
              </div>
              <div className="weather-card-front-temperature"></div>
            </div>
            <div className="weather-card-back">

              <div className="weather-card-back-humidity">
                <div>Humidity</div>
                <div className="weather-card-back-humidity-value"></div>
              </div>

              <div className="weather-card-back-wind">

                <div className="weather-card-back-wind-card">
                  <div className="weather-card-back-wind-card-title">Wind direction</div>
                  <div className="weather-card-back-wind-card-direction">
                    <i className="wi wi-wind"></i>
                  </div>
                </div>

                <div className="weather-card-back-wind-card">
                  <div className="weather-card-back-wind-card-title">Wind speed</div>
                  <div className="weather-card-back-wind-card-speed"></div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <button id="toggle-temp-unit">Change Temperature Units</button>

      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById('container'));
