export type AppointmentStatus = 'confirmado' | 'atendido' | 'cancelado' | 'ausente';

export type ServiceType = 
  | 'Control Pediátrico'
  | 'Consulta Hematológica'
  | 'Orientación Antroposófica'
  | 'Control de Recién Nacido'
  | 'Consulta General';

export interface PatientInfo {
  patientName: string;
  patientAge: string;
  tutorName: string;
  phone: string;
  email: string;
  healthInsurance: string; // Obra Social / Prepaga
  insuranceNumber?: string;
  notes?: string;
}

export interface Appointment {
  id: string; // e.g., "CBM-8492"
  date: string; // ISO format "YYYY-MM-DD"
  time: string; // "08:00", "08:20", etc.
  service: ServiceType;
  patient: PatientInfo;
  status: AppointmentStatus;
  createdAt: string; // ISO string
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBlocked: boolean;
  appointment?: Appointment;
}

export interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  description: string;
  license: string;
  phone: string;
  email: string;
  address: {
    street: string;
    floor: string;
    office: string;
    city: string;
    province: string;
    country: string;
  };
  schedule: {
    weekdays: string;
    saturdays: string;
    sundays: string;
  };
}

export interface BlockedSlot {
  date: string; // "YYYY-MM-DD"
  time?: string; // If omitted, blocks whole day
  reason?: string;
}
