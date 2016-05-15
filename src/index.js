import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
      weatherTemp: 0,
      weatherTempChange: 0,
      weatherHumidity: 0,
      weatherWindSpeed: 0,
      weatherWindDirection: 0
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
        this.setState({
          searchItem: data.name,
          weatherIcon: ('wi wi-owm-' + this.dayOrNight() + data.weather[0].id),
          weatherHumidity: data.main.humidity + '\u00B0C',
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
        this.setState({weatherTempChange: Math.round((this.state.weatherTemp) * 9/5 + 32) + '\u00B0F'});
      } else {
        this.setState({weatherTempChange: Math.round(this.state.weatherTemp) + '\u00B0C'});
      }
      $('.weather-card-front-temperature').animate({
        opacity: 1
      }, 500);
    });
  }

  flipOver(event) {
    event.preventDefault();
    document.querySelector('.weather-card').classList.toggle('flip-over');
  }

  render() {

    return (
      <div>

        <form id="input" role="form" name="search-form" onSubmit={this.handleSubmit}>
          <input id="input-field" type="text" placeholder="Enter city here" value={this.state.searchItem} onChange={this.handleChange}></input>
          <button id="input-button" type="submit"><i className="fa fa-search fa-flip-horizontal"></i></button>
        </form>

        <div id="content">

          <div className="weather-card" onClick={this.flipOver}>
            <div className="weather-card-front">
              <div className="weather-card-front-weather">
                <i className={this.state.weatherIcon}></i>
              </div>
              <div className="weather-card-front-temperature">{this.state.weatherTempChange}</div>
            </div>
            <div className="weather-card-back">

              <div className="weather-card-back-humidity">
                <div>Humidity</div>
                <div className="weather-card-back-humidity-value">{this.state.weatherHumidity}</div>
              </div>

              <div className="weather-card-back-wind">

                <div className="weather-card-back-wind-card">
                  <div className="weather-card-back-wind-card-title">Wind direction</div>
                  <div className="weather-card-back-wind-card-direction">
                    <i className={"wi wi-wind towards-" + Math.round(this.state.weatherWindDirection) + "-deg"}></i>
                  </div>
                </div>

                <div className="weather-card-back-wind-card">
                  <div className="weather-card-back-wind-card-title">Wind speed</div>
                  <div className="weather-card-back-wind-card-speed">{this.state.weatherWindSpeed}</div>
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
