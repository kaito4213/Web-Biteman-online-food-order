import React, {Component} from 'react';
import {Modal} from 'antd';
import OrderTable from './OrderTable';

/**
 * Customer's Order history
 * To Do:
 * PROBLEM1: PAGEINATION
 * PROBLEM2: REMOTE DATASOURCE
 */

/**
 * Component display all of the order related information
 *
 * A list of orders + A interactive modal
 */
class OrderList extends Component {
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

    // get all of the orders associated to this customer
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

  /**
   * Handle events after user did some operations.
   */
  handleOk = () => {
    let len = this.state.orderHistory.length;

    if (this.state.modalState.orderOperation === 1) {
      // the user wants to cancel the order
      // the status of the order should change from placed to cancelled
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oid === this.state.modalState.oid) {
          console.log(this.state.modalState.oid);
          // if we want to delete data, we can use post
          const orderId = this.state.modalState.oid;
          const newOrderStatus = 'cancelled';
          $.ajax({
            url: '/updateOrderStatusCustomer',
            type: 'post',
            dataType: 'json',
            data: {orderId: orderId, newOrderStatus: newOrderStatus},
            success: function (json) {
              // isUpdateOrderStatusSuccess passed back from back end is a boolean
              if (json.isUpdateOrderStatusSuccess) {
                let updatedOrderHistory = this.state.orderHistory.slice(0);
                updatedOrderHistory[row].status = 'cancelled';
                this.setState({orderHistory: updatedOrderHistory});
              } else {
                // if the code goes here, something wrong when updating the order status
                // so nothing changed here, but we should let customer know. Not now =)
              }

            }.bind(this),
            error: function (xhr, status, err) {
              debugger;
              // oop, something bad happened =(
              console.log(xhr.responseText);
              console.log(err);
            }.bind(this)
          });
          break;
        }
      }
    } else if (this.state.modalState.orderOperation === 2) {
      // accepted, what is this?
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].oid === this.state.modalState.oid) {
          const orderHistory = this.state.orderHistory;
          orderHistory[row].status = 'finished';
          this.setState({orderHistory: orderHistory});
        }
      }
    }
    this.setState({
      modalState: {visible: false}
    });
  };

  /**
   * Cancel the operation on the pop up modal, so we just close the modal
   */
  handleCancel = () => {
    // let's try not to modify the previous state
    let updatedModalState = Object.assign({}, this.state.modalState);
    updatedModalState.visible = false;
    this.setState({modalState: updatedModalState});
  };

  /**
   * After click a button, show a confirmation modal
   *
   * @param orderData the
   */
  showConfirm(orderData) {
    // the operation did on the order
    let orderOperation = 0;
    let orderId = orderData.oid;
    let modalText = '';
    let modalTitle = '';
    // default show modal
    let isModalVisible = true;

    if (orderData.status === 'placed') {
      orderOperation = 1;
    } else if (orderData.status === 'accepted') {
      orderOperation = 2;
    }

    if (orderData.status === 'placed') {
      modalTitle = 'Are you going to cancel the order?';
      modalText = 'Your will cancel the order ' + orderId + '.';
      isModalVisible = true;
    } else if (orderData.status === 'accepted') {
      modalTitle = 'Are you going to confirm the order?';
      modalText = 'Your will confirm the order ' + orderId + '.';
      isModalVisible = true;
    } else if (orderData.status === 'delivered') {
      //Link to comment
    }

    this.setState({
      modalState: {
        oid: orderId,
        orderOperation: orderOperation,
        title: modalTitle,
        modalText: modalText,
        visible: isModalVisible
      }
    });

  }

  render() {
    return (
      <div>
        <OrderTable orderHistory={this.state.orderHistory} onOrderRowClick={(e) => this.showConfirm(e)}/>
        <Modal
          title={this.state.modalState.title}
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

export default OrderList;
