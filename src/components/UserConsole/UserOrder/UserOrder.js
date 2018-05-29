import React from 'react';
import classes from './UserOrder.css'

const userOrder = (props) => {
  return (
    <div className={classes.UserOrder}>        
      <span>Title: {props.title}</span>
      <span>Price: {props.price}</span>        
    </div>
  )
}

export default userOrder;