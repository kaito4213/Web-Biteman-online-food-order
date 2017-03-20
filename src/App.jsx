import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * The highest level component.
 * When status changes, different components fall into children
 */
class App extends Component {
  render() {
    const testStyle = {
      position: 'absolute',
      top: '400px'
    };

    return (
      <div>
        <Header/>
        <div>
          {/*Render the body based on different url*/}
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App;