import React from 'react';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as MercuryIcon } from '../../assets/icons/mercury.svg';
import { ReactComponent as VenusIcon } from '../../assets/icons/venus.svg';
import { ReactComponent as MarsIcon } from '../../assets/icons/mars.svg';
import { ReactComponent as JupiterIcon } from '../../assets/icons/jupiter.svg';
import { ReactComponent as SaturnIcon } from '../../assets/icons/saturn.svg';
import { ReactComponent as UranusIcon } from '../../assets/icons/uranus.svg';
import { ReactComponent as NeptuneIcon } from '../../assets/icons/neptune.svg';
import { ReactComponent as PlutoIcon } from '../../assets/icons/pluto.svg';
import { ReactComponent as DefaultIcon } from '../../assets/icons/default.svg'; // Import ikony domyślnej

// Mapowanie nazw planet na komponenty ikon
const planetIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Słońce': SunIcon,
  'Księżyc': MoonIcon,
  'Merkury': MercuryIcon,
  'Wenus': VenusIcon,
  'Mars': MarsIcon,
  'Jowisz': JupiterIcon,
  'Saturn': SaturnIcon,
  'Uran': UranusIcon,
  'Neptun': NeptuneIcon,
  'Pluton': PlutoIcon,
  // Dodaj inne obiekty, jeśli są dostępne
};

interface PlanetIconProps {
  planet: string;
  size?: number;
}

const PlanetIcon: React.FC<PlanetIconProps> = ({ planet, size = 24 }) => {
  const IconComponent = planetIconMap[planet] || DefaultIcon; // Użycie ikony domyślnej

  return <IconComponent width={size} height={size} />;
};

export default PlanetIcon;
