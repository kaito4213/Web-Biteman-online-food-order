import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import {Table, Modal} from 'antd';
import './css/antd.scss';

/**
 * Restaurant List + Search bar
 * To Do:
 * 1.Style
 * 2.link within one row(similar to Orderlist)
 */


class ResRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.zip}</td>
        <td>{this.props.product.type}</td>
        <button onClick={()=>this.props.onClick(this.props.product.rid)}>Go</button>
      </tr>
    );
  }
}

class ResTable extends Component {
  render() {
    var rows = [];
    this.props.products.forEach((product) => {//change search condition
      if (product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ResRow product={product} key={product.name} onClick={(e)=>this.props.onClick(e)}/>);
    });
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Zip</th>
          <th>Type</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ResTable
          products={this.props.products}
          filterText={this.state.filterText}
          onClick={(e)=>this.props.onClick(e)}
        />
      </div>
    );
  }
}

var data = [];

for (let i = 0; i < 20; i++) {
  data.push({
    rid: i,
    zip: i,
    name: 'Pho' + i,
    type: (i % 2) ? 'Asian' : 'French',
    durl: i,
  });
}

class Reslist extends Component {
  render() {
    return (
      <FilterableProductTable products={data} onClick={(e)=>this.props.onClick(e)}/>
    )
  }
}

export default Reslist;
