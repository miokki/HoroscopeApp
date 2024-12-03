import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useChartInteraction = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Position | null>(null);

  const handlePlanetHover = (planet: string | null, planetPosition?: Position) => {
    // Jeśli jakaś planeta jest wybrana, nie pokazujemy tooltipów przy hover
    if (!selectedPlanet) {
      setHoveredPlanet(planet);
      if (planet && planetPosition) {
        setTooltipPosition({
          x: planetPosition.x + 8, // 8px offset od planety
          y: planetPosition.y
        });
      } else {
        setTooltipPosition(null);
      }
    }
  };

  const handlePlanetClick = (planet: string, planetPosition: Position) => {
    if (planet === selectedPlanet) {
      // Odklikanie planety
      setSelectedPlanet(null);
      setTooltipPosition(null);
    } else {
      // Klikanie nowej planety
      setSelectedPlanet(planet);
      setTooltipPosition({
        x: planetPosition.x + 8,
        y: planetPosition.y
      });
    }
  };

  const isHighlighted = (planet: string) => {
    return (!selectedPlanet && planet === hoveredPlanet) || planet === selectedPlanet;
  };

  return {
    hoveredPlanet,
    selectedPlanet,
    tooltipPosition,
    handlePlanetHover,
    handlePlanetClick,
    isHighlighted,
  };
};