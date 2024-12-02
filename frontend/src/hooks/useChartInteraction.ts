import { useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useChartInteraction = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handlePlanetHover = (planet: string | null, event?: React.MouseEvent) => {
    setHoveredPlanet(planet);
    if (event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handlePlanetClick = (planet: string, event: React.MouseEvent) => {
    if (planet === selectedPlanet) {
      setSelectedPlanet(null);
    } else {
      setSelectedPlanet(planet);
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const isHighlighted = (planet: string) => {
    return planet === hoveredPlanet || planet === selectedPlanet;
  };

  return {
    hoveredPlanet,
    selectedPlanet,
    mousePosition,
    handlePlanetHover,
    handlePlanetClick,
    isHighlighted,
  };
};

export default useChartInteraction;