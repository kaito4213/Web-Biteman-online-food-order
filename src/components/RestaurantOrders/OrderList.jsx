import React, {Component} from 'react';
import {Modal} from 'antd';
import OrderTable from './OrderTable';

/**
 * Component displays all of the orders of a customer
 *
 * A list of orders + A interactive modal
 */
class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      orderHistory: [],
      orderDetail:[],
      modalState: {visible: false}
    };
    this.showConfirm = this.showConfirm.bind(this);
  }

  componentDidMount() {
    // get restaurantId  globally
    let restaurantId = localStorage.getItem('customerID');
    debugger;

    // get all of the orders associated to this customer
    $.ajax({
      url: '/getRestaurantOrders',
      type: 'post',
      data: {restaurantId: restaurantId},
      dataType: 'json',
      success: function (json) {
        debugger;
        let orderHistory = json.restaurantOrdersData.restaurantOrders;
        let orderDetail = json.restaurantOrdersData.orderDetails;
        this.setState({orderHistory: orderHistory,orderDetail:orderDetail});
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
        if (this.state.orderHistory[row].orderId === this.state.modalState.oid) {
          console.log(this.state.modalState.oid);
          // if we want to delete data, we can use post
          const orderId = this.state.modalState.oid;
          const newOrderStatus = 'Accepted';

          $.ajax({
            url: '/updateOrderStatusCustomer',
            type: 'post',
            dataType: 'json',
            data: {orderId: orderId, newOrderStatus: newOrderStatus},
            success: function (json) {
              debugger;
              // isUpdateOrderStatusSuccess passed back from back end is a boolean
              if (json.isUpdateOrderStatusSuccess) {
                let updatedOrderHistory = this.state.orderHistory.slice(0);
                updatedOrderHistory[row].orderStatus = 'Accepted';
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
      // the user confirmed and finished the order
      // the status of the order should change from confirmed to finished
      for (let row = 0; row < len; row++) {
        if (this.state.orderHistory[row].orderId === this.state.modalState.oid) {
          console.log(this.state.modalState.oid);
          // if we want to delete data, we can use post
          const orderId = this.state.modalState.oid;
          const newOrderStatus = 'Delivered';
          $.ajax({
            url: '/updateOrderStatusCustomer',
            type: 'post',
            dataType: 'json',
            data: {orderId: orderId, newOrderStatus: newOrderStatus},
            success: function (json) {
              // isUpdateOrderStatusSuccess passed back from back end is a boolean
              if (json.isUpdateOrderStatusSuccess) {
                let updatedOrderHistory = this.state.orderHistory.slice(0);
                updatedOrderHistory[row].orderStatus = 'Delivered';
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
    let orderId = orderData.orderId;
    let modalText = '';
    let modalTitle = '';
    // default show modal
    let isModalVisible = true;

    if (orderData.orderStatus === 'Placed') {
      orderOperation = 1;
    } else if (orderData.orderStatus === 'Accepted') {
      orderOperation = 2;
    }

    if (orderData.orderStatus === 'Placed') {
      modalTitle = 'Are you going to confirm the order?';
      modalText = 'Your will confirm the order ' + orderId + '.';
      isModalVisible = true;
    } else if (orderData.orderStatus === 'Accepted') {
      modalTitle = 'Are you going to deliver the order?';
      modalText = 'Your will deliver the order ' + orderId + '.';
      isModalVisible = true;
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
        <OrderTable orderDetail={this.state.orderDetail} orderHistory={this.state.orderHistory} onOrderRowClick={(e) => this.showConfirm(e)}/>
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
