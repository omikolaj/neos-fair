import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserOrders.css';
import Aux from '../../../hoc/Aux/Aux';
import UserOrder from '../../../components/EditInfo/UserOrder/UserOrder';
import cuid from 'cuid';

class UserOrders extends Component {

  render() {
    let userOrders = null;

    userOrders = this.props.userOrders.reverse().map(order => {
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

    return (
      <Aux>
        <h2 className={classes.OrdersTitle}>Past Orders</h2>
        <div className={classes.UserOrders}>
          {userOrders}        
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userOrders: state.userConsole.userOrders
  }
}

export default connect(mapStateToProps, null)(UserOrders);