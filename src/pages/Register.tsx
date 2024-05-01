import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegistrationData {
  curp: string;
  rfc: string;
  nombre: string;
  paterno: string;
  materno:string;
  sexo: string;
  cp: string;
  estado: string;
  ciudad: string;
  colonia: string;
  calle: string;
  telefono: string;
  email: string;
  password: string;

}
// Importando mis estilos
import '../styles/Register.css';
import { motion } from 'framer-motion';

// Importando tooltips
import { Bounce, ToastContainer, ToastOptions, Zoom, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Zoom
}
const toastOptionsRegister: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Bounce
}

const Register: React.FC = () => {

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    curp:'',
    rfc:'',
    nombre:'',
    paterno:'',
    materno:'',
    sexo: '',
    cp: '',
    estado:'',
    ciudad:'',
    colonia:'',
    calle:'',
    telefono: '',
    email:'',
    password:''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
  };

  // Validaciones
  const curpRegex = /^[a-zA-Z0-9]{18}$/;
  const rfcRegex = /^[a-zA-Z0-9]{13}$/;
  const regexNombresEspanol = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  const cpRegex = /^[0-9]{5}$/;
  const telefonoRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showErrorToast = (field: string, message: string) => {
    toast.warn(`${field}: ${message}`, toastOptionsRegister);
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { curp, rfc, nombre, paterno, materno, sexo, cp, estado, ciudad, colonia, calle, telefono, email, password  } = registrationData;

    const curpValid = curpRegex.test(curp);
    if (!curpValid) {
      showErrorToast('CURP', 'La CURP debe tener 18 caracteres y solo puede contener letras y números');
    } else if (curp.trim() === '') {
      showErrorToast('CURP', 'El campo CURP no puede estar vacío')
    }


    const rfcValid = rfcRegex.test(rfc);
    if (!rfcValid) {
      showErrorToast('RFC', 'El RFC debe tener 13 caracteres y solo puede contener letras y números');
    } else if (rfc.trim() === '') {
      showErrorToast('RFC', 'El campo RFC no puede estar vacío');
    }


    const nombreValid = regexNombresEspanol.test(nombre.trim());
    if (!nombreValid) {
      showErrorToast('Nombre', 'El nombre no debe contener caracteres numéricos');
    } else if (nombre.trim() === '') {
      showErrorToast('Nombre', 'El campo Nombre no puede estar vacío');
    }



    const paternoValid = regexNombresEspanol.test(paterno.trim());
    if (!paterno) {
      showErrorToast('Apellido Paterno', 'El apellido paterno no debe contener caracteres numéricos');
    } else if (nombre.trim() === '') {
      showErrorToast('Apellido Paterno', 'El campo Apellido Paterno no puede estar vacío');
    }



    const maternoValid = regexNombresEspanol.test(materno.trim());
    if (!maternoValid) {
      showErrorToast('Apellido Materno', 'El apellido materno no debe contener caracteres numéricos');
    } else if (materno.trim() === '') {
      showErrorToast('Apellido Materno', 'El campo Apellido Materno no puede estar vacío');
    }


    const sexoValid = sexo !== '';
    if (!sexoValid) {
      showErrorToast('Género', 'Seleccione un Género');
    }
    const cpValid = cpRegex.test(cp);
    if (!cpValid) {
      showErrorToast('Código Postal', 'El código postal debe tener 5 dígitos numéricos');
    } else if (cp.trim() === '') {
      showErrorToast('Código Postal', 'El código postal no puede estar vacío');
    }


    const estadoValid = regexNombresEspanol.test(estado.trim());
    if(!estadoValid) {
      showErrorToast('Estado', 'El estado no debe contener caracteres numéricos');
    } else if (estado.trim() === '') {
      showErrorToast('Estado', 'El estado no puede estar vacío');
    }


    const ciudadValid = regexNombresEspanol.test(ciudad.trim());
    if (!ciudadValid) {
      showErrorToast('Ciudad', 'La ciudad no debe contener caracteres numéricos');
    } else if (ciudad.trim() === '') {
      showErrorToast('Ciudad', 'La ciudad no puede estar vacío');
    }


    const coloniaValid = colonia.trim() !== '';
    if (!coloniaValid) {
      showErrorToast('Colonia', 'La colonia es obligatoria');
    }


    const calleValid = calle.trim() !== '';
    if (!calleValid) {
      showErrorToast('Dirección', 'La dirección es obligatoria');
    }


    const telefonoValid = telefonoRegex.test(telefono);
    if (!telefonoValid) {
      showErrorToast('Teléfono', 'El número de teléfono debe tener 10 dígitos numéricos');
    }


    const emailValid = emailRegex.test(email);
    if (!emailValid) {
      showErrorToast('Correo Electrónico', 'Ingrese un correo electrónico válido');
    }
    const passwordValid = password.trim() !== '';
    if (!password) {
      showErrorToast('Contraseña', 'La contraseña es obligatoria');
    }

    if (curpValid && rfcValid && nombreValid && paternoValid && maternoValid && sexoValid &&
    cpValid && estadoValid && ciudadValid && coloniaValid && calleValid && telefonoValid &&
    emailValid && passwordValid) {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        })
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        console.log(data);
        toast.success("Usuario registado correctamente!!", toastOptions);

        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        // Aquí puedes manejar la respuesta del servidor, como redirigir al usuario a la página de inicio o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Registration failed: ', error);
        // Aquí puedes manejar errores de red o de validación del servidor.
        toast.error('Error al registrarse en el servidor', toastOptions);
      }
    }
  }
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <ToastContainer limit={2} />
      <div className='register'>
        <h2 className='register__title'>Registro Usuario</h2>
        <div className='register__content'>
          <form className='register__form'>
            <div className='register__form-group'>
              <label htmlFor="curp">CURP:</label>
              <input type="text" name="curp" id="curp" placeholder='CURP' className='register__form-input' value={registrationData.curp} onChange={handleInputChange} maxLength={18} required />
            </div>

            <div className='register__form-group'>
              <label htmlFor="rfc">RFC:</label>
              <input type="text" name="rfc" id="rfc" placeholder='RFC' className='register__form-input' value={registrationData.rfc} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" name="nombre" id="nombre" placeholder='Nombre' className='register__form-input' value={registrationData.nombre} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="paterno">Apellido Paterno:</label>
              <input type="text" name="paterno" id="paterno" placeholder='Apellido Paterno' className='register__form-input' value={registrationData.paterno} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="materno">Apellido Materno:</label>
              <input type="text" name="materno" id="materno" placeholder='Apellido Materno' className='register__form-input' value={registrationData.materno} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="sexo">Género:</label>
              <select name="sexo" id="sexo" className='register__form-select' value={registrationData.sexo} onChange={handleSelectChange}>
                <option value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">No Binario</option>
              </select>
            </div>

            <div className='register__form-group'>
              <label htmlFor="cp">Código Postal:</label>
              <input type="number" name="cp" id="cp" placeholder='Código Postal' className='register__form-input' value={registrationData.cp} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="estado">Estado:</label>
              <input type="text" name="estado" id="estado" placeholder='Estado' className='register__form-input' value={registrationData.estado} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="ciudad">Ciudad:</label>
              <input type="text" name="ciudad" id="ciudad" placeholder='Ciudad' className='register__form-input' value={registrationData.ciudad} onChange={handleInputChange} />
            </div>


            <div className='register__form-group'>
              <label htmlFor="colonia">Colonia:</label>
              <input type="text" name="colonia" id="colonia" placeholder='Colonia' className='register__form-input' value={registrationData.colonia} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="calle">Dirección:</label>
              <input type="text" name="calle" id="calle" placeholder='Dirección' className='register__form-input' value={registrationData.calle} onChange={handleInputChange}/>
            </div>

            <div className='register__form-group'>
              <label htmlFor="telefono">Teléfono:</label>
              <input type="tel" name="telefono" id="telefono" placeholder='Teléfono' className='register__form-input' value={registrationData.telefono} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="email">E-mail:</label>
              <input type="email" name="email" id="email" placeholder='E-mail' className='register__form-input' value={registrationData.email} onChange={handleInputChange} />
            </div>

            <div className='register__form-group'>
              <label htmlFor="password">Contraseña:</label>
              <input type="password" name="password" id="password" placeholder='Contraseña' className='register__form-input' value={registrationData.password} onChange={handleInputChange} />
            </div>

          </form>
          <div className='register__form-btn'>
            <button type="button" onClick={handleSubmit}>Registrarse</button>
          </div>
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