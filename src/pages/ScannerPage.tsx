import React, { useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';

import '../styles/ScannerPage.css';

const ScannerPage: React.FC = () => {
  const [facingMode, setFacingMode] = useState('user');


  const switchCamera = () => {
    setFacingMode(prevState => prevState === 'user' ? 'environment': 'user');
  }

  return (
    <div className="scanner">
      <div className="scanner__content">
        <Scanner onResult={(text, result) => console.log(text, result)} onError={(error) => console.error(error?.message)} options={{ constraints:{facingMode: facingMode} }} />
        <button onClick={switchCamera}>Cambiar cámara</button>
      </div>
    </div>
  );
}


export default ScannerPage;