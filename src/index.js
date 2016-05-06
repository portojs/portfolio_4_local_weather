import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  render() {

    window.onload = function() {

      var tempUnit = '\u00B0C',
          currentTemp = 0;

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
              code = data.weather[0].id,
              weatherClass = '';

          // $.getJSON('https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json', function(data) {
          //   console.log(data[code]);
          // })

          currentTemp = Math.floor(data.main.temp);
          weatherClass = prefix + dayOrNight() + code;
          console.log(weatherClass);
          document.getElementById('input-field').value = data.name;
          document.getElementById('weather-card-temperature').innerHTML = currentTemp + tempUnit;
          document.getElementById('weather-card-icon').className = weatherClass;

        });
      };

      // failed geolocation
      function error(err) {
        document.getElementById('local-weather').innerHTML('Cannot get weather for your location. Try again later.');
      };

      // add onclick event to toggle Celcius-Fahrenheit
      $('#toggleTempUnit').on('click', function() {
        $('#weather-card-temperature').animate({
          opacity: 0
        }, 500, function() {
          if (tempUnit === '\u00B0C') {
            tempUnit = '\u00B0F';
            document.getElementById('weather-card-temperature').innerHTML = Math.floor((currentTemp * 9/5 + 32)) + tempUnit;
          } else {
            tempUnit = '\u00B0C';
            document.getElementById('weather-card-temperature').innerHTML = currentTemp + tempUnit;
          }
          $('#weather-card-temperature').animate({
            opacity: 1
          }, 500);
        });
      });

      // $.getJSON('https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json', function(data) {
      //   weather = data;
      // })

      navigator.geolocation.getCurrentPosition(success, error);

    };

    return (
      <div>

        <input id="input-field" type="text" placeholder="Enter city here"/>
        <div id="weather-card">
          <div id="weather-card-weather"><i id="weather-card-icon"></i></div>
          <div id="weather-card-temperature"></div>
        </div>

        <button id="toggleTempUnit">Change Temperature Units</button>

      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById('container'));
