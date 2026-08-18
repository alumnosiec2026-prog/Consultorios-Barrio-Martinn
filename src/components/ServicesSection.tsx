import React from 'react';
import { Stethoscope, Activity, Sparkles, Heart, ArrowRight, Check } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/doctorData';
import { ServiceType } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'pediatria':
        return <Stethoscope className="w-6 h-6 text-[#4A9FC0]" />;
      case 'hematologia':
        return <Activity className="w-6 h-6 text-[#FF8A7A]" />;
      case 'antroposofica':
        return <Sparkles className="w-6 h-6 text-[#2D4059]" />;
      case 'recien-nacido':
        return <Heart className="w-6 h-6 text-[#FF8A7A]" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#4A9FC0]" />;
    }
  };

  const getMappedServiceName = (id: string): ServiceType => {
    switch (id) {
      case 'pediatria': return 'Control Pediátrico';
      case 'hematologia': return 'Consulta Hematológica';
      case 'antroposofica': return 'Orientación Antroposófica';
      case 'recien-nacido': return 'Control de Recién Nacido';
      default: return 'Consulta General';
    }
  };

  return (
    <section id="servicios" className="py-16 bg-[#FAFCFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7DC4E0]/15 text-[#4A9FC0] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A7A]" />
            <span>Nuestras Especialidades</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4059]">
            Servicios Médicos Pediátricos e Integrales
          </h2>
          <p className="text-sm sm:text-base text-[#4A5C74]">
            Brindamos atención personalizada adaptada a las necesidades médicas de cada etapa del crecimiento infantil.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_SERVICES.map((service) => {
            const mappedName = getMappedServiceName(service.id);

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}25` }}
                    >
                      {getServiceIcon(service.id)}
                    </div>
                    <span 
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${service.color}20`, color: '#2D4059' }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-[#2D4059] group-hover:text-[#4A9FC0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#4A9FC0] mt-0.5 mb-3">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#4A5C74] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Direct Booking CTA for this service */}
                <button
                  onClick={() => onSelectServiceForBooking(mappedName)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#7DC4E0]/15 text-[#2D4059] hover:text-[#4A9FC0] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200/80 hover:border-[#7DC4E0]/40"
                >
                  <span>Reservar este Turno</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Note */}
        <div className="mt-10 p-4 bg-gradient-to-r from-[#7DC4E0]/10 via-[#FFE0A3]/20 to-[#FFB6A8]/10 rounded-2xl border border-[#7DC4E0]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2D4059]">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[#4A9FC0] shrink-0" />
            <span>
              <strong>¿Dudas sobre cuál consulta seleccionar?</strong> Podés comunicarte directamente para asesorarte antes de agendar.
            </span>
          </div>
          <a
            href="https://wa.me/5493413354237"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shrink-0 transition-colors shadow-xs"
          >
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
