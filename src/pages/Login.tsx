import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful: ', data);

      // Almacenar el token de acceso en el almacenamiento local
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_type', data.token_type);

    } catch(error) {
      console.error('Login failed: ', error)
      // Aquí puedes manejar errores de red o de validación del servidor.
    }
  }

  return (
    <div className='login'>
      <h2 className='login__title'>Iniciar Sesión</h2>
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
            ¿Olvidaste tu contraseña? <Link className='login__link' to="/reset-contrasena">Recuperala</Link>
          </p>
          <p>
            ¿No tienes cuenta? <Link className='login__link' to="/register">Registrate</Link>
          </p>
        </div>
      </form>
    </div>
  )
}


export default Login;