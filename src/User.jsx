import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
/**
 * User page componet.
 *
 * Only visitable after login
 */

/* Page Layout
	order history Table + navgation side bar
*/

class User extends Component {
  render() {
    if (!localStorage.getItem('userName')){
 	return(
		<Home />
	)
    } else {// successfully logged in
      return (
				<div className="user-page">
					<div>
						<ul id="usidebar">
							<p>My account:</p>
							<li><Link to ="/user/orderlist">Orders</Link></li>
							<li><Link to ="/user/profile">Profile</Link></li>
						</ul>
					</div>					
					<table id="utable">
						{this.props.children}
					</table>
				</div>
      )
    }
  }
}

export default User;
