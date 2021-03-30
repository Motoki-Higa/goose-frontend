import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";

// contexts
import { FormContext } from '../../context/FormContext';

import {
  ScSearchBarWrap,
  ScSearch
} from './styles';

function SearchBar({onSubmit}:any) {
  // form
  const { control, handleSubmit, formState } = useForm();

  // init context
  const { setDetectAnyFormSubmit } = useContext(FormContext);

  
  useEffect(() => {
    setDetectAnyFormSubmit(formState);
    setDetectAnyFormSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

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