import { useState, createContext } from 'react';

export const FormContext = createContext({} as any);

export const FormProvider: React.FC = (props) => {
  // state
  const [ formName, setFormName ] = useState('');

  // function to be used for onClick
  const handleSetForm = (form: string) => {
    setFormName(form);
    // console.log(form);
  }

  const handleCloseForm = () => {
    setFormName('');
  }

  // value to pass to the provider
  const value = {
    formName,
    handleSetForm,
    handleCloseForm
  };

  return (
    <FormContext.Provider value={ value }>
      { props.children }
    </FormContext.Provider>
  )

}