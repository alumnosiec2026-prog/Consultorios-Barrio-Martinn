import React from 'react';
import { Heart, MapPin, Phone, Mail, ShieldCheck, Lock } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data/doctorData';

interface FooterProps {
  onAdminClick: () => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick, onBookClick }) => {
  return (
    <footer className="bg-[#2D4059] text-white pt-12 pb-8 border-t-4 border-[#7DC4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-xs text-white/80">
          
          {/* Col 1: Clinic Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#7DC4E0] text-[#2D4059] flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 fill-white text-[#FF8A7A]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Consultorios Barrio Martin</h3>
                <p className="text-[11px] text-[#7DC4E0]">Rosario, Santa Fe</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Atención pediátrica integral con especialidad en hematología y medicina antroposófica. Acompañamiento respetuoso para la infancia.
            </p>
            <div className="pt-1">
              <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#FFE0A3]">
                Matrícula: {DOCTOR_PROFILE.license}
              </span>
            </div>
          </div>

          {/* Col 2: Doctor Profile */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-2 text-[#7DC4E0]">
              Médica Responsable
            </h4>
            <p className="font-bold text-white text-xs">{DOCTOR_PROFILE.name}</p>
            <p className="text-white/70">{DOCTOR_PROFILE.title}</p>
            <p className="text-white/70">{DOCTOR_PROFILE.specialty}</p>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-2 text-[#FFB6A8]">
              Ubicación & Atención
            </h4>
            <p className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#FFB6A8]" />
              Pje. Santa Cruz 355, Piso 3, Cons. 1
            </p>
            <p className="flex items-center gap-1.5 text-white/80">
              <Phone className="w-3.5 h-3.5 text-[#7DC4E0]" />
              Tel: {DOCTOR_PROFILE.phone}
            </p>
            <p className="flex items-center gap-1.5 text-white/80">
              <Mail className="w-3.5 h-3.5 text-[#A9D6C0]" />
              {DOCTOR_PROFILE.email}
            </p>
            <p className="text-white/60 text-[11px] pt-1">
              {DOCTOR_PROFILE.schedule.weekdays} | {DOCTOR_PROFILE.schedule.saturdays}
            </p>
          </div>

          {/* Col 4: Fast Actions */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-2 text-[#FFE0A3]">
              Acceso Rápido
            </h4>
            <button
              onClick={onBookClick}
              className="w-full py-2 px-3 rounded-xl bg-[#7DC4E0] hover:bg-[#4A9FC0] text-[#2D4059] hover:text-white font-bold transition-colors text-left text-xs"
            >
              📅 Solicitar Turno Online
            </button>
            <button
              onClick={onAdminClick}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors text-left text-xs flex items-center justify-between"
            >
              <span>🔒 Panel Administración</span>
              <Lock className="w-3.5 h-3.5 text-[#FFE0A3]" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <p>© {new Date().getFullYear()} Consultorios Barrio Martin - Dra. Andrea Carolina Torres. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Diseñado con</span>
            <Heart className="w-3 h-3 text-[#FF8A7A] fill-[#FF8A7A]" />
            <span>para el cuidado de los niños</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
