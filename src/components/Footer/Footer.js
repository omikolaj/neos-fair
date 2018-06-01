import React from 'react';
import classes from './Footer.css';
import github from '../../assets/images/github.svg';

const footer = (props) => {
  return (
    <div>
      <div className={classes.PhantomStyle}/>
      <footer>        
          <a href='https://github.com/omikolaj/neos-fair'>
            <img className={classes.Github} src={github}/>
          </a>
        </footer>      
    </div>
  );
}

export default footer;