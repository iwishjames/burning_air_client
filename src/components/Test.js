import React, { Component } from 'react';
import axios from 'axios';

// use this URL to query using axios below
const SERVER_URL = 'http://localhost:3000/flights.json';

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
              <h1>Crapping Airline</h1>
              <p>Testing whether we can communicate to rails. To do this we need to recieve:
                  flights
              </p>
<<<<<<< HEAD
                <p>{ this.state.flights.map((flight) =>
                  {flight.date}: flight {flight.id} from {flight.from} to {flight.to} on airplane {flight.airplane_id})}
=======
                <p>{ this.state.flights.map((flight) => <p><a href={ 'http://localhost:3001/#/flight/' + flight.id }>{flight.date}: flight {flight.id} from {flight.from} to {flight.to} on airplane {flight.airplane_id}</a></p>)}
>>>>>>> 5c0f667857726913e3061f1d12986c6185b8ac14
                </p>
          </div>
      );
  }
}

export default Test;
