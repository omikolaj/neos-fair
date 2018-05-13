import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import AdDetails from '../AdDetails/AdDetails';

class PostedAd extends Component{

  render(){
    let adPosted = <Redirect to='/ads/new' />
    if(this.props.adId){
      const postedAdRedirect = this.props.posted ? <Redirect to={`/ads/` + this.props.adId} /> : null;      
    }
    return (
      <Aux>
        <h2>{this.props.message}</h2>
        {adPosted}
        <Route exact path={`/ads/${this.props.adId}`} component={AdDetails}/>
      </Aux>
    );
  }
}

const mapStateToprops = (state) => {
  return {
    ad: state.ads.ad,
    adId: state.adBuilder.id,
    message: state.adBuilder.message,
    posted: state.adBuilder.posted    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToprops, mapDispatchToProps)(PostedAd);