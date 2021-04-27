import React, { useContext } from 'react';

// context
import { FormContext } from '../../context/FormContext';

// components
import AddBike from './AddBike';
import EditBike from './EditBike';
import DeleteBike from './DeleteBike';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import EditProfile from './EditProfile';
import EditAccount from './EditAccount';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import ChangeEmail from './ChangeEmail';


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
    'EditProfile': EditProfile,
    'EditAccount': EditAccount,
    'ChangePassword': ChangePassword,
    'DeleteAccount': DeleteAccount,
    'ChangeEmail': ChangeEmail,
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