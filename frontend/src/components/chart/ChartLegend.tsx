// ChartLegend.tsx
import React from 'react';
import { THEME_COLORS } from '../../constants/chart';
import { PlanetData } from '../../types/chart';

const PLANET_COLORS: { [key: string]: string } = {
  'Słońce': '#FFD700',
  // pozostałe kolory...
};

interface ChartLegendProps {
  planetData: Record<string, PlanetData>;
  onPlanetHover?: (planet: string | null) => void;
  onPlanetClick?: (planet: string) => void;
  activePlanet?: string | null;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  planetData,
  onPlanetHover,
  onPlanetClick,
  activePlanet
}) => {
  return (
    <div className="chart-legend p-4 bg-slate-800/90 rounded-lg backdrop-blur-md">
      <h3 className="text-sm font-semibold mb-3 text-primary border-b border-slate-700 pb-2">
        Legenda
      </h3>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {Object.entries(planetData).map(([planet, data]) => {
          const planetColor = PLANET_COLORS[planet as keyof typeof PLANET_COLORS] || THEME_COLORS.primary;
          return (
            <div
              key={planet}
              className={`
                flex items-center gap-2 p-1.5 rounded cursor-pointer
                transition-colors duration-200
                ${activePlanet === planet ? 'bg-slate-700/50' : 'hover:bg-slate-700/30'}
              `}
              onMouseEnter={() => onPlanetHover?.(planet)}
              onMouseLeave={() => onPlanetHover?.(null)}
              onClick={() => onPlanetClick?.(planet)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: planetColor }}
              />
              <span className="text-sm text-slate-300">
                {planet}
              </span>
              <span className="text-xs text-slate-500 ml-auto">
                {data.znak_zodiaku} {data.stopnie}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartLegend;