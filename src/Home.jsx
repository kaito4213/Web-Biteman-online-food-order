import React, {Component} from 'react';
//import {Jumbotron, FlatButton, Image, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import Login from './Login';
import HelloWorld from './HelloWorld';

class Home extends Component {
  render() {
    if (!localStorage.getItem('userName')) {
      return (
        <div className="center jumbotron">
          <h1>Welcome to Biteman</h1>
          <h2>
            This is the home page for the
            <a href="http://www.nba.com"> Biteman </a>
            sample application.
          </h2>
          <Login/>
          <Link to="/Signup" className="btn btn-lg btn-primary">
            Sign up now
          </Link>
        </div>
      )
    } else {
      // successfully logged in
      return (
        <HelloWorld name={localStorage.getItem('userName')}/>
      )
    }
  }
}

export default Home;