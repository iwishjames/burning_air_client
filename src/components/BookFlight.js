import React, { Component } from 'react';
import axios from 'axios';

// use this URL to query using axios below
const SERVER_URL_FLIGHT = 'http://localhost:3000/flights/18.json';
// const SERVER_URL_AIRPLANE = 'http://localhost:3000/flights/16.json';
const SERVER_URL_SEATS = 'http://localhost:3000/flights/16.json';

class BookFlight extends Component {
  constructor () {
    super();
    this.state = {
      seats: "",
      flight: "",
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

  // fetch the information about the flight that this page is on
  // recursively call every 4 secs to check if the seats have been checked by other users!
  // TODO: add in user name to seat table
  const fetchFlights = () => {axios.get(SERVER_URL_FLIGHT)
      .then((results) => {
        this.setState({
          flight: results.data,
          hasLoaded: true});
          setTimeout(fetchFlights, 4000);
          console.log("get")
      })};
    fetchFlights();

    // bind the handlecheck function so I can use this.
    this._handleCheck = this._handleCheck.bind(this);

  }

  _handleCheck (event) {
    console.log(event.target.dataset.booked);
    // TODO: when the user checks a box, first check if it has been checked in the database since the last call.
    // then check the box, and send this to the database so nobody else can snag the seat.
    const url = "http://localhost:3000/seats/" + event.target.value + ".json";
    // axios.get(url).then((results) => {
    //   this.setState({ flight: results.data });
    // }).then(axios.post(url, {
    //   is_taken: event.target.dataset.booked ? false : true
    // }))

    axios.post(url, {
      is_taken: event.target.dataset.booked ? false : true,
    }).then((result) => console.log("yay"))
  }

  render() {
    const flight = this.state.flight.flight;

    if (flight) {
      const seats = flight.seats;
      const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
      return(
          <div>
              <h1>Crapping Airline</h1>
              <h2>Book a flight</h2>
              <p>{ flight.date } Flight { flight.flight_num } { flight.from } > { flight.to }</p>
              <p>Seats:</p>
              <div className="planeContainer">
                { seats.map((seat) =>
                  <label htmlFor="seat" key={ seat.id }>
                    <input type="checkbox" name="seat" value={ seat.id } data-booked={ seat.is_taken ? true : false } onChange={ this._handleCheck } />
                    { seat.column }{ alphabet[seat.row - 1] } { seat.is_taken ? "booked" : "available" }
                  </label>
                  )
                }
              </div>


          </div>
      );
    }
    else {
      return (
        <p>loading</p>
      )
    }
  }
}

export default BookFlight;
