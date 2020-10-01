import React, {Component} from 'react';
import './cssFiles/weather.css';
import Geoweather from './geoWeatherapp.jsx';
var descicons = [
  'clear sky',
  'few clouds',
  'scattered clouds',
  'broken clouds',
  'shower rain',
  'rain',
  'thunder storm',
  'snow',
  'mist',
  'overcast clouds',
  'light rain',
  'very heavy rain'
];
var icon = [
  'fas fa-sun',
  'fas fa-cloud',
  'fas fa-cloud-sun',
  'fas fa-cloud-meatball',
  'fas fa-cloud-sun-rain',
  'fas fa-cloud-showers-heavy',
  'fas fa-poo-storm',
  'fas fa-snowflake',
  'fas fa-smog',
  'fas fa-water',
  'fas fa-cloud-rain',
  'fas fa-cloud-rain'
];
var aID = '709d60e1060c35dcb2d9bc6b3ab181f6';
var apiUrlCC;
var icv = '';
const Display = (props) => {
  return (
    <div id="displayC">
      <h2>{props.weather.dispInput}</h2>
      <h1 className="display-1 text-center" style={{backgroundColor: 'white'}}>
        <i
          id="h1"
          className={'text-dark ' + props.weather.icon}
          style={{color: 'black'}}
        />
      </h1>
      <div id="weather">
        <h5>{props.weather.weather}</h5>
        <div id="xtra-info" style={{textAlign: 'center'}}>
          <span className="text-center">
            {props.weather.temperature} {props.weather.humidity}{' '}
            {props.weather.wind}{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: icv,
      cityInp: '',
      country: '',
      dispInput: 'WC current weather forcast',
      temperature: `   Type in your city and country code to view your
      current weather forcast if you dont know your country code leave blank`,
      outlook: '',
      humidity: '',
      weather: '',
      wind: '',
    };
    this.handleclick = this.handleclick.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.handlevalues = this.handlevalues.bind(this);
  }
  handlevalues(weather, humidity, temp, wind, country, city, outlook) {
    this.setState({
      temperature: Math.round(temp - 273.15) + 'deg celsius',
      dispInput: city + ', ' + country,
      outlook,
      humidity: ',relative humidity of ' + humidity,
      weather,
      wind: ',' + wind + ' wind speed',
      icon: icv,
    });
  }
  changeCity(event) {
    if (event.target.id == 'cc') {
      console.log('hey');
      return this.setState({
        country: event.target.value,
      });
    }
    console.log('ho');
    return this.setState({
      cityInp: event.target.value,
    });
  }
  handleclick() {
    if(this.state.city!==''){
    var XML = fetch(apiUrlCC);
    XML.then((response) => response.json()).then((data) => {
      console.log(data);
      descicons.forEach((a, b) => {
        if (data.weather[0].description === a) {
          console.log(a);
          console.log(icon[b]);
          icv = icon[b];
        }
       
      });
      this.handlevalues(
        data.weather[0].description,
        data.main.humidity,
        data.main.temp,
        data.wind.speed,
        data.sys.country,
        data.name
      );
    });
   }
   return;
  }
  render() {
    apiUrlCC = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInp},${this.state.country}&APPID=${aID}`;
    return (
      <main>
        <div id="div" className="form-group">
          <header>
            <h1 className="h1 text-center">
              <span>WC</span> weather
            </h1>
          </header>
          <div id="upper">
            <label for="city">city</label>
            <input
              onChange={this.changeCity}
              type="text"
              className="form-control"
              name="city"
              id="city"
              aria-describedby="helpId"
              placeholder="London"
              required
            />
            <small id="helpId" className="form-text text-muted">
              <a id="city" className="btn btn-link btn text-dark">
                more info?
              </a>
            </small>
            <label for="cc">Country Code</label>
            <input
              onChange={this.changeCity}
              type="text"
              className="form-control"
              name="cc"
              id="cc"
              aria-describedby="helpId"
              placeholder="Uk"
              required
            />
            <small id="helpId" className="form-text text-muted">
              <a id="country" className="btn btn-link text-dark">
                more info country code?
              </a>
            </small>
            <button
              type="submit"
              onClick={this.handleclick}
              className="btn btn-danger btn-block"
            >
              weather
            </button>
          </div>
        </div>
        <section>
          <Display weather={this.state} />
        </section>

        <Geoweather />
      </main>
    );
  }
}

export default Weather;
