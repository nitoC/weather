import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/all.min.js';
var sc = {
  transform: 'scale(0)',
  top: '10%',
  left: '-500px',
  transform: 'translateX(-50%)',
  visibility: 'hiddden',
  width: 0,
};
var sc1 = {
  transform: 'scale(1)',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  visibility: 'visible',
  maxWidth:'50%'
};
var track = false;
var pos1 = {
  position: 'fixed',
  bottom: '2px',
  right: '2px',
};
var pos2 = {
  position: 'fixed',
  bottom: '-158px',
  right: '2px',
};
var pos3 = {
  transform: 'scale(0)',
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  top: 0,
  pointerEvent: 'all',
};
var pos4 = {
  transform: 'scale(1)',
  pointerEvent: 'none',
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  zIndex: '1',
};
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
];
var aID = '709d60e1060c35dcb2d9bc6b3ab181f6';
var icv = '';

var apiUrl;
var apId = '70fb616a3dbc2ad6a503a1289bf25249';
var lon;
var lat;

const DisplayGeo = (props) => {
  return (
    <div id="modal" style={props.weather.scale}>
      <span
        style={{
          float: 'right',
          fontWeight: 'bold',
          padding: '1.25em',
          cursor: 'pointer',
          fontSize: '1.2em',
        }}
        onClick={props.togX}
      >
        &times;
      </span>
      <h2 style={{padding: '1.1em'}}>{props.weather.dispInput}</h2>

      <i className={props.weather.icon} />
      <h5>{props.weather.weather}</h5>

      <h5>
        <span>
          {props.weather.temperature} {props.weather.wind}
          {props.weather.outlook} {props.weather.humidity}
        </span>
      </h5>
    </div>
  );
};
class Geoweather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: sc,
      blur: pos3,
      toggle: '^',
      position: pos2,
      icon: icv,
      country: '',
      dispInput: '',
      temperature: '',
      outlook: '',
      humidity: '',
      weather: '',
      wind: '',
    };
    this.handlegeoClick = this.handlegeoClick.bind(this);
    this.handlevalues = this.handlevalues.bind(this);
    this.slide = this.slide.bind(this);
    this.handleX = this.handleX.bind(this);
  }
  slide() {
    if (this.state.toggle === '^') {
      this.setState({
        toggle: 'x',
        position: pos1,
      });
    } else {
      this.setState({
        toggle: '^',
        position: pos2,
      });
    }
  }
  handlevalues(weather, humidity, temp, wind, country, outlook) {
    this.setState({
      scale: sc1,
      blur: pos4,
      temperature: Math.round(temp - 273.15) + ' deg celsius',
      dispInput: country,
      outlook: outlook + ' visibility',
      humidity: ',relative humidity of ' + humidity,
      weather: weather,
      wind: ',' + wind + ' wind speed, ',
      icon: icv,
    });
  }
  handlegeoClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude=hourly,daily&appid=${apId}`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.current.weather[0].description);
            descicons.forEach((a, b) => {
              if (a === data.current.weather[0].description) {
                console.log(icv);
                icv = icon[b];
                console.log(icon[b]);
              }
            });
            this.handlevalues(
              data.current.weather[0].description,
              data.current.humidity,
              data.current.temp,
              data.current.wind_speed,
              data.timezone,
              data.current.visibility
            );
          })
          .catch((err) => console.log(err));
      });
    }
  }
  handleX() {
    this.setState({
      scale: sc,
      blur: pos3,
      position: pos2,
      toggle: '^',
    });
  }

  render() {
    return (
      <section id="fixed" style={this.state.position}>
        <span
          style={{
            fontSize: '1.5em',
            cursor: 'pointer',
            padding: '0.5em',
            fontWeight: 'bold',
          }}
          onClick={this.slide}
        >
          {this.state.toggle}
        </span>
        <DisplayGeo weather={this.state} togX={this.handleX} />
        <div>
          <h6 id="headertext">
            You dont know your location?then click here to get weather{' '}
          </h6>
          <button
            id="b"
            className="btn btn-info"
            type="submit"
            onClick={this.handlegeoClick}
          >
            weather
          </button>
        </div>
        <div id="blur" style={this.state.blur}></div>
      </section>
    );
  }
}

export default Geoweather;
