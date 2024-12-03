import React, { useRef } from 'react';
import { THEME_COLORS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';
import PlanetIcon from './PlanetIcon';

interface PlanetProps {
  planet: string;
  position: number;
  isHighlighted: boolean;
  isRetrograde?: boolean;
  onHover: (planet: string | null, rect?: DOMRect) => void;
  onClick: (planet: string | null) => void;
  orbitLevel: number; // New prop for orbit level
}

export const Planet: React.FC<PlanetProps> = ({
  planet,
  position,
  isHighlighted,
  isRetrograde,
  onHover,
  onClick,
  orbitLevel,
}) => {
  const planetRef = useRef<SVGGElement>(null);

  const baseRadius = RADIUS.planets;
  const orbitOffset = orbitLevel * 15; // Adjust offset based on orbit level

  const iconSize = isHighlighted ? 36 : 32; // Increased icon sizes

  const { x, y } = polarToCartesian(
    CENTER,
    CENTER,
    baseRadius + orbitOffset,
    position - 90
  );

  const handleHover = () => {
    if (planetRef.current) {
      const rect = planetRef.current.getBoundingClientRect();
      onHover(planet, rect);
    }
  };

  const handleLeave = () => {
    onHover(null);
  };

  const handleClick = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    event.stopPropagation();
    onClick(planet);
  };

  return (
    <g
      ref={planetRef}
      transform={`translate(${x - iconSize / 2},${y - iconSize / 2})`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      style={{ cursor: 'pointer' }}
      className="transition-all duration-200"
    >
      {/* Glow effect */}
      {isHighlighted && (
        <circle
          cx={iconSize / 2}
          cy={iconSize / 2}
          r={iconSize * 0.7}
          fill={THEME_COLORS.primary}
          opacity={0.2}
          filter="url(#glow)"
        />
      )}

      {/* Planet icon */}
      <foreignObject width={iconSize} height={iconSize}>
        <PlanetIcon planet={planet} size={iconSize} />
      </foreignObject>

      {/* Retrograde symbol */}
      {isRetrograde && (
        <text
          x={iconSize + 4}
          y={-4}
          fill={THEME_COLORS.primary}
          fontSize="12"
          className="select-none animate-gentle-bounce"
        >
          ℞
        </text>
      )}

      {/* Planet name */}
      <text
        x={iconSize / 2}
        y={iconSize + 14}
        textAnchor="middle"
        fill={THEME_COLORS.primary}
        fontSize={isHighlighted ? '14' : '13'}
        opacity={isHighlighted ? '1' : '0.8'}
        className="select-none"
      >
        {planet}
      </text>
    </g>
  );
};

export default Planet;
