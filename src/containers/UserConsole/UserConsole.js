import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as action from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import UserAd from '../../components/EditInfo/UserAd/UserAd';
import Loader from '../../components/UI/Loader/Loader';

class UserConsole extends Component {
  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
  }

  shouldComponentUpdate(){
    return true;
  }

  removeUserAdHandler = (adID, userID) => {
    this.props.removeUserAd(userID, adID)
  }

  render(){
    let usrAds = null;    
    if((!this.props.loading) && this.props.userAds.length > 0){
      usrAds = this.props.userAds.map(ad => {
        return <div key={ad.id ? ad.id : 0} className={classes.UserAds}>
          <UserAd title={ad.title} />
          <Button btnType="RemoveButton" clicked={(userID, adID) => this.removeUserAdHandler(ad.id, this.props.userID)}>Remove</Button>
        </div>
      })    
    }
    if(this.props.loading){
      usrAds = <Loader />
    }

    if((!this.props.loading) && this.props.userAds.length === 0){
      usrAds = (
        <p>You have no posted ads</p>
      )
    }
    
    return (
      <div>
        <h2>Posted Ads</h2>
          {usrAds}
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
    fetchUserOrders: (userID) => dispatch(action.fetchUserOrders(userID)),
    removeUserAd: (userID, adID) => dispatch(action.removeUserAd(userID, adID))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);