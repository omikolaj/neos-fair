import React from 'react';
import classes from './Ad.css'

const ad = (props) => (
  <article className={classes.Ad} onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className={classes.User}>
      <div className="User">{props.user}</div>
    </div>
  </article>
)

export default ad;