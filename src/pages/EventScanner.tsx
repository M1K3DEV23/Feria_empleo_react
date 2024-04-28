import React, { useState } from "react";
import QrReader from "../components/QrReader";



const EventScanner: React.FC = () => {
  const [openQr, setOpenQr] = useState<boolean>(false);
  return(
    <div>
      <button onClick={() => setOpenQr(!openQr)}>
        {openQr ? 'Close': 'Open'} QR Scanner
      </button>
      {openQr && <QrReader />}
    </div>
  )
}


export default EventScanner;