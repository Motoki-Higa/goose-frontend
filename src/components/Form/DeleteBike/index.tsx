import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import axios from 'axios';
import config from './../../../config';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';


function DeleteBike(props: any){
  // init context
  const { currentItem } = useContext(CurrentItemContext);

  // init history
  let history = useHistory();

  // delete item and go back to list page
  const handleDelete = () => {
    const id = currentItem._id;
    const url = config.apiBaseUrl + '/mybikes/' + id;

    console.log('Delete this item? : ' + id);

    axios.delete(url)
      .then( (response) => {
        console.log(response.data);
        history.goBack(); // send user back to the list page
      });
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