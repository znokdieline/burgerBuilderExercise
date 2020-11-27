import React, { useState } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../Axios-order';
import Input from '../../../components/UI/input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/Actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false 
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                Value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        });
        
        const [formIsValid, setFormIsValid] = useState(false);  

    const orderHandler = (event) => {
        event.preventDefault();//previene que se reacrge la pagina mietras se hace e update de los campos 
        const formData = {};
        for(let formElementIdentifier in orderForm){
            //el formElemenIndentifier es email contry etc. = a el valor que el usuario le ponga. 
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {   
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }
    

    const inputChangeHandler = (event,inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid:checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        }); 
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement 
        });

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
                                                
    }
        const formElementsArray = [];
        for ( let key in orderForm ){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        let form = (
            <form onSubmit={orderHandler}>
            { formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangeHandler(event, formElement.id) }
                    />
            ) ) }
            <Button btnType="Success" disable={!formIsValid} >ORDER</Button>
        </form>
        );
        if(props.loading){
            form = <Spinner/>
        }

        return(
            <div className="ContactData">
                <h4> Enter your Contact Data</h4>
               {form}
            </div>
        )
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {

        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(ContactData, axios));