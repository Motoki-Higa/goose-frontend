import React, { useContext } from 'react';

// context
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

// styles
import {
  ScProfile,
  ScProfileImg,
  ScProfileTxtArea,
  ScProfileName,
  ScProfileBio,
  ScProfileWebsite,
  ScBtnBlock,
  ScBtnWrap,
  ScBtn
} from './styles';

function Profile(){
  // contenxt
  const { authUserProfile } = useContext<any>(UserContext);
  const { handleModal } = useContext(ModalContext);
  const { handleSetForm } = useContext(FormContext);

  // onClick event: setting which form to use
  const handleModalForm = (formName: string) => {
    handleModal();
    handleSetForm(formName);
  }

  return(
    <>
      <ScProfile>
        <ScProfileImg 
          style={{backgroundImage:`url(${ authUserProfile.image ? authUserProfile.image.location : null})`}}/>

        <ScProfileTxtArea>
          <ScProfileName>{ authUserProfile.username }</ScProfileName>
          <ScProfileBio>{ authUserProfile.bio }</ScProfileBio>
          <ScProfileWebsite>
            <a 
              href={ authUserProfile.website }
              rel="noreferrer"
              target="_blank" >{ authUserProfile.website.replace(/^https?:\/\//i, "") }</a>
          </ScProfileWebsite>
        </ScProfileTxtArea>
      </ScProfile>

      <ScBtnBlock>
        <ScBtnWrap onClick={ () => handleModalForm('EditProfile') }>
          <ScBtn>Edit Profile</ScBtn>
        </ScBtnWrap>
      </ScBtnBlock>
    </>
  )
}

export default Profile;