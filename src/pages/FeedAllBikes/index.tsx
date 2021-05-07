import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import config from '../../config';
import InfiniteScroll from 'react-infinite-scroll-component';

// contexts
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';

// components
import SearchBar from '../../components/SearchBar';
import ItemList from '../../components/ItemList';

// styles
import {
  ScUtils,
  ScUtilsInner,
} from './styles';


function FeedAllBikes(){

  interface IBikes {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
    public: string;
  }

  // state
  const [ bikes, setBikes ] = useState<IBikes[]>([]);
  // below two states are for infinite scroll
  const [ items, setItems ] = useState<IBikes[]>([]);
  const [ hasMore, setHasMore ] = useState<boolean>(true);

  // infinite scroll context
  const { 
    path,
    loadedItems, 
    scrollPosition, 
    handleClearLoadedItems,
    handleClearScrollPosition } = useContext(InfiniteScrollContext);

  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');

  // this is used for comparing the current path and the path stored in infinite context
  const currentPath = window.location.pathname.split('/')[1];

  // for search
  const handleSearch = async (data: any) => {
    history.push('/feed/search?q=' + data.search);
  }

  // onload or/and search to get items
  useEffect(() => {
    (async () => {
      try {
        const BaseUrl = config.apiBaseUrl;
        // check if query exist or not in the url
        let url = query ? BaseUrl + '/feed/search?q=' + query
                        : BaseUrl + '/feed';
  
        // send request
        await axios.get(url)
          .then( response => {
            // this state sets all bikes data
            setBikes(response.data.reverse());

            // this state controls infinite scroll items.
            // check if user came back from list detail page. if true, load previously loaded items.
            if (loadedItems.length !== 0 && currentPath === path){
              setItems(loadedItems);
              window.scrollTo(0,scrollPosition);
              handleClearLoadedItems();
              handleClearScrollPosition()
            } else {
              // show 5 items onload
              setItems(response.data.slice(0, 12));
            }
          })
        
      } catch(err) {
        console.log(err);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query])
  // update list if query changes in the url
  // this helps for browser back button as well


  // infinit scroll
  const fetchMoreData = () => {
    if (bikes.length > items.length){
      // load 6 more items
      let moreItems = bikes.slice(items.length, items.length + 6);

      setTimeout(() => {
        setItems( items.concat(moreItems) );
      }, 1000);
    } else {
      setHasMore(false);
    }
  };


  return (
    <>
      <h1 className="Title">Feed</h1>

      {/* utility bar: AddBtn & SearchBar */}
      <ScUtils>
        <ScUtilsInner>          
          <SearchBar onSubmit={ handleSearch }/>
        </ScUtilsInner>
      </ScUtils>

      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all!</b>
          </p>
        } >

        {/* Send data to ItemList component */}
        <ItemList 
          items={ items }
          route={ 'feed' } />

      </InfiniteScroll>
    </>
  )
}

export default FeedAllBikes;