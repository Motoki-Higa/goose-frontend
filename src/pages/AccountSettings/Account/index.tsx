import React, { useContext } from 'react';

// context
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

// style
import {
  ScTxtArea,
  ScTxtRow,
  ScBtnBlock,
  ScEditBtnWrap
} from './styles';

function Account(){
  // contenxt
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleModal } = useContext(ModalContext);
  const { handleSetForm } = useContext(FormContext);

  // onClick event: setting which form to use
  const handleModalForm = (formName: string) => {
    handleModal();
    handleSetForm(formName);
  }

  return(
    <>
      <ScTxtArea>
        <ScTxtRow>
          <p>Email:<span>{ authenticatedUser.email }</span></p>
        </ScTxtRow>

        <ScTxtRow>
          <p>Name:<span>{ authenticatedUser.name }</span></p>
        </ScTxtRow>

        <ScTxtRow>
          <p>Username:<span>{ authenticatedUser.username }</span></p>
        </ScTxtRow>
      </ScTxtArea>

      <ScBtnBlock>
        <ScEditBtnWrap onClick={ () => handleModalForm('EditAccount') }>
          <span>Edit Account</span>
        </ScEditBtnWrap>
        <ScEditBtnWrap onClick={ () => handleModalForm('ChangePassword') }>
          <span>Change Password</span>
        </ScEditBtnWrap>
      </ScBtnBlock>

      
    </>
  )
}

export default Account;