import React from 'react';
import { THEME_COLORS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface ZodiacCircleProps {
  zodiacSigns: Array<{ symbol: string; name: string }>;
  radius: number;
}

export const ZodiacCircle: React.FC<ZodiacCircleProps> = ({ zodiacSigns, radius }) => {
  // Renderowanie znaczników stopni z lepszą widocznością
  const renderDegreeMarks = () => {
    const marks = [];
    for (let i = 0; i < 360; i += 5) {
      const isMainDegree = i % 30 === 0;
      const start = polarToCartesian(CENTER, CENTER, RADIUS.outer, i - 90);
      const end = polarToCartesian(
        CENTER, 
        CENTER, 
        RADIUS.outer - (isMainDegree ? 8 : 5),
        i - 90
      );
      
      marks.push(
        <line
          key={`degree-${i}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={THEME_COLORS.primary}
          strokeWidth={isMainDegree ? "1.2" : "0.8"}
          opacity={isMainDegree ? "1" : "0.6"}
          className="transition-opacity duration-200"
        />
      );
    }
    return marks;
  };

  return (
    <g className="zodiac-circle">
      {/* Tło dla lepszej widoczności znaków */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Zewnętrzny krąg z efektem głębi */}
      <circle 
        cx={CENTER} 
        cy={CENTER} 
        r={RADIUS.outer}
        fill="none"
        stroke={THEME_COLORS.primary}
        strokeWidth="1.5"
        className="drop-shadow-lg"
      />
      
      {/* Wewnętrzny krąg */}
      <circle 
        cx={CENTER} 
        cy={CENTER} 
        r={RADIUS.zodiac}
        fill="none"
        stroke={THEME_COLORS.primary}
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Znaczniki stopni */}
      {renderDegreeMarks()}

      {/* Znaki zodiaku z poprawioną czytelnością */}
      {zodiacSigns.map((sign, index) => {
        const angle = index * 30 - 75; // -75 dla wycentrowania w sektorze
        const symbolPos = polarToCartesian(
          CENTER, 
          CENTER,
          RADIUS.outer - 25,
          angle
        );
        
        return (
          <text
            key={sign.symbol}
            x={symbolPos.x}
            y={symbolPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={THEME_COLORS.primary}
            fontSize="18"
            className="font-zodiac select-none filter drop-shadow-md"
            style={{ filter: 'url(#glow)' }}
          >
            {sign.symbol}
          </text>
        );
      })}
    </g>
  );
};

export default ZodiacCircle;