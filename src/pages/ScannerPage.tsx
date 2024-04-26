import React, { useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';

import '../styles/ScannerPage.css';

const ScannerPage: React.FC = () => {
  const [facingMode, setFacingMode] = useState('user');
  const [hasPermission, setHasPermission] = useState(false);



  const switchCamera = () => {
    setFacingMode(prevState => prevState === 'user' ? 'environment': 'user');
  }

  const requestCameraPermission = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      })
      if (stream) {
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <div className="scanner">
      {!hasPermission ? (
        <div className="scanner__content">
          <p>Necesitamos tu permiso para acceder a tu cámara.</p>
          <button onClick={requestCameraPermission}>Permitir acceso a la cámara</button>
        </div>
      ): (
      <div className="scanner__content">
        <Scanner onResult={(text, result) => console.log(text, result)} onError={(error) => console.error(error?.message)} options={{ constraints: {facingMode: facingMode} }}
        />
        <button onClick={switchCamera}>Cambiar cámara</button>
      </div>
      )}
    </div>
  );
}


export default ScannerPage;