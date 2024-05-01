import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// Importando el modal
import Modal from "../components/Modal";
import '../styles/EventList.css';
import { motion } from "framer-motion";

// Importando tooltips
import { Bounce, ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

interface Event {
  id: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  tipo: string;
  fecha: string;
  hora: string;
}

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Bounce
}

const EventList: React.FC = () => {
  // const [events, setEvents] = useState(eventos);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegisteres] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsRegisteres(true);
      } else {
        setIsRegisteres(false);
      }
    };
    checkUserLoggedIn();
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/eventos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error (`Error: ${response.status}`)
        }
        const data = await response.json();
        // Formatear la fecha para cada evento
        const formattedEvents = data.map((event: Event) => {
          const date = new Date(event.fecha);
          const formattedDate = date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return {
            ...event,
            fecha: formattedDate,
          };
        });
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
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

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (currentEvent && token) {
        const response = await fetch(`http://localhost:3000/eventos/${currentEvent.id}/registrar`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await response.json();
        if (response.ok) {
          // Realizar acciones adicionales despues de registrar la asistencia exitosamente
          toast.success(data.message, toastOptions);

          setTimeout(() => {
            window.location.href = '/event-badge';
          }, 2500);
        } else {
          toast.warn(data.error, toastOptions);
        }
      }
    } catch (error) {
      console.error('Error al registrar al evento: ', error);
    }
  };

  const filteredEvents = events.filter(evento => evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="events">
        <ToastContainer />
        <h2 className="events__title">Eventos Disponibles</h2>
        <div className="events__search">
          <span className="events__search-icon"><i></i></span>
          <input className="events__search-input" type="search" placeholder="Buscar eventos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="events__items">
          {
            filteredEvents.map(evento => (
            <div  className="events__item" key={evento.id}>
              <h3 className="events__item-title">{evento.nombre}</h3>
              <p className="events__item-description">{evento.descripcion}</p>
              <p className="events__item-location"><span>Ubicacion</span> &bull; {evento.ubicacion}</p>
              <p className="events__item-date"><span>Fecha</span> &bull; {evento.fecha}</p>
              <p className="events__item-date"><span>Horario</span> &bull; {evento.hora}</p>
              {
                isRegistered && (
                  <button onClick={() => openModalWithEvent(evento)}className="events__item-register" type="button">Registro</button>
                )
              }
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
                  {currentEvent.nombre}</span>
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
    </motion.div>
  )
}
export default EventList;