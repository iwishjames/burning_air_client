import React, { Component } from 'react';
import axios from 'axios';

class BookFlight extends Component {
  constructor (props) {
    super(props);
    this.state = {
      seats: "",
      flight: "",
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

    console.log(this.props.match.params.id)

    // use this URL to query using axios below
    const SERVER_URL_FLIGHT = 'http://localhost:3000/flights/' + this.props.match.params.id + '.json';
  // fetch the information about the flight that this page is on
  // recursively call every 4 secs to check if the seats have been checked by other users!
  // TODO: add in user name to seat table
  const fetchFlights = () => {axios.get(SERVER_URL_FLIGHT)
      .then((results) => {
        this.setState({
          flight: results.data,
          seats: results.data.flight.seats,
          hasLoaded: true});
          setTimeout(fetchFlights, 4000);
          console.log("get")
      })};
    fetchFlights();

    // bind the handlecheck function so I can use this.
    this._handleCheck = this._handleCheck.bind(this);

  }

  _handleCheck (event) {
    // OH GOD

    // when there is a change, we have to detect which one was unchecked, and there isnt a dom method for that so we loop through here and add it in to the ajax request.


    console.log(event.target.dataset.booked, event.target.dataset.booked === "true" ? false : true);
    // TODO: when the user checks a box, first check if it has been checked in the database since the last call.
    const seatId = event.target.value;
    // then check the box, and send this to the database so nobody else can snag the seat.
    const url = "http://localhost:3000/seats/" + event.target.value + ".json";
    // use this URL to query using axios below
    const SERVER_URL_FLIGHT = 'http://localhost:3000/flights/' + this.props.match.params.id + '.json';
    axios.get(SERVER_URL_FLIGHT).then((results) => {
      this.setState({ seats: results.data.flight.seats });
      return results;
    }).then((results) => {
      const seatTaken = results.data.flight.seats.find((s) => { return s.id == seatId })
      // check that it hasnt been selected by someone else.
      console.log("seat taken " + seatTaken.is_taken );
      if (seatTaken.is_taken == false) {
        axios.post(url, {
          is_taken: event.target.dataset.booked === "true" ? false : true,
          }).then((results) => {
          axios.get(SERVER_URL_FLIGHT).then((results) => {
            this.setState({ seats: results.data.flight.seats });
          })
        });
      }
    });
  }


// TODO: change from checkbox to radio button
// when uncheck radio button, send a post as well.
  render() {
    const flight = this.state.flight.flight;


    if (flight) {
      const divGrid = {
        display: "grid",
        color: "pink",
        gridTemplateColumns: "repeat(" + flight.airplane.columns + ", 1fr)",
        gridTemplateRows: "repeat(" + flight.airplane.rows + ", 1fr)",
        maxWidth: "500px",
        backgroundColor: "black"
      };
      console.log(divGrid);
      const seats = this.state.seats;
      const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
      return(
          <div>
              <h1>Crapping Airline</h1>
              <h2>Flight {this.props.match.params.id}</h2>
              <p>{ flight.date } Flight { flight.flight_num } { flight.from } > { flight.to }</p>
              <p>Seats:</p>
              <div className="planeContainer">
              <div  style={divGrid}>
                { seats.sort((a,b) => {
                  return a.row - b.row || a.column - b.column
                }).map((seat) =>
                    <label htmlFor="seat"  key={ seat.id }>
                      <input type="radio" name="seat" value={ seat.id } data-booked={ seat.is_taken ? true : false } onChange={ this._handleCheck } />
                      { seat.column }{ alphabet[seat.row - 1] } { seat.is_taken ? "booked" : "available" }
                    </label>
                  )
                }
                </div>
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
