// Wymiary wykresu
export const CHART_SIZE = 600;
export const CENTER = CHART_SIZE / 2;

// Promienie dla różnych elementów wykresu
export const RADIUS = {
  outer: CENTER - 40,  // zewnętrzny krąg
  zodiac: CENTER - 80, // pas zodiaku
  inner: CENTER - 120, // wewnętrzny krąg
  planets: CENTER - 160, // orbita planet
  tick: 5,  // wielkość znaczników stopni
};

// Kolory używane w wykresie
export const THEME_COLORS = {
  background: '#1a1a1a',
  primary: '#e6d5a7',    // główny kolor tekstu
  secondary: '#8b795e',  // drugorzędny kolor
  lines: '#2d2d2d',      // linie
  text: '#e6d5a7',       // kolor tekstu
};

// Kolory dla planet
export const PLANET_COLORS: Record<string, string> = {
  'Słońce': '#ffd700',      // złoty
  'Księżyc': '#c0c0c0',     // srebrny
  'Merkury': '#b6c2ff',     // jasnoniebieski
  'Wenus': '#ffb6c1',       // różowy
  'Mars': '#ff6b6b',        // czerwony
  'Jowisz': '#ffd77f',      // pomarańczowy
  'Saturn': '#d4af37',      // ciemnozłoty
  'Uran': '#7fffd4',        // turkusowy
  'Neptun': '#87ceeb',      // błękitny
  'Pluton': '#dda0dd',      // fioletowy
  'Węzeł Północny': '#32cd32',  // zielony
  'Węzeł Południowy': '#8b0000', // ciemnoczerwony
  'Chiron': '#ff4500',      // pomarańczowoczerwony
  'Ceres': '#90ee90'        // jasnozielony
};

// Typy aspektów
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

// Kolory dla aspektów
export const ASPECT_COLORS: Record<AspectType, string> = {
  'koniunkcja': '#e6d5a7',      // złotawy
  'opozycja': '#ff6b6b',        // czerwony
  'trygon': '#98fb98',          // zielony
  'kwadratura': '#ffd77f',      // pomarańczowy
  'sekstyl': '#b6c2ff',         // niebieski
  'półsekstyl': '#dda0dd',      // fioletowy
  'półkwadratura': '#ffb6c1',   // różowy
  'kwinkunks': '#7fffd4',       // turkusowy
  'półtorakwadratura': '#ff8c69' // koralowy
};

// Znaki zodiaku i ich symbole
export const ZODIAC_SIGNS = [
  { name: 'Baran', symbol: '♈' },
  { name: 'Byk', symbol: '♉' },
  { name: 'Bliźnięta', symbol: '♊' },
  { name: 'Rak', symbol: '♋' },
  { name: 'Lew', symbol: '♌' },
  { name: 'Panna', symbol: '♍' },
  { name: 'Waga', symbol: '♎' },
  { name: 'Skorpion', symbol: '♏' },
  { name: 'Strzelec', symbol: '♐' },
  { name: 'Koziorożec', symbol: '♑' },
  { name: 'Wodnik', symbol: '♒' },
  { name: 'Ryby', symbol: '♓' }
];