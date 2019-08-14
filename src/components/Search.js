import React, { Component } from 'react';
import axios from 'axios';


const SERVER_URL = 'http://localhost:3000/flights.json';

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

        //   this.setState({
        //     flights: results.data,
        //     hasLoaded: true});
        //   setTimeout(fetchFlights, 4000);
          })
        };
        // fetchFlights();

    render() {
        return(
            <div>
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
        this.setState({from: event.target.value})
    }

    _handleInputTo(event) {
        this.setState({to: event.target.value})
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.from, this.state.to);
        // this.setState({from: ''});
        // this.setState({to: ''});
    }
    render() {
        return(
            <form onSubmit={ this._handleSubmit }>
                <input type="search" placeholder="from" required onInput={ this._handleInputFrom } defaultValue="" />
                <input type="search" placeholder="to" required onInput={ this._handleInputTo } defaultValue="" />
                <input type="submit" value="search" />
            </form>
        );
    }
}
class SearchResult extends Component {
    render() {
        return(
            <div>
                <p>Flight Search Result coming</p>
                <p>{this.props.flights.map( (flight) => <p>{flight.date} {flight.from} {flight.to}</p>)}</p>

            </div>
        );
    }
}

export default Search;
