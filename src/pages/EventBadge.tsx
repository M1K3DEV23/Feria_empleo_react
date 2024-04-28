import React, { useEffect, useState } from "react";

// Importando mis estilos
import '../styles/EventBadge.css'
// Importando mi componente de QrCodeGenerator
import QRCodeGenerator from "../components/QRCodeGenerator";
import {motion} from 'framer-motion';

interface UserData {
  id: string;
  curp: string;
  rfc: string;
  nombre: string;
  paterno: string;
  materno:string;
  sexo: string;
  cp: string;
  estado: string;
  ciudad: string;
  colonia: string;
  calle: string;
  telefono: string;
  email: string;
}

interface NextEvent {
  id: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  tipo: string;
  fecha: string;
  hora: string;
}


const EventBadge: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nextEvent, setNextEvent] = useState<NextEvent | null>(null);
  const curp = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:3000/usuario/${curp}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      setUserData(data);
    };

    const fetchNextEvent = async () => {
      const response = await fetch(`http://localhost:3000/usuarios/${curp}/eventos/proximoEvento`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setNextEvent(data);
    };

    fetchUserData();
    fetchNextEvent();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="badge" key={nextEvent?.id}>
        <h2 className="badge__title-main">Gafete de Asistencia de {userData?.nombre} {userData?.paterno} {userData?.materno}</h2>
        <div className="badge__content">
          <header className="badge__header">
            <h3 className="badge__title">{nextEvent?.nombre}</h3>
            <p className="badge__description">
              {nextEvent?.descripcion}
            </p>
            <p className="badge__description"><span>Fecha: </span>
              {nextEvent?.fecha}
            </p>
          </header>
          <figure className="badge__image">
            <QRCodeGenerator curp={userData?.curp} eventId={nextEvent?.id} />
          </figure>
        </div>
      </div>
    </motion.div>
  )
}

export default EventBadge;