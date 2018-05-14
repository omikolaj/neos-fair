import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './AdDetails.css';
import Item from '../../components/Ad/AdItem/AdItem';
import Category from '../../components/Ad/AdCategory/AdCategory';
import Loader from '../../components/UI/Loader/Loader';

class AdDetails extends Component {  

  componentDidMount(){
    this.props.fetchAd(this.props.match.params.id);
  }

  render() {
    let ad = <Loader />;
    if(!this.props.loading){
      ad = (
        <div className={classes.AdDetails}>
          <h1>{this.props.ad.title}</h1>
          <p>{this.props.ad.description}</p>
          <span>{this.props.ad.user.username}</span>
          <Item title={this.props.ad.item.title}/>
          <Category name={this.props.ad.category.name} />
      </div>
      )
    }
    return (
      ad
    )       
  }
}

const MapStateToProps = (state) => {
  return {
    ad: state.ads.ad,
    loading: state.ads.loading
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    fetchAd: (id) => dispatch(actions.fetchAd(id))
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(AdDetails);