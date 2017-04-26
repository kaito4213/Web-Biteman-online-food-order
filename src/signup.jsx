import React from 'react';

class signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  };

  handleSubmit() {
    event.preventDefault();
    const userName = this.inputUsername.value;
    const userEmail = this.inputUseremail.value;
    const address = this.inputAddress.value;
    const zipcode = this.inputZip.value;
    const password1 = this.inputPassword1.value;
    const password2 = this.inputPassword2.value;

    if (password1 == password2) {
      this.context.router.replace('/home');

      //inser new customer into database
      $.ajax({
        url: '/addCustomer',
        type: 'post',
        dataType: 'json',
        data: {userName: userName,userEmail: userEmail, address: address, password: password1, zipcode: zipcode},
        success: function (json) {
        }.bind(this),
        error: function (xhr, status, err) {
          debugger;
          console.log(xhr.responseText);
          console.log(err);
        }.bind(this)
      });

    } else {
      this.setState({error: true});
    }
  };

  render() {
    return (
      <div>
        <h3 className="sign-up-title">Sign Up</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <p>Your name</p>
            <input ref={(input) => {
              this.inputUsername = input
            }} type="text" required/></div>
          <div>
            <p>Email</p>
            <input ref={(input) => {
              this.inputUseremail = input
            }} type="text" required/></div>
          <div>
            <p>Address</p>
            <input ref={(input) => {
              this.inputAddress = input
            }} type="text" required/></div>
          <div>
            <p>Zip Code</p>
            <input ref={(input) => {
              this.inputZip = input
            }} type="text" required/></div>
          <div>
            <p>Password</p>
            <input ref={(input) => {
              this.inputPassword1 = input
            }} type="password" required/></div>
          <div>
            <p>Confirm password</p>
            <input ref={(input) => {
              this.inputPassword2 = input
            }} type="password" required/></div>
          <div>
            <button type="submit">Sign up</button>
          </div>
          <div>
            {this.state.error && (
              <h2>Passwords should be equal!</h2>
            )}
          </div>
        </form>
      </div>
    )
  };

}

signup.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default signup;