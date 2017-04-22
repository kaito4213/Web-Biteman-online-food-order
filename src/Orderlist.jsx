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
        <button type="button" onClick={()=>this.props.onOrderRowClick(record)}>{btnLabel}</button>
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
      rows.push(<OrderRow key={rowNum++} product={product} onOrderRowClick={(e)=>this.props.onOrderRowClick(e)}/>);
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
      orderHistory: [],
      modalState: {visible: false}
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

    if (this.state.modalState.op == 1) {//placed
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oid == this.state.modalState.oid) {
          console.log(this.state.modalState.oid);
          const orderHistory = this.state.orderHistory;
          orderHistory[row].status = 'cancelled';
          this.setState({orderHistory,});
          alert('You have cancelled your order.');
        }
      }
    } else if (this.state.modalState.op == 2) {//accepted
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oid == this.state.modalState.oid) {
          const orderHistory = this.state.orderHistory;
          orderHistory[row].status = 'delivered';
          this.setState({orderHistory,});
          alert('You have confirmed your order.');
        }
      }
    }
    this.setState({
      modalState: {visible: false}
    });
  };

  handleCancel = () => {
    this.setState({modalState: {visible: false}});
  };

  /**
   * After click a button, show a confirmation modal
   *
   * @param x the
   */
  showConfirm(x) {
    let op = 0;
    if (x.status == 'placed') {
      op = 1;
    } else if (x.status == 'accepted') {
      op = 2;
    }

    this.setState({
      // modalState: {oid: x.oid, op: op},
      modalState: {
        modalText: 'Your will cancel the order ' + x.oid + '.',
        title: 'Are you going to cancel the order?'
      }
    });

    console.log(this.state.modalState);

    if (x.status == 'placed') {
      this.setState({
        modalState: {
          oid: x.oid,
          op: op,
          // title: 'Are you going to cancel the order?',
          // modalText: 'Your will cancel the order ' + x.oid + '.',
          visible: true
        }
      });
    } else if (x.status == 'accepted') {
      this.setState({
        modalState: {
          oid: x.oid, op: op,
          title: 'Are you going to confirm the order?',
          modalText: 'Your will confirm the order ' + x.oid + '.',
          visible: true
        }
      });
    } else if (x.status == 'delivered') {
      //Link to comment
    }

    // set state
  }

  render() {
    return (
      <div>
        <Ordertable data={this.state.orderHistory} onOrderRowClick={(e) =>this.showConfirm(e)}/>
        <Modal title={this.state.modalState.title}
               visible={this.state.modalState.visible}
               oid={this.state.modalState.oid}
               okText={'OK'}
               cancelText={'Cancel'}
               onOk={this.handleOk}
               onCancel={this.handleCancel}>
          <p>{this.state.modalState.modalText}</p>
        </Modal>
      </div>
    );
  }
}

export default Orderlist;
