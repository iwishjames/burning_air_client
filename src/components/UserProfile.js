import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // set the name of the user in _handleInput
      user: "",
      hasLoaded: false,
    };

    // use this URL to query using axios below
    const SERVER_URL = 'http://localhost:3000/users/' + this.props.match.params.id + '.json';

    const fetchUser = () => {axios.get(SERVER_URL)
        .then((results) => {
          this.setState({
            user: results.data,
            hasLoaded: true});
            setTimeout(fetchUser, 4000);
        })};
    fetchUser();
  }

  render() {
    if (this.state.hasLoaded) {
      return(
        <div>
          <h1>User Profile: { this.state.user.user.name }</h1>
          <p>name: { this.state.user.user.name }</p>
          <p>admin: { this.state.user.user.is_admin ? "true" : "false" }</p>
          <p>flights:
            <ul>
            { this.state.user.user.flights.map((flight) => {
              return <li><a href={ 'http://localhost:3001/#/flight/' + flight.id }>Flight: { flight.from } > { flight.to }, Seat: { flight.reservation_column }{ flight.reservation_row }</a></li>
            }) }
            </ul>

          </p>
        </div>
      );
    }
    else {
      return  <div>loading...</div>
    }
  }
}

export default UserProfile;
