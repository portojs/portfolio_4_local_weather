import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  render() {

    window.onload = function() {

      function success(pos) {
        var link = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                pos.coords.latitude + '&lon=' + pos.coords.longitude +
                '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';
        $.getJSON(link, function(data) {
          console.log(data);
          document.getElementById('local-weather').innerHTML = data.weather[0].description;
          document.getElementById('temperature').innerHTML = data.main.temp;
          document.getElementById('location').innerHTML = data.name;
        });
      };

      function error(err) {
        document.getElementById('local-weather').innerHTML('Cannot get weather for your location. Try again later.');
      };

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
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));
