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
      temperatureUnits: 'celcius',
      flipOverValue: '',
      weatherCity: '',
      weatherTemp: 0,
      weatherTempChange: 0,
      weatherHumidity: 0,
      weatherWindSpeed: 0,
      weatherWindDirection: 0
    };
    this.getWeather = this.getWeather.bind(this);
    this.changeTempUnits = this.changeTempUnits.bind(this);
    this.changeCityName = this.changeCityName.bind(this);
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
          weatherCity: data.name,
          weatherIcon: ('wi wi-owm-' + this.dayOrNight() + data.weather[0].id),
          weatherHumidity: data.main.humidity + '%',
          weatherTemp: data.main.temp,
          weatherTempChange: Math.round(data.main.temp) + '\u00B0C',
          weatherWindSpeed: Math.round(data.wind.speed) + ' m/s',
          weatherWindDirection: Math.round(data.wind.deg)
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
    $('.weather-card-front-temperature').animate({
      opacity: 0
    }, 500, () => {
      if (this.state.weatherTempChange.endsWith('C')) {
        this.setState({
          weatherTempChange: Math.round((this.state.weatherTemp) * 9/5 + 32) + '\u00B0F',
          temperatureUnits: 'fahrenheit'
        });
      } else {
        this.setState({
          weatherTempChange: Math.round(this.state.weatherTemp) + '\u00B0C',
          temperatureUnits: 'celcius'
        });
      }
      $('.weather-card-front-temperature').animate({
        opacity: 1
      }, 500);
    });
  }

  changeCityName(cityName) {
    this.setState({weatherCity: cityName});
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
          changeCity={this.changeCityName}
          cityName={this.state.weatherCity} />
        <WeatherCard
          flipOver={this.flipOver}
          flipOverValue={this.state.flipOverValue}
          weatherIcon={this.state.weatherIcon}
          weatherTempChange={this.state.weatherTempChange}
          weatherHumidity={this.state.weatherHumidity}
          weatherWindSpeed={this.state.weatherWindSpeed}
          weatherWindDirection={this.state.weatherWindDirection} />
        <WeatherUnitsButton
          changeTempUnits={this.changeTempUnits}
          temperatureUnits={this.state.temperatureUnits}/>

      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById('container'));
