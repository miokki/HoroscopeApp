import React from 'react';
import { PlanetPosition } from './HoroscopeChart';

interface PlanetTooltipProps {
  planet: string;
  data: PlanetPosition;
  x: number;
  y: number;
}

const PlanetTooltip: React.FC<PlanetTooltipProps> = ({ planet, data, x, y }) => {
  return (
    <div 
      className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full
                 bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl
                 backdrop-blur-sm animate-in fade-in zoom-in duration-200"
      style={{ 
        left: x, 
        top: y - 10,
        minWidth: '200px'
      }}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">{planet}</span>
          {data.retrogradacja && (
            <span className="text-red-400 text-sm">Retrogradacja ℞</span>
          )}
        </div>
        
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-slate-400">Znak:</span>{' '}
            <span className="text-slate-200">{data.znak_zodiaku}</span>
          </p>
          <p>
            <span className="text-slate-400">Pozycja:</span>{' '}
            <span className="text-slate-200">{data.stopnie}°{data.minuty}'</span>
          </p>
          <p>
            <span className="text-slate-400">Dom:</span>{' '}
            <span className="text-slate-200">{data.dom}</span>
          </p>
          {data.dyspozytor && (
            <p>
              <span className="text-slate-400">Dyspozytor:</span>{' '}
              <span className="text-slate-200">{data.dyspozytor}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetTooltip;