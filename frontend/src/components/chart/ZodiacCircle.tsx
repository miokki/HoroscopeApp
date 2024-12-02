import React from 'react';
import { THEME_COLORS, ZODIAC_SIGNS, CENTER, RADIUS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

export const ZodiacCircle: React.FC = () => {
  // Renderuje znaczniki stopni
  const renderDegreeMarks = () => {
    const marks = [];
    for (let i = 0; i < 360; i += 5) {
      const isMainDegree = i % 30 === 0;
      const start = polarToCartesian(CENTER, CENTER, RADIUS.outer, i - 90);
      const end = polarToCartesian(
        CENTER, 
        CENTER, 
        RADIUS.outer - (isMainDegree ? RADIUS.tick * 2 : RADIUS.tick), 
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
          strokeWidth={isMainDegree ? 1 : 0.5}
          opacity={isMainDegree ? 1 : 0.7}
        />
      );
    }
    return marks;
  };

  return (
    <g className="zodiac-circle">
      {/* Tło dla zewnętrznego pierścienia */}
      <circle 
        cx={CENTER} 
        cy={CENTER} 
        r={RADIUS.outer}
        fill={THEME_COLORS.background}
        stroke={THEME_COLORS.primary}
        strokeWidth="1"
        className="drop-shadow-lg"
      />
      
      {/* Wewnętrzny okrąg */}
      <circle 
        cx={CENTER} 
        cy={CENTER} 
        r={RADIUS.inner}
        fill="none"
        stroke={THEME_COLORS.primary}
        strokeWidth="1"
      />

      {/* Znaczniki stopni */}
      {renderDegreeMarks()}

      {/* Linie podziału znaków zodiaku */}
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = index * 30 - 90;
        const start = polarToCartesian(CENTER, CENTER, RADIUS.outer, angle);
        const end = polarToCartesian(CENTER, CENTER, RADIUS.inner, angle);
        return (
          <line
            key={`zodiac-line-${index}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={THEME_COLORS.primary}
            strokeWidth="1"
          />
        );
      })}

      {/* Znaki zodiaku */}
      {ZODIAC_SIGNS.map((sign, index) => {
        const angle = index * 30 - 75; // -75 dla wycentrowania w 30-stopniowym sektorze
        const symbolPos = polarToCartesian(
          CENTER, 
          CENTER, 
          RADIUS.outer - 25,  // Odsunięcie symbolu od zewnętrznego kręgu
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
            fontSize="16"
            className="font-zodiac select-none filter drop-shadow"
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