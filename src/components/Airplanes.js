import React, { Component } from 'react';
import axios from 'axios';

// use this URL to query using axios below
const SERVER_URL = 'http://localhost:3000/airplanes.json';


class Airplanes extends Component {
  constructor () {
    super();
    this.state = {
      // the airplanes are loaded using axios below
      airplane: [],
      airplanes: [],
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };

  // fetch the airplanes from the database every 4 seconds, save into state.airplanes to be used in render
  const fetchAirplanes = () => {
    axios.get(SERVER_URL).then((results) => {
      // console.log(results.data[0]);
      this.setState({
        airplane: results.data[0],
        airplanes: results.data,
        hasLoaded: true});
        console.log(this.state.airplanes[0]);
      setTimeout(fetchAirplanes, 4000);
      })
    };
    fetchAirplanes();
  }

  render() {
      return(
          <div>
              <h1>All Airplanes</h1>
                { this.state.airplanes.map((airplane) =>
                  <p> Airplane {airplane.name}: rows {airplane.rows} columns {airplane.columns}</p>)}

                <Gallery airplane={this.state.airplane}/>
          </div>
      );
  }
}

class Gallery extends Component {

  }

  render() {
    return (
      <div>
        <p>{this.props.airplane.rows}</p>
        <p>{this.props.airplane.columns}</p>
        <div>{this.displayPlane(this.props.airplane.rows, this.props.airplane.columns)}</div>
      </div>
    )
  }
}

// class SeatDiagram extends Component {
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
// }


export default Airplanes;
