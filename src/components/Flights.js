import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './flights.css';

const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/flights.json';
const SERVER_URL_PLANES = 'https://crashtasticairlines.herokuapp.com/airplanes.json';


class Flights extends Component {
  constructor () {
    super();
    this.state = {
      flights: [],
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };
    this.saveFlight = this.saveFlight.bind(this);

  // fetch the flights from the database every 4 seconds, save into state.flights to be used in render
  const fetchFlights = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({
        flights: results.data,
        hasLoaded: true});
      setTimeout(fetchFlights, 4000);
      })
    };
    fetchFlights();
  }

    saveFlight(flight_num, date, from, to, airplane_id) {
      axios.post(SERVER_URL, {
        flight_num: flight_num,
        date: date,
        from: from,
        to: to,
        airplane_id: airplane_id,
      }).then((result) => {
      this.setState({
        flights: [... this.state.flights, result.data]})
      });
  }

  render(){
    if (this.state.hasLoaded) {
      return (
        <div>
  	     <h1>CrashTastic Airline</h1>
  	      <Flightsform onSubmit={ this.saveFlight } />
              <Gallery flights={ this.state.flights } />
        </div>
      );
    }
    else {
      return <div>loading...</div>
    }
    }
  }







// -- Flight Form -- //
class Flightsform extends Component {
  constructor(){
    super();
    this.state = {
      flight_num: '',
      date: "",
      from: "",
      to: "",
      airplane_id: "",
      airplanes: [],
      hasLoaded: false,
     }

    this._handleChange = this._handleChange.bind(this);
    this._handleChangeDate = this._handleChangeDate.bind(this);
    this._handleChangeFrom = this._handleChangeFrom.bind(this);
    this._handleChangeTo = this._handleChangeTo.bind(this);
    this._handleChangeAirplane_id = this._handleChangeAirplane_id.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    const fetchPlanes = () => {
      axios.get(SERVER_URL_PLANES).then((results) => {
        this.setState({
          airplanes: results.data,
          hasLoaded: true});
        setTimeout(fetchPlanes, 4000);
        })
      };
      fetchPlanes();
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.flight_num, this.state.date, this.state.from, this.state.to, this.state.airplane_id);
    this.setState( {
      flight_num: '',
      date: "",
      from: "",
      to: "",
      airplane_id: "",
    }); // Reset the form.

  }

  _handleChange(event){
    this.setState( { flight_num: event.target.value } );
  }

  _handleChangeDate(event){
    this.setState( { date: event.target.value } );
  }

  _handleChangeFrom(event){
    this.setState( { from: event.target.value } );
  }

  _handleChangeTo(event){
    this.setState( { to: event.target.value } );
  }

  _handleChangeAirplane_id(event){
    this.setState( { airplane_id: event.target.value } );
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>

      <label for="flight_num">Flight #</label>
      <input onChange={this._handleChange} value={this.state.flight_num} type="number" name="flight_num" required />

      <label for="date">Date</label>
      <input onChange={this._handleChangeDate} type="date" name="date" required />

      <label for="from">From</label>
      <input onChange={this._handleChangeFrom} type="text" name="from" required />

      <label for="to">To</label>
      <input onChange={this._handleChangeTo} type="text" name="to" required />

      <label for="airplane_id">Airplane</label>
      <select onChange={this._handleChangeAirplane_id} type="number" name="airplane_id" value={this.state.value} required>
      <option disabled selected value> -- select an option -- </option>
      {this.state.airplanes.map((p) => {
        return <option value={p.id}>{p.name}</option>
      })}
      </select>


      <button type="submit" value="Tell" >Create Flight</button>

      </form>
    );
  }
}


// -- Flight Gallery -- //
class Gallery extends Component{
  render(){
      return(
        <div class="flightTable">
          <h3>All existing flights</h3>
            <table>
              <thead>
                <tr>
                  <th width="20%">Date</th>
                  <th width="20%">Flight</th>
                  <th width="20%">From > To</th>
                  <th width="20%">Plane</th>
                </tr>
              </thead>
              {this.props.flights.map( (flight) =>
              <tbody>
                <tr>
                  <td align="center">{flight.date}</td>
                  <td align="center"><Link to={ '/flight/' + flight.id }> {flight.flight_num}</Link></td>
                  <td align="center">{flight.from ? flight.from.toUpperCase() : "" } ✈ {flight.to ? flight.to.toUpperCase() : "" }</td>
                  <td align="center">{flight.airplane_id}</td>
                </tr>
              </tbody>
              )}
            </table>
        </div>
      );
  }
}


export default Flights;
