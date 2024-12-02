import React from 'react';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface HouseLabelProps {
  houseNumber: number;
  position: number;
  isMainAxis?: boolean;
}

export const HouseLabel: React.FC<HouseLabelProps> = ({ 
  houseNumber, 
  position,
  isMainAxis = false 
}) => {
  // Specjalne etykiety dla głównych osi
  const getSpecialLabel = () => {
    switch (houseNumber) {
      case 1:
        return 'ASC';
      case 4:
        return 'IC';
      case 7:
        return 'DSC';
      case 10:
        return 'MC';
      default:
        return houseNumber.toString();
    }
  };

  // Oblicz pozycję etykiety
  const labelPos = polarToCartesian(
    CENTER,
    CENTER,
    RADIUS.inner + (isMainAxis ? 30 : 15),  // Główne osie dalej od centrum
    position - 90
  );

  return (
    <g>
      {/* Poświata dla głównych osi */}
      {isMainAxis && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={THEME_COLORS.primary}
          fontSize={isMainAxis ? "14" : "12"}
          opacity="0.3"
          filter="url(#glow)"
          className="select-none"
        >
          {getSpecialLabel()}
        </text>
      )}
      
      {/* Główna etykieta */}
      <text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={THEME_COLORS.primary}
        fontSize={isMainAxis ? "14" : "12"}
        className="select-none font-medium transition-all duration-200"
      >
        {getSpecialLabel()}
      </text>
    </g>
  );
};

export default HouseLabel;