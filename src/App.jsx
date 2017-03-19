import React, {Component} from 'react';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

class App extends Component {

  render() {

    const testStyle = {
      position: 'absolute',
      top: '400px'
    };

    return (
      <div>
        <Header/>
        <div style={testStyle}>
          {/*Render the body based on different route*/}
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
};

export default App;