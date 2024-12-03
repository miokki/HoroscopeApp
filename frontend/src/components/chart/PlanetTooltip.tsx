import React from 'react';
import { PlanetPosition } from './HoroscopeChart';
import PlanetIcon from './PlanetIcon';

interface PlanetTooltipProps {
  planet: string;
  data: PlanetPosition;
  position: { x: number; y: number };
}

const PlanetTooltip: React.FC<PlanetTooltipProps> = ({ planet, data, position }) => {
  // Określamy, czy tooltip powinien być po prawej stronie
  const shouldShowOnRight = position.x < window.innerWidth / 2;
  
  // Obliczamy pozycję względem SVG
  const svgRect = document.querySelector('svg')?.getBoundingClientRect();
  const relativeX = svgRect ? position.x - svgRect.left : position.x;
  const relativeY = svgRect ? position.y - svgRect.top : position.y;

  return (
    <div 
      className="absolute pointer-events-none bg-slate-900/95 border border-slate-700 
                 rounded-lg p-3 shadow-xl backdrop-blur-sm z-50
                 transition-all duration-200 ease-in-out flex items-center"
      style={{ 
        left: shouldShowOnRight ? `${relativeX + 20}px` : `${relativeX - 260}px`,
        top: `${relativeY - 10}px`,
        width: '260px',
        transform: 'translateY(-50%)'
      }}
    >
      <div className="flex-grow space-y-2">
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
      <div className="ml-4">
        <PlanetIcon planet={planet} size={72} />
      </div>
    </div>
  );
};

export default PlanetTooltip;