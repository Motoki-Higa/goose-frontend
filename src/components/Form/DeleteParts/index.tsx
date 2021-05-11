import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Button } from '@material-ui/core';
import axios from 'axios';
import config from './../../../config';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';
import { NotificationContext } from '../../../context/NotificationContext';


function DeleteParts(props: any){
  // context
  const { currentItem } = useContext(CurrentItemContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm, setDetectAnyFormSubmit } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // form
  const { formState } = useForm();

  // delete item and go back to list page
  const handleDelete = () => {
    const url = config.apiBaseUrl + '/bikes/' + currentItem._id + '/parts';

    axios.delete(url)
      .then( (response) => {
        setDetectAnyFormSubmit(formState.isSubmitSuccessful); // by setting this, bbikes component can re-render on successful submission which can update the page and show the new item on the list immediately
          // reset after
          setDetectAnyFormSubmit();

          handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
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

export default DeleteParts;