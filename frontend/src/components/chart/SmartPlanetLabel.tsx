import React from 'react';
import { CENTER, RADIUS, THEME_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface SmartPlanetLabelProps {
  planet: string;
  position: number;
  orbitLevel: number;
  forcePosition?: { x: number; y: number };
}

export const SmartPlanetLabel: React.FC<SmartPlanetLabelProps> = ({
  planet,
  position,
  orbitLevel,
  forcePosition
}) => {
  // Oblicz pozycję bazową etykiety
  const angle = (position - 90) * Math.PI / 180;
  const orbitRadius = RADIUS.planets - (orbitLevel * 30);
  
  const pos = forcePosition || polarToCartesian(CENTER, CENTER, orbitRadius, position - 90);
  
  // Oblicz pozycję etykiety z odpowiednim odsunięciem
  const labelOffset = 20;
  const labelBase = {
    x: pos.x + Math.cos(angle) * labelOffset,
    y: pos.y + Math.sin(angle) * labelOffset
  };

  // Dostosuj pozycję w zależności od ćwiartki
  const quadrant = Math.floor(((angle + Math.PI) * 2 / Math.PI + 4) % 4);
  const labelWidth = planet.length * 8;
  
  let finalLabelPos = { ...labelBase };
  let textAnchor: "start" | "end" | "middle" = "start";
  let backgroundWidth = labelWidth + 20;

  // Poprawione pozycjonowanie w zależności od ćwiartki
  switch (quadrant) {
    case 0: // Prawa górna
      textAnchor = "start";
      break;
    case 1: // Lewa górna
      textAnchor = "end";
      finalLabelPos.x -= labelWidth;
      break;
    case 2: // Lewa dolna
      textAnchor = "end";
      finalLabelPos.x -= labelWidth;
      break;
    case 3: // Prawa dolna
      textAnchor = "start";
      break;
  }

  return (
    <g className="planet-label">
      {/* Tło etykiety z efektem blur */}
      <rect
        x={finalLabelPos.x - (textAnchor === "end" ? backgroundWidth : 0)}
        y={finalLabelPos.y - 10}
        width={backgroundWidth}
        height={20}
        rx={4}
        fill="rgba(0,0,0,0.6)"
        className="backdrop-blur-md"
      />

      {/* Linia prowadząca z animacją */}
      <line
        x1={pos.x}
        y1={pos.y}
        x2={labelBase.x}
        y2={labelBase.y}
        stroke={THEME_COLORS.primary}
        strokeWidth={0.5}
        strokeDasharray="3,3"
        className="opacity-50 transition-opacity duration-200"
      />

      {/* Tekst etykiety z cieniem */}
      <text
        x={finalLabelPos.x}
        y={finalLabelPos.y}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        fill={THEME_COLORS.primary}
        className="text-sm font-medium select-none drop-shadow"
      >
        {planet}
      </text>
    </g>
  );
};

export default SmartPlanetLabel;