import React, { useState } from 'react';
import { Stethoscope, Calendar, ShieldCheck, Phone, MapPin, Lock, UserCheck, Sparkles, Heart } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data/doctorData';

interface HeaderProps {
  currentView: 'patient' | 'admin';
  onViewChange: (view: 'patient' | 'admin') => void;
  onBookClick: () => void;
  onLookupClick: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onBookClick,
  onLookupClick,
}) => {
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminAccess = () => {
    if (currentView === 'admin') {
      onViewChange('patient');
    } else {
      setShowAdminPinModal(true);
    }
  };

  const verifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin PIN: 18479 (Matches Dr. MP) or admin123
    if (pinInput === '18479' || pinInput === 'admin' || pinInput === '1234') {
      setPinError(false);
      setShowAdminPinModal(false);
      setPinInput('');
      onViewChange('admin');
    } else {
      setPinError(true);
    }
  };

  return (
    <>
      {/* Top Banner with Quick Info */}
      <div className="bg-gradient-to-r from-[#4A9FC0] via-[#7DC4E0] to-[#A9D6C0] text-white text-xs sm:text-sm py-2 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FFE0A3]" />
              Pje. Santa Cruz 355, Piso 3, Cons. 1 - Rosario
            </span>
            <span className="hidden md:inline-block opacity-60">•</span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#FFE0A3]" />
              341 335-4237
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-white/95">
            <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] border border-white/25">
              Matrícula: {DOCTOR_PROFILE.license}
            </span>
            <span className="hidden lg:inline text-white/80">
              {DOCTOR_PROFILE.schedule.weekdays}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0D3F0]/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Clinic Brand / Logo */}
          <button 
            onClick={() => onViewChange('patient')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#7DC4E0] to-[#FFB6A8] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#4A9FC0] fill-[#FFB6A8]/30 group-hover:text-[#FF8A7A] transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#2D4059] tracking-tight group-hover:text-[#4A9FC0] transition-colors">
                  Consultorios Barrio Martin
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5C74] font-medium flex items-center gap-1">
                <span>{DOCTOR_PROFILE.name}</span>
                <span className="text-[#FF8A7A] font-semibold text-[10px] bg-[#FFD9C9]/50 px-1.5 py-0.2 rounded-md">
                  Pediatría & Hematología
                </span>
              </p>
            </div>
          </button>

          {/* Nav Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentView === 'patient' ? (
              <>
                <button
                  onClick={onLookupClick}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#4A5C74] hover:text-[#4A9FC0] hover:bg-[#7DC4E0]/10 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#7DC4E0]" />
                  <span>Mis Turnos</span>
                </button>

                <button
                  onClick={onBookClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#4A9FC0] to-[#7DC4E0] hover:from-[#4A9FC0] hover:to-[#4A9FC0] shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE0A3]" />
                  <span>Pedir Turno</span>
                </button>
              </>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A9D6C0]/20 text-[#2D4059] text-xs font-bold border border-[#A9D6C0]/40">
                <ShieldCheck className="w-4 h-4 text-[#4A9FC0]" />
                Panel Administrativo
              </span>
            )}

            {/* Admin Toggle Switch */}
            <button
              onClick={handleAdminAccess}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                currentView === 'admin'
                  ? 'bg-[#2D4059] text-white border-[#2D4059] shadow-sm'
                  : 'bg-slate-50 text-[#4A5C74] hover:bg-slate-100 border-slate-200'
              }`}
              title={currentView === 'admin' ? "Volver a la web pública" : "Ingresar al Panel de Administración"}
            >
              {currentView === 'admin' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-[#FFE0A3]" />
                  <span className="hidden md:inline">Ver Sitio Web</span>
                  <span className="md:hidden">Web</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#4A9FC0]" />
                  <span className="hidden md:inline">Panel Médica</span>
                  <span className="md:hidden">Admin</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Admin Security PIN Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#7DC4E0]/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#4A9FC0]">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#2D4059]">Acceso Administrativo</h3>
              <p className="text-xs sm:text-sm text-[#4A5C74] mt-1">
                Ingrese el PIN de acceso del consultorio (Dra. Andrea Torres).
              </p>
              <p className="text-[11px] text-[#4A9FC0] bg-[#7DC4E0]/10 px-2 py-1 rounded-md mt-2 inline-block">
                PIN por defecto: <strong>18479</strong> (N° Matrícula)
              </p>
            </div>

            <form onSubmit={verifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D4059] mb-1">
                  PIN de Seguridad
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Ingrese el PIN..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#7DC4E0] text-center font-mono text-lg tracking-widest text-[#2D4059]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium text-center">
                    PIN incorrecto. Intente con "18479" o "admin".
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminPinModal(false);
                    setPinError(false);
                    setPinInput('');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-[#4A5C74] hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#4A9FC0] hover:bg-[#3B89AA] text-white text-xs font-bold shadow-md transition-colors"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
