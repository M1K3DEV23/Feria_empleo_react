import React, {} from "react";

// Importando mis estilos
import '../styles/EventBadge.css'
// Importando mi componente de QrCodeGenerator
// import QRCodeGenerator from "../components/QRCodeGenerator";

import {motion} from 'framer-motion';


const EventBadge: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="badge">
        <h2 className="badge__title-main">Gafete de Asistencia de</h2>
        <div className="badge__content">
          <header className="badge__header">
            <h3 className="badge__title"></h3>
            <p className="badge__description">

            </p>
            <p className="badge__description">Fecha:</p>
          </header>
          <figure className="badge__image">
            {/* <QRCodeGenerator curp={userData.curp} eventId={} /> */}
          </figure>
        </div>
      </div>
    </motion.div>
  )
}


export default EventBadge;