import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import InfiniteScroll from 'react-infinite-scroll-component';

// context
import { UserContext } from '../../../context/UserContext';
import { InfiniteScrollContext } from '../../../context/InfiniteScrollContext';

// components
import ItemList from '../../../components/ItemList';
import SearchBar from '../../../components/SearchBar';

// styles
import {
  ScUtils,
  ScUtilsInner,
  // ScUtilsCounter
} from './styles';


function Bookmarks(){
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
  const [ bookmarks, setBookmarks ] = useState([]);
  // below two states are for infinite scroll
  const [ items, setItems ] = useState<IBikes[]>([]);
  const [ hasMore, setHasMore ] = useState<boolean>(true);

  // context
  const { authenticatedUser, authUserBookmark }: any = useContext(UserContext);
  // infinite scroll context
  const { 
    path,
    loadedItems, 
    scrollPosition, 
    handleClearLoadedItems,
    handleClearScrollPosition } = useContext(InfiniteScrollContext);

  // below are used for search function
  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');

  // this is used for comparing the current path and the path stored in infinite context
  const currentPath = window.location.pathname.split('/')[1];

  // for search
  const handleSearch = async (data: any) => {
    history.push('/bookmarks/bikes/search?q=' + data.search);
  }

  // get all saved bike by calling api with bike ids which are stored in 'authUserBookmark'
  useEffect(() => {
    (async () => {
      try {
        if (authUserBookmark.length > 0){
          const BaseUrl = config.apiBaseUrl;
          // check if query exist or not in the url
          let url = query ? BaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes/search?q=' + query
                          : BaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes';
    
          await axios({
            method: 'post',
            url: url,
            data: {
              bikeIds: authUserBookmark
            }
          })
            .then( response => {
              setBookmarks(response.data);
    
              // this state controls infinite scroll items.
              // check if user came back from list detail page. if true, load previously loaded items.
              if (loadedItems.length !== 0 && currentPath === path){
                setItems(loadedItems);
                window.scrollTo(0,scrollPosition);
                handleClearLoadedItems();
                handleClearScrollPosition()
              } else {
                // show 4 items onload
                setItems(response.data.slice(0, 4));
              }
            })
        }
      } catch(err) {
        console.log(err)
      }
    })()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUserBookmark, query])

  // infinit scroll
  const fetchMoreData = () => {
    if (bookmarks.length > items.length){
      // load 4 more items
      let moreItems = bookmarks.slice(items.length, items.length + 4);

      setTimeout(() => {
        setItems( items.concat(moreItems) );
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <h1 className="Title">Bookmarks</h1>

      {/* utility bar: AddBtn & SearchBar */}
      <ScUtils>
        <ScUtilsInner>          
          <SearchBar onSubmit={ handleSearch }/>
        </ScUtilsInner>
      </ScUtils>
      
      {
        bookmarks ?
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
        :
        null
      }
    </>
  )
}

export default Bookmarks;