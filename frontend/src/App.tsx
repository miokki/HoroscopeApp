import React, { useState } from 'react';
import HoroscopeForm from './components/form/HoroscopeForm';
import HoroscopeChart from './components/chart/HoroscopeChart';
import MoonPhase from './components/chart/MoonPhase';

interface FormData {
  date: string;
  time: string;
  location: string;
}

interface ChartData {
  data: {
    date: string;
    time: string;
    location: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  planet_positions: Record<string, any>;
  house_positions: Record<string, any>;
  aspects: Array<any>;
  configurations: Array<any>;
  stelliums: Array<Array<string>>;
}

function App() {
  const [result, setResult] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (error) {
      setError('Wystąpił błąd podczas obliczania horoskopu');
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Kalkulator Horoskopu
        </h1>
        
        <div className="max-w-xl mx-auto mb-12 bg-slate-800/50 p-6 rounded-lg shadow-lg">
          <HoroscopeForm onSubmit={handleSubmit} />
        </div>
        
        {loading && (
          <div className="text-center text-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            Obliczanie horoskopu...
          </div>
        )}
        
        {error && (
          <div className="mt-5 p-4 border border-red-500 rounded bg-red-900/50 text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kolumna 1: Dane podstawowe i faza Księżyca */}
              <div className="space-y-6">
                <div className="bg-slate-800/80 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                  <h2 className="text-xl font-semibold mb-4 text-yellow-400">Dane horoskopu</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium text-slate-300">Data:</span> {result.data.date}</p>
                    <p><span className="font-medium text-slate-300">Czas:</span> {result.data.time}</p>
                    <p><span className="font-medium text-slate-300">Miejsce:</span> {result.data.location}</p>
                    <p>
                      <span className="font-medium text-slate-300">Współrzędne:</span>{' '}
                      {result.data.coordinates.latitude.toFixed(4)}°N,{' '}
                      {result.data.coordinates.longitude.toFixed(4)}°E
                    </p>
                  </div>
                </div>

                {result.planet_positions.Księżyc?.faza && (
                  <MoonPhase phase={result.planet_positions.Księżyc.faza} />
                )}

                {result.stelliums && result.stelliums.length > 0 && (
                  <div className="bg-slate-800/80 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Stellia</h2>
                    <div className="space-y-3">
                      {result.stelliums.map((stellium, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <span className="text-sm text-slate-300">
                            {stellium.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Kolumna 2: Wykres horoskopu */}
              <div className="lg:col-span-2 bg-slate-800/80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <HoroscopeChart data={result} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;