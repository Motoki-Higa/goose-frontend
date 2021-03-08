import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

import AddBike from './AddBike';

function Form() {
  // destructure context to use
  const { formName } = useContext(FormContext);

  // store forms in object
  const forms: any = {
    'AddBike': AddBike
  };

  const selectForm = (targetFrom: string) => {
    let SelectedForm = forms[targetFrom];

    return <SelectedForm />
  };

  return (
    <>
      {
        formName === '' ?
        null
        :
        selectForm(formName)
      }
    </>
  )
}

export default Form;