import React from  'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary.js.js';
import ContactData from '../../containers/CheckOut/ContacData/ContactData';

const Checkout = props => {
  
      
    const checkoutCancelledHandler = () => {
        props.history.goBack();
        //accede a los props, al prop history y se le indica regresar al builder.
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
        // ingresa al los props, al prop history y se rempleza por el siguiente componente.
    };

        let summary = <Redirect to="/"/>;
        if (props.ings) {
            const purchaseRedirect = props.purchased ? <Redirect to= "/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={props.ings}
                        checkoutCancelled={ checkoutCancelledHandler }
                        checkoutContinued={ checkoutContinuedHandler }
                        />
                    <Route 
                        path={ props.match.path + '/contact-data' } 
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};




export default connect(mapStateToProps)(Checkout);