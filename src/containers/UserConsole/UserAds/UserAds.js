import React, {PureComponent, Component} from 'react';
import {connect} from 'react-redux';
import UserAd from '../../../components/EditInfo/UserAd/UserAd';
import classes from './UserAds.css';
import Aux from '../../../hoc/Aux/Aux';
import UserOrders from '../UserOrders/UserOrders';
import * as action from '../../../store/actions/index';
import Loader from '../../../components/UI/Loader/Loader';

class UserAds extends Component {


  

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
          publishClicked={this.props.publishClicked} 
          removeClicked={this.props.removeUserAdHandler}/>
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
    // fetchUserAds: (userID) => dispatch(action.fetchUserAds(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAds);
