import React from 'react';
import { ASPECT_COLORS, CENTER, RADIUS, AspectType } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';

interface AspectLineProps {
  aspect: {
    planet1: string;
    planet2: string;
    aspekt: AspectType;
    typ: string;  // 'aplikacyjny' lub 'separacyjny'
  };
  position1: number;
  position2: number;
  isHighlighted: boolean;
}

export const AspectLine: React.FC<AspectLineProps> = ({
  aspect,
  position1,
  position2,
  isHighlighted,
}) => {
  const { x: x1, y: y1 } = polarToCartesian(
    CENTER, 
    CENTER, 
    RADIUS.planets, 
    position1 - 90
  );
  
  const { x: x2, y: y2 } = polarToCartesian(
    CENTER, 
    CENTER, 
    RADIUS.planets, 
    position2 - 90
  );

  // Różne style linii dla różnych typów aspektów
  const getStrokeDasharray = () => {
    switch (aspect.aspekt) {
      case 'opozycja':
        return "4,4";
      case 'kwadratura':
        return "6,3";
      case 'półkwadratura':
      case 'półtorakwadratura':
        return "2,2";
      default:
        return "none";
    }
  };

  const getStrokeWidth = () => {
    if (isHighlighted) {
      return aspect.typ === 'aplikacyjny' ? "2" : "1.5";
    }
    return aspect.typ === 'aplikacyjny' ? "1.5" : "1";
  };

  const getOpacity = () => {
    if (isHighlighted) {
      return aspect.typ === 'aplikacyjny' ? "0.8" : "0.6";
    }
    return aspect.typ === 'aplikacyjny' ? "0.6" : "0.4";
  };

  return (
    <>
      {/* Linia aspektu z efektem poświaty */}
      {isHighlighted && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={ASPECT_COLORS[aspect.aspekt]}
          strokeWidth={getStrokeWidth()}
          strokeDasharray={getStrokeDasharray()}
          opacity="0.2"
          filter="url(#glow)"
        />
      )}
      
      {/* Główna linia aspektu */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={ASPECT_COLORS[aspect.aspekt]}
        strokeWidth={getStrokeWidth()}
        strokeDasharray={getStrokeDasharray()}
        opacity={getOpacity()}
        className="transition-all duration-200"
      />
    </>
  );
};

export default AspectLine;