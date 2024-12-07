import React from 'react';

interface MoonPhaseProps {
  phase: {
    phase: string;
    degrees: number;
    percentage: number;
  };
}

const getMoonPhaseSymbol = (degrees: number): string => {
  if (degrees <= 45) return '🌑'; // nów
  if (degrees <= 135) return '🌒'; // pierwsza kwadra
  if (degrees <= 225) return '🌕'; // pełnia
  if (degrees <= 315) return '🌘'; // ostatnia kwadra
  return '🌑';
};

const getMoonPhaseDescription = (degrees: number): string => {
  const percentage = Math.round((degrees / 360) * 100);
  return `${percentage}% cyklu księżycowego`;
};

export const MoonPhase: React.FC<MoonPhaseProps> = ({ phase }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Symbol fazy */}
        <div className="text-4xl">
          {getMoonPhaseSymbol(phase.degrees)}
        </div>

        <div className="flex flex-col gap-1">
          {/* Nazwa fazy */}
          <span className="text-lg font-medium text-slate-200">
            {phase.phase}
          </span>
          
          {/* Procent cyklu */}
          <span className="text-sm text-slate-400">
            {getMoonPhaseDescription(phase.degrees)}
          </span>
          
          {/* Dokładny kąt */}
          <span className="text-xs text-slate-500">
            {Math.round(phase.degrees)}° od Słońca
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoonPhase;