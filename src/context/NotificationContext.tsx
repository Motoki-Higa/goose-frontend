import { useState, createContext } from 'react';

export const NotificationContext = createContext({} as any);

export const NotificationProvider: React.FC = (props) => {
  // state
  const [ notification, setNotification ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('');
  const [ message, setMessage ] = useState('');


  // function to be used for onClick
  const handleSetNotification = (message: string) => {

    setNotification(true);
    setMessage(message)
    
    setTimeout(() => {
      setFadeClass('fadeOut');

        setTimeout(()=> {
          setNotification(false);
          setMessage('');

          if (!notification){
            setFadeClass('');
          }
        }, 280)
  
    }, 3000)
  }

  // value to pass to the provider
  const value = {
    notification,
    fadeClass,
    message,
    handleSetNotification,
  };

  return (
    <NotificationContext.Provider value={ value }>
      { props.children }
    </NotificationContext.Provider>
  )

}