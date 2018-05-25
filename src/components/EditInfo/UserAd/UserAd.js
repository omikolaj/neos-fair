import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';
import classes from './UserAd.css';
import FlashMessage from 'react-flash-message';

const userAd = (props) => {
  const message = props.message ? <div className={classes.Message}><FlashMessage duration={7000}><span >{props.message}</span></FlashMessage></div> : null;
  return (
    <Aux>
      <h3>{props.title}</h3>
      <span className={classes.Published}>{props.published ? 'Ad is published' : 'Ad is unpublished'}</span>
      {message}
    </Aux>
  );
}

export default userAd