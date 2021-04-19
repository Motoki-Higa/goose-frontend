import { useState, createContext } from 'react';

export const IsMyAccount = createContext({} as any);

export const IsMyAccountProvider: React.FC = (props) => {
  // state
  const [ isMyAccount, setIsMyAccount ] = useState(false);

  const handleSetIsMyAccount = (bool: boolean) => {
    setIsMyAccount(bool);
  }

  // value to pass to the provider
  const value = {
    isMyAccount,
    handleSetIsMyAccount
  };

  return (
    <IsMyAccount.Provider value={ value }>
      { props.children }
    </IsMyAccount.Provider>
  )

}