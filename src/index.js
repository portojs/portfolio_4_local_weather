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
    // get current position
    this.getWeather();
  }

  getWeather(cityName) {
    let link = '',
        forecastLink = '',
        googleLink = '',
        temp;

    if (!cityName) {
      navigator.geolocation.getCurrentPosition(pos => {
        // link = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' +
        //   pos.coords.latitude + '&lon=' + pos.coords.longitude +
        //   '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';
        link = 'https://crossorigin.me/https://api.forecast.io/forecast/0aeea7c01d5fbc8c67dc57d2aadca7ff/' + pos.coords.latitude + ',' + pos.coords.longitude;
        googleLink = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&key=AIzaSyAJCykTm7c8XBG0TTKOwWVR-wi1h-tNaSk';

        cityName = fetch(googleLink)
          .then(response => response.json())
          .then(data => {
            this.setState({
              city: data.results[0].address_components[3].long_name
            });
          });

        this.getData(link);
      }, () => console.log('error'));
    } else {
      // link = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=' + cityName +
      //   '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb';
      link = 'https://crossorigin.me/https://api.forecast.io/forecast/0aeea7c01d5fbc8c67dc57d2aadca7ff/' + pos.coords.latitude + ',' + pos.coords.longitude;
      // this.getData(link);
    }
  }

  // get city name by sending coordinates to google
  // getCityName(pos) {
  //   let link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&key=AIzaSyAJCykTm7c8XBG0TTKOwWVR-wi1h-tNaSk',
  //       cityData = '',
  //       cityName = '';
  //
  //   cityName = fetch(link)
  //     .then(response => response.json())
  //     .then(data => {
  //       cityData = data.results[0].address_components[3].long_name;
  //       console.log('From inside', cityData);
  //       return cityData;
  //     });
  //
  //   return cityName;
  // }

  // get weather data
  getData(link) {
    fetch(link)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // console.log(data.currently.icon);
        this.setState({
          // city: data.name,
          collection: {
            // icon: 'wi wi-owm-' + this.dayOrNight() + data.weather[0].id
            humidity: (data.currently.humidity * 100) + '%',
            tempCelcius: Math.round(((data.currently.temperature) - 32) * 5/9) + '\u00B0C',
            tempFahrenheit: Math.round(data.currently.temperature) + '\u00B0F',
            temp: Math.round(((data.currently.temperature) - 32) * 5/9) + '\u00B0C',
            windSpeedMeters: Math.round(((data.currently.windSpeed) * 1609) / 3600) + ' m/s',
            windSpeedMiles: Math.round(data.currently.windSpeed) + ' mph',
            windSpeed: Math.round(((data.currently.windSpeed) * 1609) / 3600) + ' m/s',
            windDirection: Math.round(data.currently.windBearing),
            icon: 'wi wi-forecast-io-' + data.currently.icon
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
