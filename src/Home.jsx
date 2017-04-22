import React, {Component} from 'react';
import Login from './Login';
import HelloWorld from './HelloWorld';

/**
 * Home page component.
 *
 * Based on whether a user has logged in or not, display different content
 */
class Home extends Component {
  handleClick() {
    this.context.router.replace('/signup');
  };

  render() {
    let content = null;
    if (!localStorage.getItem('userName')) {
      content = <div><Login/>
        <button onClick={this.handleClick.bind(this)} type="button">sign up now</button>
      </div>
    } else {
      let type = localStorage.getItem('type');
      if (type == 'customer') {
        content = <p>Feeling Hungry? Order Now!</p>
      } else {
        content = <p>We are here to help you be successful.</p>
      }
    }
    return (
      <div className="center jumbotron">
        <h1>Welcome to Biteman!</h1>
        <h2>
          This is the home page for the
          <a href="http://www.nba.com"> Biteman </a>
          sample application.
        </h2>
        {content}
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;

