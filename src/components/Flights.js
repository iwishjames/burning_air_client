import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/flights.json';

class Flights extends Component {
  constructor () {
    super();
    this.state = {
      // the flights are loaded using axios below
      flights: [],
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

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

  render() {
      return(
          <div>
              <h1>All Flights</h1>
                { this.state.flights.map((flight) =>
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
                  <tbody>
                    <tr>
                      <td width="20%" align="center">{flight.date}</td>
                      <td width="20%" align="center"><a href={ 'http://localhost:3001/#/flight/' + flight.id }> {flight.id}</a></td>
                      <td width="20%" align="center">{flight.from} > {flight.to}</td>
                      <td width="20%" align="center">{flight.airplane_id}</td>
                      <td width="20%" align="center">Seat</td>
                    </tr>
                    </tbody>
                </table>)}
          </div>
      );
  }
}

export default Flights;
