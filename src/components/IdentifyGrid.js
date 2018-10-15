import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

//render identify grid of with row data
const IdentifyGrid = (props) => {
    const columnDefs = [
        {headerName: "Field", field: "field", width: 125},
        {headerName: "Value", field: "value", width: 125}
    ];

    return (
        <div
            className="ag-theme-balham identify-grid"
        >
            <AgGridReact
                enableSorting={true}
                enableColResize={true}
                columnDefs={columnDefs}
                rowData={props.rowData}
                >
            </AgGridReact>
        </div>
    );
}
export default IdentifyGrid;