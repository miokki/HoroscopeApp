import React from 'react';

interface PlanetIconProps {
  planet: string;
  size: number;
}

const mapaNazwPlanet: { [key: string]: string } = {
  'Sun': 'Słońce',
  'Moon': 'Księżyc',
  'Mercury': 'Merkury',
  'Venus': 'Wenus',
  'Mars': 'Mars',
  'Jupiter': 'Jowisz',
  'Saturn': 'Saturn',
  'Uranus': 'Uran',
  'Neptune': 'Neptun',
  'Pluto': 'Pluton',
};

const ikony: { [key: string]: React.ReactElement<{ width: number; height: number }> } = {
  'Słońce': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#FFD700" />
      {/* Promienie słoneczne */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="12"
          y1="12"
          x2={12 + Math.cos((i * Math.PI) / 4) * 10}
          y2={12 + Math.sin((i * Math.PI) / 4) * 10}
          stroke="#FFD700"
          strokeWidth="2"
        />
      ))}
    </svg>
  ),
  'Księżyc': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path
        d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9c2.39 0 4.68-.94 6.4-2.6-6.62-.98-10.38-7.71-6.98-13.36.26-.43.55-.84.87-1.22C11.07 3.29 9.84 3 8.5 3H12z"
        fill="#C0C0C0"
      />
    </svg>
  ),
  'Merkury': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#B6C2FF" />
      {/* Symbol Merkurego */}
      <circle cx="12" cy="8" r="2" fill="none" stroke="#666" />
      <line x1="12" y1="10" x2="12" y2="16" stroke="#666" />
      <path d="M10 14 L12 16 L14 14" stroke="#666" fill="none" />
    </svg>
  ),
  'Wenus': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="10" r="6" fill="#FFB6C1" />
      <line x1="12" y1="16" x2="12" y2="22" stroke="#FFB6C1" strokeWidth="2" />
      <line x1="9" y1="19" x2="15" y2="19" stroke="#FFB6C1" strokeWidth="2" />
    </svg>
  ),
  'Mars': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#FF6B6B" />
      <circle cx="12" cy="8" r="2" stroke="#FF4444" fill="none" />
      <line x1="12" y1="10" x2="12" y2="18" stroke="#FF4444" />
      <line x1="9" y1="15" x2="15" y2="15" stroke="#FF4444" />
    </svg>
  ),
  'Jowisz': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#FFD77F" />
      {/* Pasy Jowisza */}
      <line x1="6" y1="10" x2="18" y2="10" stroke="#FFB347" strokeWidth="1" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="#FFB347" strokeWidth="1" />
      <line x1="6" y1="14" x2="18" y2="14" stroke="#FFB347" strokeWidth="1" />
    </svg>
  ),
  'Saturn': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="5" fill="#D4AF37" />
      <ellipse cx="12" cy="12" rx="8" ry="2" fill="none" stroke="#D4AF37" />
    </svg>
  ),
  'Uran': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#7FFFD4" />
      <circle cx="12" cy="9" r="1" fill="#666" />
      <line x1="12" y1="10" x2="12" y2="18" stroke="#666" />
    </svg>
  ),
  'Neptun': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="6" fill="#87CEEB" />
      <path d="M9 12 Q12 15 15 12 Q12 9 9 12" stroke="#666" fill="none" />
    </svg>
  ),
  'Pluton': (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="5" fill="#DDA0DD" />
      <circle cx="12" cy="8" r="2" fill="none" stroke="#666" />
      <line x1="12" y1="10" x2="12" y2="17" stroke="#666" />
    </svg>
  ),
};

const PlanetIcon: React.FC<PlanetIconProps> = ({ planet, size }) => {
  const nazwaPlanety = mapaNazwPlanet[planet] || planet;
  const ikona = ikony[nazwaPlanety];

  return (
    <div className="inline-block transform transition-transform duration-200">
      {ikona
        ? React.cloneElement(ikona, { width: size, height: size })
        : (
          // Domyślna ikona dla nieznanych planet
          <svg viewBox="0 0 24 24" width={size} height={size}>
            <circle cx="12" cy="12" r="6" fill="#808080" />
          </svg>
        )}
    </div>
  );
};

export default PlanetIcon;