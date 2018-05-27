import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  return (
    <Aux>
      <h2>Checkout Summary</h2>
      <h3>Item you are purchasing</h3>
      <h3>{props.item}</h3>
      <h3>Price: {props.price}</h3>
      <Button clicked={props.pay}>Pay</Button>
    </Aux>    
  )
}

export default orderSummary;
