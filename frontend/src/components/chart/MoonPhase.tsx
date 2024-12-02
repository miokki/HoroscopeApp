import React from 'react';

interface MoonPhaseProps {
  phase: {
    phase: string;
    degrees: number;
  };
}

const MoonPhase: React.FC<MoonPhaseProps> = ({ phase }) => {
  // Określ kształt Księżyca na podstawie fazy
  const getMoonShape = () => {
    switch (phase.phase) {
      case 'Nów':
        return '🌑';
      case 'Przybywający sierp':
        return '🌒';
      case 'Pierwsza kwadra':
        return '🌓';
      case 'Przybywający garb':
        return '🌔';
      case 'Pełnia':
        return '🌕';
      case 'Ubywający garb':
        return '🌖';
      case 'Ostatnia kwadra':
        return '🌗';
      case 'Ubywający sierp':
        return '🌘';
      default:
        return '🌑';
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4 text-yellow-400">Faza Księżyca</h2>
      <div className="flex flex-col items-center gap-2">
        {/* Symbol fazy księżyca */}
        <span className="text-4xl mb-2 animate-float">
          {getMoonShape()}
        </span>
        
        {/* Nazwa fazy */}
        <span className="text-lg font-medium text-slate-200">
          {phase.phase}
        </span>
        
        {/* Stopnie od Słońca */}
        <span className="text-sm text-slate-400">
          {Math.round(phase.degrees)}° od Słońca
        </span>
        
        {/* Dodatkowe informacje o fazie */}
        <span className="text-xs text-slate-500 mt-2 text-center">
          {phase.degrees < 180 ? 'Księżyc przybywający' : 'Księżyc ubywający'}
        </span>
      </div>
    </div>
  );
};

// Dodaj animację unoszenia się do tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-10px)' },
//         }
//       },
//       animation: {
//         float: 'float 3s ease-in-out infinite',
//       },
//     },
//   },
// }

export default MoonPhase;