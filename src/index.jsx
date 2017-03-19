import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory, Router, Route, Link, Redirect} from 'react-router';
import App from './App';
import HelloWorld from './HelloWorld';
import Login from './Login';
import Home from './Home';

// config react-router here
render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        {/*Hello World is just an example component*/}
        <Route path="/hello-world" component={HelloWorld}/>
        <Route path="/signup" component={HelloWorld}/>
        <Route path='/login' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/help' component={HelloWorld}/>
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
