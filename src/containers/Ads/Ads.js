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
    ads: []
  }

  componentDidMount(){
    this.props.fetchAds();
  }

  render(){
    const ads = this.props.ads.map(ad => {
      return (
        <p>{ad.title}</p>
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
