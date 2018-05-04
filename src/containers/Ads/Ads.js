import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AdDetails from '../AdDetails/AdDetails';
import {Route} from 'react-router-dom';
import Ad from '../../components/Ad/Ad';
import * as actions from '../../store/actions/index';


class Ads extends Component {
  state = {
    ads: []
  }

  componentDidMount(){
    this.props.fetchAds();
  }

  render(){
    return (
      <div>Ads</div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAds: () => dispatch(actions.fetchAds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
