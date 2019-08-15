import React, { Component } from 'react';
import User from './User'
import axios from 'axios';

const SERVER_URL = 'https://crashtasticairlines.herokuapp.com/users.json';

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let user_id = 0;
        let userDetail = null;
        axios.get(SERVER_URL).then((results) => {
            const userslist = results.data;
            console.log(this.state.name);
            console.log(userslist);
            for (let i=0; i<userslist.length; i++) {
                if (userslist[i].name === this.state.name) {
                  user_id = userslist[i].id;
                  userDetail = userslist[i];
                  break;
                }
                else {
                  console.log('please sign up');
                  let urlstr = window.location.href;
                if (urlstr.includes("#")) {
                    urlstr = urlstr.split("#")[0] + "#/Signup"
                }

                window.location.replace(urlstr);
                //return (<SignUp />)
                }
            }
            console.log(user_id);
            if ( user_id > 0 ) {
                console.log("Sign_in=" + userDetail.name);
                //user id found
                //direct to homepage
                User.setName(userDetail.name);
                User.setUserId(user_id);
                User.setAdmin(userDetail.admin);

                //http://localhost:3000/#/home
                let urlstr = window.location.href;
                if (urlstr.includes("#")) {
                    urlstr = urlstr.split("#")[0] + "#/"
                }

                window.location.replace(urlstr);
                //return (<Home />)
            }

        });
    }

    render() {
        return(
            <div>
                <h1>Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="name" placeholder="type your name here"
                    onChange={this.handleChange} defaultValue="" />
                </label>
                <br />

                <input type="submit" value="Sign in" />
                </form>
            </div>
        );
    }
}

export default Signin;
