import { useState, createContext } from 'react';

export const InfiniteScrollContext = createContext({} as any);

export const InfiniteScrollProvider: React.FC = (props) => {
  // state
  const [ path, setPath ] = useState('');
  const [ loadedItems, setLoadedItems ] = useState([]);
  const [ scrollPosition, setScrollPosition ] = useState(0);


  // store location path
  const handleSetPath = (path: string) => {
    setPath(path);
  }
  const handleClearPath = (path: string) => {
    setPath('');
  }


  // store loaded items onClick
  const handleSetLoadedItems = (items: any, path: string) => {
    setLoadedItems(items);
  }
  const handleClearLoadedItems = () => {
    setLoadedItems([]);
  }


  // store scroll position onClick
  const handleSetScrollPosition = (px: any, path: string) => {
    setScrollPosition(px);
  }
  const handleClearScrollPosition = () => {
    setScrollPosition(0);
  }

  
  // value to pass to the provider
  const value = {
    path,
    loadedItems,
    scrollPosition,
    handleSetPath,
    handleClearPath,
    handleSetLoadedItems,
    handleClearLoadedItems,
    handleSetScrollPosition,
    handleClearScrollPosition
  };

  return (
    <InfiniteScrollContext.Provider value={ value }>
      { props.children }
    </InfiniteScrollContext.Provider>
  )

}