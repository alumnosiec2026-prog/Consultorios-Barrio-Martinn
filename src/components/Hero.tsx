import React from 'react';
import { Calendar, ShieldCheck, Heart, Sparkles, MapPin, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data/doctorData';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onServicesClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F8FC] via-[#FAFCFF] to-white pt-8 sm:pt-12 pb-16 lg:pb-24">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FFE0A3]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#E0D3F0]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#FFD9C9]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Tags */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7DC4E0]/15 border border-[#7DC4E0]/30 text-[#4A9FC0] text-xs sm:text-sm font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#FF8A7A]" />
              <span>Pediatría & Hematología Integral</span>
              <span className="bg-[#4A9FC0] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                Rosario
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D4059] leading-tight sm:leading-tight">
              Acompañamiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A9FC0] to-[#FF8A7A]">médico e integral</span> para el crecimiento de tus hijos
            </h1>

            {/* Doctor Info Subtitle */}
            <p className="text-base sm:text-lg text-[#4A5C74] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {DOCTOR_PROFILE.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#7DC4E0]/20 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#7DC4E0]/20 flex items-center justify-center text-[#4A9FC0] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#2D4059]">Orientación</p>
                  <p className="text-[11px] text-[#4A5C74]">Antroposófica</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#FFB6A8]/20 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFB6A8]/20 flex items-center justify-center text-[#FF8A7A] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#2D4059]">Especialista</p>
                  <p className="text-[11px] text-[#4A5C74]">Hematología</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#A9D6C0]/30 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#A9D6C0]/20 flex items-center justify-center text-[#2D4059] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#2D4059]">Turnos 20 min</p>
                  <p className="text-[11px] text-[#4A5C74]">Atención puntual</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#4A9FC0] via-[#7DC4E0] to-[#4A9FC0] hover:from-[#3B89AA] hover:to-[#3B89AA] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group active:scale-98"
              >
                <Calendar className="w-5 h-5 text-[#FFE0A3] group-hover:scale-110 transition-transform" />
                <span>Solicitar Turno Online</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onServicesClick}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#7DC4E0]/30 text-[#2D4059] font-bold text-base shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Conocer Especialidades</span>
              </button>
            </div>

            {/* Address & Direct WhatsApp Callout */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#4A5C74]">
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A7A]" />
                Pje. Santa Cruz 355, Piso 3, Cons. 1 (Barrio Martin)
              </span>
              <a
                href="https://wa.me/5493413354237"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-[#128C7E] hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-white" />
                <span>WhatsApp: 341 335-4237</span>
              </a>
            </div>

          </div>

          {/* Right Image / Doctor Profile Display Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Gradient Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#7DC4E0] via-[#FFB6A8] to-[#FFE0A3] opacity-70 blur-xl animate-pulse" />

              {/* Main Profile Card Container */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100/80 text-center">
                
                {/* Doctor Avatar / Illustration Header */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-5 rounded-full p-1.5 bg-gradient-to-br from-[#7DC4E0] via-[#A9D6C0] to-[#FFB6A8] shadow-md">
                  <div className="w-full h-full rounded-full bg-[#FAFCFF] overflow-hidden flex items-center justify-center relative border-4 border-white">
                    {/* SVG Friendly Pediatrician Illustration */}
                    <div className="w-full h-full bg-gradient-to-b from-[#E0D3F0]/30 to-[#7DC4E0]/20 flex flex-col items-center justify-center text-[#4A9FC0]">
                      <Heart className="w-16 h-16 text-[#FF8A7A] fill-[#FFD9C9] animate-bounce" />
                      <span className="text-[11px] font-bold text-[#2D4059] mt-1">Dra. Andrea Torres</span>
                    </div>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="absolute bottom-1 right-1 bg-[#4A9FC0] text-white p-2 rounded-full shadow-md border-2 border-white" title="Médica Matriculada">
                    <ShieldCheck className="w-5 h-5 text-[#FFE0A3]" />
                  </div>
                </div>

                {/* Doctor Name & Credentials */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#2D4059]">
                  {DOCTOR_PROFILE.name}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#4A9FC0] mt-1">
                  {DOCTOR_PROFILE.title}
                </p>
                <div className="inline-block mt-2 bg-[#FFE0A3]/30 text-[#2D4059] text-xs font-bold px-3 py-1 rounded-full border border-[#FFE0A3]/60">
                  Matrícula Profesional: {DOCTOR_PROFILE.license}
                </div>

                {/* Quick Info Checklist inside Card */}
                <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-2.5 text-xs text-[#4A5C74]">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#A9D6C0]/30 flex items-center justify-center text-[#2D4059] shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong>Atención pediátrica amorosa</strong> y personalizada para recién nacidos, niños y adolescentes.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#7DC4E0]/30 flex items-center justify-center text-[#4A9FC0] shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong>Especialista en Hematología Pediátrica</strong> (estudio y tratamiento de anemias y plaquetas).
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#FFD9C9] flex items-center justify-center text-[#FF8A7A] shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong>Abordaje Antroposófico:</strong> estímulo natural de la salud orgánica del niño.
                    </span>
                  </div>
                </div>

                {/* Direct Call to Action inside Card */}
                <div className="mt-6">
                  <button
                    onClick={onBookClick}
                    className="w-full py-3 px-4 rounded-xl bg-[#2D4059] hover:bg-[#1E2D42] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#FFE0A3]" />
                    <span>Reservar Turno con la Dra.</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
