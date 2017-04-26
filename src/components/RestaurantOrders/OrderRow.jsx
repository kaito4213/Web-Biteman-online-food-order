import React, {Component} from 'react';
import Constants from '../../shared/Constants';

/**
 * Row to display every order details.
 * Customer can also update order status here.
 *
 * status:{placed(cancel), accepted(no operation, accepted), delivered(no operation, delivered), finished}
 */
class OrderRow extends Component {

  render() {
    let record = this.props.orderData;
    let detail = this.props.orderDetail;
    let btnLabel = null;
    if (record.orderStatus === Constants.orderStatus.ORDER_PLACED) {
      btnLabel = Constants.ACCEPTED;
    } else if (record.orderStatus === Constants.orderStatus.ORDER_ACCEPTED) {
      btnLabel = Constants.DELIVERED;
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
        <td>{record.orderId}</td>
        <td>{record.orderDate}</td>
        <td>{record.orderTime}</td>
        <td>{record.totalPrice}</td>
        <td>{record.orderStatus}</td>
        <td>{btn}</td>
      </tr>
    );

  }
}

export default OrderRow;
