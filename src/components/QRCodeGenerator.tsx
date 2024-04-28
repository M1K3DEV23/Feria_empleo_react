import React from "react";
import QRCode from "qrcode.react";

interface QRCodeGeneratorProps {
  curp: string;
  eventId: string;
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({curp, eventId}) => {
  const data = `userID=${curp}&eventId=${eventId}`;
  return <QRCode value={data} />
};


export default QRCodeGenerator;