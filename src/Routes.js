import React from 'react';

// HashRouter is strongly preffered to save headaches with deployment.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
import Search from './components/Search';
import BookFlight from './components/BookFlight';
import Test from './components/Test';
import UserProfile from './components/UserProfile';
import Users from './components/Users';
import Navbar from './components/NavBar';

// Not a functional component. It's just a collection of JSX.
const Routes = (
    <Router>
    <Navbar />
        <div>
            <Route exact path="/" component={ Home } />
            <Route exact path="/user" component={ User } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/flights" component={ Test } />
            <Route path="/flight/:id" component={ BookFlight } />
            <Route exact path="/users" component={ Users } />
            <Route path="/user/:id" component={ UserProfile } />
        </div>
    </Router>
);

export default Routes;
