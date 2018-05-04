import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AdDetails from '../AdDetails/AdDetails';
import {Route} from 'react-router-dom';
import Ad from '../../components/Ad/Ad';


class Ads extends Component {
  state = {
    ads: []
  }

  componentDidMount(){
    
  }

  render(){
    return (
      <div>Ads</div>
    )
  }  
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = () => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
