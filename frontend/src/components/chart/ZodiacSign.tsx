// ZodiacSign.tsx
import React from 'react';
import { THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface ZodiacSignProps {
  symbol: string;
  name: string;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
  isHighlighted?: boolean;
}

const ZodiacSign: React.FC<ZodiacSignProps> = ({
  symbol,
  name,
  angle,
  radius,
  centerX,
  centerY,
  isHighlighted = false
}) => {
  const position = polarToCartesian(centerX, centerY, radius, angle);

  return (
    <g className="zodiac-sign">
      {/* Tło dla znaku */}
      <defs>
        <radialGradient id={`gradient-${name}`}>
          <stop offset="0%" stopColor={THEME_COLORS.primary} stopOpacity="0.1" />
          <stop offset="100%" stopColor={THEME_COLORS.primary} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Podświetlenie tła dla wyróżnionego znaku */}
      {isHighlighted && (
        <circle
          cx={position.x}
          cy={position.y}
          r="20"
          fill={`url(#gradient-${name})`}
          className="animate-pulse-slow"
        />
      )}

      {/* Symbol znaku */}
      <text
        x={position.x}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={THEME_COLORS.primary}
        fontSize={isHighlighted ? "20" : "18"}
        className={`
          font-zodiac select-none 
          transition-all duration-300 
          filter drop-shadow
          ${isHighlighted ? 'opacity-100' : 'opacity-80'}
        `}
      >
        {symbol}
      </text>

      {/* Nazwa znaku (wyświetlana tylko dla wyróżnionego) */}
      {isHighlighted && (
        <text
          x={position.x}
          y={position.y + 25}
          textAnchor="middle"
          fill={THEME_COLORS.secondary}
          fontSize="12"
          className="font-medium select-none opacity-80"
        >
          {name}
        </text>
      )}
    </g>
  );
};

export default ZodiacSign;