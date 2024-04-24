import React from "react";
import QRCodeGenerator from "../components/QRCodeGenerator";



const EventBadge: React.FC = () => {
  return (
    <div key={currentEvent.clave_feria}>
      <h2>Gafete del Evento</h2>
      <p><strong>Evento:</strong>{currentEvent.nombre_evento}</p>
      <p><strong>Nombre:</strong> {user.nombre} {user.paterno} {user.materno}</p>
      <p><strong>Fecha:</strong> {currentEvent.fecha}</p>
      <p><strong>Hora:</strong> {currentEvent.hora_inicio}</p>
      <div>
        <QRCodeGenerator curp={user.curp} eventId={currentEvent.clave_feria} />
      </div>
    </div>
  )
}

export default EventBadge;
