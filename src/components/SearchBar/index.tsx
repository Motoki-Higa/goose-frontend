import React from 'react';

import {
  ScSearchBarWrap,
  ScSearch
} from './styles';

function SearchBar() {
  return (
    <form action="">
      <ScSearchBarWrap>
        <ScSearch></ScSearch>
        <input type="text"/>
      </ScSearchBarWrap>
    </form>
  )
}

export default SearchBar;