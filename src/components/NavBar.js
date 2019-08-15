import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return(
      <div>
            <Link to="/signup">Sign up</Link>  |
            <Link to="/signin">Sign In</Link>  |
            
            <Link to="/search">Search flight</Link>  |
            <Link to="/flights">All flights</Link>  |
            <Link to="/users">All users</Link>  |

            <Link to="/admin">Admin</Link>  |
            <Link to="/admin/airplanes">Create Airplane</Link>  |
            <Link to="/admin/flights">Create flight</Link> |

            <Link to="/signout">Sign Out</Link>  
      </div>
    );
  }
}

export default NavBar;
