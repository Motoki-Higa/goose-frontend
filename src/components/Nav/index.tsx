import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { LocalFlorist, Bookmark, Dashboard } from '@material-ui/icons';
import axios from 'axios';
import config from './../../config';

import { 
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
} from './styles';

function Nav() {
  // state
  const [ userData, setUserData ] = useState<any>(null);

  // initialize context for use
  const context = useContext(UserContext);
  const authUser: any = context.authenticatedUser;

  useEffect( () => {
    if (authUser){
      const apiUser = config.apiBaseUrl + '/' + authUser.id + '/profile';

      axios.get(apiUser)
        .then( response => {
          // console.log(response.data)
          setUserData(response.data);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
            <NavLink to={`/${ userData ? userData.username : null }`}>
              <Dashboard />
              <p>Dashboard</p>
            </NavLink>
          </ScLi>

          {/* <ScLi>
            <NavLink to="/mybikes">
              <Album />
              <p>My bikes</p>
            </NavLink>
          </ScLi>
          
          <ScLi>
            <NavLink to="/myitems">
              <Category />
              <p>My items</p>
            </NavLink>
          </ScLi> */}
          
        </ScNavWrapInner> 
      </ScNavWrap>
      :
      null
    }
    </>
    
  )
}

export default Nav;