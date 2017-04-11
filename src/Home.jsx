import React, {Component} from 'react';
import Login from './Login';
import HelloWorld from './HelloWorld';

/**
 * Home page component.
 *
 * Based on if user has logged in or not, display different content
 */
class Home extends Component {
    handleClick() {
        this.context.router.replace('/signup');
    };

    render() {
        if (!localStorage.getItem('userName')) {
        return (
            <div className="center jumbotron">
            <h1>Welcome to Biteman! You are not logged in!</h1>
            <h2>
                This is the home page for the
                <a href="http://www.nba.com"> Biteman </a>
                sample application.
            </h2>
            <Login/>
            <button onClick={this.handleClick.bind(this)} type="button">
                Sign up now
            </button>
            </div>
        )
        } else {
        // successfully logged in
        return (
            <HelloWorld name={localStorage.getItem('userName')}/>
        )
        }
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Home;