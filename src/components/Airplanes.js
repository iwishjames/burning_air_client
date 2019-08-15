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
    const background = '../images/chair_empty.png';
    const divItemFree = {
      borderRadius: "3px",
      border: "1px solid #ccc",
      backgroundColor: "#eee",
      backgroundImage: "url(" + background + ")",

      color: "#555",
      margin: "1px",
      textAlign: "center",
      padding: "8px",
      cursor: "pointer"
    }
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

      return(
          <div>
              <h1>Creat a New Airplane</h1>
              <form>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" placeholder="name" />

                <label htmlFor="rows">Rows: </label>
                <input type="number" id="rows" placeholder="5" />

                <label htmlFor="columns">Columns: </label>
                <input type="number" id="columns" placeholder="43" />

                <input type="submit" value="Create" />
              </form>
              <h2>All Airplanes</h2>
                { this.state.airplanes.map((airplane) => {
                  const divGrid = {
                    display: "grid",
                    gridTemplateColumns: "repeat(" + airplane.columns + ", auto)",
                    gridTemplateRows: "repeat(" + airplane.rows + ", auto)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    minHeight: "300px",
                    maxHeight: "400px",
                  };
                  let seatArray = [];
                  let seats = airplane.rows * airplane.columns;
                  for (let i=0; i < airplane.rows; i++) {
                    for (let j=1; j < airplane.columns + 1; j++) {
                      seatArray.push(j + alphabet[i]);
                    }

                  }
                  let seatFillers = [];
                  for (let i=0; i < seats; i++) {
                    seatFillers.push(i);
                  }
                   return <div key={airplane.id}>
                    <p> Airplane {airplane.name}: rows {airplane.rows} columns {airplane.columns}</p>
                    <div style={divGrid}>
                      { seatArray.map((s) => <div key={s} style={ divItemFree }>{s}</div>) }
                    </div>
                  </div>
                })}
          </div>
      );
  }
}


// class SeatDiagram extends Component {
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
// }


export default Airplanes;
