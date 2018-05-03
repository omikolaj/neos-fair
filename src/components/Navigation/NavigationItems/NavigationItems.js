import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Accounts</NavigationItem>
        <NavigationItem link="/ads">Ads</NavigationItem>
    </ul>
);

export default navigationItems;