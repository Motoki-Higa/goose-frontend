import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import config from '../../config';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import SearchBar from '../../components/SearchBar';
import ItemList from '../../components/ItemList';

// styles
import {
  ScUtils,
  ScUtilsInner,
} from './styles';


function FeedAllBikes() {

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

  // state: bikes
  const [ bikes, setBikes ] = useState<IBikes[]>([]);
  const [ state, setState ] = useState<IBikes[]>([]);
  const [ hasMore, setHasMore ] = useState<boolean>(true);

  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');

  // for search
  const handleSearch = async (data: any) => {
    try {
      const BaseUrl = config.apiBaseUrl;
      const path = '/feed/search?q=' + data.search;
      const url = BaseUrl + path;

      // send request
      await axios.get(url)
        .then( response => {
          setBikes(response.data);
          history.push(path);
        })
      
    } catch(err) {
      console.log(err);
    }
  }
  
  // onload or/and search to get items
  useEffect(() => {
    (async () => {
      try {
        const BaseUrl = config.apiBaseUrl;
        let url = '';

        // check if query exist or not in the url
        query ? url = await BaseUrl + '/feed/search?q=' + query
              : url = await BaseUrl + '/feed';
  
        // send request
        await axios.get(url)
          .then( response => {
            setBikes(response.data.reverse());
            setState(response.data.slice(0, 5));
          })
        
      } catch(err) {
        console.log(err);
      }
    })()
  },[query])
  // update list if query changes in the url
  // this helps for browser back button as well


  // infinit scroll
  const fetchMoreData = () => {
    if (bikes.length > state.length){
      let moreItems = bikes.slice(state.length, state.length + 6);
      console.log(moreItems);

      setTimeout(() => {
        setState( state.concat(moreItems) );
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

      {/* <ItemList 
        items={ bikes }
        route={ '/feed' } /> */}

      <InfiniteScroll
        dataLength={state.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all!</b>
          </p>
        }
        >

        {/* Send data to ItemList component */}
        <ItemList 
          items={ state }
          route={ '/feed' } />

      </InfiniteScroll>
    </>
    
  )
}

export default FeedAllBikes;