import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';

/**
 * User profile
 * To Do:
 * PROBLEM1: edit?
 * PROBLEM2: style
 */

var dataSource = {
  uid: '001',
  uname: 'test',
  address: 'address',
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: dataSource,
    };
  }

  render() {
    return (
      <div>
        <label>Username: </label>
        <p>{this.state.data.uname}</p>
        <label>Address: </label>
        <p>{this.state.data.address}</p>
      </div>
    );
  }
}

export default Profile;
