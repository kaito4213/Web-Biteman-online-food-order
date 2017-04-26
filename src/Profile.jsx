import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';

let dataSource = {};


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {profileData: []};
  }

  componentDidMount() {

    // get customer id globally
    let customerId = localStorage.getItem('customerID');

    // get customer profile data
    $.ajax({
      url: '/getMyProfile',
      type: 'post',
      dataType: 'json',
      data: {customerID: customerId},
      success: function (json) {
        let profileData = json.profile[0];
        this.setState({profileData: profileData});
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });

  }

  render() {
    return (
      <div>
        <label>Username: </label>
        <p>{this.state.profileData.uname}</p>
        <label>Address: </label>
        <p>{this.state.profileData.address}</p>
      </div>
    );
  }
}

export default Profile;
