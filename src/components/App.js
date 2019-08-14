import React from 'react';

import Home from './Home';
import Search from './Search';
// import Test from './Test';
import User from './User';
import BookFlight from './BookFlight';
import Airplanes from './Airplanes';
import Flights from './Flights';


import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Home />
      <User />
      <Search />
      {/* <Test /> */}
    </div>
  );
}

export default App;
