import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// use this URL to query using axios below
const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/flights.json';

class Test extends Component {
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
              <h1>CrashTastic Airline</h1>
                <p><i>All flight schedules</i></p>
                <p>{ this.state.flights.map((flight) => <p><Link to={"/flight/" + flight.id }>{flight.date}: flight {flight.id} from {flight.from} to {flight.to} on airplane {flight.airplane_id}</Link></p>)}
                </p>
          </div>
      );
  }
}

export default Test;
