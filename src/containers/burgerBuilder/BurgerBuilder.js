import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../Axios-order';
import Spinner  from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../Store/Actions/index';




class BurgerBuilder extends Component{
    //se va a manejar el estado de los ingredientes
    state = { 
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        console.log('Estos son los props en burger builder => ', this.props)
        
    };

    updatePurchaseState (ingredients) {
    
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0);
        return sum > 0
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () =>  {
        this.setState({purchasing : false})
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    

    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredients can't be loaded</p> : <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BurgerControls
                        ingredientAdded = {this.props.onIngredientAdd}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = { disableInfo }
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price} />
        }

        if (this.state.loading){
            orderSummary = <Spinner/>
        };
        
        return(
            <Aux>
            <Modal
            show={this.state.purchasing}>
                {orderSummary}
            </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));