import React, { useRef } from 'react';
import { ZodiacCircle } from './ZodiacCircle';
import { Planet } from './Planet';
import { AspectLine } from './AspectLine';
import { Houses } from './Houses';
import { ChartContainer } from './ChartContainer';
import { useChartInteraction } from '../../hooks/useChartInteraction';
import { AspectType } from '../../constants/chart';
import PlanetTooltip from './PlanetTooltip';

export interface PlanetPosition {
  'długość ekliptyczna': number;
  'znak_zodiaku': string;
  'szerokość ekliptyczna': number;
  'dom': number;
  'retrogradacja'?: boolean;
  'szybkość'?: number;
  'faza'?: {
    phase: string;
    degrees: number;
  };
  'dyspozytor'?: string;
  'stopnie': number;
  'minuty': number;
}

interface Aspect {
  planet1: string;
  planet2: string;
  aspekt: AspectType;
  dokładny_kąt: number;
  orb: number;
  typ: string;
}

export interface HoroscopeChartProps {
  data: {
    planet_positions: Record<string, PlanetPosition>;
    house_positions: Record<number, {
      pozycja: number;
      znak_zodiaku: string;
      stopnie: number;
      minuty: number;
    }>;
    aspects: Aspect[];
    configurations?: Array<{
      typ: string;
      planety: string[];
      planeta_szczytowa?: string;
    }>;
    stelliums?: Array<string[]>;
  };
}

const HoroscopeChart: React.FC<HoroscopeChartProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    hoveredPlanet,
    selectedPlanet,
    tooltipPosition,
    handlePlanetHover,
    handlePlanetClick,
    handleChartClick,
    isHighlighted,
  } = useChartInteraction(containerRef);

  if (!data) return null;

  const { planet_positions, house_positions, aspects } = data;

  const isAspectHighlighted = (aspect: Aspect) => {
    return isHighlighted(aspect.planet1) || isHighlighted(aspect.planet2);
  };

  const activePlanet = selectedPlanet || hoveredPlanet;

  // Przygotowanie pozycji wszystkich planet
  const allPositions: { [planet: string]: number } = {};
  Object.entries(planet_positions).forEach(([planet, planetData]) => {
    allPositions[planet] = planetData['długość ekliptyczna'];
  });

  // Obliczenie poziomów orbit, aby uniknąć nachodzenia
  // Tworzymy tablicę planet z ich pozycjami
  const planetsWithPositions = Object.entries(planet_positions).map(([planet, planetData]) => ({
    planet,
    position: planetData['długość ekliptyczna'],
    data: planetData,
  }));

  // Sortujemy planety według pozycji
  planetsWithPositions.sort((a, b) => a.position - b.position);

  // Przypisujemy poziomy orbit
  const threshold = 10; // Próg odległości kątowej w stopniach
  const orbitLevels: { [planet: string]: number } = {};

  for (let i = 0; i < planetsWithPositions.length; i++) {
    const currentPlanet = planetsWithPositions[i];
    let level = 0;

    while (true) {
      let hasOverlap = false;
      for (let j = 0; j < i; j++) {
        const otherPlanet = planetsWithPositions[j];
        let angularDistance = Math.abs(currentPlanet.position - otherPlanet.position);
        if (angularDistance > 180) {
          angularDistance = 360 - angularDistance;
        }
        if (angularDistance < threshold && orbitLevels[otherPlanet.planet] === level) {
          hasOverlap = true;
          break;
        }
      }
      if (hasOverlap) {
        level++;
      } else {
        break;
      }
    }

    orbitLevels[currentPlanet.planet] = level;
  }

  return (
    <div className="relative" onClick={handleChartClick}>
      <ChartContainer containerRef={containerRef}>
        {/* Podstawowa struktura wykresu */}
        <ZodiacCircle />

        {/* Domy astrologiczne */}
        <Houses houses={house_positions} />

        {/* Linie aspektów */}
        {aspects?.map((aspect: Aspect, index: number) => (
          <AspectLine
            key={`aspect-${index}`}
            aspect={aspect}
            position1={planet_positions[aspect.planet1]['długość ekliptyczna']}
            position2={planet_positions[aspect.planet2]['długość ekliptyczna']}
            isHighlighted={isAspectHighlighted(aspect)}
          />
        ))}

        {/* Planety */}
        {planetsWithPositions.map(({ planet, position, data }) => (
          <Planet
            key={`planet-${planet}`}
            planet={planet}
            position={position}
            isRetrograde={data.retrogradacja}
            isHighlighted={isHighlighted(planet)}
            onHover={handlePlanetHover}
            onClick={handlePlanetClick}
            orbitLevel={orbitLevels[planet]} // Przekazujemy poziom orbity
          />
        ))}
      </ChartContainer>

      {/* Tooltip */}
      {activePlanet && tooltipPosition && planet_positions[activePlanet] && (
        <PlanetTooltip
          planet={activePlanet}
          data={planet_positions[activePlanet]}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default HoroscopeChart;
