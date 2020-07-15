import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../Axios-order';
import Input from '../../../components/UI/input/Input';

class ContactData extends Component{
    state={
        orderForm:{
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
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,  
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();//previene que se reacrge la pagina mietras se hace e update de los campos 
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            //el formElemenIndentifier es email contry etc. = a el valor que el usuario le ponga. 
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {   
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/order.json', order)
        .then(res => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }
    // checkValidity recibe dos parametros, ( value, rules)
    checkValidity = ( value, rules ) => {
        let isValid = true;
        if(!rules){
            return true;
        }
        if ( rules.required && isValid ){
            isValid = value.trim() !== '';
        }
        if ( rules.minLength && isValid ){
            isValid = value.length >= rules.minLength;
        }
        if ( rules.maxLength && isValid ){
            isValid = value.length <= rules.maxLength;
        }
        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
            //aquí se clona el estado par no mutarlo pepro sigue mutandolo
        };
        const updatedFormElement = {
            /// aquí se clona el estado completamente 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid  }) // formIsValid: formIsValid izquierda refiere a el estado y derecha a la variable
                                                
    }
    render(){
        const formElementsArray = [];
        for ( let key in this.state.orderForm ){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
            { formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => this.inputChangeHandler(event, formElement.id) }
                    touched={formElement.config.touched}
                    />
            ) ) }
            <Button btnType="Success" disable={!this.state.formIsValid} >ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }

        return(
            <div className="ContactData">
                <h4> Enter your Contact Data</h4>
               {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect( mapStateToProps )(ContactData);