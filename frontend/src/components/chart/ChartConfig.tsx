// ChartConfig.tsx
import React from 'react';

interface ChartConfigProps {
  showAspects: boolean;
  showHouses: boolean;
  showPlanetLabels: boolean;
  showZodiacSigns: boolean;
  onConfigChange: (key: string, value: boolean) => void;
}

const ChartConfig: React.FC<ChartConfigProps> = ({
  showAspects,
  showHouses,
  showPlanetLabels,
  showZodiacSigns,
  onConfigChange
}) => {
  const configOptions = [
    { key: 'showAspects', label: 'Aspekty', value: showAspects },
    { key: 'showHouses', label: 'Domy', value: showHouses },
    { key: 'showPlanetLabels', label: 'Etykiety Planet', value: showPlanetLabels },
    { key: 'showZodiacSigns', label: 'Znaki Zodiaku', value: showZodiacSigns }
  ];

  return (
    <div className="chart-config p-4 bg-slate-800/90 rounded-lg backdrop-blur-md">
      <h3 className="text-sm font-semibold mb-3 text-primary">
        Konfiguracja Wykresu
      </h3>
      
      <div className="space-y-2">
        {configOptions.map(({ key, label, value }) => (
          <label 
            key={key}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={value}
              onChange={() => onConfigChange(key, !value)}
              className="
                w-4 h-4 rounded
                border-slate-600
                bg-slate-700
                checked:bg-primary
                transition-colors
                focus:ring-primary
              "
            />
            <span className="
              text-sm text-slate-300
              group-hover:text-primary
              transition-colors
            ">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ChartConfig;