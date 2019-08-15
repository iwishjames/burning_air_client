import React from 'react';

import Home from './Home';
import Search from './Search';
// import Test from './Test';
import Signup from './Signup';
import BookFlight from './BookFlight';
import Airplanes from './Airplanes';
import Flights from './Flights';


import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Home />
      <Signup />
      <Search />
      {/* <Test /> */}
    </div>
  );
}

export default App;
