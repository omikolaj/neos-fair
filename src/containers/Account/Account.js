import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './Account.css';

class Account extends Component {

  componentDidMount(){
    this.props.fetchUserInfo()
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
    userInfo: state.userInfo.user,
    pastOrders: state.userInfo.pastOrders,
    ads: state.userInfo.user.ads
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Account);
