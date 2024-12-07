// ChartQuadrants.tsx
import React from 'react';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface QuadrantData {
  number: number;
  label: string;
  description: string;
  startAngle: number;
  endAngle: number;
}

const quadrants: QuadrantData[] = [
  {
    number: 1,
    label: 'Wschodzący',
    description: 'Osobowość i tożsamość',
    startAngle: 0,
    endAngle: 90
  },
  {
    number: 2,
    label: 'Górny',
    description: 'Kariera i cele',
    startAngle: 90,
    endAngle: 180
  },
  {
    number: 3,
    label: 'Zachodzący',
    description: 'Relacje i partnerstwo',
    startAngle: 180,
    endAngle: 270
  },
  {
    number: 4,
    label: 'Dolny',
    description: 'Korzenie i podstawy',
    startAngle: 270,
    endAngle: 360
  }
];

const ChartQuadrants: React.FC = () => {
  const createArcPath = (startAngle: number, endAngle: number, radius: number): string => {
    const start = polarToCartesian(CENTER, CENTER, radius, startAngle);
    const end = polarToCartesian(CENTER, CENTER, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", CENTER, CENTER,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      "Z"
    ].join(" ");
  };

  return (
    <g className="chart-quadrants">
      {quadrants.map((quadrant) => (
        <g key={quadrant.number} className="quadrant">
          {/* Tło kwadrantu */}
          <path
            d={createArcPath(quadrant.startAngle, quadrant.endAngle, RADIUS.outer)}
            fill={THEME_COLORS.background}
            fillOpacity="0.1"
            stroke={THEME_COLORS.primary}
            strokeOpacity="0.2"
            strokeWidth="0.5"
            className="transition-opacity duration-300 hover:fill-opacity-20"
          />
          
          {/* Etykieta kwadrantu */}
          <text
            {...polarToCartesian(
              CENTER,
              CENTER,
              RADIUS.outer - 40,
              (quadrant.startAngle + quadrant.endAngle) / 2
            )}
            textAnchor="middle"
            fill={THEME_COLORS.secondary}
            fontSize="12"
            className="pointer-events-none select-none"
          >
            {quadrant.label}
          </text>
        </g>
      ))}
    </g>
  );
};

export default ChartQuadrants;