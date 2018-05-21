import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';

class Account extends Component {

  componentDidMount(){
    this.props.fetchUserInfo(this.props.userID)
  }

  render() {
    
    return (
      <div className={classes.Account}>
        <h1>Account</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // userInfo: state.userInfo.user,
    // pastOrders: state.userInfo.pastOrders,
    // ads: state.userInfo.user.ads
    userID: state.auth.userID
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    fetchUserInfo: (userID) => dispatch(actions.fetchUserInfo(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Account);
