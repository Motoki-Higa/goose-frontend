import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Add } from '@material-ui/icons';

import {
  ScAddBtnWrap
} from './styles';

// NOTE: this AddBtn is linked to modal
// This AddBtn component should be used for adding items with a form which will be shown with a modal

function AddBtn() {
    // init context to use
    const context = useContext(ModalContext);

    const modalToggle = () => {
      context.handleModal();
    }

  return (
    <ScAddBtnWrap onClick={ modalToggle }>
      <Add />
    </ScAddBtnWrap>
  )
}

export default AddBtn;