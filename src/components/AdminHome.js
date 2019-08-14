import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to CrashTastic Airlines, what would you like to do today?</h2>
            <p><Link to="/admin/flights">Create a Flight</Link></p>
            <p><Link to="/admin/airplanes">Create an Airplane</Link></p>
        </div>
    )
};

export default Home;
