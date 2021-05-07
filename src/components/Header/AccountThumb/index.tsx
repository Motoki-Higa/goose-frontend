import React, { useState, useContext, useEffect } from 'react';
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
  const [ userData, setUserData ] = useState<any>();
  const [ menu, setMenu ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('fadeOut');

  // context
  const { isProfileUpdated, authUserProfile } = useContext<any>(UserContext);


  // handle toggle menu
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
    if (authUserProfile._id !== ''){
      setUserData(authUserProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isProfileUpdated, authUserProfile])

  return(
    <>
      <ScAccountCircleWrapper onClick={ handleMenu }>
        <ClickAwayListener onClickAway={ handleClickAway }>
          { // if user data is ready to load and has image
            userData && userData.image.location !== '' ?
            <ScAccountCircleImg style={{backgroundImage: `url( ${ userData.image.location } )`}} />
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
              <NavLink to={`/${ userData.username }/settings/profile`}>Settings</NavLink>
            </li>
            <li>
              <NavLink to="/signout">Sign Out</NavLink>
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