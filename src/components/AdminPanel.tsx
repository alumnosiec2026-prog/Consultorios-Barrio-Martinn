import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, XCircle, AlertCircle, Search, Filter, Plus, Lock, Unlock, MessageSquare, Printer, Download, RefreshCw, FileText, ArrowLeft, ShieldCheck, Heart, UserX, Eye } from 'lucide-react';
import { Appointment, AppointmentStatus, BlockedSlot, ServiceType, PatientInfo } from '../types';
import { formatSpanishDate, getSlotsForDate, buildWhatsAppReminderUrl, WEEKDAY_SLOTS, SATURDAY_SLOTS } from '../utils/timeUtils';
import { HEALTH_INSURANCES_LIST, DOCTOR_PROFILE } from '../data/doctorData';

interface AdminPanelProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onAddAppointment: (newAppt: Appointment) => void;
  onAddBlockedSlot: (block: BlockedSlot) => void;
  onRemoveBlockedSlot: (date: string, time?: string) => void;
  onResetData: () => void;
  onBackToPublic: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  appointments,
  blockedSlots,
  onUpdateStatus,
  onAddAppointment,
  onAddBlockedSlot,
  onRemoveBlockedSlot,
  onResetData,
  onBackToPublic
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [filterDate, setFilterDate] = useState<string>(todayStr);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
  const [selectedApptDetail, setSelectedApptDetail] = useState<Appointment | null>(null);

  // Manual Appointment Form state
  const [manualSlotTime, setManualSlotTime] = useState<string>('08:00');
  const [manualService, setManualService] = useState<ServiceType>('Control Pediátrico');
  const [manualPatient, setManualPatient] = useState<PatientInfo>({
    patientName: '',
    patientAge: '',
    tutorName: '',
    phone: '',
    email: '',
    healthInsurance: 'Particular',
    notes: ''
  });

  // Block Slot Form state
  const [blockTime, setBlockTime] = useState<string>('all'); // "all" for whole day or specific time
  const [blockReason, setBlockReason] = useState<string>('Ausencia médica / Feriado');

  // Slots calculation for current filterDate
  const daySlots = getSlotsForDate(filterDate, appointments, blockedSlots);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((appt) => {
    const matchDate = filterDate ? appt.date === filterDate : true;
    const matchStatus = filterStatus === 'todos' ? true : appt.status === filterStatus;
    
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      appt.id.toLowerCase().includes(q) ||
      appt.patient.patientName.toLowerCase().includes(q) ||
      appt.patient.tutorName.toLowerCase().includes(q) ||
      appt.patient.phone.includes(q) ||
      appt.service.toLowerCase().includes(q)
    );

    return matchDate && matchStatus && matchSearch;
  });

  // Stats for Filtered Date
  const dayAppts = appointments.filter(a => a.date === filterDate);
  const totalCount = dayAppts.length;
  const confirmedCount = dayAppts.filter(a => a.status === 'confirmado').length;
  const attendedCount = dayAppts.filter(a => a.status === 'atendido').length;
  const canceledCount = dayAppts.filter(a => a.status === 'cancelado').length;
  
  const totalSlotsCount = daySlots.length;
  const occupiedCount = daySlots.filter(s => !s.isAvailable && !s.isBlocked).length;
  const occupancyPercentage = totalSlotsCount > 0 ? Math.round((occupiedCount / totalSlotsCount) * 100) : 0;

  // Handle Manual Appointment submit
  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPatient.patientName || !manualPatient.phone) return;

    const newAppt: Appointment = {
      id: `CBM-${Math.floor(1000 + Math.random() * 9000)}`,
      date: filterDate,
      time: manualSlotTime,
      service: manualService,
      patient: manualPatient,
      status: 'confirmado',
      createdAt: new Date().toISOString()
    };

    onAddAppointment(newAppt);
    setShowAddModal(false);
    setManualPatient({
      patientName: '',
      patientAge: '',
      tutorName: '',
      phone: '',
      email: '',
      healthInsurance: 'Particular',
      notes: ''
    });
  };

  // Handle Block Slot submit
  const handleBlockSlot = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBlockedSlot({
      date: filterDate,
      time: blockTime === 'all' ? undefined : blockTime,
      reason: blockReason
    });
    setShowBlockModal(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Fecha', 'Hora', 'Estado', 'Paciente', 'Edad', 'Tutor', 'Telefono', 'Email', 'Obra Social', 'Servicio', 'Notas'];
    const rows = filteredAppointments.map(a => [
      a.id,
      a.date,
      a.time,
      a.status,
      `"${a.patient.patientName}"`,
      `"${a.patient.patientAge}"`,
      `"${a.patient.tutorName}"`,
      `"${a.patient.phone}"`,
      `"${a.patient.email}"`,
      `"${a.patient.healthInsurance}"`,
      `"${a.service}"`,
      `"${a.patient.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Turnos-BarrioMartin-${filterDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Daily Schedule
  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Admin Top Header */}
      <div className="bg-[#2D4059] text-white py-6 border-b-4 border-[#7DC4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToPublic}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Volver a la vista pública"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold">Panel de Gestión Médica</h1>
                  <span className="bg-[#7DC4E0] text-[#2D4059] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                    Dra. Andrea Torres
                  </span>
                </div>
                <p className="text-xs text-white/70">
                  Consultorios Barrio Martin - Control de Turnos, Pacientes y Horarios
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#7DC4E0] hover:bg-[#4A9FC0] text-[#2D4059] hover:text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Cargar Turno Manual</span>
              </button>

              <button
                onClick={() => setShowBlockModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#FFB6A8] hover:bg-[#FF8A7A] text-[#2D4059] font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>Bloquear Horario</span>
              </button>

              <button
                onClick={handlePrintSchedule}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                title="Imprimir hoja de ruta del día"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                title="Exportar lista a CSV"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* Date & Quick Filters Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#4A9FC0]" />
              <label className="text-xs font-bold text-[#2D4059]">Fecha:</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#2D4059] bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterDate(todayStr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  filterDate === todayStr ? 'bg-[#4A9FC0] text-white' : 'bg-slate-100 text-[#4A5C74] hover:bg-slate-200'
                }`}
              >
                Hoy
              </button>
              <button
                onClick={() => {
                  const tom = new Date();
                  tom.setDate(tom.getDate() + 1);
                  setFilterDate(tom.toISOString().split('T')[0]);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-[#4A5C74] hover:bg-slate-200 transition-colors"
              >
                Mañana
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#2D4059] bg-slate-50"
              >
                <option value="todos">Todos los Estados</option>
                <option value="confirmado">Confirmados</option>
                <option value="atendido">Atendidos</option>
                <option value="ausente">Ausentes</option>
                <option value="cancelado">Cancelados</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar paciente, tutor, tel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0]"
              />
            </div>
          </div>

        </div>

        {/* Stats Summary Widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-[#4A5C74] uppercase">Total Turnos</p>
            <p className="text-2xl font-extrabold text-[#2D4059] mt-1">{totalCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">En el día seleccionado</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-[#128C7E] uppercase">Confirmados</p>
            <p className="text-2xl font-extrabold text-[#128C7E] mt-1">{confirmedCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Listos para atender</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-blue-600 uppercase">Atendidos</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">{attendedCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Consulta realizada</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-rose-500 uppercase">Cancelados</p>
            <p className="text-2xl font-extrabold text-rose-500 mt-1">{canceledCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Libre o anulado</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
            <p className="text-[11px] font-bold text-[#4A9FC0] uppercase">Ocupación Día</p>
            <p className="text-2xl font-extrabold text-[#4A9FC0] mt-1">{occupancyPercentage}%</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{occupiedCount} de {totalSlotsCount} slots</p>
          </div>
        </div>

        {/* Schedule Matrix & Patient Table Split */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left: Time Slots Matrix Overview */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#2D4059] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#7DC4E0]" />
                <span>Matriz de Horarios (20 min)</span>
              </h3>
              <span className="text-[11px] text-[#4A5C74] font-medium">
                {formatSpanishDate(filterDate)}
              </span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {daySlots.map((slot) => (
                <div
                  key={slot.time}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                    slot.isBlocked
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : slot.appointment
                      ? 'bg-[#7DC4E0]/15 border-[#7DC4E0]/40 text-[#2D4059]'
                      : 'bg-slate-50 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs w-12">{slot.time} hs</span>
                    {slot.appointment ? (
                      <div className="truncate max-w-[140px]">
                        <p className="font-bold text-[#2D4059] truncate">{slot.appointment.patient.patientName}</p>
                        <p className="text-[10px] text-[#4A5C74] truncate">{slot.appointment.service}</p>
                      </div>
                    ) : slot.isBlocked ? (
                      <span className="text-[11px] font-bold text-amber-700">Horario Bloqueado</span>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-semibold">Horario Disponible</span>
                    )}
                  </div>

                  {slot.appointment && (
                    <button
                      onClick={() => setSelectedApptDetail(slot.appointment || null)}
                      className="p-1 hover:bg-white rounded-lg text-[#4A9FC0] transition-colors shrink-0"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Patients Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#2D4059]">
                  Nómina de Pacientes ({filteredAppointments.length})
                </h3>
                <p className="text-xs text-[#4A5C74]">
                  Lista de turnos registrados para {formatSpanishDate(filterDate)}
                </p>
              </div>

              <button
                onClick={onResetData}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 underline flex items-center gap-1"
                title="Restablecer datos de prueba"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reiniciar Datos</span>
              </button>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <CalendarIcon className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm font-bold text-[#2D4059]">No hay turnos registrados</p>
                <p className="text-xs text-[#4A5C74]">Probá seleccionando otra fecha o creando un turno manual.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#2D4059]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[#4A5C74] font-bold uppercase text-[10px] bg-slate-50/50">
                      <th className="p-3">Hora</th>
                      <th className="p-3">Paciente / Tutor</th>
                      <th className="p-3">Especialidad</th>
                      <th className="p-3">Obra Social</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Time & ID */}
                        <td className="p-3 whitespace-nowrap">
                          <span className="font-mono font-bold text-xs text-[#4A9FC0] block">{appt.time} hs</span>
                          <span className="text-[10px] text-slate-400 font-mono">{appt.id}</span>
                        </td>

                        {/* Patient & Tutor */}
                        <td className="p-3">
                          <p className="font-bold text-[#2D4059]">{appt.patient.patientName}</p>
                          <p className="text-[11px] text-[#4A5C74]">
                            {appt.patient.tutorName} • <span className="font-mono">{appt.patient.phone}</span>
                          </p>
                        </td>

                        {/* Service */}
                        <td className="p-3 whitespace-nowrap font-medium text-[#2D4059]">
                          {appt.service}
                        </td>

                        {/* Health Insurance */}
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {appt.patient.healthInsurance}
                          </span>
                        </td>

                        {/* Status Select Toggle */}
                        <td className="p-3 whitespace-nowrap">
                          <select
                            value={appt.status}
                            onChange={(e) => onUpdateStatus(appt.id, e.target.value as AppointmentStatus)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border-0 cursor-pointer ${
                              appt.status === 'confirmado'
                                ? 'bg-[#A9D6C0]/30 text-[#128C7E]'
                                : appt.status === 'atendido'
                                ? 'bg-blue-100 text-blue-800'
                                : appt.status === 'ausente'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            <option value="confirmado">Confirmado</option>
                            <option value="atendido">Atendido</option>
                            <option value="ausente">Ausente</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="p-3 whitespace-nowrap text-right space-x-1.5">
                          {/* Send WhatsApp Reminder */}
                          <a
                            href={buildWhatsAppReminderUrl(appt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] font-bold transition-colors"
                            title="Enviar recordatorio de turno por WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3 fill-white" />
                            <span className="hidden sm:inline">Recordatorio</span>
                          </a>

                          {/* View Detail */}
                          <button
                            onClick={() => setSelectedApptDetail(appt)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors inline-block"
                            title="Ver ficha completa"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL: MANUAL APPOINTMENT CREATION */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#2D4059]">Cargar Turno Manual (Mostrador / Tel)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Fecha</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Horario Slot</label>
                  <select
                    value={manualSlotTime}
                    onChange={(e) => setManualSlotTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white"
                  >
                    {WEEKDAY_SLOTS.map(t => (
                      <option key={t} value={t}>{t} hs</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Especialidad</label>
                <select
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white"
                >
                  <option value="Control Pediátrico">Control Pediátrico</option>
                  <option value="Consulta Hematológica">Consulta Hematológica</option>
                  <option value="Orientación Antroposófica">Orientación Antroposófica</option>
                  <option value="Control de Recién Nacido">Control del Recién Nacido</option>
                  <option value="Consulta General">Consulta General</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Nombre Paciente *</label>
                  <input
                    type="text"
                    placeholder="Ej. Mateo Rossi"
                    value={manualPatient.patientName}
                    onChange={(e) => setManualPatient({ ...manualPatient, patientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Edad</label>
                  <input
                    type="text"
                    placeholder="Ej. 4 años"
                    value={manualPatient.patientAge}
                    onChange={(e) => setManualPatient({ ...manualPatient, patientAge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Tutor Responsable</label>
                  <input
                    type="text"
                    placeholder="Ej. Sofia Rossi"
                    value={manualPatient.tutorName}
                    onChange={(e) => setManualPatient({ ...manualPatient, tutorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D4059] mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="Ej. 341 512-3490"
                    value={manualPatient.phone}
                    onChange={(e) => setManualPatient({ ...manualPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Obra Social / Cobertura</label>
                <select
                  value={manualPatient.healthInsurance}
                  onChange={(e) => setManualPatient({ ...manualPatient, healthInsurance: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium bg-white"
                >
                  {HEALTH_INSURANCES_LIST.map(ins => (
                    <option key={ins} value={ins}>{ins}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  placeholder="Notas adicionales..."
                  value={manualPatient.notes}
                  onChange={(e) => setManualPatient({ ...manualPatient, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4A9FC0] text-white font-bold shadow-md"
                >
                  Guardar Turno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BLOCK SLOT OR DAY */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#2D4059]">Bloquear Horario o Día Completo</h3>
              <button
                onClick={() => setShowBlockModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBlockSlot} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Fecha a Bloquear</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Horario o Jornada</label>
                <select
                  value={blockTime}
                  onChange={(e) => setBlockTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white"
                >
                  <option value="all">Día Completo (Bloquea todos los turnos)</option>
                  {WEEKDAY_SLOTS.map(t => (
                    <option key={t} value={t}>Slot {t} hs</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D4059] mb-1">Motivo del Bloqueo</label>
                <input
                  type="text"
                  placeholder="Ej. Feriado, capacitación, reunión médica"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md"
                >
                  Confirmar Bloqueo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PATIENT APPOINTMENT DETAIL DRAWER */}
      {selectedApptDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#4A9FC0]">{selectedApptDetail.id}</span>
                <h3 className="text-lg font-bold text-[#2D4059]">{selectedApptDetail.patient.patientName}</h3>
              </div>
              <button
                onClick={() => setSelectedApptDetail(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#2D4059]">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p><strong>Fecha & Hora:</strong> {formatSpanishDate(selectedApptDetail.date)} a las {selectedApptDetail.time} hs</p>
                <p><strong>Especialidad:</strong> {selectedApptDetail.service}</p>
                <p><strong>Estado Actual:</strong> <span className="font-bold uppercase text-[#4A9FC0]">{selectedApptDetail.status}</span></p>
              </div>

              <div className="space-y-1 pt-1">
                <p><strong>Edad Paciente:</strong> {selectedApptDetail.patient.patientAge || 'No especificada'}</p>
                <p><strong>Tutor/a:</strong> {selectedApptDetail.patient.tutorName}</p>
                <p><strong>Teléfono:</strong> <span className="font-mono">{selectedApptDetail.patient.phone}</span></p>
                <p><strong>Email:</strong> {selectedApptDetail.patient.email || 'Sin registrar'}</p>
                <p><strong>Obra Social:</strong> {selectedApptDetail.patient.healthInsurance}</p>
                <p className="pt-1"><strong>Observaciones:</strong> {selectedApptDetail.patient.notes || 'Sin notas.'}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <a
                  href={buildWhatsAppReminderUrl(selectedApptDetail)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-center font-bold flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedApptDetail(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
