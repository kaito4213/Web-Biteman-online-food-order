import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import {Table, Carousel} from 'antd';
import './css/antd.scss';

/**
 * Restaurant Recommend
 * To Do:
 * 1.Style&Photo
 * 2.Link
 */

class ResRow extends Component {
  render() {
    return (
      <div>
        <div>{this.props.product.name}</div>
        <div>{this.props.product.zip}</div>
        <div>{this.props.product.type}</div>
      </div>
    );
  }
}

class RecTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var rows = [];
    this.props.products.forEach((product) => {
      rows.push(<ResRow product={product}/>);
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

/**
 * A list of all of the recommendations
 */
class Reclist extends Component {
  constructor(props) {
    super(props);
    this.state = {recommendation: []};
  }

  componentDidMount() {
    // load all of the recommendations
    $.ajax({
      url: '/getRecommendationList',
      type: 'get',
      dataType: 'json',
      success: function (json) {
        var recommendation = json.recommendation;
        this.setState({recommendation: recommendation})
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    return (
      <RecTable products={this.state.recommendation}/>
    )
  }
}

export default Reclist;
