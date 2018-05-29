import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as action from '../../store/actions/index';
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

  changeAdStatusHandler = (adID) => {
    this.props.changeAdStatus(this.props.userID,adID)
  }

  removeUserAdHandler = (adID) => {
    this.props.removeUserAd(this.props.userID, adID)
  }

  render(){
    let userAdsAndOrders = (
      <Aux>
        <UserAds userID={this.props.userID} publishClicked={this.changeAdStatusHandler} removeClicked={this.removeUserAdHandler}/>
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
    fetchUserAds: (userID) => dispatch(action.fetchUserAds(userID)),
    fetchUserOrders: (userID) => dispatch(action.fetchUserOrders(userID)),
    removeUserAd: (userID, adID) => dispatch(action.removeUserAd(userID, adID)),
    changeAdStatus: (userID, adID) => dispatch(action.changeAdStatus(userID, adID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);