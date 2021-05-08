import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LocalFlorist, Bookmark, Dashboard, PersonPin } from '@material-ui/icons';

// contexts
import { UserContext } from '../../context/UserContext';

// styles
import { 
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
} from './styles';

function Nav() {
  // state
  const [ activeClass, setActiveClass ] = useState('');

  // context
  const { authenticatedUser } = useContext(UserContext);
  const authUser: any = authenticatedUser;

  // username params (useParams() can't be used for nav component, so use below)
  const location = useLocation();

  // this is used NOT to show nav in home page
  const child = location.pathname.split('/')[1];

  useEffect( () => {
    if (authUser){
      const username = location.pathname.split('/')[1];
      const pathname = location.pathname.split('/')[2];

      if (pathname === 'dashboard' && username === authUser.username){
        setActiveClass('active');
      } else {
        setActiveClass('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      {
        authUser && child !== '' ?
        <ScNavWrap>
          <ScNavWrapInner>

            <ScLi>
              <NavLink to="/feed">
                <LocalFlorist />
                <p>Feed</p>
              </NavLink>
            </ScLi>

            <ScLi>
              <NavLink to="/bookmarks">
                <Bookmark />
                <p>Saved</p>
              </NavLink>
            </ScLi>

            <ScLi>
              <NavLink to="/following">
                <PersonPin />
                <p>Following</p>
              </NavLink>
            </ScLi>

            <ScLi>
              <NavLink 
                to={ `/${ authUser.username }/dashboard/bikes` }
                className={ activeClass } >
                <Dashboard />
                <p>Dashboard</p>
              </NavLink>
            </ScLi>
            
          </ScNavWrapInner> 
        </ScNavWrap>
        :
        null
      }
    </>
  )
}

export default Nav;