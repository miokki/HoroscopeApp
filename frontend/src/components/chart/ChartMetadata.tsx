// ChartMetadata.tsx
import React from 'react';

interface ChartMetadataProps {
  data: {
    date: string;
    time: string;
    location: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

const ChartMetadata: React.FC<ChartMetadataProps> = ({ data }) => {
  return (
    <div className="chart-metadata p-4 bg-slate-800/90 rounded-lg backdrop-blur-md">
      <h3 className="text-sm font-semibold mb-3 text-primary border-b border-slate-700 pb-2">
        Dane Horoskopu
      </h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Data:</span>
          <span className="text-slate-200">{data.date}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Godzina:</span>
          <span className="text-slate-200">{data.time}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Lokalizacja:</span>
          <span className="text-slate-200 text-right">{data.location}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Współrzędne:</span>
          <span className="text-slate-200">
            {data.latitude.toFixed(4)}°N, {data.longitude.toFixed(4)}°E
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Strefa czasowa:</span>
          <span className="text-slate-200">{data.timezone}</span>
        </div>
      </div>
    </div>
  );
};

export default ChartMetadata;