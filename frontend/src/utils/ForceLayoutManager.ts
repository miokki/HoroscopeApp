import { RADIUS } from '../constants/chart';
import { Point } from '../types/chart';

export interface PlanetNode extends Point {
  planet: string;
  position: number;
  orbitLevel: number;
}

export class ForceLayoutManager {
  private readonly FORCE_STRENGTH = 0.1;
  private readonly COLLISION_RADIUS = 20;
  private readonly MAX_ITERATIONS = 300;
  private readonly DAMPENING = 0.5;
  private readonly MIN_MOVEMENT = 0.1;
  private readonly BOUNDARY_PADDING = 50;
  
  private planets: PlanetNode[];
  private centerX: number;
  private centerY: number;
  private positions: Map<string, Point>;

  constructor(planets: PlanetNode[], width: number = 800, height: number = 800) {
    this.planets = planets;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.positions = new Map();
    this.initializePositions();
  }

  public optimizeLayout(): Array<PlanetNode> {
    let iteration = 0;
    
    while (iteration < this.MAX_ITERATIONS) {
      let maxMovement = 0;
      
      // Aktualizacja pozycji planet
      for (let i = 0; i < this.planets.length; i++) {
        const planet1 = this.planets[i];
        let totalForceX = 0;
        let totalForceY = 0;

        // Obliczanie sił odpychania
        for (let j = 0; j < this.planets.length; j++) {
          if (i === j) continue;
          
          const planet2 = this.planets[j];
          const dx = planet2.x! - planet1.x!;
          const dy = planet2.y! - planet1.y!;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;

          if (distance < this.COLLISION_RADIUS) {
            const force = this.FORCE_STRENGTH * (this.COLLISION_RADIUS - distance) / distance;
            totalForceX -= dx * force;
            totalForceY -= dy * force;
          }
        }

        // Siła przyciągania do orbity
        const targetPos = this.calculateTargetPosition(planet1);
        const toTargetX = targetPos.x - planet1.x!;
        const toTargetY = targetPos.y - planet1.y!;
        
        totalForceX += toTargetX * this.FORCE_STRENGTH;
        totalForceY += toTargetY * this.FORCE_STRENGTH;

        // Aplikowanie sił z tłumieniem
        const movement = Math.sqrt(totalForceX * totalForceX + totalForceY * totalForceY);
        const dampedForceX = totalForceX * this.DAMPENING;
        const dampedForceY = totalForceY * this.DAMPENING;

        // Aktualizacja pozycji z walidacją
        const newX = this.clampPosition(planet1.x! + dampedForceX, 'x');
        const newY = this.clampPosition(planet1.y! + dampedForceY, 'y');

        // Sprawdzenie czy ruch jest znaczący
        if (!isNaN(newX) && !isNaN(newY)) {
          planet1.x = newX;
          planet1.y = newY;
          maxMovement = Math.max(maxMovement, movement);
        }
      }

      // Sprawdzenie warunku zatrzymania
      if (maxMovement < this.MIN_MOVEMENT) {
        break;
      }

      iteration++;
    }
    
    return this.planets;
  }

  public getPositions(): { [key: string]: Point } {
    const result: { [key: string]: Point } = {};
    this.positions.forEach((pos, planet) => {
      result[planet] = pos;
    });
    return result;
  }

  private clampPosition(value: number, axis: 'x' | 'y'): number {
    const center = axis === 'x' ? this.centerX : this.centerY;
    const limit = center - this.BOUNDARY_PADDING;
    return Math.max(center - limit, Math.min(center + limit, value));
  }

  private calculateTargetPosition(planet: PlanetNode): Point {
    const angle = (planet.position - 90) * (Math.PI / 180);
    return {
      x: this.centerX + RADIUS.planets * Math.cos(angle),
      y: this.centerY + RADIUS.planets * Math.sin(angle)
    };
  }

  private initializePositions(): void {
    this.planets = this.planets.map(planet => ({
      ...planet,
      x: this.centerX,
      y: this.centerY
    }));
  }
}