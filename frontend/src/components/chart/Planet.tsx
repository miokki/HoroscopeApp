import React from 'react';
import { CENTER, RADIUS, THEME_COLORS, PLANET_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';
import PlanetIcon from './PlanetIcon';

interface PlanetProps {
  planet: keyof typeof PLANET_COLORS;
  position: number;
  isRetrograde?: boolean;
  isHighlighted?: boolean;
  orbitLevel: number;
  onHover: (planet: string | null) => void;
  onClick: (planet: string) => void;
  forcePosition?: { x: number; y: number };
}

const Planet: React.FC<PlanetProps> = ({
  planet,
  position,
  isRetrograde,
  isHighlighted,
  orbitLevel,
  onHover,
  onClick,
  forcePosition
}) => {
  const iconSize = 24;
  const orbitRadius = RADIUS.planets - (orbitLevel * 30);
  const pos = forcePosition || polarToCartesian(CENTER, CENTER, orbitRadius, position - 90);

  const handleHover = () => onHover(planet);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(planet);
  };

  return (
    <g
      className="planet-group cursor-pointer"
      transform={`translate(${pos.x}, ${pos.y})`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={() => onHover(null)}
    >
      {/* Efekt poświaty dla wyró��nionej planety */}
      {isHighlighted && (
        <>
          <circle
            cx={0}
            cy={0}
            r={iconSize * 0.8}
            fill={PLANET_COLORS[planet] || THEME_COLORS.primary}
            opacity={0.15}
            className="animate-glow-slow"
          />
          <circle
            cx={0}
            cy={0}
            r={iconSize * 0.6}
            fill={PLANET_COLORS[planet] || THEME_COLORS.primary}
            opacity={0.2}
            className="animate-glow-fast"
          />
        </>
      )}

      {/* Tło ikony */}
      <circle
        cx={0}
        cy={0}
        r={iconSize * 0.6}
        fill="rgba(0,0,0,0.6)"
        className={`backdrop-blur-sm transition-all duration-300 ${
          isHighlighted ? 'opacity-90' : 'opacity-60'
        }`}
      />

      {/* Ikona planety */}
      <g 
        className={`transform transition-all duration-300 ease-out ${
          isHighlighted ? 'scale-110' : 'scale-100'
        }`}
      >
        <PlanetIcon
          planet={planet}
          size={iconSize}
          className="drop-shadow-lg"
        />
      </g>

      {/* Symbol retrogradacji */}
      {isRetrograde && (
        <text
          x={iconSize * 0.7}
          y={iconSize * 0.7}
          fontSize="12"
          fill={THEME_COLORS.primary}
          className="font-bold select-none"
        >
          ℞
        </text>
      )}
    </g>
  );
};

export default Planet;