import React from 'react';
import { ASPECT_COLORS } from '../../constants/chart';
import { AspectType } from '../../types/chart';

interface AspectLegendProps {
  aspectTypes: AspectType[];
  className?: string;
}

const AspectLegend: React.FC<AspectLegendProps> = ({ aspectTypes, className = '' }) => {
  const getAspectName = (aspect: AspectType): string => {
    const names: Record<AspectType, string> = {
      'koniunkcja': 'Koniunkcja (0°)',
      'opozycja': 'Opozycja (180°)',
      'trygon': 'Trygon (120°)',
      'kwadratura': 'Kwadratura (90°)',
      'sekstyl': 'Sekstyl (60°)',
      'półsekstyl': 'Półsekstyl (30°)',
      'półkwadratura': 'Półkwadratura (45°)',
      'kwinkunks': 'Kwinkunks (150°)',
      'półtorakwadratura': 'Półtorakwadratura (135°)'
    };
    return names[aspect];
  };

  return (
    <div className={`aspect-legend ${className}`}>
      <div className="bg-slate-800/90 rounded-lg p-4 shadow-xl backdrop-blur-md border border-slate-700">
        <h3 className="text-sm font-semibold mb-2 text-slate-300">
          Aspekty
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {aspectTypes.map(aspect => (
            <div
              key={aspect}
              className="flex items-center gap-2 tooltip-container"
              title={getAspectName(aspect)}
            >
              <span
                className="w-4 h-0.5 rounded-full"
                style={{ backgroundColor: ASPECT_COLORS[aspect] }}
              />
              <span className="text-slate-400 truncate">
                {aspect}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AspectLegend;