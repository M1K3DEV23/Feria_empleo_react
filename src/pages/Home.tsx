import React from "react";

// Importar frame-motion
import { motion } from "framer-motion";

// Importando el CSS
import '../styles/Home.css';

// Lucide
import { Facebook, Twitter } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="home">
        <div className="home__container">
          <div className="home__content">
            <h1 className="home__title">Encuentra tu Próximo Empleo</h1>
            <p>Descubre las mejores ferias de empleo y oportunidades laborales en <span>Chiapas</span>.</p>
          </div>
          <div className="home__objective">
            <h2 className="home__objective-title">Nuestro Objetivo</h2>
            <p className="home__objective-description">
            Nuestra función es brindarte servicios de información, vinculación y orientación ocupacional, <strong>te capacitamos para convertirte en el candidato ideal a las vacantes disponibles.</strong>
            </p>
          </div>
          <div className="home__contact">
            <h2>Contáctanos</h2>
            <div className="home__contact-items">
              {/* Un item */}
              <div className="home__contact-item">
                <h3 className="home__contact-item-title">Delegación Tuxtla</h3>
                <p className="home__contact-item-info">Calle 3 poniente sur N°170, entre Av. Central y 1ra sur, Centro<br/>C.P. 29000 Tuxtla Gutiérrez, Chiapas.<br/>Conmutador: (961) 61 1 43 76</p>
              </div>
              {/* Agregar mas */}
              {/* Un item */}
              <div className="home__contact-item">
                <h3 className="home__contact-item-title">Delegación Tapachula</h3>
                <p className="home__contact-item-info">1 sur Prolongación, Unidad Administrativa, Edificio B, Las Palmas<br/>C.P. 30700 Tapachula, Chiapas.<br/>Teléfono: (962) 62 60576, 62 87147 Fax: (962) 62 60576</p>
              </div>
              {/* Agregar mas */}
              {/* Un item */}
              <div className="home__contact-item">
                <h3 className="home__contact-item-title">Delegación San Cristóbal</h3>
                <p className="home__contact-item-info">Ignacio Allende 11, Barrio La Merced<br/>C.P. 29240 San Cristóbal de las Casas, Chiapas.<br/>Teléfono: 01 (967) 67 80682 Fax: 01 (967) 67 80682</p>
              </div>
              {/* Agregar mas */}
              {/* Un item */}
              <div className="home__contact-item">
                <h3 className="home__contact-item-title">Delegación Comitán</h3>
                <p className="home__contact-item-info">Calle Central Poniente, Lic. Benito Juárez No. 22,<br/>Centro C.P. 30000 Comitán de Domínguez, Chiapas.<br/>Teléfono: 01 (963) 63 20082 Fax: 01 (963) 63 20082</p>
              </div>
              {/* Agregar mas */}
            </div>
          </div>
          <div className="home__social">
            <h2 className="home__social-title">Síguenos en redes sociales</h2>
            <div className="home__social-icons">
              <a href="https://twitter.com/SEyTChiapas" target="_blank" rel="noopener noreferrer" className="home__social-icon">
              <Twitter />
              </a>
              <a href="https://www.facebook.com/SeytCh" target="_blank" rel="noopener noreferrer" className="home__social-icon">
                <Facebook />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;