// ChartErrors.tsx
import React from 'react';
import { THEME_COLORS } from '../../constants/chart';

interface ChartError {
  type: 'error' | 'warning';
  message: string;
  details?: string;
  code?: string;
}

interface ChartErrorsProps {
  errors: ChartError[];
  onDismiss?: (index: number) => void;
}

const ChartErrors: React.FC<ChartErrorsProps> = ({
  errors,
  onDismiss
}) => {
  if (errors.length === 0) return null;

  return (
    <div className="chart-errors fixed bottom-4 right-4 z-50 max-w-md space-y-2">
      {errors.map((error, index) => (
        <div
          key={`${error.type}-${index}`}
          className={`
            flex items-start gap-3 p-4 rounded-lg shadow-lg
            backdrop-blur-md transition-all duration-300
            ${error.type === 'error' ? 'bg-red-900/90' : 'bg-amber-900/90'}
          `}
        >
          {/* Ikona statusu */}
          <div className={`
            flex-shrink-0 w-5 h-5 mt-0.5
            ${error.type === 'error' ? 'text-red-400' : 'text-amber-400'}
          `}>
            {error.type === 'error' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            )}
          </div>

          {/* Treść błędu */}
          <div className="flex-1">
            <div className="font-medium text-white">
              {error.message}
            </div>
            {error.details && (
              <div className="mt-1 text-sm opacity-80">
                {error.details}
              </div>
            )}
            {error.code && (
              <div className="mt-2 p-2 rounded bg-black/20 font-mono text-xs">
                {error.code}
              </div>
            )}
          </div>

          {/* Przycisk zamknięcia */}
          {onDismiss && (
            <button
              onClick={() => onDismiss(index)}
              className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChartErrors;