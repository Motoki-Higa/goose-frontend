import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

// contexts
import { CurrentItemIdContext } from '../../../context/CurrentItemIdContext';

function DeleteBike(){
  // currentBike context
  const { currentItemId } = useContext(CurrentItemIdContext);

  const handleDelete = () => {
    console.log('Delete this item? : ' + currentItemId);
  }

  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Are you sure?</div>

      {/* submit */}
      <div className="formBtnWrap">
        <Button 
          variant="contained" 
          color="primary"
          onClick={ handleDelete } >Delete</Button>
      </div>
    </div>
  )
}

export default DeleteBike;