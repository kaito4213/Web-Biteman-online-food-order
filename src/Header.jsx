import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  handleLogout = (event) => {
    this.context.router.replace('/home');
    localStorage.removeItem('userName');
  }

  render() {

    let header = null;

    if (localStorage.getItem('userName')) {
      header = <li><a onClick={this.handleLogout}>Log out</a></li>
    } else {
      header = <li><Link to="/login">Log in</Link></li>
    }

    return (
      <div>
        <header className="navbar navbar-fixed-top navbar-inverse">
          <div className="container">
            <nav>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/help">Help</Link></li>
                {header}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }

}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;
