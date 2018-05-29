import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>Checkout Summary</h2>
      <h3>Item you are purchasing</h3>
      <h3>{props.item}</h3>
      <h3>Price: {props.price}</h3>
      <div className={classes.CheckoutButtonDiv}>
        <Button btnType="BuyButton" clicked={props.pay}>Pay</Button>
      </div>
    </div>    
  )
}

export default orderSummary;
