import React from 'react';
import {
  BrowserRouter as Router, // BrowserRouter uses the HTML5 History API to keep your UI in sync with the URL
  Route,
  Switch
} from 'react-router-dom';

// context
import { Provider } from './../../Context';

// private route with context
import { PrivateRoute } from './../../PrivateRoute';

// components
import Header from '../Header/index';
import Authenticated from '../Authenticated/index';
import SignUp from '../SignUp/index';
import SignIn from '../SignIn/index';

// style
import {
  GlobalStyle,
  ScApp,
  ScAppInner
} from './styles';




function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScApp className="App">
        
        <Provider>
          <Header></Header>
        </Provider>

        <ScAppInner>

          <Switch>
            <Route exact path="/" />

            <Provider>
              <PrivateRoute path="/authenticated" component={ Authenticated } />
              <Route path="/signup" component={ SignUp } />
              <Route path="/signin" component={ SignIn } />
            </Provider>

          </Switch>

        </ScAppInner>
      </ScApp>
    </Router>
  );
}

export default App;
