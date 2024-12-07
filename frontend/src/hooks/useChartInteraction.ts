import { useState, useCallback, RefObject } from 'react';

interface TooltipPosition {
  x: number;
  y: number;
}

export function useChartInteraction(containerRef: RefObject<SVGSVGElement>) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);

  const handlePlanetHover = useCallback(
    (planet: string | null, event?: React.MouseEvent) => {
      setHoveredPlanet(planet);
      
      if (event && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Zapobiegaj wychodzeniu tooltipa poza kontener
        const containerWidth = rect.width;
        const containerHeight = rect.height;
        const tooltipOffset = 10;
        
        const adjustedX = Math.min(
          Math.max(x, tooltipOffset), 
          containerWidth - tooltipOffset
        );
        const adjustedY = Math.min(
          Math.max(y, tooltipOffset), 
          containerHeight - tooltipOffset
        );

        setTooltipPosition({ x: adjustedX, y: adjustedY });
      } else {
        setTooltipPosition(null);
      }
    },
    [containerRef]
  );

  const handlePlanetClick = useCallback(
    (planet: string) => {
      if (selectedPlanet === planet) {
        setSelectedPlanet(null);
        setTooltipPosition(null);
      } else {
        setSelectedPlanet(planet);
      }
    },
    [selectedPlanet]
  );

  const handleChartClick = useCallback(() => {
    if (selectedPlanet) {
      setSelectedPlanet(null);
      setTooltipPosition(null);
    }
  }, [selectedPlanet]);

  const isHighlighted = useCallback(
    (planet: string) => {
      return planet === hoveredPlanet || planet === selectedPlanet;
    },
    [hoveredPlanet, selectedPlanet]
  );

  return {
    hoveredPlanet,
    selectedPlanet,
    tooltipPosition,
    handlePlanetHover,
    handlePlanetClick,
    handleChartClick,
    isHighlighted,
  };
};
