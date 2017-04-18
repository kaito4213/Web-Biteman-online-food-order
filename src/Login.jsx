import React from 'react';

/**
 * Login page.
 *
 * @todo: convert this to a stateless function
 */
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      type: 'customer'
    };
  };

  /**
   * Submit username and password
   */
  handleSubmit() {
    event.preventDefault();

    const inputEmail = this.inputUsername.value;
    const inputPwd = this.inputPassword.value;
    let pwdFromDB;

    // request email and password from table in DB

      $.ajax({
        url: '/getLoginInfo',
        type: 'post',
        dataType: 'json',
        data: {email: inputEmail, table: this.state.type},
        success: function (json) {
          console.log(json);
          debugger;
          pwdFromDB = json.loginInfo[0].pwd;
          // if logged in, check the password and email account
          if (inputPwd == pwdFromDB) {
            // https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating
            this.context.router.replace('/home');
            localStorage.setItem('userName', inputEmail);
            localStorage.setItem('type', this.state.type);
          }
          else {
            this.setState({error: true});
          }

        }.bind(this),

        error: function (xhr, status, err) {
          debugger;
          console.log(xhr.responseText);
          console.log(err);
        }.bind(this)
      });

  };

  handleSelect(event) {
    this.setState({type: event.target.value});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>Log In</h2>
          <div><select value={this.state.type} onChange={this.handleSelect.bind(this)}>
            <option value='customer'>Customer</option>
            <option value='restuarant'>Restuarant</option>
          </select></div>
          <div><input ref={(input) => {
            this.inputUsername = input
          }} type="text" placeholder="Email Address"/></div>
          <div><input ref={(input) => {
            this.inputPassword = input
          }} type="password" placeholder="Password" required/></div>
          <div><input type="checkbox"/>Remember me</div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            {this.state.error && (
              <h2>Either password or account is wrong!</h2>
            )}
          </div>
        </form>
      </div>
    )
  };

}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;


