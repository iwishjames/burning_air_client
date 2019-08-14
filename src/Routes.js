import React from 'react';

// HashRouter is strongly preffered to save headaches with deployment.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
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
            <Route exact path="/user" component={ User } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/flights" component={ Test } />
<<<<<<< HEAD
           
=======
            <Route exact path="/admin/airplanes" component={ Airplanes } />
            <Route exact path="/admin/flights" component={ Flights } />
>>>>>>> cdf5b87f97aeba453a5fcc76b590783a95200a84
            <Route path="/flight/:id" component={ BookFlight } />
        </div>
    </Router>
);

export default Routes;
