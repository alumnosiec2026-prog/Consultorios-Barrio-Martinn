import { TimeSlot, Appointment, BlockedSlot } from '../types';

export const WEEKDAY_SLOTS = [
  '08:00', '08:20', '08:40', '09:00', '09:20', '09:40',
  '10:00', '10:20', '10:40', '11:00', '11:20', '11:40',
  '12:00', '12:20', '12:40', '13:00', '13:20', '13:40',
  '14:00', '14:20', '14:40', '15:00', '15:20', '15:40',
  '16:00', '16:20', '16:40', '17:00', '17:20', '17:40',
  '18:00', '18:20', '18:40', '19:00', '19:20', '19:40'
];

export const SATURDAY_SLOTS = [
  '08:00', '08:20', '08:40', '09:00', '09:20', '09:40',
  '10:00', '10:20', '10:40', '11:00', '11:20', '11:40'
];

/**
 * Returns the list of available slots for a given date string YYYY-MM-DD
 */
export function getSlotsForDate(
  dateStr: string,
  appointments: Appointment[],
  blockedSlots: BlockedSlot[]
): TimeSlot[] {
  if (!dateStr) return [];

  // Parse YYYY-MM-DD cleanly using year, month (0-indexed), day
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // Sunday closed
  if (dayOfWeek === 0) {
    return [];
  }

  const times = dayOfWeek === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;

  // Check if whole day is blocked
  const isWholeDayBlocked = blockedSlots.some(
    b => b.date === dateStr && (!b.time || b.time === 'all')
  );

  return times.map(time => {
    // Check if slot has an active appointment
    const activeAppointment = appointments.find(
      a => a.date === dateStr && a.time === time && a.status !== 'cancelado'
    );

    // Check if slot is explicitly blocked
    const isExplicitlyBlocked = blockedSlots.some(
      b => b.date === dateStr && b.time === time
    );

    const isBlocked = isWholeDayBlocked || isExplicitlyBlocked;
    const isAvailable = !activeAppointment && !isBlocked;

    return {
      time,
      isAvailable,
      isBlocked,
      appointment: activeAppointment
    };
  });
}

/**
 * Formats YYYY-MM-DD into a friendly Spanish date string
 * e.g. "Lunes 10 de Agosto, 2026"
 */
export function formatSpanishDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayName = days[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];

  return `${dayName} ${day} de ${monthName}, ${year}`;
}

/**
 * Generate unique appointment ID: e.g. CBM-8492
 */
export function generateAppointmentId(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `CBM-${randomDigits}`;
}

/**
 * Prepares a pre-formatted WhatsApp link for booking confirmation
 */
export function buildWhatsAppBookingUrl(appointment: Appointment): string {
  const phoneNumber = '5493413354237'; // 341 335-4237 formatted with Argentina country code
  const formattedDate = formatSpanishDate(appointment.date);
  
  const text = `Hola Dra. Andrea Torres, solicitó un turno desde la web de Consultorios Barrio Martin:
  
📌 *Código de Turno:* ${appointment.id}
👤 *Paciente:* ${appointment.patient.patientName} (${appointment.patient.patientAge})
👥 *Tutor/a:* ${appointment.patient.tutorName}
📅 *Fecha:* ${formattedDate}
⏰ *Hora:* ${appointment.time} hs
🩺 *Motivo/Especialidad:* ${appointment.service}
💳 *Obra Social/Prepaga:* ${appointment.patient.healthInsurance}
📱 *Teléfono:* ${appointment.patient.phone}

Quedo a la espera de la confirmación. ¡Muchas gracias!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Prepares a WhatsApp reminder URL from Admin to Patient
 */
export function buildWhatsAppReminderUrl(appointment: Appointment): string {
  let rawPhone = appointment.patient.phone.replace(/\D/g, '');
  if (!rawPhone.startsWith('549') && !rawPhone.startsWith('54')) {
    if (rawPhone.startsWith('341') || rawPhone.length === 10) {
      rawPhone = `549${rawPhone}`;
    } else {
      rawPhone = `549341${rawPhone}`;
    }
  }

  const formattedDate = formatSpanishDate(appointment.date);

  const text = `Hola *${appointment.patient.tutorName}*! Te escribimos de *Consultorios Barrio Martin*.
  
Le recordamos el turno asignado para *${appointment.patient.patientName}* con la *Dra. Andrea Carolina Torres*:

📅 *Fecha:* ${formattedDate}
⏰ *Hora:* ${appointment.time} hs
🩺 *Especialidad:* ${appointment.service}
📍 *Dirección:* Pje. Santa Cruz 355, Piso 3, Consultorio 1, Rosario.

📌 *Código de reserva:* ${appointment.id}

Por favor responder *CONFIRMO* para ratificar la asistencia, o avisar con anticipación en caso de requerir reprogramar. ¡Muchas gracias!`;

  return `https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Helper to download ICS calendar file
 */
export function downloadCalendarEvent(appointment: Appointment) {
  const [year, month, day] = appointment.date.split('-').map(Number);
  const [hour, minute] = appointment.time.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(year, month - 1, day, hour, minute + 20);

  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Consultorios Barrio Martin//Turno Pediátrico//ES',
    'BEGIN:VEVENT',
    `UID:${appointment.id}@barriomartin.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:Turno Pediátrico - Dra. Andrea Torres (${appointment.patient.patientName})`,
    `DESCRIPTION:Turno en Consultorios Barrio Martin para ${appointment.patient.patientName} (${appointment.service}). Tutor: ${appointment.patient.tutorName}. Código: ${appointment.id}`,
    'LOCATION:Pje. Santa Cruz 355, Piso 3, Consultorio 1, Rosario, Santa Fe, Argentina',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Turno-DraTorres-${appointment.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
