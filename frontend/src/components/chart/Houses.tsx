import React from 'react';
import { HouseLabel } from './HouseLabel';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface HousePosition {
  pozycja: number;
  znak_zodiaku: string;
  stopnie: number;
  minuty: number;
}

interface HousesProps {
  houses: Record<number, HousePosition>;
}

export const Houses: React.FC<HousesProps> = ({ houses }) => {
  // Renderowanie linii domów
  const renderHouseLines = () => {
    return Object.entries(houses).map(([house, data]) => {
      const start = polarToCartesian(CENTER, CENTER, RADIUS.outer, data.pozycja - 90);
      const end = polarToCartesian(CENTER, CENTER, RADIUS.inner, data.pozycja - 90);
      
      // Specjalne style dla osi ASC-DSC (domy 1 i 7) i MC-IC (domy 10 i 4)
      const isMainAxis = ['1', '4', '7', '10'].includes(house);
      
      return (
        <g key={`house-${house}`}>
          {/* Linia domu */}
          <line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={THEME_COLORS.primary}
            strokeWidth={isMainAxis ? "1.5" : "1"}
            strokeDasharray={isMainAxis ? "none" : "4,4"}
            opacity={isMainAxis ? "1" : "0.6"}
            className="transition-all duration-200"
          />
          
          {/* Etykieta domu */}
          <HouseLabel
            houseNumber={parseInt(house)}
            position={data.pozycja}
            isMainAxis={isMainAxis}
          />
        </g>
      );
    });
  };

  return (
    <g className="houses">
      {/* Linie i etykiety domów */}
      {renderHouseLines()}
    </g>
  );
};

export default Houses;