import React, { Component } from 'react';
import axios from 'axios';

// use this URL to query using axios below
const SERVER_URL = 'http://localhost:3000/users.json';

class Users extends Component {
  constructor () {
    super();
    this.state = {
      // the flights are loaded using axios below
      users: [],
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

  // fetch the flights from the database every 4 seconds, save into state.flights to be used in render
  const fetchUsers = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({
        users: results.data,
        hasLoaded: true});
      setTimeout(fetchUsers, 4000);
      })
    };
    fetchUsers();
  }

  render() {
      return(
          <div>
              <h1>Crapping Airline</h1>
              <h2>All Users</h2>
                <p>{ this.state.users.map((user) => <p><a href={ 'http://localhost:3001/#/user/' + user.id }>{user.name}, admin: { user.is_admin ? "true" : "false" }</a></p>)}
                </p>
          </div>
      );
  }
}

export default Users;
