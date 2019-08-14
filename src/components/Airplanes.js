import React, { Component } from 'react';
import axios from 'axios';

// use this URL to query using axios below
const SERVER_URL = 'http://localhost:3000/airplanes.json';


class Airplanes extends Component {
  constructor () {
    super();
    this.state = {
      // the airplanes are loaded using axios below
      airplanes: [],
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

  // fetch the airplanes from the database every 4 seconds, save into state.airplanes to be used in render
  const fetchAirplanes = () => {
    axios.get(SERVER_URL).then((results) => {
      // console.log(results.data[0]);
      this.setState({
        airplanes: results.data,
        hasLoaded: true});
      setTimeout(fetchAirplanes, 4000);
      })
    };
    fetchAirplanes();
  }

  render() {
    const plane = this.state.airplanes;

    const divGrid = {
      display: "grid",
      color: "pink",
      gridTemplateColumns: "repeat(" + plane.column + ", 1fr)",
      gridTemplateRows: "repeat(" + plane.rows + ", 1fr)",
      backgroundColor: "black"
    };
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

      return(
          <div>
              <h1>All Airplanes</h1>
                { this.state.airplanes.map((airplane) =>
                  <div>
                    <p> Airplane {airplane.name}: rows {airplane.rows} columns {airplane.columns}</p>
                    <div class="row_limit">
                      rows
                      <div class="colmn_limit seatDiagram">
                      columns
                      </div>
                    </div>
                  </div>
                )}
          </div>
      );
  }
}


// class SeatDiagram extends Component {
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
// }


export default Airplanes;
