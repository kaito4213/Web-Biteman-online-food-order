import React from 'react';

/**
 * This is the menu for customer to select different dishes
 *
 * @type {*[]}
 */

/*this is the parent of menu page*/
class CustMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {customerMenu: []};
  }

  componentDidMount() {
    $.ajax({
      url: '/getMenuForCustomer',
      type: 'post',
      data: {restaurantId: this.props.params.rid},
      dataType: 'json',
      success: function (json) {
        debugger;
        let customerMenu = json.MenuForCustomer;
        this.setState({customerMenu: customerMenu});
      }.bind(this),
      error: function (xhr, status, err) {
        debugger;
        console.log(xhr.responseText);
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.rid}</h1>
        <h1>Menu</h1>
        <MenuTable menu={this.state.customerMenu}/>
      </div>
    )
  }
}

/*get each row shown in menu table*/
class MenuTable extends React.Component {
  render() {
    let cusionRows = [];
    this.props.menu.forEach(function (cuision) {
      cusionRows.push(<CuisionRow cuision={cuision} key={cuision.did}/>)
    });

    return (
      <div>
        <tbody>{cusionRows}</tbody>
      </div>

    )
  }
}
/*specify what is shown in each menu row, the price, description....*/
class CuisionRow extends React.Component {
  render() {
    return (
      /*  <row> */
      <div>
        <div>
          <h3>{this.props.cuision.dname}
            <span> {this.props.cuision.price}</span>
            <button type="button">Add</button>
          </h3>
        </div>
        <p>Description: {this.props.cuision.discription}</p>
        <hr/>
      </div>
    )
  }
}


export default CustMenu;

