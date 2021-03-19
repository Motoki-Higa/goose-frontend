import React, { useContext } from 'react';

// contexts
import { NotificationContext } from './../../context/NotificationContext';

// styles
import {
  ScNotificationBanner
} from './styles'

function Notification() {
  // init context
  const { notification, fadeClass, message } = useContext(NotificationContext);

  // console.log(message);

  return (
    <>
      { notification ?
        <ScNotificationBanner className={ fadeClass }>
          <div>{message}</div>
        </ScNotificationBanner>
        :
        null
      }
    </>
  )
}

export default Notification;