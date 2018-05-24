import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

const userAd = (props) => {
  return (
    <Aux>
      <h3>{props.title}</h3>      
    </Aux>
  );
}

export default userAd