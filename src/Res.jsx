import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import Reslist from './Reslist';
import Reclist from './Reclist';

/**
 * Restaurant homepage componet.
 *
 *
 */

/* Page Layout
 restaurant list + recommend
 */

class Res extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(x) {
    let url = '/custmenu/' + x;
    this.context.router.replace(url);
  }

  render() {
    return (
      <div className="res-page">
        <div>
          <Reslist onClick={(e) =>this.handleClick(e)}/>
        </div>
        <div>
          <h1>Recommond</h1>
          <Reclist />
        </div>
      </div>
    )
  }
}

Res.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Res;
