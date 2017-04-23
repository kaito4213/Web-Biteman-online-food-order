import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
/**
 * User page component.
 *
 * Only visitable after login
 */

/* Page Layout
 order history Table + navgation side bar
 */

class User extends Component {
  render() {
    if (!localStorage.getItem('userName') || !localStorage.getItem('type') == 'customer') {
      return (
        <Home />
      )
    } else {// successfully logged in as customer
      return (
        <div>
          <table>
            <ul id="usidebar">
              <p>My account:</p>
              <li><Link to="/user/orderlist">Orders</Link></li>
              <li><Link to="/user/profile">Profile</Link></li>
              <li><Link to="/user/myOrder">Cart</Link></li>
            </ul>
          </table>
          <table id="utable">
            {this.props.children}
          </table>
        </div>
      )
    }
  }
}

User.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default User;
