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
        windDirection: 0
      }
    };
    this.getWeather = this.getWeather.bind(this);
    this.changeTempUnits = this.changeTempUnits.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.flipOver = this.flipOver.bind(this);
  }

  componentWillMount() {
    // get current position
    this.getWeather();
  }

  getWeather(cityName) {
    var link = '';

    if (!cityName) {
      navigator.geolocation.getCurrentPosition(pos => {
        link = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
          pos.coords.latitude + '&lon=' + pos.coords.longitude +
          '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';
      this.getData(link);
      }, () => console.log('error'));
    } else {
      link = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName +
        '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';
      this.getData(link);
    }
  }

  // get weather data
  getData(link) {
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.name,
          collection: {
            icon: 'wi wi-owm-' + this.dayOrNight() + data.weather[0].id,
            humidity: data.main.humidity + '%',
            temp: data.main.temp,
            tempChange: Math.round(data.main.temp) + '\u00B0C',
            windSpeed: Math.round(data.wind.speed) + ' m/s',
            windDirection: Math.round(data.wind.deg)
          }
        });
      });
  }

  // check time of day at given location
  dayOrNight() {
    var today = new Date(),
        hour = today.getHours();
    if(hour > 6 && hour < 20) {
      return 'day-';
    } else {
      return 'night-';
    }
  }

  changeTempUnits() {
    let selector = this.state.collection;

    $('.weather-card-front-temperature').animate({
      opacity: 0
    }, 500, () => {
      if (this.state.collection.tempChange.endsWith('C')) {
        selector.tempChange = Math.round((this.state.collection.temp) * 9/5 + 32) + '\u00B0F';
        this.setState({
          tempUnits: 'fahrenheit',
          collection: selector
        });
      } else {
        selector.tempChange = Math.round(this.state.collection.temp) + '\u00B0C';
        this.setState({
          tempUnits: 'celcius',
          collection: selector
        });
      }
      $('.weather-card-front-temperature').animate({
        opacity: 1
      }, 500);
    });
  }

  changeCity(cityName) {
    this.setState({city: cityName});
  }

  flipOver() {
    if (this.state.flipOverValue.length === 0) {
      this.setState({flipOverValue: 'flip-over'});
    } else {
      this.setState({flipOverValue: ''});
    }
  }

  render() {

    return (
      <div>

        <WeatherInput
          submitSearch={this.getWeather}
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
