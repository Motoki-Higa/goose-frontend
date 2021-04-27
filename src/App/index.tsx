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
import EmailVerifyRequest from '../pages/EmailVerifyRequest/index';
import EmailVerify from '../pages/EmailVerify';
import PasswordResetRequest from '../pages/PasswordResetRequest/index';
import PasswordReset from '../pages/PasswordReset/index';
import Thanks from '../pages/Thanks';

import AccountDashboard from '../pages/AccountDashboard';
import AccountSettings from '../pages/AccountSettings';
import Feed from '../pages/FeedAllBikes/index';
import FeedSingleBike from '../pages/FeedSingleBike/index';
import Bookmarks from '../pages/AccountDashboard/Bookmarks/index';
import Modal from '../components/Modal';
import Form from '../components/Form';
import Notification from '../components/Notification';

// context
import { UserProvider } from '../context/UserContext';
import { ModalProvider } from '../context/ModalContext';
import { FormProvider } from '../context/FormContext';
import { CurrentItemProvider } from '../context/CurrentItemContext';
import { InfiniteScrollProvider } from '../context/InfiniteScrollContext';
import { NotificationProvider } from '../context/NotificationContext';
import { IsMyAccountProvider } from '../context/IsMyAccountContext';

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
        <CurrentItemProvider>
          <ModalProvider>
            <FormProvider>
              <NotificationProvider>
                <InfiniteScrollProvider>

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

                        <Route exact path="/email/verify/request" component={ EmailVerifyRequest } />
                        <Route path="/email/verify/:token" component={ EmailVerify } />

                        <Route exact path="/password/reset/request" component={ PasswordResetRequest } />
                        <Route path="/password/reset/:token" component={ PasswordReset } />

                        <Route path="/thanks" component={ Thanks } />

                        <PrivateRoute exact path="/feed" component={ Feed } />
                        <PrivateRoute exact path="/feed/search" component={ Feed } />
                        <PrivateRoute path="/feed/:id" component={ FeedSingleBike } />

                        <PrivateRoute path="/bookmarks" component={ Bookmarks } />

                        <IsMyAccountProvider>
                          <PrivateRoute path="/:username/dashboard" component={ AccountDashboard } />
                          <PrivateRoute path="/:username/settings" component={ AccountSettings } />
                        </IsMyAccountProvider>
                      </Switch>
                    </div>

                    {/* notification */}
                    <Notification></Notification>

                  </div>

                </InfiniteScrollProvider>
              </NotificationProvider>
            </FormProvider>
          </ModalProvider>
        </CurrentItemProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
