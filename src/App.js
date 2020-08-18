import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index';

//imports
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/logout/Logout';
import AsyncComponent from './hoc/asyncComponent/AsyncComponent';

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/CheckOut/Checkout')
});

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }
  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' exact component={ BurgerBuilder } />
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' component={ asyncCheckout } />
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={asyncAuth}/>
          <Route path='/' exact component={ BurgerBuilder } />
          <Redirect to="/"/>
        </Switch>
      );
    };
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
