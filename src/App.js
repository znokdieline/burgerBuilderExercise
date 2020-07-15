import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//imports
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckOut/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render(){
    return (
      <Layout>
      <Switch>
        <Route path='/checkout' component={ Checkout } />
        <Route path='/orders' component={Orders}/>
        <Route path='/' exact component={ BurgerBuilder } />
      </Switch>
      </Layout>
    );
  }
};

export default App;
