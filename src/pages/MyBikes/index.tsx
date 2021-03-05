import React from 'react';
import AddBtn from './../../components/AddBtn';
import SearchBar from './../../components/SearchBar';

import {
  ScUtils,
  ScUtilsInner,
  ScCounter
} from './styles';


function MyBikes() {


  return (
    <>
      <h1 className="Title">My Bikes</h1>

      <ScUtils>
        <ScUtilsInner>
          <AddBtn />
          <SearchBar />
          <div></div>
        </ScUtilsInner>
        
        <ScCounter>Item: </ScCounter>
      </ScUtils>
    </>
    
  )
}

export default MyBikes;