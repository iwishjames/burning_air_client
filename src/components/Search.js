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
                <h1>🔥 Welcome to CrashTastic Airlines! 🔥 </h1>
                <p>Where are we <i>"flying"</i> to today?</p>
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
                            <th width="20%">Date</th>
                            <th width="20%">Flight</th>
                            <th width="20%">From</th>
                            <th width="20%">  </th>
                            <th width="20%">To</th>
                            <th width="20%">Plane</th>
                        </tr>
                    </thead>
                    {this.props.flights.map( (flight) =>
                    <tbody key={flight.id + 1}>
                        <tr key={flight.id + 2}>
                            <td align="center" key={flight.id + 3}>{flight.date}</td>
                            <td align="center" key={flight.id + 4}><Link to={ '/flight/' + flight.id }>{flight.flight_num}</Link></td>
                            <td align="center" key={flight.id + 5}>{flight.from}</td>
                            <td align="center" key={flight.id + 6}> ✈ </td>
                            <td align="center" key={flight.id + 7}>{flight.to}</td>
                            <td align="center" key={flight.id + 8}>{flight.airplane_id}</td>
                        </tr>
                    </tbody>

                    )}
                </table>


            </div>
        );
    }
}

export default Search;
