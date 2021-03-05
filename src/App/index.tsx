import React from 'react';
import {
  BrowserRouter as Router, // BrowserRouter uses the HTML5 History API to keep your UI in sync with the URL
  Route,
  Switch
} from 'react-router-dom';

// components
import Header from '../components/Header/index';
import Nav from '../components/Nav/index';
import Home from '../pages/Home/index';
import SignUp from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';
import SignOut from '../pages/SignOut/index';
import MyBikes from '../pages/MyBikes/index';
import Authenticated from '../pages/Authenticated/index';

// context
import { UserProvider } from '../context/Context';

// private route with context
import { PrivateRoute } from '../PrivateRoute';

// style
import {
  GlobalStyle,
} from './styles';


function App() {
  return (
    <Router>
      <GlobalStyle />
      <UserProvider>
        <div className="App">
          {/* header */}
          <Header></Header>

          {/* nav */}
          <Nav></Nav>
          
          {/* body */}
          <div className="AppInner">
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/signup" component={ SignUp } />
              <Route path="/signin" component={ SignIn } />
              <Route path="/signout" component={ SignOut } />
              <PrivateRoute path="/mybikes" component={ MyBikes } />
              <PrivateRoute path="/authenticated" component={ Authenticated } />
            </Switch>
          </div>

          
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
