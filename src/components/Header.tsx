import { Link } from 'react-router-dom';

// Importar el logo
import escudoBlanco from '/escudoblanco.avif';

// Importando mis estilos CSS
import '../styles/Header.css'


const Header: React.FC = () => {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Determinar si el usuario esta logeado
  const isLoggendIn = !! token;


  // Funcion para cerrar session
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/';
  }
  return (
    <header className="header">
      <div className="header__logo">
        <img src={escudoBlanco} alt="Escudo del Estado de Chiapas" />
      </div>
      <div className="header__nav">
        <nav className="header__nav-menu">
          <ul className="header__nav-menu-list">
            <li className="header__nav-menu-item">
              <Link to='/'  className="header__nav-menu-link">Inicio</Link>
            </li>
            <li className="header__nav-menu-item">
              <Link to='/events'  className="header__nav-menu-link">Eventos</Link>
            </li>
            {
              isLoggendIn && (
                <>
                  <li className="header__nav-menu-item">
                    <Link to='/event-badge'  className="header__nav-menu-link">Gafete</Link>
                  </li>
                  <li className="header__nav-menu-item">
                    <Link to='/events-scanner'  className="header__nav-menu-link">Escaner</Link>
                  </li>
                </>
              )
            }
          </ul>
        </nav>

      </div>
      <div className="header__nav_menu-btn">
        <ul className="header__nav-menu-list">
          {
            isLoggendIn ? (
              <li className="header__nav-menu-item">
                <button onClick={handleLogout} className="header__nav-menu-btn-close">Cerrar Sesión</button>
              </li>
            ) : (
              <>
                <li className="header__nav-menu-item">
                  <Link to='/register'  className="header__nav-menu-btn">Registrarse</Link>
                </li>
                <li className="header__nav-menu-item">
                  <Link to='/login'  className="header__nav-menu-btn">Iniciar Sesión</Link>
                </li>
              </>
            )
          }
        </ul>
      </div>
    </header>
  )
}

export default Header;