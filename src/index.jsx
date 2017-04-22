import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory, Router, Route, Link, Redirect} from 'react-router';
import App from './App';
import HelloWorld from './HelloWorld';
import Login from './Login';
import Home from './Home';
import Help from './Help';

import User from './User';
import Orderlist from './Orderlist';
import Profile from './Profile';
import Reslist from './Reslist';
import Reclist from './Reclist';
import Res from './Res';

import CustMenu from './CustMenu';
import MyOrder from './MyOrder';

import signup from './signup';


import Menu from './Menu';

// config the router here
render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        {/*All of the componets here will be rendered as children*/}
        {/*Hello World is just an example component*/}
        <Route path="/hello-world" component={HelloWorld}/>
        <Route path="/signup" component={signup}/>
        <Route path='/login' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/help' component={Help}/>

        <Route path='/custmenu/:rid' component={CustMenu}/>

        <Route path='user' component={User}>
          <Route path='orderlist' component={Orderlist}/>
          <Route path='profile' component={Profile}/>
          <Route path='myOrder' component={MyOrder}/>
        </Route>

        <Route path='res' component={Res}>
          <Route path='reslist' component={Reslist}/>
          <Route path='reclist' component={Reclist}/>
        </Route>

        <Route path='/menu' component={Menu}/>

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

