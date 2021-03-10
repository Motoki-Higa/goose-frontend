import React, { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';
import axios from 'axios';
import config from './../../config';

import AddBtn from './../../components/AddBtn';
import SearchBar from './../../components/SearchBar';

import {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
} from './styles';


function MyBikes() {

  interface IImages {
    key: string;
    location: string;
  }

  interface IMyBikes {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: IImages;
  }

  // state : mybikes
  const [ myBikes, setMyBikes ] = useState<IMyBikes[]>([]);
  
  // destructure context to use
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm, detectAnyFormSubmit } = useContext(FormContext);

  // AddBtn onClick event
  const handleModalForm = () => {
    handleModal();
    handleSetForm('AddBike');
  }

  // close the modal and form on browser back
  useEffect( () => {
    window.onpopstate = () => {
      handleCloseModal();
      handleCloseForm();
    }
  }) 

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/mybikes';

      await axios.get(url)
      .then( (response) => {
        console.log(response.data);
        setMyBikes(response.data);
      });

    })()
  }, [detectAnyFormSubmit])

  return (
    <>
      <h1 className="Title">My Bikes</h1>

      <ScUtils>
        {/* Add buttn & search */}
        <ScUtilsInner>
          <div onClick={ handleModalForm }>
            <AddBtn />
          </div>
          
          <SearchBar />
        </ScUtilsInner>
        {/* number of items */}
        <ScUtilsCounter>Item: </ScUtilsCounter>
      </ScUtils>

      {
        myBikes.map( (bike, index) => 
          <div key={index}>{bike.name} {bike.brand}</div>
        )
      }

    </>
    
  )
}

export default MyBikes;