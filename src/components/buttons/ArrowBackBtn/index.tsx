import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

// styles
import {
  ScArrowBackBtnWrap
} from './styles';


function ArrowBackBtn() {
  // history
  let history = useHistory();

  // function: back to prev page
  const handlePageBack = () => {
    history.goBack();
  }

  return (
    <ScArrowBackBtnWrap onClick={ handlePageBack }>
      <ArrowBack />
    </ScArrowBackBtnWrap>
  )
}

export default ArrowBackBtn;