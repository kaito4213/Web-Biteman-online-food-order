import React, {Component} from 'react';
import {Link} from 'react-router';

/**
 * Header.
 *
 * @todo: convert this to a stateless function
 */
class Header extends React.Component {

  handleLogout = (event) => {
    this.context.router.replace('/home');
    localStorage.removeItem('userName');
    localStorage.removeItem('type');
  };

  render() {

    let header = null;
    let userpage = null;
    let customerOrders = null;

    if (!localStorage.getItem('userName')) {
      header = <li><Link to="/login">Log in</Link></li>
      userpage = <li></li>
    } else {
      if (localStorage.getItem('type') === 'customer') {
        userpage = (<li><Link to="/user">My Orders</Link></li>);
      } else {
        userpage = (
          <li><Link to="/menu">My Restaurant</Link></li>
        );
        customerOrders = (
          <li><Link to="/orders">My Customers</Link></li>
        );
      }
      header = (<li><a onClick={this.handleLogout}>Log out</a></li>);
    }

    return (
      <div>
        <header className="navbar navbar-fixed-top navbar-inverse">
          <div className="container">
            <nav>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/res">Restaurant</Link></li>
                {userpage}
                {customerOrders}
                {header}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  };

}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;
