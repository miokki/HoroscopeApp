import React from 'react';
import { PlanetPosition } from './HoroscopeChart';
import PlanetIcon from './PlanetIcon';

interface PlanetTooltipProps {
  planet: string;
  data: PlanetPosition;
  position: { x: number; y: number };
}

const PlanetTooltip: React.FC<PlanetTooltipProps> = ({ planet, data, position }) => {
  const shouldShowOnRight = position.x < window.innerWidth / 2;

  const horizontalOffset = 18;
  const verticalOffset = 0;

  const tooltipWidth = 220;

  const leftPosition = shouldShowOnRight
    ? position.x + horizontalOffset
    : position.x - tooltipWidth - horizontalOffset;

  return (
    <div
      className="absolute pointer-events-none bg-slate-900/95 border border-slate-700
                   rounded-lg p-4 shadow-xl backdrop-blur-sm z-50
                   transition-all duration-200 ease-in-out flex flex-col items-center"
      style={{
        left: `${leftPosition}px`,
        top: `${position.y + verticalOffset}px`,
        width: `${tooltipWidth}px`,
        transform: 'translateY(-50%)',
      }}
    >
      <PlanetIcon planet={planet} size={96} /> {/* Increased icon size */}
      <div className="mt-2 text-center">
        <span className="font-medium text-lg">{planet}</span>
        {data.retrogradacja && (
          <div className="text-red-400 text-sm mt-1">Retrogradacja ℞</div>
        )}
        <div className="mt-2 text-sm space-y-1">
          <div>
            <span className="text-slate-400">Znak: </span>
            <span className="text-slate-200">{data.znak_zodiaku}</span>
          </div>
          <div>
            <span className="text-slate-400">Pozycja: </span>
            <span className="text-slate-200">
              {data.stopnie}°{data.minuty}'
            </span>
          </div>
          <div>
            <span className="text-slate-400">Dom: </span>
            <span className="text-slate-200">{data.dom}</span>
          </div>
          {data.dyspozytor && (
            <div>
              <span className="text-slate-400">Dyspozytor: </span>
              <span className="text-slate-200">{data.dyspozytor}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetTooltip;
