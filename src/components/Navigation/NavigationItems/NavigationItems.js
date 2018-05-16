import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => {
    const nav = props.isAuthenticated ? (
        <Aux>
            <NavigationItem link="/ads">Ads</NavigationItem>
            <NavigationItem link="/ads/new">Post Ad</NavigationItem>            
            <NavigationItem link="/users">Account</NavigationItem>
            <NavigationItem link="/">Logout</NavigationItem>
        </Aux>
    ) : (
        <Aux>
            <NavigationItem link="/ads">Ads</NavigationItem>
            <NavigationItem link="/login">Login</NavigationItem>
            <NavigationItem link="/signup">Sign Up</NavigationItem>
        </Aux>
    );
    return <ul className={classes.NavigationItems}>        
        {nav}
    </ul>
};

export default navigationItems;