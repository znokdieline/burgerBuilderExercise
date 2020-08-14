import React from 'react';

//imports
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type : 'salad'},
    { label: 'Bacon', type : 'bacon'},
    { label: 'Cheese', type : 'cheese'},
    { label: 'Meat', type : 'meat'}
];

const BuildControls = (props) => (
    <div className={'BuildControls'}>
    <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        {controls.map( ctr => (
            <BuildControl 
            key={ctr.label}
            label={ctr.label}
            added={() => props.ingredientAdded(ctr.type)}
            removed={() => props.ingredientRemoved(ctr.type)} 
            disabled={ props.disabled[ctr.type] }
            />
        ) )}
        <button 
        className={'OrderButton'}
        disabled={!props.purchaseable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW!': 'SIGN UP TO ORDER'}</button>
    </div>
);

export default BuildControls;