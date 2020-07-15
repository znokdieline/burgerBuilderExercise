import React from 'react';

//imports
import './DrawerToggle.css'

const DrawerToggle = ( props ) => (
    <div onClick={props.clicked} className={'DrawerToggle'} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;