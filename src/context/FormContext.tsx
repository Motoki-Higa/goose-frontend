import { useState, createContext } from 'react';

export const FormContext = createContext({} as any);

export const FormProvider: React.FC = (props) => {
  // state
  const [ form, setForm ] = useState('');

  // function to be used for onClick
  const handleSetForm = (form: any) => {
    setForm(form);
    console.log(form);
  }

  const handleCloseForm = () => {
    setForm('');
  }

  // value to pass to the provider
  const value = {
    form,
    handleSetForm,
    handleCloseForm
  };

  return (
    <FormContext.Provider value={ value }>
      { props.children }
    </FormContext.Provider>
  )

}