// ChartRetrograde.tsx
import React from 'react';
import { THEME_COLORS, PLANET_COLORS } from '../../constants/chart';
import { PlanetData } from '../../types/chart';

type PlanetName = keyof typeof PLANET_COLORS;

interface ChartRetrogradeProps {
  planetData: Record<string, PlanetData>;
}

const ChartRetrograde: React.FC<ChartRetrogradeProps> = ({ planetData }) => {
  const retrogradePlanets = Object.entries(planetData)
    .filter(([_, data]) => data.retrogradacja)
    .map(([planet]) => planet);

  if (retrogradePlanets.length === 0) return null;

  return (
    <div className="chart-retrograde p-4 bg-slate-800/90 rounded-lg backdrop-blur-md">
      <h3 className="text-sm font-semibold mb-3 text-red-400 flex items-center gap-2">
        <span>Planety Retrogradacyjne</span>
        <span className="text-lg">℞</span>
      </h3>

      <div className="space-y-2">
        {retrogradePlanets.map(planet => {
          const planetColor = PLANET_COLORS[planet as PlanetName] || THEME_COLORS.primary;
          return (
            <div 
              key={planet}
              className="flex items-center gap-3 p-2 rounded bg-slate-700/30"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: planetColor }}
              />
              
              <span className="text-sm text-slate-300">
                {planet}
              </span>

              <div className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                <span>
                  {planetData[planet].znak_zodiaku}
                </span>
                <span>
                  {planetData[planet].stopnie}°{planetData[planet].minuty}'
                </span>
                <span className="text-red-400">
                  ℞
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-slate-500 italic">
        Planety w ruchu wstecznym mogą wpływać na obszary życia, którymi zarządzają
      </div>
    </div>
  );
};

export default ChartRetrograde;