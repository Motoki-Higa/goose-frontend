import { useState, createContext } from 'react';

export const CurrentItemIdContext = createContext({} as any);

export const CurrentItemIdProvider: React.FC = (props) => {
  // state
  const [ currentItemId, setCurrentItemId ] = useState('');

  // function to be used for onClick
  const handleCurrentItemId = (id: string) => {
    setCurrentItemId(id);
    console.log('current bike id is: ' + id);
  }

  const handleClearCurrentItemId = () => {
    setCurrentItemId('');
  }

  // value to pass to the provider
  const value = {
    currentItemId,
    handleCurrentItemId,
    handleClearCurrentItemId
  };

  return (
    <CurrentItemIdContext.Provider value={ value }>
      { props.children }
    </CurrentItemIdContext.Provider>
  )

}