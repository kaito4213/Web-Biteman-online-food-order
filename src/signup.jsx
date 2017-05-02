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
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <h1>Sign up</h1>
            <div className="form-group row">
              <h4 className="col-sm-2 control-label">Email</h4>
              <div className="col-sm-10">
                <input ref={(input) => {
                  this.inputUsername = input
                }} type="text" required placeholder="Email" className="form-control" align="center"/>
              </div>
            </div>
            <div className="form-group row">
              <h4 className="col-sm-2 control-label">Address</h4>
              <div className="col-sm-10">
                <input ref={(input) => {
                  this.inputAddress = input
                }} type="text" required placeholder="Address" className="form-control"/>
              </div>
            </div>
            <div className="form-group row">
              <h4 className="col-sm-2 control-label">Zip Code</h4>
              <div className="col-sm-10">
                <input ref={(input) => {
                  this.inputZip = input
                }} type="text" required placeholder="Zip Code" className="form-control"/>
              </div>
            </div>
            <div className="form-group row">
              <h4 className="col-sm-2 control-label">Password</h4>
              <div className="col-sm-10">
                <input ref={(input) => {
                  this.inputPassword1 = input
                }} type="password" required placeholder="Password" className="form-control"/>
              </div>
            </div>
            <div className="form-group row">
              <h4 className="col-sm-2 control-label">Confirm Password</h4>
              <div className="col-sm-10">
                <input ref={(input) => {
                  this.inputPassword2 = input
                }} type="password" required placeholder="Confirm Password" className="form-control"/>
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <button type="submit" className="btn btn-primary">Sign up</button>
              </div>
            </div>
            <div>
              {this.state.error && (
                <h2>Passwords should be equal!</h2>
              )}
            </div>
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