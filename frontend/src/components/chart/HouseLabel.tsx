import React from 'react';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface HouseLabelProps {
  houseNumber: number;
  position: number;
  isMainAxis?: boolean;
  zodiacSign?: string;
}

export const HouseLabel: React.FC<HouseLabelProps> = ({
  houseNumber,
  position,
  isMainAxis = false,
  zodiacSign
}) => {
  // Specjalne etykiety dla głównych osi
  const getSpecialLabel = () => {
    switch (houseNumber) {
      case 1: return 'ASC';
      case 4: return 'IC';
      case 7: return 'DSC';
      case 10: return 'MC';
      default: return houseNumber.toString();
    }
  };

  // Oblicz pozycję etykiety z uwzględnieniem hierarchii
  const labelPos = polarToCartesian(
    CENTER,
    CENTER,
    RADIUS.inner + (isMainAxis ? 35 : 20),
    position - 90
  );

  return (
    <g className="house-label">
      {/* Tło dla etykiety */}
      <circle
        cx={labelPos.x}
        cy={labelPos.y}
        r={isMainAxis ? 14 : 10}
        fill="rgba(0,0,0,0.4)"
        className="backdrop-blur-sm"
      />

      {/* Efekt poświaty dla głównych osi */}
      {isMainAxis && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={THEME_COLORS.primary}
          fontSize={isMainAxis ? "16" : "12"}
          opacity="0.3"
          filter="url(#glow)"
          className="select-none font-medium"
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
        fontSize={isMainAxis ? "16" : "12"}
        className="select-none font-medium transition-all duration-200"
      >
        {getSpecialLabel()}
      </text>

      {/* Znak zodiaku (jeśli dostępny) */}
      {zodiacSign && (
        <text
          x={labelPos.x}
          y={labelPos.y + (isMainAxis ? 20 : 15)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={THEME_COLORS.secondary}
          fontSize="10"
          className="font-zodiac select-none opacity-75"
        >
          {zodiacSign}
        </text>
      )}
    </g>
  );
};

export default HouseLabel;