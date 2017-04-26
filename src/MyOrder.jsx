import React from 'react';

class MyOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {order: [{did: '', rname: '', num: '',total: '', dname: ''}]};
  }

  componentDidMount() {
    // get my orders from cart
    let customerID = localStorage.getItem('customerID');
    $.ajax({
      url: '/getMyCart',
      type: 'post',
      dataType: 'json',
      data: {customerID : customerID},
      success: function (json) {
        this.setState({order: json.orderInfo});
      }.bind(this),

      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });

  }

  deleteOrder(DID) {
    let customerId = localStorage.getItem('customerID')

    debugger;
    $.ajax({
      url: '/deleteMyOrder',
      type: 'post',
      dataType: 'json', data: {dishId: DID,customerId:customerId },
      success: function (json) {
        debugger;
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });


    let order = [];
    this.state.order.forEach(function (row) {

      if (!(row.did == DID)) {
        order.push(row);
      }

    }.bind(this));

    this.setState({order: order});

  }

  placeOrder() {
    let cartItems = this.state.order;
    let customerID = localStorage.getItem('customerID');

    $.ajax({
      url: '/placeOrder',
      type: 'post',
      dataType: 'json',
      data: {cartItems: cartItems, customerID: customerID},
      success: function (json) {
        debugger;
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
      <div className="cartTable">
        <div className="myCart" >MY Cart</div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Food</th>
            <th>Restaurant</th>
            <th>quantity</th>
            <th>Price</th>
            <th>Operation</th>
          </tr>
          </thead>
            <OrderTable order={this.state.order} deleteOrder={this.deleteOrder.bind(this)}/>
        </table>
        <button className="placeOrder" type = 'button' onClick = {this.placeOrder.bind(this)}>Place</button>
      </div>

    )
  }
}

//define info in each order row shown on webpage
class OrderTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let orderRow = [];
    let rowNum = 1;
    this.props.order.forEach(function (order) {
      orderRow.push(<OrderRow order={order} key={rowNum++ } deleteOrder={this.props.deleteOrder.bind(this)}/>)
    }.bind(this));

    return (
      <tbody>{orderRow}</tbody>
    )
  }

}

//
class OrderRow extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDeleteOrder(e) {
    this.props.deleteOrder(this.props.order.did);
  }

  render() {
    return (
      <tr>
          <td>{this.props.order.dname} </td>
          <td> {this.props.order.rname}</td>
          <td> {this.props.order.num}</td>
          <td> {this.props.order.total}$</td>
          <td><button className="deleteCart"  type="button" value={this.props.key} onClick={this.handleDeleteOrder.bind(this)}>Delete</button>
        </td>
      </tr>
    )
  }
}

export default MyOrder;