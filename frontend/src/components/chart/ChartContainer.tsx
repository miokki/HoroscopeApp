import React from 'react';
import { CHART_SIZE } from '../../constants/chart';

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="aspect-square w-full max-w-full">
        <svg
          viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
          className="w-full h-full"
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
    </div>
  );
};

export default ChartContainer;