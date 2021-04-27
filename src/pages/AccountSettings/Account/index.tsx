import React, { useContext } from 'react';
import { Edit } from '@material-ui/icons';

// context
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

// style
import {
  ScTable,
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
      <ScTable>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{ authenticatedUser.email }</td>
            <td>
              <Edit onClick={ () => handleModalForm('EditAccount') }></Edit>
            </td>
          </tr>
        </tbody>
      </ScTable>

      <ScTable>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{ authenticatedUser.name }</td>
            <td rowSpan={2}>
              <Edit onClick={ () => handleModalForm('EditAccount') }></Edit>
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{ authenticatedUser.username }</td>
          </tr>
        </tbody>
      </ScTable>

      <ScBtnBlock>
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