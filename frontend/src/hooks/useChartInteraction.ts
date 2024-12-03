import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useChartInteraction = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Position | null>(null);

  const handlePlanetHover = (planet: string | null, planetPosition?: { x: number, y: number }) => {
    setHoveredPlanet(planet);
    if (planetPosition) {
      setTooltipPosition(planetPosition);
    }
  };

  const handlePlanetClick = (planet: string, planetPosition: { x: number, y: number }) => {
    if (planet === selectedPlanet) {
      setSelectedPlanet(null);
      setTooltipPosition(null);
    } else {
      setSelectedPlanet(planet);
      setTooltipPosition(planetPosition);
    }
  };

  const isHighlighted = (planet: string) => {
    return planet === hoveredPlanet || planet === selectedPlanet;
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