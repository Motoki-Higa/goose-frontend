import React from 'react';
import { ArrowBack } from '@material-ui/icons';

import {
  ScArrowBackBtnWrap
} from './styles';

function ArrowBackBtn() {
  return (
    <ScArrowBackBtnWrap>
      <ArrowBack />
    </ScArrowBackBtnWrap>
  )
}

export default ArrowBackBtn;