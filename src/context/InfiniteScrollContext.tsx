import { useState, createContext } from 'react';

export const InfiniteScrollContext = createContext({} as any);

export const InfiniteScrollProvider: React.FC = (props) => {
  // state
  const [ loadedItems, setLoadedItems ] = useState([]);
  const [ scrollPosition, setScrollPosition ] = useState(0);

  // store loaded items onClick
  const handleSetLoadedItems = (items: any) => {
    setLoadedItems(items);
    // console.log('The number of loaded item is: ' + items);
  }

  // store scroll position onClick
  const handleSetScrollPosition = (px: any) => {
    setScrollPosition(px);
    // console.log('current position is: ' + px);
  }

  // clear loadedItems
  const handleClearLoadedItems = () => {
    setLoadedItems([]);
  }

  // clear position
  const handleClearScrollPosition = () => {
    setScrollPosition(0);
  }

  // value to pass to the provider
  const value = {
    loadedItems,
    scrollPosition,
    handleSetLoadedItems,
    handleSetScrollPosition,
    handleClearLoadedItems,
    handleClearScrollPosition
  };

  return (
    <InfiniteScrollContext.Provider value={ value }>
      { props.children }
    </InfiniteScrollContext.Provider>
  )

}