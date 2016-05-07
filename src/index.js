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

          // $.getJSON('https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json', function(data) {
          //   console.log(data[code]);
          // })
          console.log(data);

          weatherTemp = Math.round(data.main.temp);
          weatherClass = prefix + dayOrNight() + weatherCode;
          document.querySelector('#input-field').value = data.name;
          document.querySelector('.weather-card-front-temperature').innerHTML = weatherTemp + '\u00B0C';
          document.querySelector('.weather-card-front-icon').className = weatherClass;
          document.querySelector('.weather-card-back-humidity-value').innerHTML = weatherHumidity + '%';
          document.querySelector('.weather-card-back-wind-card-speed').innerHTML = Math.round(weatherWindSpeed) + ' m/s';
          document.querySelector('.weather-card-back-wind-card-direction').innerHTML = Math.round(weatherWindDirection);

        });
      };

      // failed geolocation
      function error(err) {
        document.querySelector('.weather-card-front-temperature').innerHTML('Cannot get weather for your location. Try again later.');
      };

      // toggle Celcius-Fahrenheit
      $('#toggle-temp-unit').on('click', function() {
        var displayedTemperature = document.querySelector('.weather-card-front-temperature').innerHTML;
        $('.weather-card-front-temperature').animate({
          opacity: 0
        }, 500, function() {
          if (displayedTemperature[3] === 'C') {
            // tempUnit = '\u00B0F';
            document.querySelector('.weather-card-front-temperature').innerHTML = Math.round((weatherTemp * 9/5 + 32)) + '\u00B0F';
          } else {
            // tempUnit = '\u00B0C';
            document.querySelector('.weather-card-front-temperature').innerHTML = weatherTemp + '\u00B0C';
          }
          $('.weather-card-front-temperature').animate({
            opacity: 1
          }, 500);
        });
      });

      // document.getElementById('weather-card').addEventListener('mouseover', function(event) {
      //   $(this).animate({
      //     opacity: 0
      //   }, 500);
      // });

      // $('#weather-card').on('mouseover', function() {
      //   console.log('hovering');
      // });

      // $.getJSON('https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json', function(data) {
      //   weather = data;
      // })

      navigator.geolocation.getCurrentPosition(success, error);

    };

    return (
      <div>

        <input id="input-field" type="text" placeholder="Enter city here"/>

        <div id="content">

          <div className="weather-card">
            <div className="weather-card-front">
              <div className="weather-card-front-weather"><i className="weather-card-front-icon"></i></div>
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
                  <div className="weather-card-back-wind-card-direction"></div>
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
