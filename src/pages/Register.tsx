import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegistrationData {
  curp: string;
  rfc: string;
  nombre: string;
  paterno: string;
  materno:string;
  sexo: number;
  cp: number;
  estado: string;
  ciudad: string;
  colonia: string;
  calle: string;
  telefono: number;
  email: string;
  password: string;

}
// Importando mis estilos
import '../styles/Register.css';
import { motion } from 'framer-motion';

const Register: React.FC = () => {

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    curp:'',
    rfc:'',
    nombre:'',
    paterno:'',
    materno:'',
    sexo: 0,
    cp: 0,
    estado:'',
    ciudad:'',
    colonia:'',
    calle:'',
    telefono: 0,
    email:'',
    password:''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Registration successful: ', data);
      // Aquí puedes manejar la respuesta del servidor, como redirigir al usuario a la página de inicio o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Registration failed: ', error);
      // Aquí puedes manejar errores de red o de validación del servidor.
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className='register'>
        <h2 className='register__title'>Registro Usuario</h2>
        <div className='register__content'>
          <form className='register__form' onSubmit={handleSubmit}>
            <div className='register__form-group'>
              {/* <label htmlFor="">CURP:</label> */}
              <input type="text" name="curp" id="curp" placeholder='CURP' className='register__form-input' value={registrationData.curp} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">RFC:</label> */}
              <input type="text" name="rfc" id="rfc" placeholder='RFC' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Nombre:</label> */}
              <input type="text" name="nombre" id="nombre" placeholder='Nombre' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Apellido Paterno:</label> */}
              <input type="text" name="paterno" id="paterno" placeholder='Apellido Paterno' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Apellido Materno:</label> */}
              <input type="text" name="materno" id="materno" placeholder='Apellido Materno' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Género:</label> */}
              <select name="sexo" id="sexo" className='register__form-select'>
                <option value="">Selecciona una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otros">No Binario</option>
              </select>
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Código Postal:</label> */}
              <input type="number" name="cp" id="cp" placeholder='Código Postal' className='register__form-input' />
            </div>

            <div>
              {/* <label htmlFor="">Estado:</label> */}
              <input type="text" name="estado" id="estado" placeholder='Estado' className='register__form-input' />
            </div>

            <div>
              {/* <label htmlFor="">Ciudad:</label> */}
              <input type="text" name="ciudad" id="ciudad" placeholder='Ciudad' className='register__form-input' />
            </div>


            <div className='register__form-group'>
              {/* <label htmlFor="">Colonia:</label> */}
              <input type="text" name="colonia" id="colonia" placeholder='Colonia' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Dirección:</label> */}
              <input type="text" name="calle" id="calle" placeholder='Dirección' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Teléfono:</label> */}
              <input type="tel" name="telefono" id="telefono" placeholder='Teléfono' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">E-mail:</label> */}
              <input type="email" name="email" id="email" placeholder='E-mail' className='register__form-input' />
            </div>

            <div className='register__form-group'>
              {/* <label htmlFor="">Contraseña:</label> */}
              <input type="password" name="password" id="password" placeholder='Contraseña' className='register__form-input' />
            </div>

            <div className='register__form-btn'>
              <button type="submit">Registrarse</button>
            </div>
          </form>
        </div>
          <div className='register__links'>
            <p>
              ¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link>
            </p>
            <p>
              ¿Olvidaste tu contraseña? <Link to="/reset-password">Recuperala</Link>
            </p>
          </div>
      </div>
    </motion.div>
  )
}


export default Register;