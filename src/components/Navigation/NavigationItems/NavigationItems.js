import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/Navigationitem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/BunBunBurgers/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/BunBunBurgers/orders">Orders</NavigationItem>
    </ul>
);
export default navigationItems;