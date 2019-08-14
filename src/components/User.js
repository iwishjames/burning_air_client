import React, { Component } from 'react';
import axios from 'axios';


// use this URL to query using axios below
const SERVER_URL = 'http://localhost:3000/users.json';

class User extends Component {
  constructor () {
    super();
    this.state = {
      // set the name of the user in _handleInput
      name: "",
      is_admin: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  // when the form is submitted, make a post request to the backend to create a user.
  _handleSubmit (event) {
    event.preventDefault();
    axios.post(SERVER_URL, { name: this.state.name, is_admin: this.state.is_admin }).then((result) => {
      // clear the form
      // TODO: handle the user in rails. How does this state persist?
      console.log(result);
    });
  }

  // as you change the input field, update the state.name to reflect
  _handleInput (event) {
    this.setState({name: event.target.value});
  }

  render() {
      return(
          <form onSubmit={ this._handleSubmit }>
            Name:
            <input type="text" onInput={ this._handleInput } />
          </form>
      );
  }
}


export default User;
