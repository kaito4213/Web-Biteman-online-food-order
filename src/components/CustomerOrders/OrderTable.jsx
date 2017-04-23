import React, {Component} from 'react';
import OrderRow from './OrderRow';

/**
 * Table Display all of the orders
 */
class OrderTable extends Component {

  constructor() {
    super();
  }

  render() {
    let rows = [];
    let rowNum = 1;
    this.props.orderHistory.forEach((order) => {
      rows.push(
        <OrderRow key={rowNum++} orderData={order} onOrderRowClick={(e) => this.props.onOrderRowClick(e)}/>
      );
    });
    return (
      <table>
        <thead>
        <tr>
          <th>Order ID</th>
          <th>Restaurant</th>
          <th>Data</th>
          <th>Time</th>
          <th>Total price</th>
          <th>Status</th>
          <th>Operation</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default OrderTable;