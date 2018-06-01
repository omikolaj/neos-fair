import React from 'react';
import Auth from '../../containers/Auth/Auth';
import classes from './Welcome.css'

const welcome = () => {
    return (
      <div className={classes.Welcome}>
        <h1>Welcome to Neos Fair!</h1>
        <section className={classes.Info}>
          <p>At Neos Fair you can buy and sell new or used items. It's an easy way to make few extra bucks. Login or Sign up to and get started today!</p>
        </section>
        <Auth />
      </div>
    );
}

export default welcome;