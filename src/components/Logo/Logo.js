import React from 'react';

//imports
import burgerLogo from '../../Assets/Images/burger-logo.png';
import './Logo.css';

const Logo = (props) => (
    <div className={'Logo'} style={{height: props.height}}>
        <img alt="MyBurger" src={burgerLogo}/>
    </div>
);

export default Logo;