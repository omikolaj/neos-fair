import React from 'react';
import Auth from '../../containers/Auth/Auth';
import classes from './Welcome.css'

const welcome = () => {
    return (
      <div className={classes.Welcome}>
        <h1>Welcome to Neos Fair</h1>
        <Auth />
      </div>
    );
}

export default welcome;