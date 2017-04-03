import React from 'react';

var ORDER = [
    {oid: '1', rid: '1', price: '$49.99', quantity: '1', dname: 'Pad Thai'},
    {oid: '2', rid: '1', price: '$49.99', quantity: '1', dname: 'crab rangoon'},
    {oid: '3', rid: '1', price: '$49.99', quantity: '1', dname: 'downpling'},
    {oid: '4', rid: '1', price: '$49.99', quantity: '1', dname: 'noodle'},
    {oid: '5', rid: '1', price: '$49.99', quantity: '1', dname: 'fried rice'},
    {oid: '6', rid: '1', price: '$49.99', quantity: '1', dname: 'chicken wings'}
];

var totalPrice = 0

class MyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {order: {ORDER}}
        //this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        var newOrder = []
        this.state.order.forEach(function(row) {
            if(row.oid != e.target.value){
               newOrder.push(row)
            }

            this.setState({order: {newOrder}})
        })

    }

    render() {
        return (
            <div>
                <h1>MY Order</h1>
                <OrderTable order = {this.state.order} />
            </div>

        )
    }
}

//define info in each order row shown on webpage
class OrderTable extends React.Component {
    render() {
        var orderRow = []
        this.props.order.forEach(function(order) {
            orderRow.push(<OrderRow order={order} key = {order.oid} />)
        })

        return(
            <tbody>{orderRow}</tbody>
        )
    }
}

//
class OrderRow extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <h3>{this.props.order.dname}
                        <span> {this.props.order.price}</span>
                        <button type="button" onClick = {this.handleClick}
                                value = {this.props.order.id}>delete</button>
                    </h3>
                </div>
                <hr></hr>
            </div>
        )
    }
}

export default MyOrder;