import { useState, useCallback } from 'react';

export const useChartInteraction = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const handlePlanetHover = useCallback(
    (planet: string | null, rect?: DOMRect) => {
      // Jeśli planeta jest zaznaczona, ignorujemy zdarzenia hover
      if (selectedPlanet) return;

      setHoveredPlanet(planet);

      if (planet && rect && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setTooltipPosition({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      } else {
        setTooltipPosition(null);
      }
    },
    [containerRef, selectedPlanet]
  );

  const handlePlanetClick = useCallback(
    (planet: string | null) => {
      if (selectedPlanet === planet) {
        // Odznaczamy planetę
        setSelectedPlanet(null);
        setTooltipPosition(null);
      } else {
        // Zaznaczamy nową planetę
        setSelectedPlanet(planet);
      }
    },
    [selectedPlanet]
  );

  const handleChartClick = useCallback(() => {
    if (selectedPlanet) {
      // Odznaczamy planetę po kliknięciu w wykres
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
