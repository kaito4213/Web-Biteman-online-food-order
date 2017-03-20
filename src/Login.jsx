import React from 'react';

/**
 * Login page.
 *
 * @todo: convert this to a stateless function
 */
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {error: true};
  };

  /**
   * Submit username and password
   */
  handleSubmit() {
    event.preventDefault();

    const userEmail = this.inputUsername.value;
    const password = this.inputPassword.value;

    console.log(userEmail + '  ' + password);

    // if logged in
    if (password == 'asd') {
      // https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating
      this.context.router.replace('/home');
      localStorage.setItem('userName', userEmail);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>Sign In</h2>
          <input ref={(input) => {
            this.inputUsername = input
          }} type="text" placeholder="Email Address"/>
          <input ref={(input) => {
            this.inputPassword = input
          }} type="password" placeholder="Password" required/>
          <input type="checkbox" label="Remember me"/>
          <button type="submit">Login</button>
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

