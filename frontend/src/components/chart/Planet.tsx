import React from 'react';
import { THEME_COLORS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';
import PlanetIcon from './PlanetIcon';

interface PlanetProps {
  planet: string;
  position: number;
  isHighlighted: boolean;
  isRetrograde?: boolean;
  onHover: (planet: string | null, position?: { x: number; y: number }) => void;
  onClick: (planet: string, position: { x: number; y: number }) => void;
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
  const iconSize = isHighlighted ? 24 : 20;

  const handleHover = () => {
    onHover(planet, { x, y });
  };

  const handleClick = (event: React.MouseEvent) => {
    onClick(planet, { x, y });
  };

  return (
    <g
      transform={`translate(${x - iconSize/2},${y - iconSize/2})`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
      className="transition-all duration-200"
    >
      {/* Poświata */}
      {isHighlighted && (
        <circle
          cx={iconSize/2}
          cy={iconSize/2}
          r={iconSize * 0.7}
          fill={THEME_COLORS.primary}
          opacity={0.2}
          filter="url(#glow)"
        />
      )}

      {/* Ikona planety */}
      <foreignObject width={iconSize} height={iconSize}>
        <PlanetIcon planet={planet} size={iconSize} />
      </foreignObject>

      {/* Symbol retrogradacji */}
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

      {/* Nazwa planety */}
      <text
        x={iconSize/2}
        y={iconSize + 12}
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