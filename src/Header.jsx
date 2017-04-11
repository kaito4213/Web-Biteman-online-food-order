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
  };

  render() {

    let header = null;
    let userpage = null;

    if (localStorage.getItem('userName')) {
      header = <li><a onClick={this.handleLogout}>Log out</a></li>
      	userpage = <li><Link to="/user">User</Link></li>
      /*make the userpage only visible after login*/
    } else {
      header = <li><Link to="/login">Log in</Link></li>
	userpage = <li></li>
    }

    return (
      <div>
        <header className="navbar navbar-fixed-top navbar-inverse">
          <div className="container">
            <nav>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/res">Restaurant</Link></li>
                <li><Link to="/help">Help</Link></li>


                <li><Link to="/custmenu">CustMenu</Link></li>
                <li><Link to="/myOrder">MyOrder</Link></li>
                  <li><Link to="/menu">Menu</Link></li>
	    					{userpage}




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
