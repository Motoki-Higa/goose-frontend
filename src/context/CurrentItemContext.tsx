import { useState, createContext } from 'react';

export const CurrentItemContext = createContext({} as any);

export const CurrentItemProvider: React.FC = (props) => {
  // state
  const [ currentItem, setCurrentItem ] = useState('');

  // function to be used for onClick
  const handleCurrentItem = (item: any) => {
    setCurrentItem(item);
    console.log('current bike id is: ' + item[0]._id);
  }

  const handleClearCurrentItem = () => {
    setCurrentItem('');
  }

  // value to pass to the provider
  const value = {
    currentItem,
    handleCurrentItem,
    handleClearCurrentItem
  };

  return (
    <CurrentItemContext.Provider value={ value }>
      { props.children }
    </CurrentItemContext.Provider>
  )

}