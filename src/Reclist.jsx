import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import {Table,Carousel} from 'antd';
import './css/antd.scss';

/**
 * Restaurant Recommond
 * To Do:
 * 1.Style&Photo
 * 2.Link
 */

class ResRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.zip}</td>
				<td>{this.props.product.type}</td>
      </tr>
    );
  }
}

class RecTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
		var rows =[];
		this.props.products.forEach((product) =>{
			rows.push(<ResRow product={product} />);
		});
    return (
			<Carousel autoplay="true">
				<div><h3>{rows[0]}</h3></div>
				<div><h3>{rows[1]}</h3></div>
				<div><h3>{rows[2]}</h3></div>
				<div><h3>{rows[3]}</h3></div>
			</Carousel>
    );
  }
}

var data = [];

for (let i=0; i<4; i++) {
  data.push({
    zip: i,
    name: 'Pho' + i,
		type: (i%2)? 'Asian':'French',
		durl: i,
  });
}

class Reclist extends Component {
	render(){
		return(
  		<RecTable products={data} />
		)
	}
}

export default Reclist;
