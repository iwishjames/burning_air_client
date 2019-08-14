import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
    render() {
        return(
            <div>
                <h1>Crapping Airline</h1>
                <SearchForm />
                <SearchResult />
            </div>

        );
    }
}

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {from: '', to: ''}
        this._handleInput = this._handleInput.bind( this );
        this._handleSubmit = this._handleSubmit.bind( this );
    }
    _handleInput(event) {
        this.setState({from: event.target.value})
        this.setState({to: event.target.value})
    }
    _handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return(
            <form onSubmit={ this._handleSubmit }>
                <input type="text" placeholder="from" required onInput={ this._handleInput } />
                <input type="text" placeholder="to" required onInput={ this._handleInput } />
                <input type="submit" ></input>
            </form>
        );
    }
}
class SearchResult extends Component {
    render() {
        return(
            <div>
                <p>Flight Search Result coming</p>
            </div>
        );
    }
}
export default Search;
