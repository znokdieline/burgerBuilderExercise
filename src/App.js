import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index';

//imports
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckOut/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }
  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={ BurgerBuilder } />
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' component={ Checkout } />
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout}/>
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
