import React from 'react';
import { Heart, Stethoscope, Sparkles, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data/doctorData';

export const AboutDoctor: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Visual Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-br from-[#7DC4E0]/20 via-[#E0D3F0]/30 to-[#FFD9C9]/30 rounded-3xl p-8 relative">
              <div className="space-y-6">
                
                {/* Feature Quote Box */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <Sparkles className="w-8 h-8 text-[#FFE0A3] absolute -top-3 -right-3 fill-[#FFE0A3]" />
                  <p className="text-sm sm:text-base italic text-[#2D4059] font-medium leading-relaxed">
                    "La medicina antroposófica y la hematología pediátrica se complementan para comprender la salud integral del niño, respetando sus ritmos biológicos y fortaleciendo sus capacidades inmunológicas naturales."
                  </p>
                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#7DC4E0] text-white font-bold flex items-center justify-center text-xs">
                      AT
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2D4059]">{DOCTOR_PROFILE.name}</p>
                      <p className="text-[11px] text-[#4A5C74]">{DOCTOR_PROFILE.license}</p>
                    </div>
                  </div>
                </div>

                {/* Badges Column */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-xl shadow-2xs border border-slate-100 text-center">
                    <Award className="w-6 h-6 text-[#4A9FC0] mx-auto mb-1" />
                    <p className="text-xs font-bold text-[#2D4059]">Médica Pediatra</p>
                    <p className="text-[11px] text-[#4A5C74]">Formación Universitaria</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-2xs border border-slate-100 text-center">
                    <Stethoscope className="w-6 h-6 text-[#FF8A7A] mx-auto mb-1" />
                    <p className="text-xs font-bold text-[#2D4059]">Hematología</p>
                    <p className="text-[11px] text-[#4A5C74]">Pediátrica Especializada</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Detailed Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0D3F0]/40 text-[#2D4059] text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-[#FF8A7A] fill-[#FF8A7A]" />
              <span>Conocé a tu Médica</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4059] leading-tight">
              Dra. Andrea Carolina Torres
            </h2>
            
            <p className="text-sm sm:text-base text-[#4A5C74] leading-relaxed">
              En <strong>Consultorios Barrio Martin</strong> brindamos un espacio cálido, profesional y humano para la atención de niños, niñas y adolescentes. Nuestra propuesta médica integra la precisión científica de la pediatría y la hematología con la mirada holística de la medicina antroposófica.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4A9FC0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2D4059]">Pediatría y Desarrollo Infantil</h4>
                  <p className="text-xs text-[#4A5C74] mt-0.5">
                    Seguimiento continuo del crecimiento, lactancia, desarrollo psicomotor, alimentación saludable y pautas de crianza respetuosa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF8A7A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2D4059]">Especialista en Hematología Pediátrica</h4>
                  <p className="text-xs text-[#4A5C74] mt-0.5">
                    Estudio integral y tratamiento de anemias ferropénicas y carenciales, alteraciones plaquetarias, hematomas, ganglios inflamados y trastornos hemorrágicos en la infancia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A9D6C0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2D4059]">Orientación Médica Antroposófica</h4>
                  <p className="text-xs text-[#4A5C74] mt-0.5">
                    Tratamientos complementarios con medicina natural, apoyo inmunológico orgánico, abordaje de cuadros febriles y respiratorios recurrentes respetando la vitalidad del niño.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F2F8FC] rounded-2xl border border-[#7DC4E0]/20 text-xs text-[#4A5C74] flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[#2D4059]">Atención con turno previo en Rosario</p>
                <p className="text-[11px] mt-0.5">Pje. Santa Cruz 355, Piso 3, Consultorio 1 (Barrio Martin)</p>
              </div>
              <span className="font-mono text-xs font-bold text-[#4A9FC0] bg-white px-2.5 py-1 rounded-lg shadow-2xs shrink-0">
                MP 18479
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
