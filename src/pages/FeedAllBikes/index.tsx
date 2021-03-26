import React, { useState, useEffect } from 'react';
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

  // state : mybikes
  const [ bikes, setBikes ] = useState<IBikes[]>([]);


  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/feed';

      await axios.get(url)
      .then( (response) => {
        // console.log(response.data);
        setBikes(response.data);
      });

    })()
  }, []) 

  return (
    <>
      <h1 className="Title">Feed</h1>

      {/* utility bar: AddBtn & SearchBar & Total number */}
      <ScUtils>
        <ScUtilsInner>          
          <SearchBar />
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