import React, { useContext, useState, useEffect } from 'react';

// context
import { UserContext } from '../../../context/UserContext';

import {
  ScFollowBtn
} from './styles'

function FollowBtn(props: any){
  // state
  const [ isFollowing, setIsFollowing ] = useState(false);
  const [ activeClass, setActiveClass ] = useState('');
  const [ btnText, setBtnText ] = useState('Follow');

  // context
  const { authUserFollowing, handleFollowingUpdate } = useContext(UserContext);

  // update following db in context
  const handleFollowUser = () => {
    handleFollowingUpdate(props.userId, isFollowing);
  }


  useEffect(() => {
    const userId = props.userId;

    // if following this user you are visiting, then set true
    if (authUserFollowing.includes(userId)){
      setIsFollowing(true);
      setActiveClass('following');
      setBtnText('Following');
    } else {
      setIsFollowing(false);
      setActiveClass('');
      setBtnText('Follow');
    }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.userId, authUserFollowing])

  return (
    <ScFollowBtn 
      onClick={ handleFollowUser } 
      className={ activeClass } >{ btnText }</ScFollowBtn>
  )
}

export default FollowBtn;