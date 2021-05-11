import React, { useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import config from './../../../config';
import { TextField, Button } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';
import { NotificationContext } from '../../../context/NotificationContext';


function EditParts(){
  // context
  const { currentItem } = useContext(CurrentItemContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm, setDetectAnyFormSubmit } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ message, setMessage ] = useState();
  const [ parts, setParts ] = useState(currentItem.parts);

  // form
  const { control, handleSubmit, errors, formState } = useForm();
  const { isDirty } = formState;


  function addFieldRow(){
    setParts( [...parts, { cat: "", name: "" }] );
  }

  function removeFieldRow(index: number){
    // remove parts from its state
    setParts(parts.slice(0, index).concat(parts.slice(index + 1, parts.length)));
  }

  // create UI
  function createUI(){
    return (
      parts.map((el: any, index: number) => {
        return ( 
          <div className="formPairField" key={ index }>
            <Controller 
              name={ `item${index}[cat]` }
              as={
                <div className="formInputWrap">
                  <TextField 
                    // id={ `cat${index}` } 
                    name={ `item${index}[cat]` }
                    label="Category" 
                    variant="filled"
                    defaultValue={ el.cat }
                    helperText={ errors[`item${index}`] ? errors[`item${index}`].message : null}
                    error={ !!errors[`item${index}`] }
                    />
                </div>
              }
              control={control}
              defaultValue={ el.cat }
              rules={{
                required: 'Required',
              }}
            />
            <Controller 
              name={ `item${index}[name]` }
              as={
                <div className="formInputWrap">
                  <TextField 
                    // id={ `name${index}` } 
                    name={ `item${index}[name]` }
                    label="Name" 
                    variant="filled"
                    defaultValue={ el.name }
                    helperText={ errors[`item${index}`] ? errors[`item${index}`].message : null}
                    error={ !!errors[`item${index}`] }
                    />
                </div>
              }
              control={control}
              defaultValue={ el.name }
              rules={{
                required: 'Required',
              }}
            />
            <HighlightOff onClick={ () => removeFieldRow(index) }/>
          </div>
        )
      })
    )
  }

  // submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const url = config.apiBaseUrl + '/bikes/' + currentItem._id + '/parts';

      // Object.entries() method returns an array of a given object's own enumerable string-keyed property
      const dataArray: any = Object.entries(data);

      // send request
      await axios({
        method: 'put',
          url: url,
          data: {
            parts: dataArray.map( (item: any) => item[1] ), // i.e [{key: value}, {key: value}]
          }
      })
        .then( response => {
          setDetectAnyFormSubmit(formState.isSubmitSuccessful); // by setting this, bbikes component can re-render on successful submission which can update the page and show the new item on the list immediately
          // reset after
          setDetectAnyFormSubmit();

          handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
        })

    } catch(err) {
      setMessage(err.response.data.message);
    }
  }

  // useEffect( () => {
  //   console.log(currentItem.parts);
  //   setParts(currentItem.parts);
  // },[])

  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Edit components</div>

      {
        message ? 
        <div className="formErrorMsg">{ message }</div>
        : 
        null
      }

      <form 
        className="form" 
        onSubmit={ handleSubmit(onSubmit) }>

        { createUI() }

        {/* add image button */}
        <div className="formAddPairFieldBtn">
          <Button 
            variant="contained" 
            onClick={ addFieldRow } >Add more</Button>
        </div>
        
        {/* submit */}
        <div className="formBtnWrap">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={ !isDirty } >Submit</Button>
        </div>
      </form>
      
    </div>
  )
}

export default EditParts;