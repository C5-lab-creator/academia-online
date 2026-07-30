"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/34685273346?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20los%20servicios%20de%20Academia%20Mente%20Abierta."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="whatsapp-button"
    >
      <FaWhatsapp size={34} />
    </a>
  );
}