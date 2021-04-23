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
  ScBtnWrap,
  ScBtn
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
        <ScBtnWrap>
          <ScBtn onClick={ () => handleModalForm('EditAccount') } >Edit Account</ScBtn>
        </ScBtnWrap>
        <ScBtnWrap>
          <ScBtn onClick={ () => handleModalForm('ChangePassword') } >Change Password</ScBtn>
        </ScBtnWrap>
        <ScBtnWrap>
          <ScBtn onClick={ () => handleModalForm('DeleteAccount') } >Delete Account</ScBtn>
        </ScBtnWrap>
      </ScBtnBlock>

      
    </>
  )
}

export default Account;