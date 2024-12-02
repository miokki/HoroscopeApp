import React from 'react';
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
  const {
    hoveredPlanet,
    selectedPlanet,
    mousePosition,
    handlePlanetHover,
    handlePlanetClick,
    isHighlighted,
  } = useChartInteraction();

  if (!data) return null;

  const { planet_positions, house_positions, aspects } = data;

  const isAspectHighlighted = (aspect: Aspect) => {
    return isHighlighted(aspect.planet1) || isHighlighted(aspect.planet2);
  };

  const activePlanet = hoveredPlanet || selectedPlanet;

  return (
    <div className="relative">
      <ChartContainer>
        {/* Podstawowa struktura wykresu */}
        <ZodiacCircle />
        
        {/* Domy astrologiczne */}
        <Houses houses={house_positions} />

        {/* Linie aspektów - renderowane pod planetami */}
        {aspects?.map((aspect, index) => (
          <AspectLine
            key={`aspect-${index}`}
            aspect={aspect}
            position1={planet_positions[aspect.planet1]['długość ekliptyczna']}
            position2={planet_positions[aspect.planet2]['długość ekliptyczna']}
            isHighlighted={isAspectHighlighted(aspect)}
          />
        ))}
        
        {/* Planety - renderowane na wierzchu */}
        {Object.entries(planet_positions).map(([planet, data]) => (
          <Planet
            key={`planet-${planet}`}
            planet={planet}
            position={data['długość ekliptyczna']}
            isRetrograde={data.retrogradacja}
            isHighlighted={isHighlighted(planet)}
            onHover={handlePlanetHover}
            onClick={handlePlanetClick}
          />
        ))}
      </ChartContainer>

      {/* Tooltip - wyświetlany poza SVG */}
      {activePlanet && planet_positions[activePlanet] && (
        <PlanetTooltip 
          planet={activePlanet}
          data={planet_positions[activePlanet]}
          x={mousePosition.x}
          y={mousePosition.y}
        />
      )}
    </div>
  );
};

export default HoroscopeChart;