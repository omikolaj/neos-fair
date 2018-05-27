import React, {PureComponent, Component} from 'react';
import {connect} from 'react-redux';
import UserAd from '../../../components/EditInfo/UserAd/UserAd';
import classes from './UserAds.css';

class UserAds extends Component {

  render(){
    let userAds = this.props.userAds.map(ad => {
      const info = ad.published ? 'Your ad has been published' : 'Your ad has been unpublished';
      return ( 
        <UserAd key={ad.id} message={this.props.updatedAdID === ad.id ? info : null} updatedAdID={this.props.updatedAdID} published={ad.published} title={ad.title} adID={ad.id} publishClicked={this.props.publishClicked} removeClicked={this.props.removeClicked}/>
      )
    })
    
    if(this.props.userAds.length === 0){
      userAds = (
        <p>You have no posted ads</p>
      )
    }

    return (
      <div className={classes.UserAds}>
        {userAds}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAds: state.userConsole.userAds,
    updatedAdID: state.userConsole.updatedAdID
  }
}

export default connect(mapStateToProps, null)(UserAds);
