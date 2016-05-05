import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  render() {

    window.onload = function() {

      var tempUnit = '\u00B0C';

      function success(pos) {
        var link = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                pos.coords.latitude + '&lon=' + pos.coords.longitude +
                '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb',
            icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'],
            iconClasses = ['wi-owm-day-800', 'wi-owm-804', ''];

        $.getJSON(link, function(data) {
          console.log(data);
          console.log(data.weather[0].id);
          console.log(data.weather[0].icon);

          document.getElementById('local-weather').innerHTML = data.weather[0].description;
          document.getElementById('temperature').innerHTML = Math.floor(data.main.temp);
          document.getElementById('location').innerHTML = data.name;

          document.getElementById('input-field').value = data.name;
          document.getElementById('weather-card-temperature').innerHTML = Math.floor(data.main.temp) + tempUnit;
          // document.getElementById('weather-card-weather').innerHTML = data.weather[0].description;
          // document.getElementByClass('wi').className = data.weather[0].icon;

        });
      };

      function error(err) {
        document.getElementById('local-weather').innerHTML('Cannot get weather for your location. Try again later.');
      };

      $('#toggleTempUnit').on('click', function() {
        tempUnit = tempUnit === '\u00B0C' ? '\u00B0F' : '\u00B0C'; 
      });

      navigator.geolocation.getCurrentPosition(success, error);

    };

    return (
      <div>

        <div>Location:</div>
        <div id="location"></div>
        <div>Local weather:</div>
        <div id="local-weather"></div>
        <div>Temperature:</div>
        <div id="temperature"></div>

        <input id="input-field" type="text" placeholder="Enter city here"/>
        <div id="weather-card">
          <div id="weather-card-weather"><i className="wi wi-owm-day-803"></i></div>
          <div id="weather-card-temperature"></div>
        </div>

        <button id="toggleTempUnit"></button>

      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));
