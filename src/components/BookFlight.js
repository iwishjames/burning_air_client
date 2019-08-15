import React, { Component } from 'react';
import axios from 'axios';
import User from './User';
import chair_empty from '../images/chair_empty.png';
import chair_filled from '../images/chair_filled.png';

class BookFlight extends Component {
  constructor (props) {
    super(props);
    this.state = {
      seats: "",
      flight: "",
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false,

      lastChecked: "",
      name: localStorage.name,
    };
    // use this URL to query using axios below
    const SERVER_URL_FLIGHT = 'https://crashtasticairlines.herokuapp.com/flights/' + this.props.match.params.id + '.json';
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
      this.uncheckSeat = this.uncheckSeat.bind(this);
  }

// TODO: when you click twice on a is_taken true element, it will block the first time, then not run any of this code, and check the box. This won't affect the database.
  _handleCheck (event) {
    // OH GOD
      event.preventDefault();
      event.persist();

    // when there is a change, we have to detect which one was unchecked, and there isnt a dom method for that so we loop through here and add it in to the ajax request.
    // TODO: when the user checks a box, first check if it has been checked in the database since the last call.
    const seatId = event.target.value;
    // then check the box, and send this to the database so nobody else can snag the seat.
    const url = "https://crashtasticairlines.herokuapp.com/seats/" + event.target.value + ".json";
    // use this URL to query using axios below
    const SERVER_URL_FLIGHT = 'https://crashtasticairlines.herokuapp.com/flights/' + this.props.match.params.id + '.json';
    axios.get(SERVER_URL_FLIGHT).then((results) => {
      this.setState({ seats: results.data.flight.seats });
      return results;
    }).then((results) => {
      const seatTaken = results.data.flight.seats.find((s) => { return s.id == seatId })
      // check that it hasnt been selected by someone else.
      console.log("seat taken " + seatTaken.is_taken );
      if (seatTaken.is_taken == false) {
        event.target.checked = true;
        // uncheck the lastChecked variable.

        this.uncheckSeat();
        // change the state of lastChecked to this element.
        this.setState({lastChecked: event.target});
        // change the database values
        axios.post(url, {
          is_taken: event.target.dataset.booked === "true" ? false : true,
          taken_by_user: this.state.name,
          }).then((results) => {
          axios.get(SERVER_URL_FLIGHT).then((results) => {
            this.setState({ seats: results.data.flight.seats });
          })
        });
      }
    });


  }

  uncheckSeat () {
    console.log(this.state.lastChecked);
    const SERVER_URL_FLIGHT = 'https://crashtasticairlines.herokuapp.com/flights/' + this.props.match.params.id + '.json';
    const url = "https://crashtasticairlines.herokuapp.com/seats/" + this.state.lastChecked.value + ".json";
    axios.post(url, {
      is_taken: false,
      taken_by_user: "",
      }).then((results) => {
      axios.get(SERVER_URL_FLIGHT).then((results) => {
        this.setState({ seats: results.data.flight.seats });
      })});
  }


// TODO: when you press submit, save the data in the database, and take you to the users page.
// Make association in database.
  render() {
    const flight = this.state.flight.flight;
    if (flight) {

      const divGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(" + flight.airplane.columns + ", 1fr)",
        gridTemplateRows: "repeat(" + flight.airplane.rows + ", 1fr)",
        maxWidth: "800px",
        minWidth: "300px",
      };

      const divItemTaken = {
        borderRadius: "3px",
        border: "1px solid #ccc",
        backgroundColor: "#eee",

        color: "#aaa",
        margin: "1px",
        textAlign: "center",
        padding: "8px",
        cursor: "not-allowed"
      }

      const divItemFree = {
        borderRadius: "3px",
        border: "1px solid #ccc",
        backgroundColor: "#eee",

        color: "#555",
        margin: "1px",
        textAlign: "center",
        padding: "8px",
        cursor: "pointer"
      }

      const spanText = {
      }
      const chairImg = {
        width: "60px",
        height: "60px",
        display: "block",
      }

      const divCheckbox = {
        display: "none",
      }
      const seats = this.state.seats;
      const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
      return(
          <div>
              <h1>🔥 Book a Flight with CrashTastic Airlines 🔥</h1>
              <h2>Name: {this.state.name}</h2>
              <h2>Flight { flight.flight_num }</h2>
              <p>{ flight.date }: { flight.from } ✈ { flight.to }</p>
              <p>Seats:</p>
              <div className="planeContainer">
              <div style={divGrid}>
                { seats.sort((a,b) => {
                  return a.row - b.row || a.column - b.column
                }).map((seat) =>
                    <label htmlFor={ seat.id }  key={ seat.id } style={ seat.is_taken ? divItemTaken : divItemFree }>
                      <input type="radio" style={ divCheckbox } id={ seat.id } value={ seat.id } data-booked={ seat.is_taken ? true : false } onChange={ this._handleCheck } />
                      <span style={spanText} >{ seat.column }{ alphabet[seat.row - 1] } { seat.taken_by_user }</span>
                      <img src={ seat.is_taken ? chair_filled : chair_empty } style={chairImg} />
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
