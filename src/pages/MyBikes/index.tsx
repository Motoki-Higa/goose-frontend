import React, { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';
import axios from 'axios';
import config from './../../config';

// components
import AddBtn from '../../components/buttons/AddBtn';
import SearchBar from './../../components/SearchBar';
import ItemList from '../../components/ItemList';

// styles
import {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
} from './styles';


function MyBikes() {

  interface IMyBikes {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
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
        // console.log(response.data);
        setMyBikes(response.data);
      });

    })()
  }, [detectAnyFormSubmit]) // detectAnyFormSubmit makes sure to re-render useEffect

  return (
    <>
      <h1 className="Title">My Bikes</h1>

      {/* utility bar: AddBtn & SearchBar & Total number */}
      <ScUtils>
        <ScUtilsInner>
          <div onClick={ handleModalForm }>
            <AddBtn />
          </div>
          
          <SearchBar />
        </ScUtilsInner>

        <ScUtilsCounter>Total: { myBikes.length }</ScUtilsCounter>
      </ScUtils>

      {/* Send data to ItemList component */}
      <ItemList 
        items={ myBikes }
        route={ '/mybikes' } />
    </>
    
  )
}

export default MyBikes;