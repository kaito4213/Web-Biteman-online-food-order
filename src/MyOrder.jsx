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
        debugger;
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

    $.ajax({
      url: '/deleteMyOrder',
      type: 'post',
      dataType: 'json', data: {dishId: DID},
      success: function (json) {
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
      <div>
        <h1>MY Cart</h1>
        <table>
          <OrderTable order={this.state.order} deleteOrder={this.deleteOrder.bind(this)}/>
        </table>
        <button type = 'button' onClick = {this.placeOrder.bind(this)}>Place</button>
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
          <td> {this.props.order.total}</td>
          <button type="button" value={this.props.key} onClick={this.handleDeleteOrder.bind(this)}>Delete</button>
      </tr>
    )
  }
}

export default MyOrder;