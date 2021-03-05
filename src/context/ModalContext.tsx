import { useState, createContext } from 'react';

export const ModalContext = createContext({} as any);

export const ModalProvider: React.FC = (props) => {
  // state
  const [ Modal, setModal ] = useState(false);

  // function to be used for onClick
  const handleModal = () => {
    setModal(!Modal);
    // console.log('clicked!');
  }

  const handleCloseModal = () => {
    setModal(false);
  }

  // value to pass to the provider
  const value = {
    Modal,
    handleModal,
    handleCloseModal
  };

  return (
    <ModalContext.Provider value={ value }>
      { props.children }
    </ModalContext.Provider>
  )

}