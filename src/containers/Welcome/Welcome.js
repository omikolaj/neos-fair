import React, {Component} from 'react';
import {connect} from 'react-redux';

class Welcome extends Component {
  render(){
    return (
      <h1>Home</h1>
    );
  }
}

export default connect(null,null)(Welcome)