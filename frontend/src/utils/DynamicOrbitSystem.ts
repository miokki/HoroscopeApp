
export interface PlanetData {
  planet: string;
  position: number;
  isRetrograde?: boolean;
}

export class DynamicOrbitSystem {
  private readonly MAX_ORBIT_LEVELS = 5;
  private readonly ANGLE_THRESHOLD = 15;
  private readonly planets: PlanetData[];

  constructor(planets: PlanetData[]) {
    this.planets = planets;
  }

  public optimizeOrbitLevels(): { [key: string]: number } {
    const orbitLevels: { [key: string]: number } = {};
    const groups: PlanetData[][] = [];
    let currentGroup: PlanetData[] = [];

    // Grupowanie planet blisko siebie
    this.planets.forEach((planet, index) => {
      if (index === 0) {
        currentGroup.push(planet);
        return;
      }

      const prevPlanet = this.planets[index - 1];
      const angleDiff = this.getAngleDifference(
        prevPlanet.position,
        planet.position
      );

      if (angleDiff <= this.ANGLE_THRESHOLD) {
        currentGroup.push(planet);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [planet];
      }
    });

    // Dodaj ostatnią grupę
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    // Optymalizacja poziomów orbit dla każdej grupy
    groups.forEach(group => {
      if (group.length === 1) {
        orbitLevels[group[0].planet] = 0;
        return;
      }

      // Dystrybuuj planety w grupie spiralnie
      this.distributeGroupPlanets(group, orbitLevels);
    });

    return this.optimizeOverlaps(orbitLevels);
  }

  private distributeGroupPlanets(
    group: PlanetData[],
    orbitLevels: { [key: string]: number }
  ): void {
    group.forEach((planet, index) => {
      const levelIndex = index % this.MAX_ORBIT_LEVELS;
      const baseLevel = Math.floor(index / this.MAX_ORBIT_LEVELS) * this.MAX_ORBIT_LEVELS;
      orbitLevels[planet.planet] = Math.min(
        baseLevel + levelIndex,
        this.MAX_ORBIT_LEVELS - 1
      );
    });
  }

  private optimizeOverlaps(
    levels: { [key: string]: number }
  ): { [key: string]: number } {
    let bestConfiguration = { ...levels };
    let bestScore = this.evaluateConfiguration(bestConfiguration);

    // Iteracyjna optymalizacja
    for (let i = 0; i < 100; i++) {
      const newConfig = this.perturbConfiguration(bestConfiguration);
      const newScore = this.evaluateConfiguration(newConfig);

      if (newScore < bestScore) {
        bestConfiguration = newConfig;
        bestScore = newScore;
      }
    }

    return bestConfiguration;
  }

  private evaluateConfiguration(
    levels: { [key: string]: number }
  ): number {
    let score = 0;
    const positions = this.planets.map(p => ({
      ...p,
      level: levels[p.planet]
    }));

    // Ocena nakładania się planet
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const angleDiff = this.getAngleDifference(
          positions[i].position,
          positions[j].position
        );
        const levelDiff = Math.abs(positions[i].level - positions[j].level);

        if (angleDiff < this.ANGLE_THRESHOLD && levelDiff < 1) {
          score += (this.ANGLE_THRESHOLD - angleDiff) * (1 - levelDiff);
        }
      }
    }

    return score;
  }

  private getAngleDifference(angle1: number, angle2: number): number {
    const diff = Math.abs(angle1 - angle2);
    return Math.min(diff, 360 - diff);
  }

  private perturbConfiguration(config: { [key: string]: number }): { [key: string]: number } {
    const newConfig = { ...config };
    const planets = Object.keys(config);
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    const currentLevel = newConfig[randomPlanet];
    const newLevel = Math.min(Math.max(0, currentLevel + (Math.random() < 0.5 ? -1 : 1)), this.MAX_ORBIT_LEVELS - 1);
    newConfig[randomPlanet] = newLevel;
    return newConfig;
  }
}