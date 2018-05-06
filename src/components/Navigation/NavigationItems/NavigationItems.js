import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/ads/new">Post Ad</NavigationItem>
        <NavigationItem link="/ads">Ads</NavigationItem>
        <NavigationItem link="/users">Account</NavigationItem>
    </ul>
);

export default navigationItems;