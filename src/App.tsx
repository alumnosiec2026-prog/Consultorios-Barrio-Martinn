import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus, BlockedSlot, ServiceType } from './types';
import { INITIAL_SAMPLE_APPOINTMENTS } from './data/doctorData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { LookupSection } from './components/LookupSection';
import { ContactLocation } from './components/ContactLocation';
import { FaqSection } from './components/FaqSection';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';

export default function App() {
  // Check initial route / query parameter
  const initialView = window.location.pathname.includes('admin') || window.location.search.includes('view=admin')
    ? 'admin'
    : 'patient';

  const [currentView, setCurrentView] = useState<'patient' | 'admin'>(initialView);

  // Appointments State with LocalStorage Persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('cbm_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading appointments from localStorage', e);
    }
    return INITIAL_SAMPLE_APPOINTMENTS;
  });

  // Blocked Slots State
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>(() => {
    try {
      const saved = localStorage.getItem('cbm_blocked_slots');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading blocked slots from localStorage', e);
    }
    return [];
  });

  // Preselected service for booking
  const [preselectedService, setPreselectedService] = useState<ServiceType | undefined>(undefined);

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cbm_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments', e);
    }
  }, [appointments]);

  // Sync blockedSlots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cbm_blocked_slots', JSON.stringify(blockedSlots));
    } catch (e) {
      console.error('Error saving blocked slots', e);
    }
  }, [blockedSlots]);

  // Handle Add Appointment
  const handleAddAppointment = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  // Handle Update Status
  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  // Handle Cancel Appointment
  const handleCancelAppointment = (id: string) => {
    handleUpdateStatus(id, 'cancelado');
  };

  // Handle Add Blocked Slot
  const handleAddBlockedSlot = (block: BlockedSlot) => {
    setBlockedSlots((prev) => [...prev, block]);
  };

  // Handle Remove Blocked Slot
  const handleRemoveBlockedSlot = (date: string, time?: string) => {
    setBlockedSlots((prev) =>
      prev.filter((b) => !(b.date === date && b.time === time))
    );
  };

  // Handle Reset Data to Initial State
  const handleResetData = () => {
    if (window.confirm('¿Está seguro de reiniciar los turnos y restaurar la lista de prueba?')) {
      setAppointments(INITIAL_SAMPLE_APPOINTMENTS);
      setBlockedSlots([]);
      localStorage.removeItem('cbm_appointments');
      localStorage.removeItem('cbm_blocked_slots');
    }
  };

  // Smooth scroll helpers
  const scrollToSection = (id: string) => {
    if (currentView !== 'patient') {
      setCurrentView('patient');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceName: ServiceType) => {
    setPreselectedService(serviceName);
    scrollToSection('turnos');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFCFF] text-[#2D4059] selection:bg-[#7DC4E0]/30">
      
      {/* Global Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onBookClick={() => scrollToSection('turnos')}
        onLookupClick={() => scrollToSection('consultar')}
      />

      {/* VIEW CONDITIONAL RENDER */}
      {currentView === 'admin' ? (
        <AdminPanel
          appointments={appointments}
          blockedSlots={blockedSlots}
          onUpdateStatus={handleUpdateStatus}
          onAddAppointment={handleAddAppointment}
          onAddBlockedSlot={handleAddBlockedSlot}
          onRemoveBlockedSlot={handleRemoveBlockedSlot}
          onResetData={handleResetData}
          onBackToPublic={() => setCurrentView('patient')}
        />
      ) : (
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero
            onBookClick={() => scrollToSection('turnos')}
            onServicesClick={() => scrollToSection('servicios')}
          />

          {/* About Doctor Bio Section */}
          <AboutDoctor />

          {/* Medical Services Grid */}
          <ServicesSection
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />

          {/* Interactive Booking Widget */}
          <BookingSection
            appointments={appointments}
            blockedSlots={blockedSlots}
            onAddAppointment={handleAddAppointment}
            preselectedService={preselectedService}
          />

          {/* Appointment Lookup & Cancel Section */}
          <LookupSection
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
          />

          {/* Contact & Location Map Section */}
          <ContactLocation />

          {/* FAQ Accordion Section */}
          <FaqSection />

          {/* Floating WhatsApp Quick Action */}
          <WhatsAppFloat />
        </main>
      )}

      {/* Global Footer */}
      <Footer
        onAdminClick={() => setCurrentView('admin')}
        onBookClick={() => scrollToSection('turnos')}
      />

    </div>
  );
}
