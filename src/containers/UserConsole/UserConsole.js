import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserConsole.css';
import * as action from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import UserAd from '../../components/EditInfo/UserAd/UserAd';
import Loader from '../../components/UI/Loader/Loader';
import cuid from 'cuid';

class UserConsole extends Component {
  componentDidMount(){
    this.props.fetchUserAds(this.props.userID)
    this.props.fetchUserOrders(this.props.userID)
  }

  removeUserAdHandler = (adID, userID) => {
    this.props.removeUserAd(userID, adID)
  }

  changeAdStatusHandler = (userID, adID) => {
    this.props.changeAdStatus(userID,adID)
  }

  render(){
    let usrAds = null; 
    let info = '';   
    if((!this.props.loading) && this.props.userAds.length > 0){
      usrAds = this.props.userAds.map(ad => {
        info = this.props.updatedAdID === ad.id ? <span>{ad.title} has been updated</span> : null;
        const message = ad.published ? 'Ad has been published' : 'Ad has been unpublished';
        return <div key={ad.id ? ad.id : 0} className={classes.UserAds}>
          <UserAd title={ad.title} published={ad.published} message={this.props.updatedAdID === ad.id ? message : null}/>
          <Button btnType="RemoveButton" clicked={(userID, adID) => this.removeUserAdHandler(ad.id, this.props.userID)}>Remove</Button>
          <Button btnType="PublishButton" clicked={(adID) => this.changeAdStatusHandler(this.props.userID ,ad.id)}>{ad.published ? 'Unpublish' : 'Publish'}</Button>
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
        <h2 className={classes.PostedAds}>Posted Ads</h2>
          <div className={classes.Info}>
            {this.props.updatedAdID ? info : null}
          </div>
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
    userID: state.auth.userID,
    updatedAdID: state.userConsole.updatedAdID
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