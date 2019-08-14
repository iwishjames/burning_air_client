import React from 'react';

// HashRouter is strongly preffered to save headaches with deployment.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
import Search from './components/Search';

// Not a functional component. It's just a collection of JSX.
const Routes = (
    <Router>
        <div>
            <Route exact path="/" component={ Home } />
            <Route exact path="/user" component={ User } />
            <Route exact path="/search" component={ Search } />
        </div>
    </Router>
);

export default Routes;
