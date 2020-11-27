import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../Store/Actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {

    const [ authForm, setAuthForm ] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false 
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false 
            }
        });

        const [ isSignUp, setIsSignUp ] = useState(true);
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    

    const inputChangeHandler = (event, controlName) => {
        const updateControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updateControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp)
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

        const formElementsArray = [];
        for ( let key in authForm ){
            formElementsArray.push({
                id: key,
                config: authForm[key]
            });
        };
        //rendereo dinamico del los elementos del form
        let form = formElementsArray.map(formElement => (
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
        ));
        if(props.loading){
            form = <Spinner/>
        };

        let errorMassage = null;

        if(props.error) {
            errorMassage = (
                <p>{props.error.message}</p>
            )
        };

        let authRedirect = null
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath}/>
        }

        return (
            <div className="Auth">
                {authRedirect}
                {errorMassage}
                <form onSubmit={submitHandler}>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={switchAuthModeHandler}
                >SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (mail, password, isSignup ) => dispatch(actions.auth( mail, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);