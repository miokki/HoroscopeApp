// PlanetRing.tsx
import React from 'react';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';

interface PlanetRingProps {
  orbitLevel: number;
  isHighlighted?: boolean;
}

const PlanetRing: React.FC<PlanetRingProps> = ({
  orbitLevel,
  isHighlighted = false
}) => {
  const orbitRadius = RADIUS.planets - (orbitLevel * 30);

  return (
    <g className="planet-ring">
      {/* Definicje gradientów */}
      <defs>
        <linearGradient id={`orbitGradient-${orbitLevel}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={THEME_COLORS.primary} stopOpacity="0.1" />
          <stop offset="50%" stopColor={THEME_COLORS.primary} stopOpacity="0.05" />
          <stop offset="100%" stopColor={THEME_COLORS.primary} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Tło orbity */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={orbitRadius}
        fill="none"
        stroke={`url(#orbitGradient-${orbitLevel})`}
        strokeWidth="1"
        className={`
          transition-all duration-300
          ${isHighlighted ? 'opacity-100' : 'opacity-50'}
        `}
      />

      {/* Znaczniki na orbicie */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = CENTER + orbitRadius * Math.cos(angle);
        const y = CENTER + orbitRadius * Math.sin(angle);

        return (
          <circle
            key={`marker-${orbitLevel}-${i}`}
            cx={x}
            cy={y}
            r="1"
            fill={THEME_COLORS.primary}
            className={`
              transition-opacity duration-300
              ${isHighlighted ? 'opacity-50' : 'opacity-20'}
            `}
          />
        );
      })}
    </g>
  );
};

export default PlanetRing;