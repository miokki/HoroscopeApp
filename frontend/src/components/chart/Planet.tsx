import React from 'react';
import { THEME_COLORS, PLANET_COLORS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface PlanetProps {
  planet: string;
  position: number;
  isHighlighted: boolean;
  isRetrograde?: boolean;
  onHover: (planet: string | null, event?: React.MouseEvent) => void;
  onClick: (planet: string, event: React.MouseEvent) => void;
}

export const Planet: React.FC<PlanetProps> = ({
  planet,
  position,
  isHighlighted,
  isRetrograde,
  onHover,
  onClick,
}) => {
  const { x, y } = polarToCartesian(CENTER, CENTER, RADIUS.planets, position - 90);

  const baseRadius = 4;
  const highlightedRadius = 6;
  const currentRadius = isHighlighted ? highlightedRadius : baseRadius;

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={(e) => onClick(planet, e)}
      onMouseEnter={(e) => onHover(planet, e)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Animowana poświata */}
      {isHighlighted && (
        <>
          <circle
            r={currentRadius + 6}
            fill={PLANET_COLORS[planet]}
            opacity="0.15"
            className="animate-pulse"
          />
          <circle
            r={currentRadius + 3}
            fill={PLANET_COLORS[planet]}
            opacity="0.3"
            className="animate-pulse"
          />
        </>
      )}

      {/* Planeta */}
      <circle
        r={currentRadius}
        fill={PLANET_COLORS[planet]}
        stroke={THEME_COLORS.primary}
        strokeWidth={isHighlighted ? "1.5" : "1"}
        className="transition-all duration-300 ease-in-out"
      />

      {/* Symbol retrogradacji z animacją */}
      {isRetrograde && (
        <text
          x="8"
          y="-8"
          fill={PLANET_COLORS[planet]}
          fontSize="12"
          className="animate-bounce select-none"
          style={{ 
            animationDuration: '2s',
            animationDelay: `${Math.random() * 0.5}s` 
          }}
        >
          ℞
        </text>
      )}

      {/* Nazwa planety */}
      <text
        x="0"
        y="20"
        textAnchor="middle"
        fill={isHighlighted ? PLANET_COLORS[planet] : THEME_COLORS.primary}
        fontSize={isHighlighted ? "12" : "11"}
        opacity={isHighlighted ? "1" : "0.8"}
        className="transition-all duration-300 ease-in-out select-none"
        filter="url(#glow)"
      >
        {planet}
      </text>
    </g>
  );
};

export default Planet;