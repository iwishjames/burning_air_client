import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return(
      <div>
            <Link to="/user">Sign Up</Link>  |
            <Link to="/search">Search flight</Link>  |
            <Link to="/flights">All flights</Link>  |
            <Link to="/users">All users</Link>  |

            <Link to="/admin">Admin</Link>  |
            <Link to="/admin/airplanes">Create Airplane</Link>  |
            <Link to="/admin/flights">Create flight</Link>
      </div>
    );
  }
}

export default NavBar;
