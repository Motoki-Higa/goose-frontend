import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import config from './../../../config';


function AddBike(){
  const [ fileURLs, setFileURLs ] = useState<FileList | any>(null);
  const [ files, setFiles ] = useState<FileList | any>(null);
  const { control, register, handleSubmit, errors } = useForm();


  // handle image preview
  const handleChange = (event: any) => {
    // to avoid memory leak, do below
    // URL.revokeObjectURL(fileURLs)

    // this is for image preview purpose
      setFileURLs(URL.createObjectURL(event.target.files[0]));
    
    // this is for storing files to AWS
    setFiles(event.target.files);
  }


  // handle submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const url = config.apiBaseUrl + '/mybikes';

      // construct a set of key/value pairs by js FormData()
      const formData: any = new FormData();
      formData.append('name', data.name);
      formData.append('brand', data.brand);
      formData.append('builtby', data.builtby);
      formData.append('desc', data.desc);

      // *only file infomation needs to be stored in state while selecting
      // loop through the files to append each images into formData
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }
      // console.log([...formData]);

      // request
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 'multipart/form-data' for text and image values together
        },
      })
    } catch(err) {

    }
  };

  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Add a new bike</div>

      <form 
        className="form" 
        onSubmit={ handleSubmit(onSubmit) }>

        <Controller 
          name="name"
          as={
            <div className="formInputWrap">
              <TextField 
                id="name" 
                name="name"
                label="Name" 
                variant="filled"
                helperText={ errors.name ? errors.name.message : null}
                error={ !!errors.name }
                />
            </div>
          }
          control={control}
          defaultValue=""
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
                />
            </div>
          }
          control={control}
          defaultValue=""
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
                />
            </div>
          }
          control={control}
          defaultValue=""
        />

        <Controller 
          name="desc"
          as={
            <div className="formInputWrap">
              <TextField 
                id="desc" 
                name="desc"
                multiline
                rows={4}
                rowsMax={4}
                label="Description" 
                variant="filled"
                />
            </div>
          }
          control={control}
          defaultValue=""
        />



        <input ref={ register } type="file" id="image" name="image" onChange={ handleChange } multiple />

        {/* <label htmlFor="imageUpload">
          <Button variant="contained" color="primary" component="span">
            Upload images
          </Button>
        </label>
        <input
          style={{ display: "none" }}
          id="imageUpload"
          name="image"
          type="file"
          onChange={ handleChange } /> */}

          {
            fileURLs ? 
            // fileURLs.forEach( (thumb: string) => {
            //   return `<img src= ${ thumb } alt="" />`;
            // })
            <img src={ fileURLs } alt="" />
            // console.log(fileURLs)
            :
            null
          }

        

        <div className="formBtnWrap">
          <Button variant="contained" color="primary" type="submit" >Submit</Button>
        </div>

      </form>
    </div>
  )
}

export default AddBike;