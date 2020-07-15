import React from 'react';

//imports
import './burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    console.log('estos son los props en Burger => ', props)
    let transformedIngredients =
    Object.keys( props.ingredients )
    .map( igKey => {
        return[ ...Array(props.ingredients[igKey]) ].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)   
    },[]);
    
    if( transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding elements</p>
    }

    console.log(transformedIngredients);

    return(
        <div className={'Burger'}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;