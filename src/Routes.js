import React from 'react';

// HashRouter is strongly preffered to save headaches with deployment.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Search from './components/Search';
import BookFlight from './components/BookFlight';
import Test from './components/Test';
import UserProfile from './components/UserProfile';
import Users from './components/Users';
import Navbar from './components/NavBar';
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';
import AdminHome from './components/AdminHome';
import Footer from './components/Footer';


// Not a functional component. It's just a collection of JSX.
const Routes = (
    <Router>
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center"
    }}>
      <Navbar />
          <div>
              <Route exact path="/" component={ Home } />
              <Route exact path="/signup" component={ Signup } />
              <Route exact path="/signin" component={ Signin } />
              <Route exact path="/signout" component={ Signout } />
              <Route exact path="/search" component={ Search } />
              <Route exact path="/flights" component={ Test } />
              <Route exact path="/admin" component={ AdminHome } />
              <Route exact path="/admin/airplanes" component={ Airplanes } />
              <Route exact path="/admin/flights" component={ Flights } />
              <Route path="/flight/:id" component={ BookFlight } />
              <Route exact path="/users" component={ Users } />
              <Route path="/user/:id" component={ UserProfile } />
          </div>
        <Footer />
      </div>
    </Router>
);

export default Routes;
