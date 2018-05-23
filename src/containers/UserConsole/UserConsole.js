import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as action from '../../store/actions/index';

class UserConsole extends Component {
  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
  }

  render(){
    let userAds = null;


    return (
      <div className={classes.UserConsole}>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAds: state.userConsole.userAds,
    userOrders: state.userConsole.userOrders,
    loading: state.userConsole.loading,
    error: state.userConsole.error,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAds: (userID) => dispatch(action.fetchUserAds(userID)),
    fetchUserOrders: (userID) => dispatch(action.fetchUserOrders(userID))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);