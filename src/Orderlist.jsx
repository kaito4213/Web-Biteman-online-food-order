import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import {Modal} from 'antd';

/**
 * Order history
 * To Do:
 * PROBLEM1: PAGEINATION
 * PROBLEM2: REMOTE DATASOURCE
 */

/**
 * Row to display every order details
 */
class OrderRow extends Component {
  render() {
    debugger;
    var record = this.props.product;
    // status:{placed(cancel),accepted(confirm),delivered(comment),finished}
    let btnLabel = null;
    if (record.status == 'placed') {
      btnLabel = 'cancel';
    } else if (record.status == 'accepted') {
      btnLabel = 'confirm';
    } else if (record.status == 'delivered') {
      btnLabel = 'comment'
    } else {
      btnLabel = '';
    }
    var btn = [];
    if (btnLabel != '') {
      btn = (
        <button type="button" onClick={()=>this.props.onClick(record)}>{btnLabel}</button>
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

/**
 * Table Display all of the orders
 */
class Ordertable extends Component {
  render() {
    let rows = [];
    let rowNum = 1;
    this.props.data.forEach((product) => {
      debugger;
      rows.push(<OrderRow key={rowNum++} product={product} onClick={(e)=>this.props.onClick(e)}/>);
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

/*/data can be array or DataSource object
 var data = [];
 for (let i = 0; i < 20; i++) {
 data.push({
 oID: i,
 rName: 'Pho' + i,
 odate: '04/01/17',
 otime: 'time',
 sum: 10 + i,
 status: (i % 4) ? (i % 4 == 1) ? 'placed' : (i % 4 == 2) ? 'delivered' : 'finished' : 'accepted',
 });
 }*/


class Orderlist extends Component {
  constructor() {
    super();
    this.state = {
      //dataSource: data,
      orderHistory: [],
      visible: false,
    };
    this.showConfirm = this.showConfirm.bind(this);
    //this.handleOk = this.handleOk.bind(this);
    //this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // get customer id globally
    let customerId = localStorage.getItem('customerID');

    $.ajax({
      url: '/getMyOrderHistory',
      type: 'post',
      data: {customerID: customerId},
      dataType: 'json',
      success: function (json) {
        debugger;
        let myOrderHistory = json.orderHistory;
        this.setState({orderHistory: myOrderHistory});
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });
  }

  handleOk = () => {
    let len = this.state.orderHistory.length;
    if (this.state.op == 1) {//placed
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oID == this.state.oid) {
          const orderHistory = this.state.orderHistory;
          orderHistory[row].status = 'cancelled';
          this.setState({orderHistory,});
          alert('You have cancelled your order.');
        }
      }
    } else if (this.state.op == 2) {//accepted
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oID == this.state.oid) {
          const orderHistory = this.state.orderHistory;
          orderHistory[row].status = 'delivered';
          this.setState({orderHistory,});
          alert('You have confirmed your order.');
        }
      }
    }
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  /**
   * After click a button, show a confirmation modal
   *
   * @param x the
   */
  showConfirm(x) {
    this.setState({
      oid: x.oID,
      op: x.status == 'placed' ? 1 : x.status == 'accepted' ? 2 : 0
    });
    if (x.status == 'placed') {
      this.setState({
        title: 'Are you going to cancel the order?',
        modalText: 'Your will cancel the order ' + x.oID + '.',
        visible: true,
      });
    } else if (x.status == 'accepted') {
      this.setState({
        title: 'Are you going to confirm the order?',
        modalText: 'Your will confirm the order ' + x.oID + '.',
        visible: true,
      });
    } else if (x.status == 'delivered') {
      //Link to comment
    }
  }

  render() {
    return (
      <div>
        <Ordertable data={this.state.orderHistory} onClick={(e) =>this.showConfirm(e)}/>
        <Modal title={this.state.title}
               visible={this.state.visible}
               oid={this.state.oid}
               okText={'OK'}
               cancelText={'Cancel'}
               onOk={this.handleOk}
               onCancel={this.handleCancel}>
          <p>{this.state.modalText}</p>
        </Modal>
      </div>
    );
  }
}

export default Orderlist;
