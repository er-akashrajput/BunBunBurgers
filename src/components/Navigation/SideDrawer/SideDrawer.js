import React from 'react'

import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let classesAttached = [classes.SideDrawer, classes.Close]
    if (props.open) {
        classesAttached = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classesAttached.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;