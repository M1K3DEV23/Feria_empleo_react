import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import QrFrame from '../assets/qr-frame.svg';

// Importando mis estilos CSS
import '../styles/QrReader.css'

const QrReader = () => {
  // Estados del QR
  const scanner = useRef<QrScanner>();
  const videoEL = useRef<HTMLVideoElement>(null);
  const qrBoxEL = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Resultado
  const [scannedResult, setScannedResult] = useState<string | undefined>('');

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    setScannedResult(result?.data);
  }

  // Fail
  const onScanFail = (err: string | Error) => {
    console.error(err);
  }

  useEffect(() => {
    if (videoEL?.current && !scanner.current) {
      // Instanciar el QR Scanner
      scanner.current = new QrScanner(videoEL?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // Esto es la la posicion de la camara
        preferredCamera: 'environment',
        // Esto nos podria ayudar a posicionar nuestro QRFrame
        highlightScanRegion: true,
        // Esto genera un yellow outline alrededor del qr
        highlightCodeOutline: true,
        overlay: qrBoxEL?.current || undefined,
      });

      // Start QR Scanner
      scanner?.current?.start().then(() => setQrOn(true)).catch((err) => {
        if (err) setQrOn(false);
      });
    }
    return () => {
      if (!videoEL?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // Si la camara no esta permitida en el navegador mostrar una alerta
  useEffect(() => {
    if (!qrOn) {
      alert('Camara esta bloqueada');
    }
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEL}></video>
      <div ref={qrBoxEL} className="qr-box">
        <img src={QrFrame} alt="QR Frame" width={256} height={256} className="qr-frame" />
      </div>
      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p style={{ position: 'absolute', top: 0, left:0, zIndex:999, color: 'white' }}>
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  )
};

export default QrReader;