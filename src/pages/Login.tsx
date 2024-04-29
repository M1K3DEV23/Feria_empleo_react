import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

// Importando mi CSS
import '../styles/Login.css';

// Importando tooltips
import { ToastContainer, ToastOptions, Zoom, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Zoom
}

interface LoginCredentials {
  curp: string;
  password: string;
}
const Login: React.FC = () => {

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    curp: '',
    password: '',
  });
  // const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          // 'Accept': "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Almacenar el token de acceso en el almacenamiento local
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', data.curp);

      toast.success('Inicio de sesión exitoso!', toastOptions)


      setTimeout(() => {
        window.location.href = '/events';
      }, 2500);

    } catch(error) {
      // console.error('Login failed: ', error)
      // // Aquí puedes manejar errores de red o de validación del servidor.
      toast.error('Error al iniciar sesión', toastOptions)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className='login'>
        <ToastContainer />
        <h2 className='login__title'>Iniciar Sesión</h2>
        <form className='login__form' onSubmit={handleSubmit}>

          <div className='login__form_group'>
            {/* <label htmlFor=""></label> */}
            <input className='login__form-input' type="text" name="curp" id="curp" placeholder='CURP' value={loginCredentials.curp} onChange={handleInputChange} required />
          </div>

          <div className='login__form_group'>
            {/* <label htmlFor=""></label> */}
            <input className='login__form-input' type="password" name="password" id="password" placeholder='Contraseña' value={loginCredentials.password} onChange={handleInputChange} required />
          </div>

          <div className='login__form-group'>
            <button type="submit" className='login__form-submit'>Iniciar sesión</button>
          </div>

          <div className='login__links'>
            <p>
              ¿Olvidaste tu contraseña? <Link className='login__link' to="/reset-password">Recuperala</Link>
            </p>
            <p>
              ¿No tienes cuenta? <Link className='login__link' to="/register">Registrate</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  )
}


export default Login;