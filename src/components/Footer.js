import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    const footerStyle = {
      padding: "50px 0 30px 0",
      color: "grey",
      fontSize: "12px",
      textAlign: "center",
    }
    return(
      <div style={footerStyle}>
        "Thank you" for booking your flights with us.
      </div>
    );
  }
}

export default Footer;
