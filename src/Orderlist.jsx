import React, {Component} from 'react';
import {Link} from 'react-router';
import Home from './Home';
import {Modal} from 'antd';
//import './css/antd.scss';

/**
 * Order history
 * To Do:
 * PROBLEM1: PAGEINATION
 * PROBLEM2: REMOTE DATASOURCE
 */

class OrderRow extends Component {
  render() {
		var record = this.props.product;
		var btnlabel = record.status=='placed'? 'cancel':record.status=='accepted'?'confirm':record.status=='delivered'?'comment':'';
		//status:{placed(cancel),accepted(confirm),delivered(comment),finished}
		var btn=[];
		if (btnlabel !=''){btn=(
				<button class="button" onClick={()=>this.props.onClick(record)}>{btnlabel}</button>
			)}
    return (<tr>
					<td>{record.oID}</td>
					<td>{record.rName}</td>
					<td>{record.odate}</td>
					<td>{record.otime}</td>
					<td>{record.sum}</td>
					<td>{record.status}</td>
					<td>{btn}</td></tr>
				);
			}
  }


class Ordertable extends Component {
  render() {
    var rows = [];
    this.props.data.forEach((product) => {
      rows.push(<OrderRow product={product} onClick={(e)=>this.props.onClick(e)}/>);
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

//data can be array or DataSource object
var data = [];
for (let i=0; i<20; i++) {
  data.push({
    oID: i,
    rName: 'Pho' + i,
		odate: '04/01/17',
		otime: 'time',
    sum: 10+i,
    status: (i%4)? (i%4==1)?'placed':(i%4==2)?'delivered':'finished':'accepted',
  });
}


class Orderlist extends Component {
	constructor() {
		super();
		this.state= {
			dataSource: data,
			visible: false,
		};
		this.showConfirm = this.showConfirm.bind(this);
		//this.handleOk = this.handleOk.bind(this);
		//this.handleCancel = this.handleCancel.bind(this);
	}

  handleOk = () => {
		let len=this.state.dataSource.length;
		if(this.state.op==1){//placed
			for(var row=0;row<len;row++){
				if(this.state.dataSource[row].oID==this.state.oid){
					const dataSource=this.state.dataSource;
					dataSource[row].status='cancelled';
					this.setState({dataSource,});
					alert('You have cancelled your order.');			
				}
			};
		}else if(this.state.op==2){//accepted
			for(var row=0;row<len;row++){
				if(this.state.dataSource[row].oID==this.state.oid){
					const dataSource=this.state.dataSource;
					dataSource[row].status='delivered';
					this.setState({dataSource,});
					alert('You have confirmed your order.');				
				}
			};
		};
    this.setState({
			visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

	showConfirm(x){
    this.setState({
      oid: x.oID,
			op: x.status=='placed'? 1:x.status=='accepted'? 2:0
    });
		if(x.status=='placed'){
			this.setState({
				title: 'Are you going to cancel the order?',
				modalText: 'Your will cancel the order '+x.oID+'.',
				visible:true,
			});
		}else if(x.status=='accepted'){
			this.setState({
				title: 'Are you going to confirm the order?',
				modalText: 'Your will confirm the order '+x.oID+'.',
				visible:true,
			});
		}else if(x.status=='delivered'){
			//Link to comment
		};
	}

	render(){
		return (
			<div>
			<Ordertable 
				data={this.state.dataSource} onClick={(e) =>this.showConfirm(e)}
			/>
        <Modal title={this.state.title} visible={this.state.visible}
					oid={this.state.oid} okText={'OK'} cancelText={'Cancel'}
          onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>{this.state.modalText}</p>
        </Modal>
			</div>
		);
	}
}

export default Orderlist;
