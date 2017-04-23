import React, {Component} from 'react';
import Constants from '../../shared/Constants';

/**
 * Row to display every order details.
 * Customer can also update order status here.
 *
 * status:{placed(cancel), accepted(no operation, accepted), delivered(comment), finished}
 */
class OrderRow extends Component {

  render() {
    let record = this.props.orderData;
    let btnLabel = null;
    if (record.status === Constants.orderStatus.ORDER_PLACED) {
      btnLabel = 'cancel';
    } else if (record.status === Constants.orderStatus.ORDER_ACCEPTED) {
      btnLabel = 'confirm';
    } else if (record.status === Constants.orderStatus.ORDER_DELIVERED) {
      btnLabel = 'comment'
    } else {
      btnLabel = '';
    }
    let btn = null;
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