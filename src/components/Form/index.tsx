import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

import AddBike from './AddBike';

function Form() {
  // destructure context to use
  const { form, handleCloseForm } = useContext(FormContext);

  const selectForm = () => {
    // store forms in object
    const forms = {
      'addBike': AddBike,
    }

    // condition to return appropriate form
    return (
      <AddBike />
    )

  }

  return (
    <>
      {
        form === '' ?
        null
        :
        selectForm()
      }
    </>
  )
}

export default Form;