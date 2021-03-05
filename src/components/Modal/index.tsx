import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

import {
  ScModal
} from './styles';

function Modal() {
  // init context to use
  const context = useContext(ModalContext);

  // destructure modal's state (Modal) and a function
  const { Modal, handleCloseModal } = context;

  const closeModal = () => {
    handleCloseModal();
  }

  return (
    <>
      {
        Modal ? 
        <ScModal onClick={ closeModal }></ScModal>
        :
        null
      }
    </>
  )
}

export default Modal;