import React from 'react';

//imports
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'

const SideDrawer = (props) => {
    
    let AttachedClasses = [ 'SideDrawer', 'Close' ];
    if( props.open ){
        AttachedClasses = ['SideDrawer', 'Open']
    }

    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={AttachedClasses.join(' ')}>
                <div className={'LogoSider'}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
};

export default SideDrawer;