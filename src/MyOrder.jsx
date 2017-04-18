import React from 'react';

let order = [
  {oid: '1', rid: '1', price: '$49.99', quantity: '1', dname: 'Pad Thai'},
  {oid: '2', rid: '1', price: '$49.99', quantity: '1', dname: 'crab rangoon'},
  {oid: '3', rid: '1', price: '$49.99', quantity: '1', dname: 'downpling'},
  {oid: '4', rid: '1', price: '$49.99', quantity: '1', dname: 'noodle'},
  {oid: '5', rid: '1', price: '$49.99', quantity: '1', dname: 'fried rice'},
  {oid: '6', rid: '1', price: '$49.99', quantity: '1', dname: 'chicken wings'}
];

let totalPrice = 0;

class MyOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {order: [{oid: '', rid: '', price: '', quantity: '', dname: ''}]};
  }

  componentDidMount() {

    // loading..... component

    // request data
       $.ajax({
      url: '/getMyOrders',
      type: 'get',
      dataType: 'json',
      success: function (json) {
        console.log(json);
        debugger;
        this.setState({order: json.orderInfo})
        ;
      }.bind(this),


      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });

  }

  deleteOrder(OID, DID) {

    console.log('clicked delete');

    // if we want to delete data, we can use post
    $.ajax({
      url: '/deleteMyOrder',
      type: 'post',
      dataType: 'json', data: {orderId: OID, dishId: DID},
      success: function (json) {
        console.log(json);
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

      if (!(row.oid == OID && row.did == DID)) {
        order.push(row);
      }

    }.bind(this));

    this.setState({order: order});

  }

  render() {
    return (
      <div>
        <h1>MY Order</h1>
        <table>
          <OrderTable order={this.state.order} deleteOrder={this.deleteOrder.bind(this)}/>
        </table>
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
    console.log(props);
    super(props);
  }

  handleDeleteOrder(e) {
    //console.log(this.props.order.oid, this.props.order.did);
    this.props.deleteOrder(this.props.order.oid, this.props.order.did);
  }

  render() {
    return (
      <tr>
        <td>
          <h3>{this.props.order.dname}
            <span> {this.props.order.price}</span>
            <button type="button" value={this.props.key} onClick={this.handleDeleteOrder.bind(this)}>Delete
            </button>
          </h3>
        </td>
      </tr>
    )
  }
}

export default MyOrder;