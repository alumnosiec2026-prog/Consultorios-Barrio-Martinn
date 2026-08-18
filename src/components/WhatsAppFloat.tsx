import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const whatsappNumber = '5493413354237';
  const defaultText = 'Hola Dra. Andrea Torres, quisiera realizar una consulta desde la página web de Consultorios Barrio Martin.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
      title="Consultar por WhatsApp a Dra. Andrea Torres"
    >
      <MessageCircle className="w-6 h-6 fill-white text-[#25D366] group-hover:text-[#128C7E] transition-colors" />
      <span className="hidden sm:inline font-bold text-xs tracking-wide">
        WhatsApp Consultorio
      </span>
    </a>
  );
};
