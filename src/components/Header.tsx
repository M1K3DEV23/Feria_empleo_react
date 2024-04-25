import React from "react";
import { Link } from 'react-router-dom';

// Importar el logo
import escudoBlanco from '/escudoblanco.avif';

// Importando mis estilos CSS
import '../styles/Header.css'


const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={escudoBlanco} alt="Escudo del Estado de Chiapas" />
      </div>
      <div className="header__nav">
        <div className="header__nav-toggle">
          <button className="header__nav-toggle-btn">
            <span className="header__nav-toggle-icon">
              <i></i>
              <i></i>
            </span>
          </button>
        </div>
        <nav className="header__nav-menu">
          <ul className="header__nav-menu-list">
            <li className="header__nav-menu-item">
              <Link to='/'  className="header__nav-menu-link">Inicio</Link>
            </li>
            <li className="header__nav-menu-item">
              <Link to='/register'  className="header__nav-menu-link">Registrarse</Link>
            </li>
            <li className="header__nav-menu-item">
              <Link to='/login'  className="header__nav-menu-link">Iniciar Sesión</Link>
            </li>
            <li className="header__nav-menu-item">
              <Link to='/events'  className="header__nav-menu-link">Eventos</Link>
            </li>
            <li className="header__nav-menu-item">
              <Link to='/event-badge'  className="header__nav-menu-link">Gafete</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;