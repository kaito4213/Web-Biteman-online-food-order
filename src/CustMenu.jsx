import React from 'react';

/**
 * This is the menu for customer to select different dishes
 *
 * @type {*[]}
 */

/*this is the parent of menu page*/
class CustMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {customerMenu: []};
  }

  componentDidMount() {
    $.ajax({
      url: '/getMenuForCustomer',
      type: 'post',
      data: {restaurantId: this.props.params.rid},
      dataType: 'json',
      success: function (json) {
        let customerMenu = json.MenuForCustomer;
        this.setState({customerMenu: customerMenu});
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });
  }

  //insert selected food to cart
  addClick(cid, did, price){

    let rid = this.props.params.rid;

    $.ajax({
      url: '/addFoodtoCart',
      type: 'post',
      dataType: 'json',
      data: {customerId:cid, restaurantId: rid, dishId: did, price: price},
      success: function (json) {
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
      <section id="menu" className="parallax-section">
        <div className="container">
            <div className="col-md-offset-2 col-md-8 col-sm-12 text-center">
               <h1 className="heading">Special  Menu</h1>
               <hr/>
            </div>

            <MenuTable menu={this.state.customerMenu} addOnclick = {this.addClick.bind(this)}/>
        </div>
      </section>

    )
  }
}

/*get each row shown in menu table*/
class MenuTable extends React.Component {
  render() {
    let cusionRows = [];
    this.props.menu.forEach(function (cuision) {
      cusionRows.push(<CuisionRow cuision={cuision} key={cuision.did} addOnClick = {this.props.addOnclick.bind(this)}/>)
    }.bind(this));

    return (
      <div>
        <tbody>{cusionRows}</tbody>
      </div>

    )
  }
}
/*specify what is shown in each menu row, the price, description....*/
class CuisionRow extends React.Component {

  handleAddClick(e){
    let cid = localStorage.getItem('customerID'),
      did = this.props.cuision.did,
      price = this.props.cuision.price

    this.props.addOnClick(cid, did, price);
  }

  render() {
    return (
      /*  <row> */
        <div className="col-md-6 col-sm-6">
          <h4>{this.props.cuision.dname}··············<span>{this.props.cuision.price}$··············</span>
            <span>
            <button className="addFood" type="button" onClick = {this.handleAddClick.bind(this)}>add</button>
            </span>
          </h4>
          <h5>Description: {this.props.cuision.description}<br/><span><br/></span></h5>
          </div>
    )
  }
}

export default CustMenu;

