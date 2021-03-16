import React, { useContext } from 'react';
import axios from 'axios';
import config from './../../../../config';
import { HighlightOff } from '@material-ui/icons';

// contexts
import { CurrentItemContext } from '../../../../context/CurrentItemContext';

function CurrentImages() {
  // init context to use
  const { currentItem } = useContext(CurrentItemContext);

  // delete an image from current image stack
  const handleDeleteImage = async (imageKey: string) => {
    try {
      // endpoint
      const id = currentItem._id;
      const url = config.apiBaseUrl + '/mybikes/edit/' + id;

      // send request
      await axios.post(url, {'key': imageKey})
        .then( response => {
          console.log(response);
          // setDetectAnyFormSubmit(formState.isSubmitSuccessful); // by setting this, MyBikes component can re-render on successful submission which can update the page and show the new item on the list immediately
          // handleCloseModal();
          // handleCloseForm();
        })
      
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    {
      currentItem.images.length !== 0 ? 
      <div className="formCurrentImgArea">
        <div className="formCurrentImgArea__ttl">Current images</div>
        <div className="formCurrentImgArea__inner">
        {
          currentItem.images.map( (image: any, index: number) => {
            return (
              <div 
                className="formPreviewImg"
                key={index} >

                <img 
                  className="photo-uploaded" 
                  src={image.location} 
                  alt="uploaded" />

                <HighlightOff onClick={ () => handleDeleteImage(image.key) } />
              </div>
            )
          })    
        } 
        </div>
      </div>
      :
      null
    }
    </>
  )
}

export default CurrentImages;