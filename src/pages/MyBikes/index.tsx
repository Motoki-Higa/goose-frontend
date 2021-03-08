import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';

import AddBtn from './../../components/AddBtn';
import SearchBar from './../../components/SearchBar';

import {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
} from './styles';


function MyBikes() {
  // destructure context to use
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm } = useContext(FormContext);

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

    </>
    
  )
}

export default MyBikes;