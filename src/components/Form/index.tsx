import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

import AddBike from './AddBike';
import EditBike from './EditBike';
import DeleteBike from './DeleteBike';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';

function Form() {
  // destructure context to use
  const { formName } = useContext(FormContext);

  // store forms in object
  const forms: any = {
    'AddBike': AddBike,
    'EditBike': EditBike,
    'DeleteBike': DeleteBike,
    'AddItem': AddItem,
    'EditItem': EditItem,
    'DeleteItem': DeleteItem,
  };

  // this returns a form component
  const selectForm = (targetFrom: string) => {
    let SelectedForm = forms[targetFrom];

    return <SelectedForm />
  };

  return (
    <>
      { // condition: no form or selected form
        formName === '' ?
        null
        :
        selectForm(formName)
      }
    </>
  )
}

export default Form;