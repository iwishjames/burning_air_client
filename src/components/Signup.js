import React, { Component } from 'react';
import axios from 'axios';


// use this URL to query using axios below
const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/flights.json';

class Signup extends Component {
  constructor () {
    super();
    this.state = {
      // set the name of the user in _handleInput
      name: "",
      is_admin: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputAdmin = this._handleInputAdmin.bind(this);
  }

  // when the form is submitted, make a post request to the backend to create a user.
  _handleSubmit (event) {
    event.preventDefault();
    axios.post(SERVER_URL, { name: this.state.name, is_admin: this.state.is_admin }).then((result) => {
      // clear the form
      // TODO: handle the user in rails. How does this state persist?
      console.log(result);
      let urlstr = window.location.href;
      if (urlstr.includes('#')) {
        urlstr = urlstr.split('#')[0] + '#/'
      }
      window.location.replace(urlstr);
    });
  }

  // as you change the input field, update the state.name to reflect
  _handleInputName (event) {
    this.setState({name: event.target.value})
  }
  _handleInputAdmin () {
    this.setState({is_admin: true});
  }
    
  render() {
      return(
        <div>
          <h1>Sign up</h1>
          <form onSubmit={ this._handleSubmit } action="/">
          <label>
            Name:
            <input name="name" type="text" placeholder="type your name here" required onInput={ this._handleInputName } defaultValue=""/>
          </label>
          <br />
          <label>
          Is admin:
          <input name="is_admin"
            type="checkbox"
            onClick={this._handleInputAdmin} defaultChecked={this.state.is_admin} />
          </label>
          <br />
          <input type="submit" value="Sign up" />
          </form>
        </div>
      );
  }
}


export default Signup;
