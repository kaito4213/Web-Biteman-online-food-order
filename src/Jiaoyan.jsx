import React from 'react';

/*
 jiaoyan testpage
 */

var MENU = [
    {did: '1', rid: '1', price: '$49.99',  dname: 'Pad Thai', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'},
    {did: '2', rid: '1', price: '$49.99',  dname: 'crab rangoon', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'},
    {did: '3', rid: '1', price: '$49.99',  dname: 'downpling', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'},
    {did: '4', rid: '1', price: '$49.99',  dname: 'noodle', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'},
    {did: '5', rid: '1', price: '$49.99',  dname: 'fried rice', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'},
    {did: '6', rid: '1', price: '$49.99',  dname: 'chicken wings', discription: 'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts.'}
];

class Jiaoyan extends React.Component {
    render() {
        return (
            <div>
              <h1>The Menu</h1>
              <GetMenuPage menu = {MENU}/>
            </div>
        )
    }
}

class GetMenuPage extends React.Component {
    render() {
        return (
          <div>
              <MenuTable menu = {this.props.menu} />
          </div>
        )
    }
}

class MenuTable extends React.Component {
    render() {
        var rows = []
        this.props.menu.forEach(function(cuision) {
            rows.push(<CuisionRow cuision = {cuision}  key = {cuision.did}/>)
        })

        return(
            <tbody>{rows}</tbody>
        )
    }
}

class CuisionRow extends React.Component {
    render() {
        return(
          /*  <row> */
                <div>
                    <div>
                        <h3>{this.props.cuision.dname}
                            <span> {this.props.cuision.price}</span>
                            <button type="button" onclick={Add}>+Add</button>
                        </h3>
                    </div>
                    <p>Description: {this.props.cuision.discription}</p>
                    <hr></hr>
                </div>
        )
    }
}

function Add(name, price) {

}

export default Jiaoyan;

