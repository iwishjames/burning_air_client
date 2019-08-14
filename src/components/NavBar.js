import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return(
      <div>
        <ul>
            <li><Link to="/user">Log in</Link></li>
            <li><Link to="/search">Search flight</Link></li>
            <li><Link to="/flights">All flights</Link></li>
            <li><Link to="/users">All users</Link></li>

            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/admin/airplanes">Create Airplane</Link></li>
            <li><Link to="/admin/flights">Create flight</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
