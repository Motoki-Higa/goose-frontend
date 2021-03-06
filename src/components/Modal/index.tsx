import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';

import {
  ScModal
} from './styles';

function Modal() {
  // init context to use
  const { isModal, handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);

  // make sure to remove form inside the modal too
  const closeModal = () => {
    handleCloseModal();
    handleCloseForm();
  }

  return (
    <>
      {
        isModal ? 
        <ScModal onClick={ closeModal }></ScModal>
        :
        null
      }
    </>
  )
}

export default Modal;