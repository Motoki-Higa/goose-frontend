import React, { useContext } from 'react';
import { Context } from './../../Context';

import { 
  ScHeader, 
  ScTitle, 
  ScAccountBlock,
  ScUsername, 
  ScAccountCircle,
  ScLink,
} from './styles';

const Header: React.FC = () => {
  // initialize context for use
  const context = useContext(Context);
  const authUser: any = context.authenticatedUser;

  return (
    <ScHeader>
      <ScTitle>GOOSE</ScTitle>
      {
        authUser ?
        <ScAccountBlock>
          <ScLink to="/signout">Sign Out</ScLink>
          <ScUsername>{ authUser.name }</ScUsername>
          <ScAccountCircle></ScAccountCircle>   
        </ScAccountBlock>
      :
        <ScAccountBlock>
          <ScLink to="/signin">Sign In</ScLink>
          <ScLink to="/signup">Sign Up</ScLink>   
        </ScAccountBlock>
      }
      
    </ScHeader>  
  )
}

export default Header