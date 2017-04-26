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
/*
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
  /*constructor(props) {
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
  }*/

  render() {
    return (
      //<RecTable products={this.state.recommendation}/>
      <section id="gallery" className="parallax-section">
        <div className="container">
          <div className="row">

            <div className="col-md-4 col-sm-4 wow fadeInUp" data-wow-delay="0.3s">
              <a href="images/gallery-img1.jpg" data-lightbox-gallery="zenda-gallery">
                <img src="images/gallery-img1.jpg" alt="gallery img"/></a>
              <div>
                <h3>Lemon-Rosemary Prawn</h3>
                <span>Seafood / Shrimp / Lemon</span>
              </div>
              <a href="images/gallery-img2.jpg" data-lightbox-gallery="zenda-gallery">
                <img src="images/gallery-img2.jpg" alt="gallery img" /></a>
              <div>
                <h3>Lemon-Rosemary Vegetables</h3>
                <span>Tomato / Rosemary / Lemon</span>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 wow fadeInUp" data-wow-delay="0.6s">
              <a href="images/gallery-img3.jpg" data-lightbox-gallery="zenda-gallery">
                <img src="images/gallery-img3.jpg" alt="gallery img" /></a>
              <div>
                <h3>Lemon-Rosemary Bakery</h3>
                <span>Bread / Rosemary / Orange</span>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 wow fadeInUp" data-wow-delay="0.9s">
              <a href="images/gallery-img4.jpg" data-lightbox-gallery="zenda-gallery">
                <img src="images/gallery-img4.jpg" alt="gallery img" /></a>
              <div>
                <h3>Lemon-Rosemary Salad</h3>
                <span>Chicken / Rosemary / Green</span>
              </div>
              <a href="images/gallery-img5.jpg" data-lightbox-gallery="zenda-gallery">
                <img src="images/gallery-img5.jpg" alt="gallery img" /></a>
              <div>
                <h3>Lemon-Rosemary Pizza</h3>
                <span>Pasta / Rosemary / Green</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Reclist;
