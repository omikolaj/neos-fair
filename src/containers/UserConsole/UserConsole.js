import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import UserAds from './UserAds/UserAds';
import UserOrders from './UserOrders/UserOrders';

class UserConsole extends Component {

  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
  }

  componentWillUnmount(){
    this.props.clearPurchaseState()
  }

  render(){
    let userAdsAndOrders = (
      <Aux>
        <UserAds userID={this.props.userID} />
        <UserOrders userID={this.props.userID} />
      </Aux>
    )

    if(this.props.loading){
      userAdsAndOrders = null;
    }
    
    if(this.props.error){
      userAdsAndOrders = 
      <p>{this.props.error.error}</p>
    }
    
    return (
      <div className={classes.UserConsole}>        
          {userAdsAndOrders}          
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {        
    loading: state.userConsole.userAdsLoading && state.userConsole.userOrdersLoading,
    error: state.userConsole.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAds: (userID) => dispatch(actions.fetchUserAds(userID)),
    fetchUserOrders: (userID) => dispatch(actions.fetchUserOrders(userID)),
    clearPurchaseState: () => dispatch(actions.clearPurchaseState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);