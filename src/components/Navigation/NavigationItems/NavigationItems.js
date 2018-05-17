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
            <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
    ) : (
        <Aux>
            <NavigationItem link="/ads">Ads</NavigationItem>
            <NavigationItem link="/">Home</NavigationItem>
        </Aux>
    );
    return <ul className={classes.NavigationItems}>        
        {nav}
    </ul>
};

export default navigationItems;