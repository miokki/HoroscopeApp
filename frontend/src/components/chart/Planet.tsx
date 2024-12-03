import React from 'react';
import { THEME_COLORS, PLANET_COLORS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface PlanetProps {
  planet: string;
  position: number;
  isHighlighted: boolean;
  isRetrograde?: boolean;
  onHover: (planet: string | null, position?: { x: number, y: number }) => void;
  onClick: (planet: string, position: { x: number, y: number }) => void;
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

  const handleHover = () => {
    onHover(planet, { x, y });
  };

  const handleClick = () => {
    onClick(planet, { x, y });
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Poświata */}
      {isHighlighted && (
        <circle
          r={6}
          fill={PLANET_COLORS[planet]}
          opacity={0.3}
          filter="url(#glow)"
        />
      )}

      {/* Planeta */}
      <circle
        r={isHighlighted ? 6 : 4}
        fill={PLANET_COLORS[planet]}
        stroke={THEME_COLORS.primary}
        strokeWidth={isHighlighted ? "1.5" : "1"}
        className="transition-all duration-200"
      />

      {/* Symbol retrogradacji */}
      {isRetrograde && (
        <text
          x="8"
          y="-8"
          fill={PLANET_COLORS[planet]}
          fontSize="12"
          className="select-none animate-gentle-bounce"
        >
          ℞
        </text>
      )}

      {/* Nazwa planety */}
      <text
        x="0"
        y="20"
        textAnchor="middle"
        fill={THEME_COLORS.primary}
        fontSize={isHighlighted ? "12" : "11"}
        opacity={isHighlighted ? "1" : "0.8"}
        className="select-none"
      >
        {planet}
      </text>
    </g>
  );
};

export default Planet;