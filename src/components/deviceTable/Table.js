import React, { Component } from 'react';
import './Table.css';
import { MDBDataTable, MDBBtn } from 'mdbreact';


const columnsDescription = [
    {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 30
    },
    {
        label: 'Наименование',
        field: 'name',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Производитель',
        field: 'manufacturer',
        sort: 'asc',
        width: 200
    },
    {
        label: 'Адрес',
        field: 'address',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Вкл/Выкл',
        field: 'state',
        sort: 'asc',
        width: 30
    },
    {
        label: 'Сменить состояние',
        field: 'btn',
        width: 30
    }
];

// TODO: add lazy table loading
class DeviceTable extends Component {
    render() {
        const mappedData = this.props.data.map(row => {
            const stateElem = <MDBBtn rounded color="danger" onClick={() => this.props.trigger(row.id, row.state)} >Trigger</MDBBtn>;
            return { ...row, btn: stateElem };
        });
        const tableData = { columns: columnsDescription, rows: mappedData };
        return (
            <div>
                {/* TODO: fix ordering in table. Order work fine on table, but not icons at any of columns present */}
                <MDBDataTable
                    striped
                    bordered
                    small
                    className="center-text"
                    data={tableData}
                />
            </div>
        );
    }
}

export default DeviceTable;