import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import config from '../../config';

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

  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');


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
            setBikes(response.data);
          })
        
      } catch(err) {
        console.log(err);
      }
    })()
  },[query])
  // update list if query changes in the url
  // this helps for browser back button as well


  return (
    <>
      <h1 className="Title">Feed</h1>

      {/* utility bar: AddBtn & SearchBar */}
      <ScUtils>
        <ScUtilsInner>          
          <SearchBar onSubmit={ handleSearch }/>
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemList component */}
      <ItemList 
        items={ bikes }
        route={ '/feed' } />
    </>
    
  )
}

export default FeedAllBikes;