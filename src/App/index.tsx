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
import MyBike from '../pages/MyBike/index';
import Authenticated from '../pages/Authenticated/index';
import Modal from '../components/Modal';
import Form from '../components/Form';

// context
import { UserProvider } from '../context/UserContext';
import { ModalProvider } from '../context/ModalContext';
import { FormProvider } from '../context/FormContext';
import { CurrentItemIdProvider } from '../context/CurrentItemIdContext';

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
        <CurrentItemIdProvider>
          <ModalProvider>
            <FormProvider>

              <div className="App">
                {/* modal */}
                
                  <Modal>
                    <Form></Form>
                  </Modal>
                
                
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
                    <PrivateRoute exact path="/mybikes" component={ MyBikes } />
                    <PrivateRoute path="/mybikes/:id" component={ MyBike } />
                    <PrivateRoute path="/authenticated" component={ Authenticated } />
                  </Switch>
                </div>

              </div>

            </FormProvider>
          </ModalProvider>
        </CurrentItemIdProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
