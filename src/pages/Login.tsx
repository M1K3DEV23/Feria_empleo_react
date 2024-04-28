import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Alert from '@mui/material/Alert';

// Importando mi CSS
import '../styles/Login.css'

interface LoginCredentials {
  curp: string;
  password: string;
}
const Login: React.FC = () => {

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    curp: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

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
        setError(data.curp);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        console.error(data);
        throw new Error(`Error: ${response.status}`);
      }
      console.log('Login successful: ', data);

      // Almacenar el token de acceso en el almacenamiento local
      localStorage.setItem('token', data.token);

    } catch(error) {
      console.error('Login failed: ', error)
      // Aquí puedes manejar errores de red o de validación del servidor.
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className='login'>
        <h2 className='login__title'>Iniciar Sesión</h2>
        {
            showAlert && (
              <Alert severity='warning'>{error}</Alert>
            )
          }
        <form className='login__form' onSubmit={handleSubmit}>

          <div className='login__form_group'>
            <label htmlFor=""></label>
            <input className='login__form-input' type="text" name="curp" id="curp" placeholder='CURP' value={loginCredentials.curp} onChange={handleInputChange} />
          </div>

          <div className='login__form_group'>
            <label htmlFor=""></label>
            <input className='login__form-input' type="password" name="password" id="password" placeholder='Contraseña' value={loginCredentials.password} onChange={handleInputChange} />
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