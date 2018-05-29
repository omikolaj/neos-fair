import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import UserAd from '../../components/EditInfo/UserAd/UserAd';
import Loader from '../../components/UI/Loader/Loader';
import cuid from 'cuid';
import UserAds from './UserAds/UserAds';
import UserOrders from './UserOrders/UserOrders';


class UserConsole extends Component {
  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);