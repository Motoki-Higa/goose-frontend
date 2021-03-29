import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
  ScSearchBarWrap,
  ScSearch
} from './styles';

function SearchBar({onSubmit}:any) {
  // form
  const { control, handleSubmit, formState } = useForm();

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <ScSearchBarWrap>
        <ScSearch></ScSearch>
        <Controller
          id="search"
          name="search"
          as={
            <input 
              type="text" 
              name="search"/>
          }
          control={control}
          defaultValue=""
        />
        
      </ScSearchBarWrap>
    </form>
  )
}

export default SearchBar;