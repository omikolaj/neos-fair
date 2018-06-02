import React from 'react';
import classes from './DrawerToggle.css';
import Aux from '../../../../hoc/Aux/Aux';

const drawerToggle = (props) => {
    const drawerToggle = props.isAuthenticated ? (
        <Aux>
            <div key='0'></div>
            <div key='1'></div>
            <div key='2'></div>
        </Aux>
    ) : (
        null
    );
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            {drawerToggle}
        </div>
    )
};

export default drawerToggle;