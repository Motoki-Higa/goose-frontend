import React, { useState, useEffect, useContext } from 'react';

// context
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

// style
import {
  ScTxtArea,
  ScTxtRow,
  ScEditBtnWrap
} from './styles';

function Account(){
  // contenxt
  const { isProfileUpdated, authenticatedUser } = useContext<any>(UserContext);
  const { handleModal } = useContext(ModalContext);
  const { handleSetForm } = useContext(FormContext);

  // onClick event: setting which form to use
  const handleModalForm = (formName: string) => {
    handleModal();
    handleSetForm(formName);
  }

  // state
  const [ userData, setUserData ] = useState<any>();

  useEffect(() => {
    setUserData(authenticatedUser)
  },[isProfileUpdated, authenticatedUser])

  return(
    <>
    {
      userData ?
      <>
        <ScTxtArea>
          <ScTxtRow>
            <p>Email:<span>{ userData.email }</span></p>
          </ScTxtRow>

          <ScTxtRow>
            <p>Name:<span>{ userData.name }</span></p>
          </ScTxtRow>

          <ScTxtRow>
            <p>Username:<span>{ userData.username }</span></p>
          </ScTxtRow>
        </ScTxtArea>

        <ScEditBtnWrap onClick={ () => handleModalForm('EditAccount') }>
          <span>Edit Account</span>
        </ScEditBtnWrap>
      </>
      :
      null
    }
    
    </>
  )
}

export default Account;