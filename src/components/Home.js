import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/user">Log in</Link></li>
                    <li><Link to="/search">Search flight</Link></li>
                    <li><Link to="/flights">All flights</Link></li>

                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/admin/airplane">Create Airplane</Link></li>
                    <li><Link to="/admin/flight">Create flight</Link></li>
                </ul>
            </nav>


            <h2>Welcome to CrashTastic Airline </h2>
        </div>
    )
};

export default Home;
