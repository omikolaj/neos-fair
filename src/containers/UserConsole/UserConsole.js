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

  removeUserAdHandler = (adID) => {
    this.props.removeUserAd(this.props.userID, adID)
  }

  changeAdStatusHandler = (adID) => {
    this.props.changeAdStatus(this.props.userID,adID)
  }

  render(){
    let userAds = null;   
    let userOrders = null;
    if((!this.props.loading) && this.props.error == null){
      userAds = (
        
          <UserAds publishClicked={this.changeAdStatusHandler} removeClicked={this.removeUserAdHandler}/>
              
      )
      userOrders = (
        
          <UserOrders />
        
      )
    }
    
    // if(this.props.loading){
    //   const loading = <Loader />
    // }

    const userAdsAndOrders = (
      <Aux>
        {userAds}
        {userOrders}
      </Aux>
    )
    
    return (
      <div className={classes.UserConsole}>        
          {!this.props.loading ? userAdsAndOrders : <Loader />}          
          {/* {userAds} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {        
    loading: state.userConsole.consoleLoading,
    error: state.userConsole.error,
    userID: state.auth.userID,    
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