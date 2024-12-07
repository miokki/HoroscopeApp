// ChartBackground.tsx
import React from 'react';
import { CHART_SIZE, CENTER, THEME_COLORS } from '../../constants/chart';

interface ChartBackgroundProps {
  isInteractive?: boolean;
}

const ChartBackground: React.FC<ChartBackgroundProps> = ({ 
  isInteractive = true 
}) => {
  return (
    <g className="chart-background">
      {/* Definicje gradientów i filtrów */}
      <defs>
        {/* Główny gradient tła */}
        <radialGradient id="backgroundGradient">
          <stop offset="0%" stopColor={THEME_COLORS.background} stopOpacity="0.8" />
          <stop offset="80%" stopColor={THEME_COLORS.background} stopOpacity="0.95" />
          <stop offset="100%" stopColor={THEME_COLORS.background} />
        </radialGradient>

        {/* Gradient dla poświaty */}
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor={THEME_COLORS.primary} stopOpacity="0.1" />
          <stop offset="100%" stopColor={THEME_COLORS.primary} stopOpacity="0" />
        </radialGradient>

        {/* Filtr dla efektu rozmycia */}
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Tło wykresu */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={CHART_SIZE / 2 - 10}
        fill="url(#backgroundGradient)"
        className="transition-opacity duration-500"
      />

      {/* Efekt poświaty */}
      {isInteractive && (
        <g className="glow-effects">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CHART_SIZE / 3}
            fill="url(#glowGradient)"
            filter="url(#blur)"
            className="animate-pulse-slow opacity-30"
          />
        </g>
      )}

      {/* Subtelna siatka */}
      <g className="grid-pattern" opacity="0.1">
        {[...Array(12)].map((_, i) => (
          <line
            key={`grid-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={CENTER + Math.cos(i * Math.PI / 6) * CHART_SIZE / 2}
            y2={CENTER + Math.sin(i * Math.PI / 6) * CHART_SIZE / 2}
            stroke={THEME_COLORS.primary}
            strokeWidth="0.5"
          />
        ))}
      </g>
    </g>
  );
};

export default ChartBackground;