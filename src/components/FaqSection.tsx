import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { CLINIC_FAQS } from '../data/doctorData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE0A3]/40 text-[#2D4059] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#4A9FC0]" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2D4059]">
            Respuestas a tus dudas habituales
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5C74]">
            Información sobre la atención en el consultorio, modalidad de turnos y especialidades.
          </p>
        </div>

        <div className="space-y-3">
          {CLINIC_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#2D4059] hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7DC4E0] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#4A9FC0] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 text-xs text-[#4A5C74] leading-relaxed border-t border-slate-100 bg-[#FAFCFF]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
