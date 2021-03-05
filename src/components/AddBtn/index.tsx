import React, { useState } from 'react';
import { Add } from '@material-ui/icons';

import {
  ScAddBtnWrap
} from './styles';

function AddBtn() {
  const [ isModal, setIsModal ] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  }

  return (
    <ScAddBtnWrap
      onClick={ handleModal } >

      <Add />
    </ScAddBtnWrap>
  )
}

export default AddBtn;