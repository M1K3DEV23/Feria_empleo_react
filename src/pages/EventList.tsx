import React, { useState, useEffect } from "react";

// Importando el modal
import Modal from "../components/Modal";

import '../styles/EventList.css'

interface Event {
  clave_feria: number;
  nombre_evento: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  ubicacion: string;
  descripcion: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/Fair');
        if (!response.ok) {
          throw new Error (`Error: ${response.status}`)
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events: ', error)
      }
    };

    fetchEvents();
  }, []);

  const openModalWithEvent = (evento: Event) => {
    setCurrentEvent(evento);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  }


  const filteredEvents = events.filter(evento => evento.nombre_evento.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="events">
      <h2 className="events__title">Eventos Disponibles</h2>
      <div className="events__search">
        <span className="events__search-icon"><i></i></span>
        <input className="events__search-input" type="search" placeholder="Buscar eventos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="events__items">
        {
          filteredEvents.map(evento => (
          <div className="events__item" key={evento.clave_feria}>
            <h3 className="events__item-title">{evento.nombre_evento}</h3>
            <p className="events__item-description">{evento.descripcion}</p>
            <p className="events__item-location"><strong>Ubicacion &bull;</strong>{evento.ubicacion}</p>
            <p className="events__item-date"><strong>Fecha:</strong>{evento.fecha}</p>
            <p className="events__item-date"><strong>Horario:</strong>{evento.hora_inicio}</p>
            <button onClick={() => openModalWithEvent(evento)} className="events__item-register" type="button">Registro</button>
          </div>
          ))
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          currentEvent && (
            <div>
              <h2>Registro para el Evento: {currentEvent.nombre_evento}</h2>
              <button type="button">Confirmar Registro</button>
            </div>
          )
        }
      </Modal>
    </div>
  )
}


export default EventList;