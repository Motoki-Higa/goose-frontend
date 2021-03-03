import React from 'react';
import {
  BrowserRouter as Router, // BrowserRouter uses the HTML5 History API to keep your UI in sync with the URL
  Route,
  Switch
} from 'react-router-dom';

// components
import Header from '../Header/index';
import Nav from '../Nav/index';
import Home from '../Home/index';
import SignUp from '../SignUp/index';
import SignIn from '../SignIn/index';
import SignOut from '../SignOut/index';
import MyBikes from '../MyBikes/index';
import Authenticated from '../Authenticated/index';

// context
import { Provider } from './../../Context';

// private route with context
import { PrivateRoute } from './../../PrivateRoute';

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
      <Provider>
        <ScApp className="App">
          {/* header */}
          <Header></Header>

          {/* nav */}
          <Nav></Nav>
          
          {/* body */}
          <ScAppInner>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/signup" component={ SignUp } />
              <Route path="/signin" component={ SignIn } />
              <Route path="/signout" component={ SignOut } />
              <PrivateRoute path="/mybikes" component={ MyBikes } />
              <PrivateRoute path="/authenticated" component={ Authenticated } />
            </Switch>
          </ScAppInner>
        </ScApp>
      </Provider>
    </Router>
  );
}

export default App;
