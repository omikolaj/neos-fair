import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './UserOrders.css';
import Aux from '../../../hoc/Aux/Aux';
import UserOrder from '../../../components/EditInfo/UserOrder/UserOrder';
import cuid from 'cuid';

class UserOrders extends Component {

  render() {
    const userOrders = this.props.userOrders.map(order => {
      return (
        <UserOrder key={cuid()} title={order.order.item.title} price={order.order.price} />
      )
    })    

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