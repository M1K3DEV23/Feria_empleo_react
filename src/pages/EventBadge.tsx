import React from "react";

// Importando mis estilos
import '../styles/EventBadge.css'
// Importando mi componente de QrCodeGenerator
import QRCodeGenerator from "../components/QRCodeGenerator";

import {motion} from 'framer-motion';

const EventBadge: React.FC = () => {
  const username = 'Miguel';
  const fairName = 'Expo trabajo';
  const description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ullam repellat voluptatem provident optio doloremque sequi culpa incidunt debitis molestiae totam, animi dolore neque alias explicabo veritatis quia, aliquid veniam.`;
  const date = '25/04/2024';
  const curp = '12312421431241243';
  const eventId = 323232;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="badge">
        <h2 className="badge__title-main">Gafete de Asistencia de {username}</h2>
        <div className="badge__content">
          <header className="badge__header">
            <h3 className="badge__title">{fairName}</h3>
            <p className="badge__description">
              {description}
            </p>
            <p className="badge__description">Fecha: {date}</p>
          </header>
          <figure className="badge__image">
            <QRCodeGenerator curp={curp} eventId={eventId} />
          </figure>
        </div>
      </div>
    </motion.div>
  )
}


export default EventBadge;