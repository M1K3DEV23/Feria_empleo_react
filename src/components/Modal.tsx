import React from "react";

import '../styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="Modal">
      <div className="modal-content" >
        {children}
        <div className="modal__buttons-close">
          <button className="btn-close" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}


export default Modal;