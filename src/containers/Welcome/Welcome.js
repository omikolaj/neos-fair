import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auth from '../Auth/Auth';
import classes from './Welcome.css'

class Welcome extends Component {
  render(){
    return (
      <div className={classes.Welcome}>
        <h1>Welcome to Neos Fair</h1>
        <Auth />
      </div>
    );
  }
}

export default connect(null,null)(Welcome)