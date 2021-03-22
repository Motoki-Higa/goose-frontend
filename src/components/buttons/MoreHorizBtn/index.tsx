import React, { useState, useContext, useEffect } from 'react';
import { MoreHoriz, CloseRounded } from '@material-ui/icons';

// contexts
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

// styles
import {
  ScMoreHoriz,
  ScMoreHorizBtnWrap,
  ScMoreOptionTable
} from './styles';


function MoreHorizBtn({editForm, deleteForm}: any) {
  // state for menu table
  const [ menu, setMenu ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('fadeOut');

  // init context to use
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm } = useContext(FormContext);

  // onClick event: setting which form to use
  const handleModalForm = (formName: string) => {
    handleModal();
    handleSetForm(formName);
  }

  // close the modal and form on browser back
  useEffect( () => {
    window.onpopstate = () => {
      handleCloseModal();
      handleCloseForm();
    }
  }) 

  // handle class and boolean toggle
  const handleMoreOption = () => {
    // fadeClass
    setFadeClass(fadeClass === 'fadeIn' ? 'fadeOut' : 'fadeIn');

    // menu boolean
    const ms = fadeClass === 'fadeOut' ? 0 : 300;
    setTimeout(() => {
      setMenu(fadeClass === 'fadeIn' ? false : true);
    }, ms)
  };

  
  return (
    <ScMoreHoriz>
      <ScMoreHorizBtnWrap onClick={ handleMoreOption }>
        { // toggle button icon
          menu ?
          <CloseRounded />
          :
          <MoreHoriz />
        }
      </ScMoreHorizBtnWrap>

      { // toggle option table
        menu ?
        <ScMoreOptionTable className={ fadeClass }>
          <ul>
            <li onClick={ () => handleModalForm(editForm) }>Edit</li>
            <li onClick={ () => handleModalForm(deleteForm) }>Delete</li>
          </ul>
        </ScMoreOptionTable>
        :
        null
      }
    </ScMoreHoriz>
  )
}

export default MoreHorizBtn;