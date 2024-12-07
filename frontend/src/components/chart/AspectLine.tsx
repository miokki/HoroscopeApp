import React from 'react';
import { CENTER, RADIUS, ASPECT_COLORS } from '../../constants/chart';
import { polarToCartesian } from '../../utils/chart';
import { AspectType } from '../../types/chart';

interface AspectLineProps {
  aspect: {
    planet1: string;
    planet2: string;
    aspekt: AspectType;
    dokładny_kąt: number;
  };
  position1: number;
  position2: number;
  isHighlighted?: boolean;
}

export const AspectLine: React.FC<AspectLineProps> = ({
  aspect,
  position1,
  position2,
  isHighlighted = false
}) => {
  // Oblicz punkty końcowe linii
  const pos1 = polarToCartesian(CENTER, CENTER, RADIUS.planets, position1 - 90);
  const pos2 = polarToCartesian(CENTER, CENTER, RADIUS.planets, position2 - 90);

  // Style linii w zależności od typu aspektu i stanu
  const getLineStyles = () => {
    const baseWidth = isHighlighted ? 1.5 : 1;
    const baseOpacity = isHighlighted ? 1 : 0.6;

    const styles = {
      strokeWidth: baseWidth,
      opacity: baseOpacity,
      dasharray: "none"
    };

    switch (aspect.aspekt) {
      case 'opozycja':
      case 'koniunkcja':
        styles.strokeWidth = baseWidth * 1.2;
        break;
      case 'trygon':
      case 'sekstyl':
        styles.dasharray = "none";
        break;
      default:
        styles.dasharray = "4,4";
        break;
    }

    return styles;
  };

  const styles = getLineStyles();

  return (
    <g className="aspect-line">
      {/* Cień linii dla lepszej widoczności */}
      {isHighlighted && (
        <line
          x1={pos1.x}
          y1={pos1.y}
          x2={pos2.x}
          y2={pos2.y}
          stroke="rgba(0,0,0,0.5)"
          strokeWidth={styles.strokeWidth + 1}
          className="transition-all duration-300"
        />
      )}

      {/* Główna linia aspektu */}
      <line
        x1={pos1.x}
        y1={pos1.y}
        x2={pos2.x}
        y2={pos2.y}
        stroke={ASPECT_COLORS[aspect.aspekt]}
        strokeWidth={styles.strokeWidth}
        strokeDasharray={styles.dasharray}
        opacity={styles.opacity}
        className="transition-all duration-300"
      />

      {/* Punkty końcowe dla wyróżnionych aspektów */}
      {isHighlighted && (
        <>
          <circle
            cx={pos1.x}
            cy={pos1.y}
            r={2}
            fill={ASPECT_COLORS[aspect.aspekt]}
            className="animate-ping-slow"
          />
          <circle
            cx={pos2.x}
            cy={pos2.y}
            r={2}
            fill={ASPECT_COLORS[aspect.aspekt]}
            className="animate-ping-slow"
          />
        </>
      )}
    </g>
  );
};

export default AspectLine;