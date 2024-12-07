import React from 'react';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as MercuryIcon } from '../../assets/icons/mercury.svg';
import { ReactComponent as VenusIcon } from '../../assets/icons/venus.svg';
import { ReactComponent as MarsIcon } from '../../assets/icons/mars.svg';
import { ReactComponent as JupiterIcon } from '../../assets/icons/jupiter.svg';
import { ReactComponent as SaturnIcon } from '../../assets/icons/saturn.svg';
import { ReactComponent as UranusIcon } from '../../assets/icons/uranus.svg';
import { ReactComponent as NeptuneIcon } from '../../assets/icons/neptune.svg';
import { ReactComponent as PlutoIcon } from '../../assets/icons/pluto.svg';
import { ReactComponent as DefaultIcon } from '../../assets/icons/default.svg';
import { PLANET_COLORS } from '../../constants/chart';

const planetIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Słońce': SunIcon,
  'Księżyc': MoonIcon,
  'Merkury': MercuryIcon,
  'Wenus': VenusIcon,
  'Mars': MarsIcon,
  'Jowisz': JupiterIcon,
  'Saturn': SaturnIcon,
  'Uran': UranusIcon,
  'Neptun': NeptuneIcon,
  'Pluton': PlutoIcon,
};

type PlanetName = keyof typeof PLANET_COLORS;

interface PlanetIconProps {
  planet: PlanetName;
  size?: number;
  className?: string;
  isHighlighted?: boolean;
}

const PlanetIcon: React.FC<PlanetIconProps> = ({
  planet,
  size = 24,
  className = '',
  isHighlighted = false
}) => {
  const IconComponent = planetIconMap[planet] || DefaultIcon;
  const planetColor = PLANET_COLORS[planet];

  return (
    <div 
      className={`
        relative 
        transition-transform duration-300 
        ${isHighlighted ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      {/* Efekt poświaty dla wyróżnionej planety */}
      {isHighlighted && (
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: `radial-gradient(circle, ${planetColor}40 0%, transparent 70%)`,
            transform: 'scale(1.5)',
          }}
        />
      )}
      
      <IconComponent 
        width={size} 
        height={size}
        className={`
          relative z-10 
          drop-shadow-lg 
          transition-all duration-300
          ${isHighlighted ? 'filter brightness-125' : ''}
        `}
        style={{ color: planetColor }}
      />
    </div>
  );
};

export default PlanetIcon;
