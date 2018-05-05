import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './AdDetails.css';

class AdDetails extends Component {

  componentDidMount(){
    this.props.fetchAd(this.props.match.params.id);
  }

  render() {
    return (
      <div>Test</div>
    )    
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    fetchAd: (id) => dispatch(actions.fetchAd(id))
  }
}

const MapStateToProps = (state) => {
  return {
    ad: state.ads
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(AdDetails);