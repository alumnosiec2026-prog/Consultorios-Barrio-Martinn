import React, { useState } from 'react';
import { Search, Calendar, Phone, CheckCircle2, XCircle, AlertCircle, Trash2, Clock, MapPin, Download } from 'lucide-react';
import { Appointment } from '../types';
import { formatSpanishDate, downloadCalendarEvent } from '../utils/timeUtils';

interface LookupSectionProps {
  appointments: Appointment[];
  onCancelAppointment: (appointmentId: string) => void;
}

export const LookupSection: React.FC<LookupSectionProps> = ({
  appointments,
  onCancelAppointment
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Appointment[]>([]);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const cleanQuery = query.trim().toLowerCase().replace(/\s/g, '');
    
    const matches = appointments.filter((app) => {
      const matchId = app.id.toLowerCase().includes(cleanQuery);
      const matchPhone = app.patient.phone.replace(/\D/g, '').includes(cleanQuery.replace(/\D/g, ''));
      const matchPatientName = app.patient.patientName.toLowerCase().includes(query.trim().toLowerCase());
      const matchTutorName = app.patient.tutorName.toLowerCase().includes(query.trim().toLowerCase());
      
      return matchId || (cleanQuery.length >= 4 && matchPhone) || matchPatientName || matchTutorName;
    });

    setResults(matches);
    setSearched(true);
  };

  const handleCancel = (id: string) => {
    onCancelAppointment(id);
    setResults(results.map(a => a.id === id ? { ...a, status: 'cancelado' } : a));
    setConfirmCancelId(null);
  };

  return (
    <section id="consultar" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0D3F0]/40 text-[#2D4059] text-xs font-bold">
            <Search className="w-3.5 h-3.5 text-[#4A9FC0]" />
            <span>Gestión de Turnos</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2D4059]">
            Consultar o Cancelar mi Turno
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5C74]">
            Ingresá tu código de reserva (ej. CBM-2041), teléfono o nombre del paciente.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Código, teléfono o nombre..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0] bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#2D4059] hover:bg-[#1E2D42] text-white font-bold text-xs shadow-sm transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* Results Area */}
        {searched && (
          <div className="space-y-4">
            {results.length === 0 ? (
              <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200/60 max-w-md mx-auto">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-[#2D4059]">No se encontraron turnos</p>
                <p className="text-xs text-[#4A5C74] mt-1">
                  Verificá el código ingresado o comunicate por WhatsApp si necesitás ayuda.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 max-w-xl mx-auto">
                {results.map((appt) => (
                  <div
                    key={appt.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      appt.status === 'cancelado'
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-[#7DC4E0]/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#FF8A7A]">
                          {appt.id}
                        </span>
                        <h4 className="text-sm font-bold text-[#2D4059] mt-0.5">
                          {appt.patient.patientName} ({appt.patient.patientAge})
                        </h4>
                        <p className="text-[11px] text-[#4A5C74]">Tutor/a: {appt.patient.tutorName}</p>
                      </div>

                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          appt.status === 'confirmado'
                            ? 'bg-[#A9D6C0]/30 text-[#128C7E]'
                            : appt.status === 'atendido'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#4A5C74] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#4A9FC0]" />
                        <span>{formatSpanishDate(appt.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#4A9FC0]" />
                        <span>{appt.time} hs ({appt.service})</span>
                      </div>
                    </div>

                    {appt.status !== 'cancelado' && (
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => downloadCalendarEvent(appt)}
                          className="text-xs font-bold text-[#4A9FC0] hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Guardar .ics</span>
                        </button>

                        {confirmCancelId === appt.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-rose-600 font-bold">¿Cancelar turno?</span>
                            <button
                              onClick={() => handleCancel(appt.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold"
                            >
                              Sí, cancelar
                            </button>
                            <button
                              onClick={() => setConfirmCancelId(null)}
                              className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-[11px] font-bold"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmCancelId(appt.id)}
                            className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancelar Turno</span>
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
