import React, {Component} from 'react';
import {Link} from 'react-router';

/**
 * Footer component.
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Footer = (props) => {
  return (
    <div>
      <footer className="footer">
        <small>
          I love eating.
        </small>
        <nav>
          <ul>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </nav>
      </footer>

    </div>
  );
};

export default Footer;