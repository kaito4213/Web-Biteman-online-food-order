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
	search bar + restaurant list + recommond
*/

class Res extends Component {
  	constructor() {
		super();
		this.state= {		};
	}

  render() {
    if (!localStorage.getItem('userName')){
 	return(
		<Home />
	)
    } else {// successfully logged in
      return (
				<div className="res-page">			
					<div>
						<Reslist />
					</div>
					<div>
						<h1>Recommond</h1>
						<Reclist />
					</div>
				</div>
      )
    }
  }
}

export default Res;
