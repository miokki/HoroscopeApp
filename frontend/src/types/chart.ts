// types/chart.ts

// Typy aspektów astrologicznych
export type AspectType = 
  | 'koniunkcja'
  | 'opozycja'
  | 'trygon'
  | 'kwadratura'
  | 'sekstyl'
  | 'półsekstyl'
  | 'półkwadratura'
  | 'kwinkunks'
  | 'półtorakwadratura';

// Podstawowy interfejs punktu
export interface Point {
  x: number;
  y: number;
}

// Interfejs danych planety
export interface PlanetData {
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

// Interfejs pozycji domu
export interface HousePosition {
  pozycja: number;
  znak_zodiaku: string;
  stopnie: number;
  minuty: number;
}

// Interfejs dla danych planet na orbicie
export interface OrbitPlanetData {
  planet: string;
  position: number;
  isRetrograde?: boolean;
}

// Interfejs aspektu
export interface Aspect {
  planet1: string;
  planet2: string;
  aspekt: AspectType;
  dokładny_kąt: number;
  orb: number;
  typ: string;
}

// Interfejs kompletnych danych wykresu
export interface ChartData {
  planet_positions: Record<string, PlanetData>;
  house_positions: Record<number, HousePosition>;
  aspects: Aspect[];
  configurations?: Array<{
    typ: string;
    planety: string[];
    planeta_szczytowa?: string;
  }>;
  stelliums?: Array<string[]>;
}