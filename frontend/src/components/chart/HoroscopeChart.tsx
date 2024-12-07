import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ZODIAC_SIGNS, RADIUS, CHART_SIZE, PLANET_COLORS } from '../../constants/chart';
import { AspectType, ChartData, Point } from '../../types/chart';
import { ForceLayoutManager } from '../../utils/ForceLayoutManager';
import { DynamicOrbitSystem } from '../../utils/DynamicOrbitSystem';
import { useChartInteraction } from '../../hooks/useChartInteraction';
import { ZodiacCircle } from './ZodiacCircle';
import { AspectLine } from './AspectLine';
import { Houses } from './Houses';
import ChartContainer from './ChartContainer';
import Planet from './Planet';
import PlanetTooltip from './PlanetTooltip';
import SmartPlanetLabel from './SmartPlanetLabel';
import AspectLegend from './AspectLegend';

type PlanetName = "Słońce" | "Księżyc" | "Merkury" | "Wenus" | "Mars" | "Jowisz" | "Saturn" | "Uran" | "Neptun" | "Pluton";

export interface HoroscopeChartProps {
  data: ChartData;
  onPlanetSelect?: (planet: string | null) => void;
  onPlanetHover?: (planet: string | null) => void;
  className?: string;
}

export const HoroscopeChart: React.FC<HoroscopeChartProps> = ({
  data,
  onPlanetSelect,
  onPlanetHover,
  className = ''
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [planetPositions, setPlanetPositions] = useState<{ [key: string]: Point }>({});

  const {
    hoveredPlanet,
    selectedPlanet,
    tooltipPosition,
    handlePlanetHover,
    handlePlanetClick,
    isHighlighted,
  } = useChartInteraction(containerRef);

  const { planetsWithPositions, orbitLevels } = useMemo(() => {
    if (!data) return { planetsWithPositions: [], orbitLevels: {} };

    const orbitSystem = new DynamicOrbitSystem(
      Object.entries(data.planet_positions).map(([planet, planetData]) => ({
        planet,
        position: planetData['długość ekliptyczna'],
        isRetrograde: planetData.retrogradacja
      }))
    );

    const levels = orbitSystem.optimizeOrbitLevels();
    const planets = Object.entries(data.planet_positions).map(([planet, planetData]) => ({
      planet,
      position: planetData['długość ekliptyczna'],
      data: planetData
    }));

    return { planetsWithPositions: planets, orbitLevels: levels };
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const planetNodes = planetsWithPositions.map(p => ({
      planet: p.planet,
      position: p.position,
      orbitLevel: orbitLevels[p.planet],
      x: 0,
      y: 0
    }));

    const layoutManager = new ForceLayoutManager(planetNodes);
    setPlanetPositions(layoutManager.getPositions());
  }, [planetsWithPositions, orbitLevels, data]);

  if (!data) return null;

  return (
    <div className={`relative w-full aspect-square max-w-[${CHART_SIZE}px] mx-auto ${className}`}>
      <ChartContainer containerRef={containerRef}>
        <ZodiacCircle zodiacSigns={ZODIAC_SIGNS} radius={RADIUS.zodiac} />
        <Houses houses={data.house_positions} />
        
        {data.aspects?.map((aspect, index) => (
          <AspectLine
            key={`aspect-${index}`}
            aspect={aspect}
            position1={data.planet_positions[aspect.planet1]['długość ekliptyczna']}
            position2={data.planet_positions[aspect.planet2]['długość ekliptyczna']}
            isHighlighted={isHighlighted(aspect.planet1) || isHighlighted(aspect.planet2)}
          />
        ))}

        {planetsWithPositions.map(({ planet, position, data: planetData }) => (
          <React.Fragment key={`planet-${planet}`}>
            <Planet
              planet={planet as PlanetName}
              position={position}
              isRetrograde={planetData.retrogradacja}
              isHighlighted={isHighlighted(planet)}
              onHover={handlePlanetHover}
              onClick={handlePlanetClick}
              orbitLevel={orbitLevels[planet]}
              forcePosition={planetPositions[planet]}
            />
            <SmartPlanetLabel
              planet={planet}
              position={position}
              orbitLevel={orbitLevels[planet]}
              forcePosition={planetPositions[planet]}
            />
          </React.Fragment>
        ))}

        <AspectLegend 
          aspectTypes={data.aspects?.map(aspect => aspect.typ as AspectType) || []}
          className="absolute top-4 right-4"
        />
        
        {((hoveredPlanet || selectedPlanet) && tooltipPosition && data?.planet_positions) && (
          <PlanetTooltip
            planet={hoveredPlanet || selectedPlanet!}
            data={data.planet_positions[hoveredPlanet || selectedPlanet!]}
            position={tooltipPosition}
          />
        )}
      </ChartContainer>
    </div>
  );
};