import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => {
    const nav = props.isAuthenticated ? (
        <Aux>
            <NavigationItem link="/ads">Ads</NavigationItem>            
            <NavigationItem link="/ads/new">Post Ad</NavigationItem>                        
            <NavigationItem link={'/users/' + props.userID}>Account</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
    ) : (
        null
    );
    return <ul className={classes.NavigationItems}>        
        {nav}
    </ul>
};

export default navigationItems;