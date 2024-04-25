import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Importando el modal
import Modal from "../components/Modal";

import '../styles/EventList.css'

// Importando datos falsos

const eventos = [
  {
    "clave_feria": 1,
    "nombre_evento": "Feria de Empleo Tech",
    "descripcion": "Encuentre oportunidades de carrera en el sector tecnológico.",
    "ubicacion": "Tuxtla Gutierrez, Chiapas",
    "fecha": "04 de Abril de 2024",
    "hora_inicio": "12:00:00"
  },
  {
    "clave_feria": 2,
    "nombre_evento": "Expo Innovación",
    "descripcion": "Descubra las últimas innovaciones en tecnología y negocios.",
    "ubicacion": "Monterrey, Nuevo León",
    "fecha": "15 de Mayo de 2024",
    "hora_inicio": "10:00:00"
  },
  {
    "clave_feria": 3,
    "nombre_evento": "Conferencia de Inteligencia Artificial",
    "fecha": "22 de Junio de 2024",
    "descripcion": "Aprenda sobre las aplicaciones prácticas de la inteligencia artificial en diferentes industrias.",
    "ubicacion": "Guadalajara, Jalisco",
    "hora_inicio": "09:30:00"
  }
]

interface Event {
  clave_feria: number;
  nombre_evento: string;
  fecha: string;
  hora_inicio: string;
  // hora_fin: string;
  ubicacion: string;
  descripcion: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState(eventos);
  // const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleConfirm = () => {
    navigate('/event-badge');
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
            <>
              <h3 className="modal__title">Confirmar registro</h3>
              <p className="modal__text">
                ¿Estás seguro de que deseas registrarte en <span>
                {currentEvent.nombre_evento}</span>?
              </p>
              <div className="modal__content">
                <form className="modal__form">
                  <label htmlFor="hear-about" className="modal__label">Cómo te enteraste?</label>
                  <select className="modal__select" name="hear-about" id="hear-about" required>
                    <option value="1">Recomendación</option>
                    <option value="2">Busqueda en Internet</option>
                    <option value="3">Publicidad en línea</option>
                    <option value="4">Redes sociales</option>
                    <option value="5">Otros</option>
                  </select>
                  <div className="modal__buttons">
                    <button className="modal__btn" type="submit" onClick={handleConfirm}>Confirmar</button>
                  </div>
                </form>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}


export default EventList;