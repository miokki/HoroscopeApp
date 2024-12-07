import React from 'react';

interface PlanetTooltipProps {
  planet: string;
  data: {
    'znak_zodiaku': string;
    'dom': number;
    'stopnie': number;
    'minuty': number;
    'retrogradacja'?: boolean;
    'dyspozytor'?: string;
    'faza'?: {
      phase: string;
      degrees: number;
    };
  };
  position: { x: number; y: number };
}

const PlanetTooltip: React.FC<PlanetTooltipProps> = ({ planet, data, position }) => {
  return (
    <div 
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -120%)'
      }}
    >
      <div className="bg-slate-800/90 rounded-lg p-4 shadow-xl backdrop-blur-md border border-slate-700">
        {/* Nagłówek */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-primary">
            {planet}
          </h3>
          {data.retrogradacja && (
            <span className="text-red-400 text-sm">℞</span>
          )}
        </div>

        {/* Informacje podstawowe */}
        <div className="space-y-1 text-sm">
          <p className="text-slate-300">
            {data.znak_zodiaku} {data.stopnie}°{data.minuty}'
          </p>
          <p className="text-slate-400">
            Dom {data.dom}
          </p>
          
          {/* Dyspozytor */}
          {data.dyspozytor && (
            <p className="text-slate-400">
              Dyspozytor: {data.dyspozytor}
            </p>
          )}

          {/* Faza Księżyca */}
          {data.faza && (
            <p className="text-slate-400">
              Faza: {data.faza.phase} ({Math.round(data.faza.degrees)}°)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetTooltip;
