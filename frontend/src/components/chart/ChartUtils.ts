// ChartUtils.ts
import { Point, PlanetData } from '../../types/chart';
import { CENTER } from '../../constants/chart';

export class ChartUtils {
  // Konwersja stopni na radiany
  static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  // Konwersja radianów na stopnie
  static radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  // Normalizacja kąta do zakresu 0-360
  static normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
  }

  // Obliczanie odległości kątowej między dwoma punktami
  static getAngularDistance(angle1: number, angle2: number): number {
    const diff = Math.abs(angle1 - angle2);
    return Math.min(diff, 360 - diff);
  }

  // Sprawdzanie kolizji między planetami
  static checkPlanetCollision(
    planet1: Point,
    planet2: Point,
    threshold: number = 20
  ): boolean {
    const dx = planet2.x - planet1.x;
    const dy = planet2.y - planet1.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  }

  // Formatowanie pozycji planety
  static formatPlanetPosition(
    degrees: number,
    minutes: number,
    zodiacSign: string
  ): string {
    return `${zodiacSign} ${degrees}°${minutes}'`;
  }

  // Obliczanie optymalnej pozycji etykiety
  static calculateLabelPosition(
    angle: number,
    radius: number,
    labelWidth: number
  ): Point {
    const basePos = this.polarToCartesian(CENTER, CENTER, radius, angle);
    const quadrant = Math.floor(((angle + 90) % 360) / 90);
    
    // Dostosowanie pozycji w zależności od kwadrantu
    switch (quadrant) {
      case 0: // Prawy górny
        return { x: basePos.x + 10, y: basePos.y };
      case 1: // Lewy górny
        return { x: basePos.x - labelWidth - 10, y: basePos.y };
      case 2: // Lewy dolny
        return { x: basePos.x - labelWidth - 10, y: basePos.y };
      case 3: // Prawy dolny
        return { x: basePos.x + 10, y: basePos.y };
      default:
        return basePos;
    }
  }

  // Konwersja współrzędnych biegunowych na kartezjańskie
  static polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): Point {
    const angleInRadians = this.degreesToRadians(angleInDegrees);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  // Walidacja danych planet
  static validatePlanetData(planetData: PlanetData): boolean {
    return (
      typeof planetData['długość ekliptyczna'] === 'number' &&
      typeof planetData['znak_zodiaku'] === 'string' &&
      typeof planetData['dom'] === 'number'
    );
  }
}