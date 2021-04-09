import { useState, createContext } from 'react';

export const IsMyDashboard = createContext({} as any);

export const IsMyDashboardProvider: React.FC = (props) => {
  // state
  const [ isMyDashboard, setIsMyDashboard ] = useState(false);

  const handleSetIsMyDashboard = (bool: boolean) => {
    setIsMyDashboard(bool);
    console.log('setIsMyDashboard is: ' + bool);
  }

  // value to pass to the provider
  const value = {
    isMyDashboard,
    handleSetIsMyDashboard
  };

  return (
    <IsMyDashboard.Provider value={ value }>
      { props.children }
    </IsMyDashboard.Provider>
  )

}