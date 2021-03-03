import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    return(
        <div>
            Home
            <Link to="/example1Page">
                Example1
            </Link>
            <Link to="/example2Page">
                Example2
            </Link>
            <Link to="/example3Page">
                Example3
            </Link>
            <Link to="/example4Page">
                Example4
            </Link>
        </div>
    )
}

export default Home