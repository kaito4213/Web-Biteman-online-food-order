import React, { Component } from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  let header = null;
  if (true) {
    header = <li><Link to="/logout">Log out</Link></li>
  } else {
    header = <li><Link to="/login">Log in</Link></li>
  }
  return(
    <div>
      <header className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
       
          <nav>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/Help">Help</Link></li>
              {header}
            </ul>
          </nav>
        </div>
      </header>
      
    </div>
  );
};

export default Header;
