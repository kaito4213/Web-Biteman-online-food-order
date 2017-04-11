        const ReactDataGrid = require('react-data-grid');
        const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
        const React = require('react');

        const Menu = React.createClass({
            getInitialState() {
                this._columns = [
                    {
                        key: 'id',
                        name: 'ID',
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
                        key: 'Star',
                        name: 'Star',
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
                    {
                        key: 'LUD',
                        name: 'Last Update Date',
                        editable: true,
                        filterable: true,
                        sortable: true
                    }
                ];

                return {rows: this.createRows(1000), filters: {}, sortColumn: null, sortDirection: null};
            },
            getRandomDate(start, end) {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
            },
            createRows(numberOfRows) {
                let rows = [];
                for (let i = 1; i < numberOfRows; i++) {
                    rows.push({
                        id: i,
                        DName: 'Dish ' + i,
                        Price: Math.min(100, Math.round(Math.random() * 110)),
                        Star: ['Excellent', 'Good', 'Average', 'Bad'][Math.floor((Math.random() * 3) + 1)],
                        Category: ['Mexican', 'American', 'French', 'Chinese'][Math.floor((Math.random() * 3) + 1)],
                        LUD: this.getRandomDate(new Date(2015, 3, 1), new Date()),

                    });
                }
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
                    let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
                    rows[i] = updatedRow;
                }

                this.setState({rows});
            },

            handleGridSort(sortColumn, sortDirection) {
                this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
            },

            handleFilterChange(filter) {
                let newFilters = Object.assign({}, this.state.filters);
                if (filter.filterTerm) {
                    newFilters[filter.column.key] = filter;
                } else {
                    delete newFilters[filter.column.key];
                }
                this.setState({ filters: newFilters });
            },

            onClearFilters() {
                // all filters removed
                this.setState({filters: {} });
            },

            render() {
                return (
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        enableCellSelect={true}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.getSize()}
                        minHeight={500}
                        toolbar={<Toolbar enableFilter={true}/>}
                        onAddFilter={this.handleFilterChange}
                        onClearFilters={this.onClearFilters}
                        onGridRowsUpdated={this.handleGridRowsUpdated}/>)
            }
        });


export default Menu;
