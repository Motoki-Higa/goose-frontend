import { useState, createContext } from 'react';

export const CurrentItemContext = createContext({} as any);

export const CurrentItemProvider: React.FC = (props) => {
  // state
  const [ currentItem, setCurrentItem ] = useState('');

  // function to be used for onClick
  const handleSetCurrentItem = (item: any) => {
    setCurrentItem(item);
    console.log('current item id is: ' + item._id);
  }

  const handleClearCurrentItem = () => {
    setCurrentItem('');
  }

  // value to pass to the provider
  const value = {
    currentItem,
    handleSetCurrentItem,
    handleClearCurrentItem
  };

  return (
    <CurrentItemContext.Provider value={ value }>
      { props.children }
    </CurrentItemContext.Provider>
  )

}