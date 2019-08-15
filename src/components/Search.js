import React, { Component } from 'react';
import axios from 'axios';
import '../search.css';
import { Link } from 'react-router-dom';



const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/flights.json';

class Search extends Component {
    constructor () {
        super();
        this.state = {
          flights: [],
          hasLoaded: false
        }
        this.fetchFlights = this.fetchFlights.bind( this );
      }
       fetchFlights = (f, t) => {
        axios.get(SERVER_URL).then((results) => {
            // console.log(results.data);
            let listFlights = [];
            for (let i = 0; i < results.data.length; i++) {
                if ( (results.data[i].from === f) && (results.data[i].to === t) )
                // console.log(results.data[i]);
                listFlights.push(results.data[i]);
            };
            this.setState({flights: listFlights});
            console.log(this.state.flights);
          })
        };

    render() {
        return(
            <div class="flightSearchBar">
                <h1>CrashTastic Airline</h1>
                <SearchForm onSubmit={ this.fetchFlights } />
                <SearchResult flights={ this.state.flights } />
            </div>

        );
    }
}

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {from: '', to: ''}
        this._handleInputFrom = this._handleInputFrom.bind( this );
        this._handleInputTo = this._handleInputTo.bind( this );
        this._handleSubmit = this._handleSubmit.bind( this );
    }
    _handleInputFrom(event) {
        this.setState({from: event.target.value.toUpperCase()})
    }

    _handleInputTo(event) {
        this.setState({to: event.target.value.toUpperCase()})
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.from, this.state.to);
    }
    render() {
        return(
            <div>
            <form onSubmit={ this._handleSubmit }>
                <input type="search" placeholder="from" required onInput={ this._handleInputFrom } defaultValue="" />
                <input type="search" placeholder="to" required onInput={ this._handleInputTo } defaultValue="" />
                <input type="submit" value="search" />
            </form>
            </div>
        );
    }
}
class SearchResult extends Component {
    render() {
        return(
            <div>
                <h3>Flight Search Results</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Flight</th>
                            <th>From</th>
                            <th> > </th>
                            <th>To</th>
                            <th>Plane</th>
                        </tr>
                    </thead>
                    {this.props.flights.map( (flight) =>
                    <tbody key={flight.id + 1}>
                        <tr key={flight.id + 2}>
<<<<<<< HEAD
                            <td align="center" key={flight.id + 3}>{flight.date}</td>
                            <td align="center" key={flight.id + 4}><a href={ 'http://localhost:3001/#/flight/' + flight.id }>{flight.flight_num}</a></td>
                            <td align="center" key={flight.id + 5}>{flight.from}</td>
                            <td align="center" key={flight.id + 6}> > </td>
                            <td align="center" key={flight.id + 7}>{flight.to}</td>
                            <td align="center" key={flight.id + 8}>{flight.airplane_id}</td>
=======
                            <td key={flight.id + 3}>{flight.date}</td>
                            <td key={flight.id + 4}><Link to={ '/flight/' + flight.id }>{flight.flight_num}</Link></td>
                            <td key={flight.id + 5}>{flight.from}</td>
                            <td key={flight.id + 6}> > </td>
                            <td key={flight.id + 7}>{flight.to}</td>
                            <td key={flight.id + 8}>{flight.airplane_id}</td>
>>>>>>> bbc0e413b8bb11f29537eb1600c67537bafe7c2a
                        </tr>
                    </tbody>

                )}
                </table>


            </div>
        );
    }
}

export default Search;
