import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as action from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';

class UserConsole extends Component {
  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
  }

  render(){
    const userAds = this.props.userAds.map(ad => {
      return <div className={classes.UserAds}>
        <h3>{ad.title}</h3>
        <Button btnType="RemoveButton">Remove</Button>
      </div>
    })

    return (
      <Aux>
        <h2>Posted Ads</h2>
          {userAds}
      </Aux>
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