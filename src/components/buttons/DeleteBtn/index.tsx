import React from 'react';
import { Delete } from '@material-ui/icons';

import {
  ScDeleteBtnWrap
} from './styles';

function EditBtn() {
  return (
    <ScDeleteBtnWrap>
      <Delete />
    </ScDeleteBtnWrap>
  )
}

export default EditBtn;