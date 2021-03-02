import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context'; // context api: Consumer

// ({ component: Component, ...rest }) is basically renaming the "component" variables to "Component" while destructuring.
// It's a usual JavaScript feature to extract properties from objecs and bind them to variables. 
export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};