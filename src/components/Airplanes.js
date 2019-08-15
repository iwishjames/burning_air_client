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
      name: "",
      rows: "",
      columns: "",
      // hasLoaded to check whether the API request has completed before rendering below
      hasLoaded: false
    };
    this.saveAirplane = this.saveAirplane.bind(this);
    this._handleChangeName = this._handleChangeName.bind(this);
    this._handleChangeRows = this._handleChangeRows.bind(this);
    this._handleChangeColumns = this._handleChangeColumns.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

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

    saveAirplane(name, rows, columns) {
      axios.post(SERVER_URL, {
        name: name,
        rows: rows,
        columns: columns,
      }).then((result) => {

        this.setState({airplanes: [... this.state.airplanes,
        result.data]})
      });
    }

  _handleSubmit(event) {
    event.preventDefault();
    this.saveAirplane(this.state.name, this.state.rows, this.state.columns);
    this.setState( {
      name: "",
      rows: "",
      columns: "",
    }); // Reset the form.

  }

  _handleChangeName(event){
    this.setState( { name: event.target.value } );
  }

  _handleChangeRows(event){
    this.setState( { rows: event.target.value } );
  }

  _handleChangeColumns(event){
    this.setState( { columns: event.target.value } );
  }







  render() {
    const plane = this.state.airplanes;
    const divItemFree = {
      borderRadius: "3px",
      border: "1px solid #ccc",
      backgroundColor: "#eee",
      color: "#555",
      margin: "1px",
      textAlign: "center",
      padding: "8px",
      cursor: "pointer",
    }
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

      return(
          <div>
              <h1>Create a New Airplane</h1>
              <form onSubmit={this._handleSubmit}>
                <label for="name">Name: </label>
                <input onChange={this._handleChangeName} value={this.state.name} type="text" name="name" placeholder="name" required/>

                <label for="rows">Rows: </label>
                <input onChange={this._handleChangeRows} value={this.state.rows} type="number" name="rows" placeholder="5" required/>

                <label for="columns">Columns: </label>
                <input onChange={this._handleChangeColumns}
                value={this.state.columns} type="number" name="columns" placeholder="43" required/>

                <input type="submit" value="Create" />
              </form>
              <h2>All Airplanes</h2>
                { this.state.airplanes.map((airplane) => {
                  const divGrid = {
                    display: "grid",
                    gridTemplateColumns: "repeat(" + airplane.columns + ", auto)",
                    gridTemplateRows: "repeat(" + airplane.rows + ", auto)",
                    minWidth: "300px",
                    minHeight: "300px",

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
                   return <div>
                    <p> Airplane {airplane.name}: rows {airplane.rows} columns {airplane.columns}</p>
                    <div style={divGrid}>
                      { seatArray.map((s) => <div style={ divItemFree }>{s}</div>) }
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
