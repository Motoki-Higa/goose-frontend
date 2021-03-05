import React from 'react';
import AddBtn from './../../components/AddBtn';
import SearchBar from './../../components/SearchBar';
import {
  ScUtils
} from './styles';


function MyBikes() {
  return (
    <>
      <h1 className="Title">My Bikes</h1>

      <ScUtils>
        <AddBtn></AddBtn>
        <SearchBar></SearchBar>
      </ScUtils>
    </>
    
  )
}

export default MyBikes;