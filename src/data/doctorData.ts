import { DoctorProfile, Appointment } from '../types';

export const DOCTOR_PROFILE: DoctorProfile = {
  name: "Dra. Andrea Carolina Torres",
  title: "Médica Pediatra & Hematóloga Pediátrica",
  specialty: "Pediatría y Hematología con orientación antroposófica",
  description: "Especialista en hematología pediátrica con formación en medicina antroposófica, brindando un acompañamiento integral a niños y familias durante su crecimiento y desarrollo.",
  license: "MP 18479",
  phone: "341 335-4237",
  email: "andreatorrespediatra@gmail.com",
  address: {
    street: "Pje. Santa Cruz 355",
    floor: "Piso 3",
    office: "Consultorio 1",
    city: "Rosario",
    province: "Santa Fe",
    country: "Argentina"
  },
  schedule: {
    weekdays: "Lunes a Viernes de 8:00 a 20:00 hs",
    saturdays: "Sábados de 8:00 a 12:00 hs",
    sundays: "Sin atención (Cerrado)"
  }
};

export const CLINIC_SERVICES = [
  {
    id: "pediatria",
    title: "Pediatría Integral",
    subtitle: "Crecimiento, desarrollo y prevención",
    description: "Evaluación del neurodesarrollo, crecimiento físico, pautas de alimentación consciente y acompañamiento empático en las distintas etapas de la infancia.",
    iconName: "Stethoscope",
    badge: "General",
    color: "#7DC4E0"
  },
  {
    id: "hematologia",
    title: "Hematología Pediátrica",
    subtitle: "Diagnóstico y tratamiento especializado",
    description: "Especialista en anemias infantiles, alteraciones de hemoglobina, trastornos plaquetarios, problemas de coagulación y monitoreo de laboratorio pediátrico.",
    iconName: "Activity",
    badge: "Especialidad",
    color: "#FFB6A8"
  },
  {
    id: "antroposofica",
    title: "Medicina Antroposófica",
    subtitle: "Orientación médica complementaria e integral",
    description: "Abordaje respetuoso de los procesos vitales del niño, contemplando cuerpo, mente y entorno. Tratamiento natural y medicina de soporte para potenciar sus defensas orgánicas.",
    iconName: "Sparkles",
    badge: "Antroposófica",
    color: "#A9D6C0"
  },
  {
    id: "recien-nacido",
    title: "Control del Recién Nacido",
    subtitle: "Acompañamiento a la familia desde el día uno",
    description: "Asesoramiento en lactancia, primeros cuidados, pesquisas metabólicas, hábitos de sueño y sostén emocional para padres y recién nacidos.",
    iconName: "Heart",
    badge: "Primeros Meses",
    color: "#FFE0A3"
  }
];

export const INITIAL_SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "CBM-2041",
    date: new Date().toISOString().split('T')[0], // Today
    time: "09:00",
    service: "Control Pediátrico",
    patient: {
      patientName: "Mateo Rossi",
      patientAge: "3 años",
      tutorName: "Sofia Rossi",
      phone: "341 512-3490",
      email: "sofia.rossi@example.com",
      healthInsurance: "OSDE 310",
      notes: "Control anual y revisión de libreta de vacunas."
    },
    status: "confirmado",
    createdAt: new Date().toISOString()
  },
  {
    id: "CBM-5829",
    date: new Date().toISOString().split('T')[0], // Today
    time: "10:20",
    service: "Consulta Hematológica",
    patient: {
      patientName: "Lucía Fernández",
      patientAge: "7 años",
      tutorName: "Martín Fernández",
      phone: "341 498-1122",
      email: "m.fernandez@example.com",
      healthInsurance: "Swiss Medical",
      notes: "Derivación por laboratorio con hemoglobina baja (anemia)."
    },
    status: "confirmado",
    createdAt: new Date().toISOString()
  },
  {
    id: "CBM-9103",
    date: new Date().toISOString().split('T')[0], // Today
    time: "16:00",
    service: "Orientación Antroposófica",
    patient: {
      patientName: "Valentino Gómez",
      patientAge: "5 años",
      tutorName: "Mariana Gómez",
      phone: "341 622-8833",
      email: "mariana.gomez@example.com",
      healthInsurance: "Particular",
      notes: "Consulta por procesos respiratorios recurrentes."
    },
    status: "confirmado",
    createdAt: new Date().toISOString()
  }
];

export const HEALTH_INSURANCES_LIST = [
  "Particular",
  "OSDE",
  "Swiss Medical",
  "IAPOS",
  "Galeno",
  "Medifé",
  "Omint",
  "Sancor Salud",
  "SADAIC / OSECAC",
  "Jerárquicos Salud",
  "Otra Obra Social / Prepaga"
];

export const CLINIC_FAQS = [
  {
    question: "¿Qué es la medicina antroposófica en pediatría?",
    answer: "Es una ampliación de la medicina académica convencional que concibe la salud de manera integral, considerando la maduración física, emocional y vital del niño. Busca estimular las fuerzas autocurativas del organismo con medicina natural y ritmos saludables."
  },
  {
    question: "¿Atienden urgencias pediátricas inmediatas?",
    answer: "Para urgencias médicas graves que requieran internación o terapia intensiva, debe acudir a una guardia de emergencias pediátricas. Para consultas prioritarias en el día, puede solicitar turno según disponibilidad o comunicarse directamente al WhatsApp 341 335-4237."
  },
  {
    question: "¿Cómo funciona el sistema de turnos de 20 minutos?",
    answer: "Cada turno se asigna con intervalos de 20 minutos para mantener una atención puntual y fluida. Recomendamos presentarse 5 a 10 minutos antes en Pje. Santa Cruz 355, Piso 3, Consultorio 1."
  },
  {
    question: "¿Se atienden obras sociales y prepagas?",
    answer: "Atendemos consultas de manera particular y reintegrable según el convenio de su obra social o prepaga. Emitimos factura médica oficial para presentar ante su cobertura."
  }
];
