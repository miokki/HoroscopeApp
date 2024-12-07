import React from 'react';
import { CHART_SIZE } from '../../constants/chart';

interface ChartContainerProps {
  containerRef: React.RefObject<SVGSVGElement>;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ containerRef, children }) => {
  return (
    <svg
      ref={containerRef}
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
};

export default ChartContainer;