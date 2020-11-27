import React, { useState, useEffect, useCallback } from "react";
import {  useSelector, useDispatch } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../Axios-order';
import Spinner  from '../../components/UI/Spinner/Spinner';
import * as actions from '../../Store/Actions/index';




const BurgerBuilder = props => {
    //se va a manejar el estado de los ingredientes
    
    const [purchasing, setPurchasing] =useState(false)

    
    const dispatch = useDispatch();
    
    const onIngredientAdd = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));
    
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients]);

    const ings = useSelector( state => {
        return state.burgerBuilder.ingredients
    });

    const price = useSelector( state => state.burgerBuilder.totalPrice );
    const error = useSelector( state => state.burgerBuilder.error );
    const isAuthenticated = useSelector( state => state.auth.token !== null );
        

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0);
        return sum > 0
    };

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    };

    const purchaseCancelHandler = () =>  {
        setPurchasing(false)
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }
    
        const disableInfo = {
            ...ings
        };
        for( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>The ingredients can't be loaded</p> : <Spinner />
        if(ings){
            burger = (
                <Aux>
                    <Burger ingredients = {ings}/>
                    <BurgerControls
                        ingredientAdded = {onIngredientAdd}
                        ingredientRemoved = {onIngredientRemoved}
                        disabled = { disableInfo }
                        price={price}
                        purchaseable={updatePurchaseState(ings)}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            price={price} />
        }
        
        return(
            <Aux>
            <Modal
            show={purchasing}>
                {orderSummary}
            </Modal>
                {burger}
            </Aux>
        );
};



export default  withErrorHandler(BurgerBuilder, axios);