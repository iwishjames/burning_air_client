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
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';



// Not a functional component. It's just a collection of JSX.
const Routes = (
    <Router>
        <div>
            <Route exact path="/" component={ Home } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/signin" component={ Signin } />
            <Route exact path="/signout" component={ Signout } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/flights" component={ Test } />
            <Route exact path="/admin/airplanes" component={ Airplanes } />
            <Route exact path="/admin/flights" component={ Flights } />
            <Route path="/flight/:id" component={ BookFlight } />
        </div>
    </Router>
);

export default Routes;
