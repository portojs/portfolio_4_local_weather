import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
      weatherTemp: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTempUnits = this.changeTempUnits.bind(this);
  }

  componentWillMount() {
    // get current position
    navigator.geolocation.getCurrentPosition(pos => {
      this.getWeather(pos);
    }, () => console.log('error'));
  }

  getWeather(pos) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' +
      pos.coords.latitude + '&lon=' + pos.coords.longitude +
      '&units=metric&APPID=7b5fd7c59b65645c55cc078c587e19bb', (data) => {
      let prefix = 'wi wi-owm-',
          weatherCode = data.weather[0].id,
          weatherHumidity = data.main.humidity,
          weatherWindSpeed = data.wind.speed,
          weatherWindDirection = data.wind.deg,
          weatherClass = '';
      this.setState({weatherTemp: Math.round(data.main.temp)});
      weatherClass = prefix + this.dayOrNight() + weatherCode;
      document.querySelector('#input-field').value = data.name;
      document.querySelector('.weather-card-front-temperature').innerHTML = this.state.weatherTemp + '\u00B0C';
      document.querySelector('.weather-card-front-icon').className = weatherClass;
      document.querySelector('.weather-card-back-humidity-value').innerHTML = weatherHumidity + '%';
      document.querySelector('.weather-card-back-wind-card-speed').innerHTML = Math.round(weatherWindSpeed) + ' m/s';
      document.querySelector('.wi-wind').classList.add('towards-' + Math.round(weatherWindDirection) + '-deg');
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

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    console.log('Target value: ' + event.target.value);
  }

  handleChange(event) {
    this.setState({searchItem: event.target.value});
  }

  changeTempUnits(event) {
    event.preventDefault();
    let displayedTemperature = document.querySelector('.weather-card-front-temperature').innerHTML;
    $('.weather-card-front-temperature').animate({
      opacity: 0
    }, 500, () => {
      if (displayedTemperature[3] === 'C') {
        document.querySelector('.weather-card-front-temperature').innerHTML = Math.round((this.state.weatherTemp * 9/5 + 32)) + '\u00B0F';
      } else {
        document.querySelector('.weather-card-front-temperature').innerHTML = this.state.weatherTemp + '\u00B0C';
      }
      $('.weather-card-front-temperature').animate({
        opacity: 1
      }, 500);
    });
  }

  render() {

    window.onload = function() {
      // onclick event to show the back side of the weather card
      document.querySelector('.weather-card').addEventListener('click', function() {
        document.querySelector('.weather-card').classList.toggle('flip-over');
      });

    };

    return (
      <div>

        <form id="input" role="form" name="search-form" onSubmit={this.handleSubmit}>
          <input id="input-field" type="text" placeholder="Enter city here" value={this.state.searchItem} onChange={this.handleChange}></input>
          <button id="input-button" type="submit"><i className="fa fa-search fa-flip-horizontal"></i></button>
        </form>

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

        <button id="toggle-temp-unit" onClick={this.changeTempUnits}>Change Temperature Units</button>

      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById('container'));
