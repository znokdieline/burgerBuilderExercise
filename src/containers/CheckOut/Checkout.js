import React, { Component } from  'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary.js.js';
import ContactData from '../../containers/CheckOut/ContacData/ContactData';

class Checkout extends Component {
  
      
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
        //accede a los props, al prop history y se le indica regresar al builder.
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
        // ingresa al los props, al prop history y se rempleza por el siguiente componente.
    };

    render(){
        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to= "/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={ this.checkoutCancelledHandler }
                        checkoutContinued={ this.checkoutContinuedHandler }
                        />
                    <Route 
                        path={ this.props.match.path + '/contact-data' } 
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};




export default connect(mapStateToProps)(Checkout);