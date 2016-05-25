import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import './style.scss';

import WeatherInput from './components/weather-input';
import WeatherCard from './components/weather-card';
import WeatherUnitsButton from './components/weather-units-button';

class Main extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    tempUnits: 'celcius',
    flipOverValue: '',
    city: '',
    collection: {
      temp: 0,
      tempChange: 0,
      humidity: 0,
      windSpeed: 0,
      windDirection: 0,
      icon: ''
    }
  };
  this.getWeather = this.getWeather.bind(this);
  this.changeTempUnits = this.changeTempUnits.bind(this);
  this.changeCity = this.changeCity.bind(this);
  this.flipOver = this.flipOver.bind(this);
  }

  componentWillMount() {
    // display weather for the current position
    this.getWeather();
  }

  getCurrentLocation() {
    fetch('http://ip-api.com/json').then(response => response.json()).then(data => console.log(data));
  }

  // use API
  getWeather(cityName) {
    let link = '',
      googleLink = '';

    this.setState({
      collection: {}
    });

    if (!cityName) {
      // get current coordinates
      fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
          // create a link using current coordinates
          link = "http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&units=imperial&APPID=7b5fd7c59b65645c55cc078c587e19bb";
          // get current city name
          this.setState({
            city: data.city
          });
          // get weather
          this.getData(link);
        });
    } else {
      // create a link using city name
      link = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&APPID=7b5fd7c59b65645c55cc078c587e19bb';
      this.getData(link);
    }
  }

  // get weather data and display it
  getData(link) {
    fetch(link)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          collection: {
            humidity: Math.round(data.main.humidity) + '%',
            tempCelcius: Math.round(((data.main.temp) - 32) * 5 / 9) + '\u00B0C',
            tempFahrenheit: Math.round(data.main.temp) + '\u00B0F',
            temp: Math.round(((data.main.temp) - 32) * 5 / 9) + '\u00B0C',
            windSpeedMeters: Math.round(data.wind.speed) + ' m/s',
            windSpeedMiles: Math.round(((data.wind.speed) / 1609) * 3600) + ' mph',
            windSpeed: Math.round(data.wind.speed) + ' m/s',
            windDirection: 'wi wi-wind towards-' + Math.round(data.wind.deg) + '-deg',
            icon: 'wi wi-owm-' + this.dayOrNight() + data.weather[0].id
          }
        });
      });
  }

  // check time of day
  dayOrNight() {
    var today = new Date(),
      hour = today.getHours();
    if (hour > 6 && hour < 20) {
      return 'day-';
    } else {
      return 'night-';
    }
  }

  // imperial or metric units
  changeTempUnits() {
    let selector = this.state.collection;

    $('.weather-card-back-wind-card-speed').animate({
      opacity: 0
    }, 500);
    $('.weather-card-front-temperature').animate({
      opacity: 0
    }, 500, () => {
      if (this.state.tempUnits === 'celcius') {
        selector.temp = this.state.collection.tempFahrenheit;
        selector.windSpeed = this.state.collection.windSpeedMiles;
        this.setState({
          tempUnits: 'fahrenheit',
          collection: selector
        });
      } else {
        selector.temp = this.state.collection.tempCelcius;
        selector.windSpeed = this.state.collection.windSpeedMeters;
        this.setState({
          tempUnits: 'celcius',
          collection: selector
        });
      }
      $('.weather-card-front-temperature').animate({
        opacity: 1
      }, 500);
      $('.weather-card-back-wind-card-speed').animate({
        opacity: 1
      }, 500);
    });
  }

  changeCity(cityName) {
    this.setState({
      city: cityName
    });
  }

  // flip over the weather card
  flipOver() {
    if (this.state.flipOverValue.length === 0) {
      this.setState({
        flipOverValue: 'flip-over'
      });
    } else {
      this.setState({
        flipOverValue: ''
      });
    }
  }

  render() {

    return (
      <div>

        <WeatherInput
          getWeather={this.getWeather}
          changeCity={this.changeCity}
          cityName={this.state.city} />
        <WeatherCard
          flipOver={this.flipOver}
          flipOverValue={this.state.flipOverValue}
          collection={this.state.collection} />
        <WeatherUnitsButton
          changeTempUnits={this.changeTempUnits}
          temperatureUnits={this.state.tempUnits}/>

      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));
