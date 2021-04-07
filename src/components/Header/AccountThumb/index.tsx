import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// contexts
import { UserContext } from '../../../context/UserContext';

// stles
import { 
  ScAccountCircleWrapper,
  ScAccountCircleImg,
  ScAccountCircle,
  ScMoreOptionTable
} from './styles';

function AccountThumb() {
  // state
  const [ menu, setMenu ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('fadeOut');
  // context
  const { userProfile } = useContext(UserContext);

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

  return(
    <>
      <ScAccountCircleWrapper onClick={ handleMenu }>
        <ClickAwayListener onClickAway={ handleClickAway }>
          {
            userProfile ?
            <ScAccountCircleImg
            style={{
              backgroundImage: `url( ${userProfile.image[0].location} )`,
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
              <NavLink to={`/${userProfile ? userProfile.username : null}`}>My Profile</NavLink>
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