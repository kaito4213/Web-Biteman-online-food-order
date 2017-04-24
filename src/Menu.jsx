const ReactDataGrid = require('react-data-grid');
const {Toolbar, Data: {Selectors}} = require('react-data-grid-addons');
const React = require('react');
const update = require('immutability-helper');

let UpdatedData = []; // 'did' + updated attributes
let DeleteRows = [];  // corresponding 'did' of the rows deleted
let InsertRows = [];  // no 'did' ! only the attributes users write in
const Menu = React.createClass({

  getInitialState() {
    this._columns = [
      {
        key: 'RowNum',
        name: 'RowNum',
        width: 80,
        filterable: true
      },
      {
        key:'thumbnail',
        name:'Thumbnail',
        width:100,
        editable: true
      },
      {
        key: 'did',
        name: 'DID',
        width: 80,
        filterable: true
      },
      {
        key: 'DName',
        name: 'Dish name',
        editable: true,
        filterable: true,
        sortable: true
      },
      {
        key: 'Description',
        name: 'Description',
        editable: true,
        filterable: true,
        sortable: true
      },
      {
        key: 'Category',
        name: 'Category',
        editable: true,
        filterable: true,
        sortable: true
      },
      {
        key: 'Price',
        name: 'Price',
        editable: true,
        filterable: true,
        sortable: true
      },
    ];

    return {rows: this.createRows(10), filters: {}, sortColumn: null, sortDirection: null, selectedIndexes: []};
  },

  createRows(numberOfRows) {
///////////////// plug data from database into 'rows' here/////////////////////

    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        RowNum: i,
        did: i,
        Description: ['Excellent', 'Good', 'Average', 'Bad'][Math.floor((Math.random() * 3) + 1)],
        DName: 'Dish ' + i,
        Price: Math.min(100, Math.round(Math.random() * 110)),
        Category: ['Mexican', 'American', 'French', 'Chinese'][Math.floor((Math.random() * 3) + 1)],
      });
    }
    /////////////////////////////////////////////////////////////////////////////
    return rows;
  },
  getRows() {
    return Selectors.getRows(this.state);
  },
  getSize() {
    return this.getRows().length;
  },
  rowGetter(rowIdx) {
    let rows = this.getRows();
    return rows[rowIdx];
  },
  handleGridRowsUpdated({fromRow, toRow, updated}) {
    let rows = this.state.rows.slice();
    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
      // the line above may cause inconsistency since we don't have constraints in the front-end. But it saves I/O
      if (updated.hasOwnProperty("did")) {      // rows from database all have did, but the ones to be inserted don't
        updated.Price = parseFloat(updated.Price);
        if (updated.hasOwnProperty("Price")) {
          updated.Price = parseFloat(updated.Price);
        }
        updated.did = rowToUpdate.did;
        UpdatedData.push(
          updated
        );
      }
      else {
        InsertRows.push(updated)
      }
    }
    this.setState({rows});//////////////reset state ///////////////////////
  },
  handleAddRow({newRowIndex}){
    let rows = this.state.rows.slice();
    const newRow = {
      RowNum: rows.length + 1,
      value: newRowIndex
    };
    rows = update(rows, {$push: [newRow]});
    this.setState({rows});
  },
  handleGridSort(sortColumn, sortDirection) {
    this.setState({sortColumn: sortColumn, sortDirection: sortDirection});
  },
  handleFilterChange(filter) {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({filters: newFilters});
  },
  onClearFilters() {
    // all filters removed
    this.setState({filters: {}});
  },
  onRowsSelected(rows) {
    debugger;
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  },
  onRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1)});
  },
  handleDeleteRow(){
    debugger;
    let rows = this.state.rows.slice();
    let a = this.state.selectedIndexes;
    for (let i = 0; i < a.length; i++) {
      DeleteRows.push({did: rows[a[i]].did})
    }
    ///////////////////////////      reset state///////////////////////
  },
  render() {
    const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return (
      <div>
        <span>{this.state.selectedIndexes.length} {rowText} selected</span>
        <button onClick={this.handleDeleteRow}>Delete</button>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true} onAddRow={this.handleAddRow} onDelRow={this.handleDeleteRow}/>}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowKey="RowNum"  ///////////////////////
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}/>
      </div>
    );
  }
});
export default Menu;
