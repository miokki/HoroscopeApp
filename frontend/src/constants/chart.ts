// constants/chart.ts
export const CHART_SIZE = 800;
export const CENTER = CHART_SIZE / 2;

export const RADIUS = {
  outer: CENTER - 50,
  zodiac: CENTER - 90,
  inner: CENTER - 130,
  planets: CENTER - 170,
  tick: 6,
};

export const THEME_COLORS = {
  background: '#0a0a0a',
  primary: '#e6d5a7',
  secondary: '#8b795e',
};

export const ASPECT_COLORS = {
  koniunkcja: '#ffd700',
  opozycja: '#ff4444',
  trygon: '#44ff44',
  kwadratura: '#4444ff',
  sekstyl: '#44ffff',
  półsekstyl: '#ffff44',
  półkwadratura: '#ff44ff',
  kwinkunks: '#ff8844',
  półtorakwadratura: '#88ff44'
};

export const PLANET_COLORS = {
  'Słońce': '#FFD700',
  'Księżyc': '#C0C0C0',
  'Merkury': '#B87333',
  'Wenus': '#90EE90',
  'Mars': '#FF4500',
  'Jowisz': '#4169E1',
  'Saturn': '#BDB76B',
  'Uran': '#40E0D0',
  'Neptun': '#1E90FF',
  'Pluton': '#800080',
};

export const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Baran' },
  { symbol: '♉', name: 'Byk' },
  { symbol: '♊', name: 'Bliźnięta' },
  { symbol: '♋', name: 'Rak' },
  { symbol: '♌', name: 'Lew' },
  { symbol: '♍', name: 'Panna' },
  { symbol: '♎', name: 'Waga' },
  { symbol: '♏', name: 'Skorpion' },
  { symbol: '♐', name: 'Strzelec' },
  { symbol: '♑', name: 'Koziorożec' },
  { symbol: '♒', name: 'Wodnik' },
  { symbol: '♓', name: 'Ryby' }
];

export type AspectType = keyof typeof ASPECT_COLORS;