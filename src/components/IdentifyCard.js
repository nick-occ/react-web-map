import React from 'react';

import IdentifyGrid from './IdentifyGrid';

const  IdentifyCard = (props) => {

    //click event to navigate through records
    const handleClick = (e) => {
        //get prev or next record
        switch(e.target.id) {
          case 'prev-rec-selector':
            props.getRec('prev');
            break;
          case 'next-rec-selector':
            props.getRec('next');
            break;
          default:
            break;
        }
        buttonVisible();
    };

    //check button visibility
    const buttonVisible = () => {
        setVisibility($('#prev-rec-selector'), props.currentRecord === 0 ? 'hidden' : 'visible');
        setVisibility($('#next-rec-selector'), props.currentRecord + 1 === props.totalRecords ? 'hidden' : 'visible');
    };

    //set button visibility based on the current record
    const setVisibility = (tag, visibility) => tag.css('visibility',visibility);
  
    buttonVisible();
  
    return (
      <div className='identify-card'>
            <div className='card'>
                  <h3 className='card-title'>{props.identifyLayer}</h3>
                  <div className='identify-selector'>
                    <button className='btn btn-sm btn-primary id-rec-selector' id='prev-rec-selector' onClick={handleClick}>&lt;</button>
                    <label>Record {props.currentRecord + 1} of {props.totalRecords} </label>
                    <button className='btn btn-sm btn-primary id-rec-selector'  id='next-rec-selector' onClick={handleClick}>&gt;</button>
                  </div>
                  <IdentifyGrid
                    columnDefs = {props.columnDefs}
                    rowData = {props.rowData}
                  />
            </div>
      </div>
      );
};

export default IdentifyCard;