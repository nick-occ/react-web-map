import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

//render identify grid of with row data
const IdentifyGrid = (props) => (
  <div
    className="ag-theme-balham"
    style={{
    height: '500px',
    width: '300px'}}
  >
      <AgGridReact
          enableSorting={true}
          columnDefs={props.columnDefs}
          rowData={props.rowData}
          className="ag-theme-balham"
          style={{
          height: '100px',
          width: '300px'
           }} >
      </AgGridReact>
  </div>
);

export default IdentifyGrid;