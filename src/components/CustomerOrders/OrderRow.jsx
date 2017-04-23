import React, {Component} from 'react';
/**
 * Row to display every order details
 */
class OrderRow extends Component {
  render() {
    let record = this.props.orderData;
    // status:{placed(cancel), accepted(no operation, accepted), delivered(comment), finished}
    //
    let btnLabel = null;
    if (record.status === 'placed') {
      btnLabel = 'cancel';
    } else if (record.status === 'accepted') {
      btnLabel = 'confirm';
    } else if (record.status === 'delivered') {
      btnLabel = 'comment'
    } else {
      btnLabel = '';
    }
    let btn = [];
    if (btnLabel !== '') {
      btn = (
        <button type="button" onClick={() => this.props.onOrderRowClick(record)}>{btnLabel}</button>
      )
    }
    return (
      <tr>
        <td>{record.oid}</td>
        <td>{record.name}</td>
        <td>{record.odate}</td>
        <td>{record.ordertime}</td>
        <td>{record.price}</td>
        <td>{record.status}</td>
        <td>{btn}</td>
      </tr>
    );
  }
}

export default OrderRow;