import React from 'react';
import IdentifyGrid from './IdentifyGrid';

import $ from 'jquery';

const  IdentifyCard = (props) => {
  
  const handleClick = (e) => {
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
  }

  const handleClose = () => $('.identify-card').css('display', 'none');
  
  const buttonVisible = () => {
    setVisibility($('#prev-rec-selector'), props.currentRecord === 0 ? 'hidden' : 'visible');
    setVisibility($('#next-rec-selector'), props.currentRecord + 1 === props.totalRecords ? 'hidden' : 'visible');
  }

  const setVisibility = (tag, visibility) => tag.css('visibility',visibility);
  
  buttonVisible();
  
  return (
  <div className='identify-card'>
        <div className='card'>
              <button className='btn btn-sm btn-primary col-sm-2 offset-sm-11 identify-close' onClick={handleClose}>X</button>
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
}

export default IdentifyCard;
