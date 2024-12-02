import React from 'react';
import { THEME_COLORS, CHART_SIZE } from '../../constants/chart';

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full aspect-square max-w-3xl mx-auto 
                    bg-slate-900/50 rounded-lg p-6 shadow-xl">
      <svg
        width={CHART_SIZE}
        height={CHART_SIZE}
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
        className="w-full h-auto"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  );
};

export default ChartContainer;