import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory, Router, Route, Link, Redirect} from 'react-router';
import App from './App';
import HelloWorld from './HelloWorld';
import Login from './Login';
import Home from './Home';
import Help from './Help';
import CustMenu from './CustMenu';
import MyOrder from './MyOrder';

// config the router here
render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        {/*All of the componets here will be rendered as children*/}
        {/*Hello World is just an example component*/}
        <Route path="/hello-world" component={HelloWorld}/>
        <Route path="/signup" component={HelloWorld}/>
        <Route path='/login' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/help' component={Help}/>
        <Route path='/custmenu' component={CustMenu}/>
        <Route path='/myOrder' component={MyOrder} />
      </Route>
    </Router>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
