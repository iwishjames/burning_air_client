import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/flights.json';

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

    saveFlight(flight_num) {
      axios.post(SERVER_URL, {flight_num: flight_num}).then((result) => {

      this.setState({flights: [... this.state.flights, result.data]})
      });
  }

  render(){
      return (
        <div>
  	     <h1> Burning Flights</h1>
  	      <Flightsform onSubmit={ this.saveFlight } />
          <Gallery flights={ this.state.flights } />
          {/*so pretty much the secret from te SecretForm child goes up to the parent and then gets pushed into the secrets Gallery child. */}
        </div>
      );
    }
  }

// -- Flight Form -- //
class Flightsform extends Component {
  constructor(){
    super();
    this.state = { flight_num: '' }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.flight_num);
    this.setState( { flight_num: '' }); // Reset the form.
  }

  _handleChange(event){
    this.setState( { flight_num: event.target.value } );
  }


  render() {
    return (
      <form onSubmit={ this._handleSubmit }>

      <label for="flight_num">Flight #</label>
      <input onChange={this._handleChange} value={this.state.flight_num} type="number" name="flight_num" required />

      <label for="date">Date</label>
      <input type="date" name="date" required />

      <label for="from">From</label>
      <input type="text" name="from" required />

      <label for="to">To</label>
      <input type="text" name="to" required />

      <label for="airplane_id">Airplane</label>
      <input type="number" name="airplane_id" required />

      <button type="submit" value="Tell" >Create Flight</button>

      </form>
    );
  }
}


// -- Flight Gallery -- //
class Gallery extends Component{
  render(){
    return(
      <div>
        <h3>All existing flights</h3>
          <table>
            <thead>
              <tr>
                <th width="20%">Date</th>
                <th width="20%">Flight</th>
                <th width="20%">From > To</th>
                <th width="20%">Plane</th>
                <th width="20%">Seats</th>
              </tr>
            </thead>
            {this.props.flights.map( (flight) =>
            <tbody>
              <tr>
                <td align="center">{flight.date}</td>
                <td align="center"><a href={ 'http://localhost:3001/#/flight/' + flight.id }> {flight.flight_num}</a></td>
                <td align="center">{flight.from.toUpperCase()} > {flight.to.toUpperCase()}</td>
                <td align="center">{flight.airplane_id}</td>
                <td align="center">Seat</td>
              </tr>
            </tbody>
            )}
          </table>
      </div>
    );
  }
}


export default Flights;