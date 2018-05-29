import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import Ad from '../../components/Ad/Ad';
import * as actions from '../../store/actions/index';
import classes from './Ads.css'
import Loader from '../../components/UI/Loader/Loader';


class Ads extends Component {

  componentDidMount(){
    this.props.fetchAds();
  }

  adSelectedHandler = (id) => {
    this.props.history.push({pathname: '/ads/' + id})
  }

  render(){
    let ads = <Loader />;
    if(!this.props.loading){
      ads = this.props.ads.map(ad => {
        return (
          <Ad 
            key={ad.id}
            title={ad.title}
            description={ad.description}
            type={ad.type}
            user={ad.user.username}
            clicked={() => this.adSelectedHandler(ad.id)}
          />
        )
      })      
    }
    return (
      <div>
        <h1>Currently Posted Ads</h1>
        <section className={classes.Ads}>
          {ads}
        </section>      
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
    fetchAds: (token) => dispatch(actions.fetchAds(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
