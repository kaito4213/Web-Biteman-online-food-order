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
        this.state = {order: order};
    }

    deleteOrder(orderId) {
        debugger;
        let order = [];
        this.state.order.forEach(function (row) {
            if (row.oid != orderId) {
                order.push(row);
            }

            this.setState({order});
        }.bind(this))

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
        debugger;
        super(props);
    }

    render() {
        let orderRow = [];
        this.props.order.forEach(function (order) {
            orderRow.push(<OrderRow order={order} key={order.oid} deleteOrder={this.props.deleteOrder.bind(this)}/>)
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
        let orderId = e.target.value;
        this.props.deleteOrder(orderId);
    }

    render() {
        return (
            <tr>
                <td>
                    <h3>{this.props.order.dname}
                        <span> {this.props.order.price}</span>
                        <button type="button" value={this.props.order.oid} onClick={this.handleDeleteOrder.bind(this)}>Delete
                        </button>
                    </h3>
                </td>
            </tr>
        )
    }
}

export default MyOrder;