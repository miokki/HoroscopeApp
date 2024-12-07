import React from 'react';
import { HouseLabel } from './HouseLabel';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface HousePosition {
  pozycja: number;
  znak_zodiaku: string;
}

interface HousesProps {
  houses: { [key: string]: HousePosition };
}

export const Houses: React.FC<HousesProps> = ({ houses }) => {
  const renderHouseLines = () => {
    return Object.entries(houses).map(([house, data]) => {
      const start = polarToCartesian(CENTER, CENTER, RADIUS.outer, data.pozycja - 90);
      const end = polarToCartesian(CENTER, CENTER, RADIUS.inner, data.pozycja - 90);
      
      // Poprawione style dla głównych osi
      const isMainAxis = ['1', '4', '7', '10'].includes(house);
      
      return (
        <g key={`house-${house}`} className="house-line-group">
          {/* Dodane tło dla lepszej widoczności linii */}
          {isMainAxis && (
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={THEME_COLORS.background}
              strokeWidth="3"
              className="transition-all duration-200"
            />
          )}

          {/* Główna linia domu */}
          <line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={THEME_COLORS.primary}
            strokeWidth={isMainAxis ? "1.5" : "1"}
            strokeDasharray={isMainAxis ? undefined : "4,4"}
            opacity={isMainAxis ? 1 : 0.7}
            className="transition-all duration-200"
          />

          {/* Zaktualizowana etykieta domu */}
          <HouseLabel
            houseNumber={parseInt(house)}
            position={data.pozycja}
            isMainAxis={isMainAxis}
            zodiacSign={data.znak_zodiaku}
          />
        </g>
      );
    });
  };

  return (
    <g className="houses">
      <defs>
        {/* Filtr dla poświaty głównych osi */}
        <filter id="house-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {renderHouseLines()}
    </g>
  );
};

export default Houses;