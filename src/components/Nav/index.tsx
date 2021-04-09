import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LocalFlorist, Bookmark, Dashboard } from '@material-ui/icons';

// contexts
import { UserContext } from '../../context/UserContext';

// styles
import { 
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
} from './styles';

function Nav() {
  // initialize context for use
  const { authenticatedUser } = useContext(UserContext);
  const authUser: any = authenticatedUser;

  return (
    <>
    {
      authUser ?
      <ScNavWrap>
        <ScNavWrapInner>

          <ScLi>
            <NavLink to="/feed">
              <LocalFlorist />
              <p>Feed</p>
            </NavLink>
          </ScLi>

          <ScLi>
            <NavLink to="/saved">
              <Bookmark />
              <p>Saved</p>
            </NavLink>
          </ScLi>

          <ScLi>
            <NavLink to={`/${ authUser.username }`}>
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