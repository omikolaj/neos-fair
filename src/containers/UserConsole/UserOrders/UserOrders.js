import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserOrders.css';
import Aux from '../../../hoc/Aux/Aux';
import UserOrder from '../../../components/UserConsole/UserOrder/UserOrder';
import cuid from 'cuid';
import FlashMessage from '../../Utils/FlashMessage/FlashMessage';
import * as actions from '../../../store/actions/index';

class UserOrders extends Component {

  render() {
    let userOrders = null;

    userOrders = this.props.userOrders.map(order => {
      return (
        <UserOrder 
          key={cuid()} 
          title={order.order.item.title} 
          price={order.order.price} />
      )
    })    

    if(this.props.userOrders.length === 0){
      userOrders = (
        <p>You have no past orders</p>
      )
    }

    let message = null
    if(this.props.purchaseSuccess){
      message = (
        <FlashMessage duration={6000} class='Info'>
          <span className={classes.PurchaseSuccess}>{this.props.purchaseStatus}</span>
        </FlashMessage>
      )      
    }

    return (
      <Aux>
        <h2 className={classes.OrdersTitle}>Past Orders</h2>
        <div className={classes.UserOrders}>          
          {message}
          {userOrders}        
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userOrders: state.userConsole.userOrders,
    purchaseSuccess: state.ads.purchaseSuccess,
    purchaseStatus: state.ads.purchaseStatus
  }
}

export default connect(mapStateToProps, null)(UserOrders);