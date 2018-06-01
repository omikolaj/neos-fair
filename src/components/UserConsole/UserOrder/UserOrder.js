import React from 'react';
import classes from './UserOrder.css'

const userOrder = (props) => {
  return (
    <div className={classes.UserOrder}>        
      <span>Title: <strong>{props.title}</strong> Price: <strong>{props.price}</strong></span>     
    </div>
  )
}

export default userOrder;