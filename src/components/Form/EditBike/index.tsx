import React, { useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import config from './../../../config';
import { TextField, Button } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';

// components
import CurrentImages from './CurrentImages';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

function EditBike(){
  // init context to use
  const { currentItem } = useContext(CurrentItemContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm, setDetectAnyFormSubmit } = useContext(FormContext);

  // init history
  // let history = useHistory();

  // form
  const { control, register, handleSubmit, errors, formState } = useForm();
  const { isDirty } = formState;

  // state for preview image (display purpose)
  const [ previewArr, setPreviewArr ] = useState<FileList | any>([]);
  // state for images to be used for api request call
  const [ images, setImages ] = useState<FileList | any>([]);


  // Store image URIs to its state for preview purpose
  const readURI = (event: any) => {
    // Get files and store in array
    const files = [...event.target.files];

    // Map each file to a promise that resolves to an array of image URI's
    Promise.all(files.map( file => {
      return (
        new Promise( (resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (event: any) => {
            resolve(event.target.result);
          })
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        })
      )
    }))
    .then(previews => {
      setPreviewArr([...previewArr, previews]);
    }, error => {        
      console.error(error);
    });
  }


  // handle preview image and state onChange
  const handleChange = (event: any) => {
    // preview image update
    readURI(event);
    // set image state
    setImages([...images, event.target.files[0]]);
  }

  
  // remove images onClick
  const handleRemoveImage = ( index: number ) => {
    // remove preview from its state
    setPreviewArr(previewArr.slice(0, index).concat(previewArr.slice(index + 1, previewArr.length)) );
    // remove image from its state
    setImages(images.slice(0, index).concat(images.slice(index + 1, images.length)));
  }


  // submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const id = currentItem._id;
      const url = config.apiBaseUrl + '/mybikes/' + id + '/edit';

      // construct a set of key/value pairs by js FormData() *FormDate() is important and useful
      const formData: any = new FormData();
      formData.append('name', data.name);
      formData.append('brand', data.brand);
      formData.append('builtby', data.builtby);
      formData.append('desc', data.desc);

      // loop through the images state to append each images info into formData
      for (let i = 0; i < images.length; i++) {
        formData.append('image', images[i]);
      }

      // send request
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 'multipart/form-data' for text and image values together
        },
      })
        .then( response => {
          // console.log(response);
          setDetectAnyFormSubmit(formState.isSubmitSuccessful); // by setting this, MyBikes component can re-render on successful submission which can update the page and show the new item on the list immediately
          handleCloseModal();
          handleCloseForm();
        })
      
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Edit your bike</div>
      
      {/* form 1: this handles deleting current images */}
      <CurrentImages></CurrentImages>

      {/* form 2: this handles new entries include images */}
      <div className="formEditArea">
        <div className="formCurrentImgArea__ttl">Edit fields / Add images</div>
        <form 
          className="form" 
          onSubmit={ handleSubmit(onSubmit) }>

          {/* add image button */}
          <div className="formImageAddBtnWrap">
            <label htmlFor="image" >
              <Button 
                variant="contained" 
                component="span"
                size="small">
                  Add more Images
              </Button>
            </label>
            <input 
              style={{ display: "none" }}
              ref={ register } 
              type="file" 
              id="image" 
              name="image" 
              onChange={ handleChange } />
          </div>

          { // show preview images
            images.length !== 0 ? 
            <div className="formPreviewImgArea">
              {
                previewArr.map( (imageURI: any, index: any) => {
                  return (
                    <div 
                      className="formPreviewImg"
                      key={index}
                      style={{
                        backgroundImage: `url( ${ imageURI } )`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                        }} >

                      <HighlightOff 
                        onClick={ () => handleRemoveImage(index) }
                      />
                    </div>
                  )
                })    
              } 
            </div>
            :
            null
          }

          <Controller 
            name="name"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="name" 
                  name="name"
                  label="Name" 
                  variant="filled"
                  defaultValue={ currentItem.name }
                  helperText={ errors.name ? errors.name.message : null}
                  error={ !!errors.name }
                  />
              </div>
            }
            control={control}
            defaultValue={ currentItem.name }
            rules={{
              required: 'Required',
            }}
          />

          <Controller 
            name="brand"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="brand" 
                  name="brand"
                  label="Brand" 
                  variant="filled"
                  defaultValue={ currentItem.brand }
                  />
              </div>
            }
            control={control}
            defaultValue={ currentItem.brand }
          />

          <Controller 
            name="builtby"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="builtby" 
                  name="builtby"
                  label="Built by" 
                  variant="filled"
                  defaultValue={ currentItem.builtby }
                  />
              </div>
            }
            control={control}
            defaultValue={ currentItem.builtby }
          />

          <Controller 
            name="desc"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="desc" 
                  name="desc"
                  multiline
                  rows={3}
                  rowsMax={4}
                  label="Description" 
                  variant="filled"
                  defaultValue={ currentItem.desc }
                  />
              </div>
            }
            control={control}
            defaultValue={ currentItem.desc }
          />

          {/* submit */}
          <div className="formBtnWrap">
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              disabled={ !isDirty }>Update</Button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default EditBike;