import React, { useContext, useEffect } from 'react';
import { Route, Switch, useParams, Redirect, NavLink } from 'react-router-dom';

// context
import { UserContext } from '../../context/UserContext';
import { IsMyAccount } from '../../context/IsMyAccountContext';

// components
import Profile from './Profile';
import Account from './Account';

// styles
import {
  ScSubNav
} from './styles';

function AccountSettings(){
  // contenxt
  const { authUserProfile, isProfileUpdated, authenticatedUser } = useContext<any>(UserContext);
  const { handleSetIsMyAccount } = useContext(IsMyAccount);

  // username params
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    // check if it's your own dashboard
    if(authenticatedUser.username === username){
      handleSetIsMyAccount(true);
    } else {
      handleSetIsMyAccount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username, isProfileUpdated])

  return (
    <>
      {
        authenticatedUser.username === username ?
        <>
          <h1 className="Title">Settings</h1>

          {/* sub nav */}
          <ScSubNav>
            <NavLink to={`/${ authUserProfile.username }/settings/profile`}>
              <p>Profile</p>
            </NavLink>

            <NavLink to={`/${ authUserProfile.username }/settings/account`}>
              <p>Account</p>
            </NavLink>
          </ScSubNav>

          {/* components */}
          <Switch>        
            {/* /settings */}
            <Route exact path="/:username/settings/profile" component={ Profile } />
            <Route exact path="/:username/settings/account" component={ Account } />
          </Switch>
        </>
        :
        <Redirect to="/" />
      }
    </>
  )
}

export default AccountSettings;