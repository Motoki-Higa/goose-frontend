import { useState, createContext } from 'react';

export const ModalContext = createContext({} as any);

export const ModalProvider: React.FC = (props) => {
  // state
  const [ isModal, setIsModal ] = useState(false);

  // function to be used for onClick
  const handleModal = () => {
    setIsModal(!isModal);
    // console.log('clicked!');
  }

  const handleCloseModal = () => {
    setIsModal(false);
  }

  // value to pass to the provider
  const value = {
    isModal,
    handleModal,
    handleCloseModal
  };

  return (
    <ModalContext.Provider value={ value }>
      { props.children }
    </ModalContext.Provider>
  )

}