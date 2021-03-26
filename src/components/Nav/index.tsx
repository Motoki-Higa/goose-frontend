import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { LocalFlorist, Dashboard, Album, Bookmark, Category } from '@material-ui/icons';

import { 
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
} from './styles';

function Nav() {
  // initialize context for use
  const context = useContext(UserContext);
  const authUser: any = context.authenticatedUser;

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
            <NavLink to="/dashboard">
              <Dashboard />
              <p>Dashboard</p>
            </NavLink>
          </ScLi>

          <ScLi>
            <NavLink to="/mybikes">
              <Album />
              <p>My bikes</p>
            </NavLink>
          </ScLi>

          <ScLi>
            <NavLink to="/saved">
              <Bookmark />
              <p>Saved</p>
            </NavLink>
          </ScLi>

          <ScLi>
            <NavLink to="/myitems">
              <Category />
              <p>My items</p>
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