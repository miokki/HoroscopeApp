import { CENTER } from '../constants/chart';

interface Point {
  x: number;
  y: number;
}

/**
 * Konwertuje współrzędne biegunowe na kartezjańskie
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

/**
 * Oblicza dystans między dwoma punktami
 */
export function getDistance(point1: Point, point2: Point): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Sprawdza kolizje między punktami
 */
export function checkCollision(
  point1: Point,
  point2: Point,
  threshold: number
): boolean {
  return getDistance(point1, point2) < threshold;
}

/**
 * Optymalizuje pozycję punktu względem innych
 */
export function optimizePosition(
  point: Point,
  otherPoints: Point[],
  radius: number,
  angleInDegrees: number
): Point {
  const threshold = 30;
  const searchRadius = 20;
  const angleStep = 2;
  const radiusStep = 5;
  
  let bestPosition = point;
  let maxDistance = 0;

  // Zoptymalizowana pętla przeszukiwania
  for (let r = radius - searchRadius; r <= radius + searchRadius; r += radiusStep) {
    for (let angle = angleInDegrees - 10; angle <= angleInDegrees + 10; angle += angleStep) {
      const testPoint = polarToCartesian(CENTER, CENTER, r, angle);
      let minDistance = Math.min(...otherPoints.map(p => getDistance(testPoint, p)));

      if (minDistance > maxDistance) {
        maxDistance = minDistance;
        bestPosition = testPoint;
      }

      if (maxDistance >= threshold) {
        return bestPosition;
      }
    }
  }

  return bestPosition;
}