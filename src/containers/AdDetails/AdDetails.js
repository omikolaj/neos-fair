import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import classes from './AdDetails.css';
import Item from '../../components/Ad/AdItem/AdItem';
import Category from '../../components/Ad/AdCategory/AdCategory';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Ad/OrderSummary/OrderSummary';
import FlashMessage from '../Utils/FlashMessage/FlashMessage';

class AdDetails extends Component {
  state={
    purchasing: false
  }

  componentDidMount(){
    this.props.fetchAd(this.props.match.params.id);
  }

  buyHandler = () => {
    this.setState({purchasing: true})
  }

  buyCancelHandler = () => {
    this.setState({purchasing: false})
  }

  payHandler = () => {
    this.setState({purchasing: false});
    const payData = {userID: this.props.userID, adID: this.props.ad.id, price: this.props.ad.ad_item.price}
    this.props.pay(payData)
  }

  render() {
    let ad = <Loader />;
    let orderSummary = null;
    if(!this.props.loading){
      ad = (
        <div className={classes.AdDetails}>
          <h1>{this.props.ad.title}</h1>
          <p>{this.props.ad.description}</p>
          <span>{this.props.ad.user.username}</span>
          <h3>${parseFloat(this.props.ad.ad_item.price).toFixed(2)}</h3>
          <Item title={this.props.ad.item.title}/>
          <Category name={this.props.ad.category.name} />
          <div className={classes.BuyButtonDiv}>
            <Button btnType="BuyButton" clicked={this.buyHandler}>Buy this item</Button>          
          </div>
      </div>
      )

      orderSummary = <OrderSummary
        item={this.props.ad.item.title}
        price={this.props.ad.ad_item.price}
        pay={this.payHandler}
        
        />
    }
    let purchased = null;
    if(this.props.purchaseError){
      purchased = (
        <FlashMessage duration={5000} class='Warning'>
            <p>{this.props.purchaseStatus.fail}</p>
        </FlashMessage>        
      )
    }

    if(this.props.purchaseSuccess){
      purchased = <Redirect to={`/users/${this.props.userID}`} />
    }

    if(this.props.error && this.props.unauthorized){
      purchased = (        
        <h1>{this.props.error.fail}</h1>        
      )
      ad = null;       
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.buyCancelHandler}>
            {orderSummary}
        </Modal>
        <div className={classes.PurchaseMessage}>
          {purchased}
        </div>
        {ad}
      </Aux>
    )       
  }
}

const MapStateToProps = (state) => {
  return {
    ad: state.ads.ad,
    loading: state.ads.loading,
    new: state.adBuilder.newAd.new,
    userID: state.auth.userID,
    purchaseError: state.ads.purchaseError,
    purchaseStatus: state.ads.purchaseStatus,
    purchaseSuccess: state.ads.purchaseSuccess,
    unauthorized: state.ads.unauthorized,
    error: state.ads.error
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    fetchAd: (id) => dispatch(actions.fetchAd(id)),
    pay: (userID, adID) => dispatch(actions.payForItem(userID, adID))
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(AdDetails);