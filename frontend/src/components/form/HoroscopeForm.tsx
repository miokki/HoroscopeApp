import React, { useState } from 'react';
import LocationInput from './LocationInput';

interface FormData {
  date: string;
  time: string;
  location: string;
}

interface HoroscopeFormProps {
  onSubmit: (data: FormData) => void;
}

function HoroscopeForm({ onSubmit }: HoroscopeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      location: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-200">
          Data urodzenia
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 w-full p-3 bg-slate-800 border border-slate-600 rounded-lg 
                     text-slate-100 focus:outline-none focus:border-violet-500 
                     focus:ring-1 focus:ring-violet-500 transition-all duration-200"
            required
          />
        </label>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-200">
          Godzina urodzenia
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 w-full p-3 bg-slate-800 border border-slate-600 rounded-lg 
                     text-slate-100 focus:outline-none focus:border-violet-500 
                     focus:ring-1 focus:ring-violet-500 transition-all duration-200"
            required
          />
        </label>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-200">
          Miejsce urodzenia
          <div className="mt-1">
            <LocationInput
              value={formData.location}
              onChange={handleLocationChange}
            />
          </div>
        </label>
      </div>

      <button 
        type="submit"
        className="w-full p-3 bg-gradient-to-r from-violet-500 to-purple-600 
                 text-white font-medium rounded-lg shadow-lg 
                 hover:shadow-xl transition-all duration-300
                 hover:from-violet-600 hover:to-purple-700 
                 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 
                 focus:ring-offset-slate-900"
      >
        Oblicz horoskop
      </button>
    </form>
  );
}

export default HoroscopeForm;