import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="Modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}


export default Modal;