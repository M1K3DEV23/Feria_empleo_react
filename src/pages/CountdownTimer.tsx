import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";


// Importando los estilos CSS
import '../styles/CountdownTimer.css';

interface EventData {
  descripcion: string;
  fecha: string;
  hora: string;
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
}

const CountdownTimer: React.FC = () => {
  const [nextEventData, setNextEventDate] = useState<EventData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    // Hacer una llamada a la API
    const fetchNextEventDate = async () => {
      try {
        const response = await fetch('http://localhost:3000/evento/proximoEvento');
        const data = await response.json();
        setNextEventDate(data);
      } catch(err) {
        console.error('Erro al obtener la fecha del próximo evento');
      }
    };
    fetchNextEventDate();
  }, []);


  useEffect(() => {
    if (nextEventData) {
      const eventDate = new Date(nextEventData.fecha).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      setTimeRemaining(difference);

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = eventDate - now;

        setTimeRemaining(difference);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextEventData]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="countdown-timer">
        {
          nextEventData ? (
            timeRemaining > 0 ? (
              <div className="countdown-timer__countdown">
                <h2 className="countdown-timer__countdown-title">Tiempo Restante</h2>
                <p className="countdown-timer__countdown-message"> <span>Próximo evento:</span> {nextEventData.nombre}</p>
                <p className="countdown-timer__countdown-value">{days} <span>días</span>, {hours} <span>horas</span>, {minutes} <span>minutos</span>, {seconds} <span>segundos</span></p>
              </div>
            ) : (
              <p>El evento ya ha finalizado</p>
            )
          ) : (
            <p className="countdown-timer__event-finished">Cargando...</p>
          )
        }
      </div>
    </motion.div>
  );
};



export default CountdownTimer;