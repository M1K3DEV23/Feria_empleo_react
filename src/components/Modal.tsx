import React from "react";

import '../styles/Modal.css';

import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <motion.div className="Modal" variants={backdrop} initial='hidden' animate='visible' exit='hidden'>
      <div className="modal-content">
        {children}
        <div className="modal__buttons-close">
          <button className="btn-close" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </motion.div>
  )
}


export default Modal;