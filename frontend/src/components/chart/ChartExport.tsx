// ChartExport.tsx
import React, { useState } from 'react';
import { CHART_SIZE } from '../../constants/chart';

interface ExportOptions {
  format: 'png' | 'svg';
  width: number;
  height: number;
  includeMetadata: boolean;
  quality: number;
}

interface ChartExportProps {
  chartRef: React.RefObject<SVGSVGElement>;
  metadata?: Record<string, string>;
}

const ChartExport: React.FC<ChartExportProps> = ({ chartRef, metadata }) => {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'png',
    width: CHART_SIZE,
    height: CHART_SIZE,
    includeMetadata: true,
    quality: 1
  });

  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const svgData = new XMLSerializer().serializeToString(chartRef.current);
      const blob = await generateExportBlob(svgData, options);
      downloadBlob(blob, `horoskop.${options.format}`);
    } catch (error) {
      console.error('Błąd podczas eksportu:', error);
    }
  };

  const generateExportBlob = async (svgData: string, options: ExportOptions): Promise<Blob> => {
    if (options.format === 'svg') {
      return new Blob([svgData], { type: 'image/svg+xml' });
    }

    // Konwersja do PNG
    const canvas = document.createElement('canvas');
    canvas.width = options.width;
    canvas.height = options.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Nie można utworzyć kontekstu canvas');

    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, options.width, options.height);
        canvas.toBlob(
          (blob) => resolve(blob as Blob),
          'image/png',
          options.quality
        );
      };
    });
  };

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chart-export p-4 bg-slate-800/90 rounded-lg backdrop-blur-md">
      <h3 className="text-sm font-semibold mb-3 text-primary">
        Eksport Wykresu
      </h3>

      <div className="space-y-3">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={options.format === 'png'}
              onChange={() => setOptions({ ...options, format: 'png' })}
            />
            <span className="text-sm text-slate-300">PNG</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={options.format === 'svg'}
              onChange={() => setOptions({ ...options, format: 'svg' })}
            />
            <span className="text-sm text-slate-300">SVG</span>
          </label>
        </div>

        <button
          onClick={handleExport}
          className="w-full py-2 px-4 bg-primary/20 hover:bg-primary/30 
                   text-primary rounded transition-colors"
        >
          Eksportuj
        </button>
      </div>
    </div>
  );
};

export default ChartExport;