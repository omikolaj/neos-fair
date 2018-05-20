import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './Account.css';

class Account extends Component {

  componentDidMount(){
  }

  render() {
    return (
      <div className={classes.Account}>
        <h1>Account</h1>
      </div>
    )
  }
}


export default Account;
