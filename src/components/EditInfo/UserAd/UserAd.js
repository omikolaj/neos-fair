import React, {PureComponent, Component} from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';
import classes from './UserAd.css';
import FlashMessage from 'react-flash-message';

const userAd = (props) => {
  const message = props.message ? <FlashMessage duration={3000}><span>{props.message}</span></FlashMessage> : null;
    return ( 
      <Aux>
        <h3>{props.title}</h3>
        {message}
        <Button btnType="PublishButton" clicked={(adID) => props.publishClicked(props.adID)}>{props.published ? 'Unpublish' : 'Publish'}</Button>
        <Button btnType="RemoveButton" clicked={(adID) => props.removeClicked(props.adID)}>Remove</Button>
      </Aux>
    )
 }

export default userAd;