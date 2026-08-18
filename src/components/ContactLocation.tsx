import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Navigation, MessageCircle, Building } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data/doctorData';

export const ContactLocation: React.FC = () => {
  return (
    <section id="contacto" className="py-16 bg-[#FAFCFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7DC4E0]/20 text-[#4A9FC0] text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#FF8A7A]" />
            <span>Ubicación & Contacto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4059]">
            ¿Dónde estamos y cómo llegar?
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5C74]">
            Ubicados en pleno corazón de Barrio Martin, Rosario, con fácil acceso y cómodo estacionamiento en la zona.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact & Hours Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 space-y-6">
              
              <h3 className="text-lg font-bold text-[#2D4059] border-b border-slate-100 pb-3">
                Información del Consultorio
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#7DC4E0]/20 text-[#4A9FC0] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D4059] uppercase tracking-wider">Dirección</h4>
                  <p className="text-sm font-semibold text-[#2D4059] mt-0.5">
                    {DOCTOR_PROFILE.address.street}, {DOCTOR_PROFILE.address.floor}, {DOCTOR_PROFILE.address.office}
                  </p>
                  <p className="text-xs text-[#4A5C74]">
                    {DOCTOR_PROFILE.address.city}, {DOCTOR_PROFILE.address.province}, {DOCTOR_PROFILE.address.country}
                  </p>
                  <p className="text-[11px] text-[#FF8A7A] font-semibold mt-1 bg-[#FFD9C9]/40 px-2 py-0.5 rounded-md inline-block">
                    Barrio Martin (cerca de Parque Urquiza y Av. Pellegrini)
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D4059] uppercase tracking-wider">Teléfono / WhatsApp</h4>
                  <p className="text-sm font-semibold text-[#2D4059] mt-0.5">
                    {DOCTOR_PROFILE.phone}
                  </p>
                  <a
                    href="https://wa.me/5493413354237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#128C7E] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-white" />
                    <span>Enviar WhatsApp directo</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFB6A8]/20 text-[#FF8A7A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D4059] uppercase tracking-wider">Email Directo</h4>
                  <a 
                    href={`mailto:${DOCTOR_PROFILE.email}`}
                    className="text-sm font-semibold text-[#4A9FC0] hover:underline block mt-0.5"
                  >
                    {DOCTOR_PROFILE.email}
                  </a>
                </div>
              </div>

              {/* Doctor License */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E0D3F0]/40 text-[#2D4059] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D4059] uppercase tracking-wider">Matrícula Profesional</h4>
                  <p className="text-sm font-semibold text-[#2D4059] mt-0.5">
                    {DOCTOR_PROFILE.license}
                  </p>
                  <p className="text-xs text-[#4A5C74]">
                    Colegio de Médicos de la Prov. de Santa Fe - 2da Circunscripción
                  </p>
                </div>
              </div>

              {/* Hours Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-[#2D4059] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-[#7DC4E0]" />
                  <span>Horarios de Atención</span>
                </h4>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 px-2.5 rounded-lg bg-slate-50 font-medium text-[#2D4059]">
                    <span>Lunes a Viernes:</span>
                    <span className="font-bold text-[#4A9FC0]">08:00 a 20:00 hs</span>
                  </div>
                  <div className="flex justify-between py-1 px-2.5 rounded-lg bg-slate-50 font-medium text-[#2D4059]">
                    <span>Sábados:</span>
                    <span className="font-bold text-[#FF8A7A]">08:00 a 12:00 hs</span>
                  </div>
                  <div className="flex justify-between py-1 px-2.5 rounded-lg bg-rose-50/50 font-medium text-rose-600">
                    <span>Domingos y Feriados:</span>
                    <span className="font-bold">Sin atención</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Map Visual & Transport Directions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#2D4059]">Mapa de Ubicación</h3>
                  <p className="text-xs text-[#4A5C74]">Rosario, Santa Fe, Argentina</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Pje.+Santa+Cruz+355,+Rosario,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#4A9FC0] hover:bg-[#3B89AA] text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>

              {/* Map Canvas Visual Simulation */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                {/* Embedded Map Visual Styled */}
                <div className="absolute inset-0 bg-[radial-gradient(#7DC4E0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#7DC4E0]/10 via-transparent to-[#FFB6A8]/10" />

                <div className="relative z-10 space-y-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-sm border border-slate-200">
                  <div className="w-12 h-12 bg-[#FF8A7A] text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#2D4059]">Consultorios Barrio Martin</p>
                    <p className="text-xs text-[#4A5C74] font-medium mt-0.5">
                      Pje. Santa Cruz 355, Piso 3, Cons. 1
                    </p>
                    <p className="text-[11px] font-bold text-[#4A9FC0] mt-1">
                      Dra. Andrea Carolina Torres (MP 18479)
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Pje.+Santa+Cruz+355,+Rosario,+Santa+Fe,+Argentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4A9FC0] hover:underline pt-1"
                  >
                    <span>Ver mapa interactivo y rutas</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Reference notes */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs text-[#4A5C74]">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <p className="font-bold text-[#2D4059]">🏙️ Referencias urbanas:</p>
                  <p className="mt-0.5">A 3 cuadras del Parque Urquiza y a metros de Av. Libertad / Av. Pellegrini.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <p className="font-bold text-[#2D4059]">🚌 Colectivos urbanos:</p>
                  <p className="mt-0.5">Líneas 102, 115, 122, 131, 132, 145 y K circulan por las avenidas cercanas.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
