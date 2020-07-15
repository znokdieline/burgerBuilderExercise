import React from 'react';

import './input.css';

const Input = ( props ) => {
    let inputElement = null;
    let inputClasses = ['InputElement'];

    if( props.invalid && props.shouldValidate && props.touched){
        inputClasses.push('Invalid')
    }

    switch (props.elementType){
        case( 'input' ):
        inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
        break;
        case ('textarea'):
            inputElement = <textarea 
                className={'InputElement'}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (
            <select
                className={'InputElement'}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input 
                className={'InputElement'}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    };

    let validationError = null
    if( props.valid && props.touched ) {
        validationError = <p className={'ValidationError'}>Enter a valid Value! {props.valueType}</p>
    };
    
    return (
        <div className={'Input'}>
            <label className={'Label'}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default Input;