import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import config from './../../../config';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// stles
import { 
  ScAccountCircleWrapper,
  ScAccountCircleImg,
  ScAccountCircle,
  ScMoreOptionTable
} from './styles';

function AccountThumb(props: any) {
  // state
  const [ userData, setUserData ] = useState<any>();
  const [ menu, setMenu ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('fadeOut');

  const handleMenu = () => {
    // fadeClass
    setFadeClass(fadeClass === 'fadeIn' ? 'fadeOut' : 'fadeIn');
    // menu boolean
    const ms = fadeClass === 'fadeOut' ? 0 : 300;
    setTimeout(() => {
      setMenu(fadeClass === 'fadeIn' ? false : true);
    }, ms)
  }

  // handle click away (material UI's Click away listener)
  const handleClickAway = () => {
    setFadeClass('fadeOut');
    setTimeout(() => {
      setMenu(false);
    }, 300)
  };

  useEffect( () => {
    if (props.userId){
      const apiUser = config.apiBaseUrl + '/' + props.userId + '/profile';

      axios.get(apiUser)
        .then( response => {
          setUserData(response.data);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <>
      <ScAccountCircleWrapper onClick={ handleMenu }>
        <ClickAwayListener onClickAway={ handleClickAway }>
          {
            userData ?
            <ScAccountCircleImg
            style={{
              backgroundImage: `url( ${ userData.image[0].location } )`,
              backgroundSize: `cover`,
              backgroundPosition: `center`
              }} />
            :
            <ScAccountCircle></ScAccountCircle>
          }
        </ClickAwayListener>
      </ScAccountCircleWrapper>

      { // toggle option table
        menu ?
        <ScMoreOptionTable className={ fadeClass }>
          <ul>
            <li>
              <NavLink to={`/${ userData.username }`}>My Profile</NavLink>
            </li>
          </ul>
        </ScMoreOptionTable>
        :
        null
      }
    </>
  )
}

export default AccountThumb;