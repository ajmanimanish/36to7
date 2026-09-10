import React from 'react';

interface IllustrationProps {
  className?: string;
}

export function VarnaIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="40" cy="40" r="34" fill="#4A2E35" fillOpacity="0.05" stroke="#4A2E35" strokeWidth="1.25" strokeDasharray="3 2" />
      <path d="M 40 12 L 40 68 M 12 40 L 68 40" stroke="#C86D51" strokeWidth="1" strokeOpacity="0.4" />
      <polygon points="40,16 47,33 64,40 47,47 40,64 33,47 16,40 33,33" fill="#FDFBF7" stroke="#4A2E35" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="4" fill="#D4AF37" />
    </svg>
  );
}

export function VashyaIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="40" cy="40" r="32" fill="#C86D51" fillOpacity="0.05" />
      <path d="M 20 44 Q 40 28 60 44" stroke="#4A2E35" strokeWidth="1.5" fill="none" />
      <path d="M 20 36 Q 40 52 60 36" stroke="#C86D51" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="40" r="5" fill="#FDFBF7" stroke="#4A2E35" strokeWidth="1.5" />
      <circle cx="52" cy="40" r="5" fill="#FDFBF7" stroke="#C86D51" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="3" fill="#D4AF37" />
    </svg>
  );
}

export function TaraIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 15 55 C 25 25 55 25 65 55" stroke="#C86D51" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <circle cx="40" cy="26" r="6" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="24" cy="44" r="4" fill="#FDFBF7" stroke="#4A2E35" strokeWidth="1.5" />
      <circle cx="56" cy="44" r="4" fill="#FDFBF7" stroke="#4A2E35" strokeWidth="1.5" />
      <path d="M 24 44 L 40 26 L 56 44 Z" stroke="#4A2E35" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    </svg>
  );
}

export function YoniIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 16 40 C 24 20 40 20 40 40 C 40 60 56 60 64 40" stroke="#4A2E35" strokeWidth="2" fill="none" />
      <path d="M 16 40 C 24 60 40 60 40 40 C 40 20 56 20 64 40" stroke="#C86D51" strokeWidth="2" fill="none" />
      <circle cx="40" cy="40" r="5" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="2" />
    </svg>
  );
}

export function GrahaMaitriIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="40" r="22" stroke="#4A2E35" strokeWidth="1.5" fill="#4A2E35" fillOpacity="0.05" />
      <circle cx="48" cy="40" r="22" stroke="#C86D51" strokeWidth="1.5" fill="#C86D51" fillOpacity="0.05" />
      <path d="M 40 24 A 22 22 0 0 1 40 56 A 22 22 0 0 1 40 24 Z" fill="#D4AF37" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="1.25" />
    </svg>
  );
}

export function GanaIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 12 40 Q 26 20 40 40 T 68 40" stroke="#4A2E35" strokeWidth="1.5" fill="none" />
      <path d="M 12 40 Q 26 60 40 40 T 68 40" stroke="#C86D51" strokeWidth="1.5" fill="none" />
      <circle cx="26" cy="30" r="3.5" fill="#D4AF37" />
      <circle cx="54" cy="50" r="3.5" fill="#4A2E35" />
    </svg>
  );
}

export function BhakootIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="24" width="40" height="40" rx="6" stroke="#4A2E35" strokeWidth="1.5" fill="#FDFBF7" />
      <path d="M 20 44 L 40 24 L 60 44" stroke="#C86D51" strokeWidth="1.5" fill="none" />
      <path d="M 40 24 L 40 64" stroke="#D4AF37" strokeWidth="1.25" strokeDasharray="3 2" />
      <circle cx="40" cy="44" r="4" fill="#C86D51" />
    </svg>
  );
}

export function NadiIllustration({ className = 'w-12 h-12' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 15 40 Q 25 15 35 40 T 55 40 T 70 40" stroke="#4A2E35" strokeWidth="1.5" fill="none" />
      <path d="M 15 40 Q 25 65 35 40 T 55 40 T 70 40" stroke="#C86D51" strokeWidth="1.5" fill="none" />
      <line x1="25" y1="28" x2="25" y2="52" stroke="#D4AF37" strokeWidth="1" />
      <line x1="45" y1="28" x2="45" y2="52" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="25" cy="40" r="3" fill="#4A2E35" />
      <circle cx="45" cy="40" r="3" fill="#C86D51" />
    </svg>
  );
}

export function getKootaIllustration(slug: string, className?: string) {
  switch (slug) {
    case 'varna':
      return <VarnaIllustration className={className} />;
    case 'vashya':
      return <VashyaIllustration className={className} />;
    case 'tara':
      return <TaraIllustration className={className} />;
    case 'yoni':
      return <YoniIllustration className={className} />;
    case 'grahamaitri':
      return <GrahaMaitriIllustration className={className} />;
    case 'gana':
      return <GanaIllustration className={className} />;
    case 'bhakoot':
      return <BhakootIllustration className={className} />;
    case 'nadi':
      return <NadiIllustration className={className} />;
    default:
      return <VarnaIllustration className={className} />;
  }
}
