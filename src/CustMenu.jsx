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
      <div>
        <h1>Menu</h1>
        <MenuTable menu={this.state.customerMenu} addOnclick = {this.addClick.bind(this)}/>
      </div>
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
      <div>
        <div>
          <h3>{this.props.cuision.dname}
            <span> {this.props.cuision.price}</span>
            <button type="button" onClick = {this.handleAddClick.bind(this)}>Add to cart</button>
          </h3>
        </div>
        <p>Description: {this.props.cuision.description}</p>
        <hr/>
      </div>
    )
  }
}


export default CustMenu;

