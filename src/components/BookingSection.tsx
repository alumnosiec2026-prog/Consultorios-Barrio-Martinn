import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Shield, CheckCircle2, Sparkles, MessageCircle, Download, RefreshCw, AlertCircle, MapPin, Heart } from 'lucide-react';
import { Appointment, ServiceType, BlockedSlot, PatientInfo } from '../types';
import { getSlotsForDate, formatSpanishDate, generateAppointmentId, buildWhatsAppBookingUrl, downloadCalendarEvent } from '../utils/timeUtils';
import { HEALTH_INSURANCES_LIST } from '../data/doctorData';

interface BookingSectionProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  onAddAppointment: (newAppt: Appointment) => void;
  preselectedService?: ServiceType;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  appointments,
  blockedSlots,
  onAddAppointment,
  preselectedService
}) => {
  // Step State: 1 = Date & Service, 2 = Time Slot, 3 = Patient Details, 4 = Confirmation
  const [step, setStep] = useState<number>(1);

  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedService, setSelectedService] = useState<ServiceType>(preselectedService || 'Control Pediátrico');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [patientData, setPatientData] = useState<PatientInfo>({
    patientName: '',
    patientAge: '',
    tutorName: '',
    phone: '',
    email: '',
    healthInsurance: 'Particular',
    insuranceNumber: '',
    notes: ''
  });

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  // Update selected service if preselected passed from outer component
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  // Adjust date if user selects Sunday
  useEffect(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      if (dateObj.getDay() === 0) { // Sunday
        // Auto bump to Monday
        const nextMon = new Date(dateObj);
        nextMon.setDate(dateObj.getDate() + 1);
        setSelectedDate(nextMon.toISOString().split('T')[0]);
      }
    }
  }, [selectedDate]);

  const slots = getSlotsForDate(selectedDate, appointments, blockedSlots);

  const handleNextToSlots = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      setValidationError('Por favor seleccione una fecha válida.');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  const handleSelectSlot = (time: string) => {
    setSelectedTime(time);
    setValidationError('');
    setStep(3);
  };

  const handleSubmitPatientForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientData.patientName.trim()) {
      setValidationError('Por favor ingrese el nombre y apellido del paciente (niño/a).');
      return;
    }
    if (!patientData.tutorName.trim()) {
      setValidationError('Por favor ingrese el nombre del adulto/tutor responsable.');
      return;
    }
    if (!patientData.phone.trim() || patientData.phone.trim().length < 7) {
      setValidationError('Por favor ingrese un teléfono/WhatsApp de contacto válido.');
      return;
    }

    setValidationError('');

    const newAppt: Appointment = {
      id: generateAppointmentId(),
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      patient: patientData,
      status: 'confirmado',
      createdAt: new Date().toISOString()
    };

    onAddAppointment(newAppt);
    setCreatedAppointment(newAppt);
    setStep(4);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedTime('');
    setCreatedAppointment(null);
    setPatientData({
      patientName: '',
      patientAge: '',
      tutorName: '',
      phone: '',
      email: '',
      healthInsurance: 'Particular',
      insuranceNumber: '',
      notes: ''
    });
  };

  return (
    <section id="turnos" className="py-16 bg-gradient-to-b from-[#FAFCFF] via-[#F2F8FC] to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7DC4E0]/20 text-[#4A9FC0] text-xs font-bold">
            <CalendarIcon className="w-3.5 h-3.5 text-[#FF8A7A]" />
            <span>Sistema de Reserva Online</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4059]">
            Solicitar Turno Médico
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5C74]">
            Agendá tu consulta con la Dra. Andrea Torres en pocos pasos simples.
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-[#2D4059] mb-2">
            <span className={step >= 1 ? 'text-[#4A9FC0]' : 'opacity-40'}>1. Fecha & Servicio</span>
            <span className={step >= 2 ? 'text-[#4A9FC0]' : 'opacity-40'}>2. Horario</span>
            <span className={step >= 3 ? 'text-[#4A9FC0]' : 'opacity-40'}>3. Datos Paciente</span>
            <span className={step >= 4 ? 'text-[#128C7E]' : 'opacity-40'}>4. Confirmación</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7DC4E0] via-[#FFB6A8] to-[#25D366] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card Wrapper */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 relative">
          
          {/* STEP 1: DATE & SERVICE SELECTOR */}
          {step === 1 && (
            <form onSubmit={handleNextToSlots} className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#7DC4E0]" />
                    <span>Seleccionar Fecha del Turno</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0] text-sm font-semibold text-[#2D4059] bg-slate-50/50"
                    required
                  />
                  <p className="text-[11px] text-[#4A5C74] mt-2 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#4A9FC0]" />
                    <span>Atención: Lun a Vie 8-20 hs | Sáb 8-12 hs (Dom cerrado)</span>
                  </p>
                </div>

                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF8A7A]" />
                    <span>Especialidad / Tipo de Consulta</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0] text-sm font-semibold text-[#2D4059] bg-slate-50/50"
                  >
                    <option value="Control Pediátrico">Control Pediátrico General</option>
                    <option value="Consulta Hematológica">Consulta Hematológica Pediátrica</option>
                    <option value="Orientación Antroposófica">Orientación Antroposófica</option>
                    <option value="Control de Recién Nacido">Control del Recién Nacido</option>
                    <option value="Consulta General">Consulta Médica General</option>
                  </select>
                  <p className="text-[11px] text-[#4A5C74] mt-2">
                    Turnos asignados cada 20 minutos para mayor puntualidad.
                  </p>
                </div>

              </div>

              {/* Selected Date Summary Card */}
              {selectedDate && (
                <div className="p-4 rounded-2xl bg-[#7DC4E0]/15 border border-[#7DC4E0]/30 flex items-center justify-between text-xs text-[#2D4059]">
                  <span className="font-bold">
                    Fecha elegida: {formatSpanishDate(selectedDate)}
                  </span>
                  <span className="bg-[#4A9FC0] text-white px-2.5 py-1 rounded-lg font-bold">
                    {selectedService}
                  </span>
                </div>
              )}

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#4A9FC0] hover:bg-[#3B89AA] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Ver Horarios Disponibles</span>
                <Clock className="w-4 h-4 text-[#FFE0A3]" />
              </button>
            </form>
          )}

          {/* STEP 2: TIME SLOT MATRIX */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#2D4059]">
                    Horarios para el {formatSpanishDate(selectedDate)}
                  </h3>
                  <p className="text-xs text-[#4A5C74]">
                    Seleccioná la hora disponible que más te convenga (Intervalos de 20 min)
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#4A9FC0] hover:underline"
                >
                  ← Cambiar Fecha
                </button>
              </div>

              {/* Slots Grid */}
              {slots.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl">
                  <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#2D4059]">Sin turnos en esta fecha</p>
                  <p className="text-xs text-[#4A5C74] mt-1">
                    El consultorio no atiende en el día seleccionado (Domingos o día bloqueado).
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 px-4 py-2 bg-[#7DC4E0] text-white text-xs font-bold rounded-xl"
                  >
                    Elegir otra fecha
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-96 overflow-y-auto p-1">
                  {slots.map((slot) => {
                    const isAvailable = slot.isAvailable;

                    return (
                      <button
                        key={slot.time}
                        disabled={!isAvailable}
                        onClick={() => handleSelectSlot(slot.time)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
                          isAvailable
                            ? 'bg-[#7DC4E0]/15 text-[#2D4059] border border-[#7DC4E0]/30 hover:bg-[#4A9FC0] hover:text-white hover:border-[#4A9FC0] shadow-2xs hover:shadow-md cursor-pointer'
                            : 'bg-slate-100 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-60 line-through'
                        }`}
                      >
                        <span className="text-sm tracking-tight">{slot.time} hs</span>
                        <span className="text-[10px] font-normal">
                          {isAvailable ? 'Disponible' : 'Ocupado'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-[#4A5C74] pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#7DC4E0]/20 border border-[#7DC4E0]" />
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200" />
                  <span>No disponible / Ocupado</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT FORM */}
          {step === 3 && (
            <form onSubmit={handleSubmitPatientForm} className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#2D4059]">Datos del Paciente y Tutor</h3>
                  <p className="text-xs text-[#4A5C74]">
                    Turno reservado para el <strong>{formatSpanishDate(selectedDate)} a las {selectedTime} hs</strong> ({selectedService})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#4A9FC0] hover:underline"
                >
                  ← Cambiar Horario
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Nombre y Apellido del Niño/a <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7DC4E0] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ej. Mateo Rossi"
                      value={patientData.patientName}
                      onChange={(e) => setPatientData({ ...patientData, patientName: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                      required
                    />
                  </div>
                </div>

                {/* Patient Age */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Edad / Fecha Nacimiento
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 3 años / 14 meses"
                    value={patientData.patientAge}
                    onChange={(e) => setPatientData({ ...patientData, patientAge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                  />
                </div>

                {/* Tutor Name */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Nombre del Adulto / Tutor Responsable <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Sofia Rossi (Madre)"
                    value={patientData.tutorName}
                    onChange={(e) => setPatientData({ ...patientData, tutorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                    required
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Teléfono / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#FF8A7A] absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Ej. 341 512-3490"
                      value={patientData.phone}
                      onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="Ej. contacto@ejemplo.com"
                      value={patientData.email}
                      onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                    />
                  </div>
                </div>

                {/* Health Insurance */}
                <div>
                  <label className="block text-xs font-bold text-[#2D4059] mb-1">
                    Obra Social / Prepaga / Particular
                  </label>
                  <select
                    value={patientData.healthInsurance}
                    onChange={(e) => setPatientData({ ...patientData, healthInsurance: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0] bg-white"
                  >
                    {HEALTH_INSURANCES_LIST.map((ins) => (
                      <option key={ins} value={ins}>{ins}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Notes / Reason */}
              <div>
                <label className="block text-xs font-bold text-[#2D4059] mb-1">
                  Motivo de la consulta / Observaciones médicas
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Control de rutina, revisión de análisis de laboratorio, fiebre recurrente, etc."
                  value={patientData.notes}
                  onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
                />
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-[#4A5C74] hover:bg-slate-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#4A9FC0] hover:bg-[#3B89AA] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FFE0A3]" />
                  <span>Confirmar y Finalizar Reserva</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && createdAppointment && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-[#A9D6C0]/30 text-[#128C7E] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#4A9FC0] bg-[#7DC4E0]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  ¡Turno Reservado con Éxito!
                </span>
                <h3 className="text-2xl font-bold text-[#2D4059] mt-2">
                  Código de Reserva: <span className="font-mono text-[#FF8A7A]">{createdAppointment.id}</span>
                </h3>
                <p className="text-xs text-[#4A5C74] mt-1">
                  Guardá tu código para cualquier consulta o cancelación.
                </p>
              </div>

              {/* Appointment Card Recap */}
              <div className="max-w-md mx-auto bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 text-xs text-[#2D4059]">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#4A5C74]">Paciente:</span>
                  <span className="font-bold">{createdAppointment.patient.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#4A5C74]">Tutor/a:</span>
                  <span className="font-bold">{createdAppointment.patient.tutorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#4A5C74]">Fecha & Hora:</span>
                  <span className="font-bold text-[#4A9FC0]">
                    {formatSpanishDate(createdAppointment.date)} - {createdAppointment.time} hs
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#4A5C74]">Especialidad:</span>
                  <span className="font-bold">{createdAppointment.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5C74]">Lugar:</span>
                  <span className="font-bold text-right">Pje. Santa Cruz 355, Piso 3, Cons. 1</span>
                </div>
              </div>

              {/* Main Action WhatsApp & Calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={buildWhatsAppBookingUrl(createdAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar Confirmación por WhatsApp</span>
                </a>

                <button
                  onClick={() => downloadCalendarEvent(createdAppointment)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-[#2D4059] font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Download className="w-4 h-4 text-[#7DC4E0]" />
                  <span>Guardar en Calendario (.ics)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={resetBooking}
                  className="text-xs font-bold text-[#4A9FC0] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Solicitar Otro Turno</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
