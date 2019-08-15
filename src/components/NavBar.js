import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class NavBar extends Component {
  render() {
    return(
      <div class="NavBar">
            <Link to="/signup"> Sign up</Link>  |
            <Link to="/signin"> Sign In</Link>  |

            <Link to="/search"> Search flight</Link>  |
            <Link to="/flights"> All flights</Link>  |
            <Link to="/users"> All users</Link>  | 🔥🔥🔥
            <Link to="/signout"> Sign Out, {localStorage.name}</Link>
            <p>
            <Link to="/admin"> Admin</Link> |
            <Link to="/admin/airplanes"> Create Airplane</Link>  |
            <Link to="/admin/flights"> Create flight</Link>
            </p>
      </div>
    );
  }
}

export default NavBar;
