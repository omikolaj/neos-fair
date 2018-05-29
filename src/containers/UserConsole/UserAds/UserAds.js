import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserAd from '../../../components/EditInfo/UserAd/UserAd';
import classes from './UserAds.css';
import Aux from '../../../hoc/Aux/Aux';
import * as actions from '../../../store/actions/index';

class UserAds extends Component {

  componentWillUnmount(){
    this.props.clearUpdatedAdID()
  }

  changeAdStatusHandler = (adID) => {
    this.props.changeAdStatus(this.props.userID,adID)
  }

  removeUserAdHandler = (adID) => {
    this.props.removeUserAd(this.props.userID, adID)
  }

  render(){
    let userAds = null;
    const updatedID = this.props.updatedAdID;
    
    userAds = this.props.userAds.map(ad => {
      const info = ad.published ? 'Your ad has been published' : 'Your ad has been unpublished';
      return ( 
        <UserAd 
          key={ad.id} 
          message={updatedID === ad.id ? info : null}
          updatedAdID={updatedID} 
          published={ad.published} 
          title={ad.title} 
          adID={ad.id} 
          publishClicked={this.changeAdStatusHandler} 
          removeClicked={this.removeUserAdHandler}/>
      )
    })
      
    if(this.props.userAds.length === 0){
      userAds = (
        <p>You have no posted ads</p>
      )
    }    

    return (
      <Aux>
        <h2 className={classes.PostedAds}>Posted Ads</h2>         
        {userAds}     
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.userConsole.error,
    userAds: state.userConsole.userAds,
    updatedAdID: state.userConsole.updatedAdID,
    loading: state.userConsole.userAdsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeUserAd: (userID, adID) => dispatch(actions.removeUserAd(userID, adID)),
    changeAdStatus: (userID, adID) => dispatch(actions.changeAdStatus(userID, adID)),
    clearUpdatedAdID: () => dispatch(actions.clearUpdatedAdID())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAds);
