import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AdDetails from '../AdDetails/AdDetails';
import {Route} from 'react-router-dom';
import Ad from '../../components/Ad/Ad';
import * as actions from '../../store/actions/index';
import classes from './Ads.css'


class Ads extends Component {
  state = {
    loading: false,    
  }

  componentDidMount(){    
    this.props.fetchAds();
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.ads.length === this.props.ads.length ? false : true;  
  }

  adSelectedHandler = (id) => {
    this.props.history.push({pathname: '/ads/' + id})
  }

  render(){
    const ads = this.props.ads.map(ad => {
      return (
        <Ad 
          key={ad.id}
          title={ad.title}
          type={ad.type}
          user={ad.user.username}
          clicked={() => this.adSelectedHandler(ad.id)}
        />
      )
    })
    return (
      <div className={classes.Ads}>
        {ads}
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    ads: state.ads.ads,
    loading: state.ads.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAds: () => dispatch(actions.fetchAds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
