import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import AdDetails from '../../../containers/AdDetails/AdDetails';

const adPosted = (props) => {
  let adPosted = <Redirect to={'/ads/new'}/>;
  if(this.props.adID || this.props.error){
  
    const postedAdRedirect = this.state.posted ? <Redirect to={`/ads/` + this.props.adID} /> : null ;
    adPosted = (
      <div>
        {postedAdRedirect}
        {this.props.message}
        <Route exact path={`/ads/${this.props.adID}`} component={AdDetails}/>
      </div>
     )
   }
  return (
    {adPosted}
  )
}

export default adPosted;