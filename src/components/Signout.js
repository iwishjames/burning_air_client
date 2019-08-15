import React, { Component } from 'react';
import User from './User';

class Signout extends Component {
    constructor() {
        super();

    User.setName('');
    User.setUserId(-1);
    User.setAdmin(false);

    }
    render() {
        return(
            <div>
                <h1>Thank you for booking CrashTastic Airline</h1>
                <h2>I'm sure you will have a good flight...</h2>
                <h3>See you next time...</h3>
            </div>
            
        );
    }
}
export default Signout;