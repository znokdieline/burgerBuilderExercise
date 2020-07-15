import React from 'react';

//imports
import './Button.css';

const Button = (props) => (
    <button
        disabled={props.disabled}
        className={['Button', [props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;