import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMic, FiX } from 'react-icons/fi';
import carsData from '../data/cars';
import toast from 'react-hot-toast';

export default function SearchBar({ onSearch, className = '' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      const filtered = carsData.filter(
        (c) =>
          c.name.toLowerCase().includes(val.toLowerCase()) ||
          c.brand.toLowerCase().includes(val.toLowerCase()) ||
          c.bodyType.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cars?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      onSearch?.(query);
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice search not supported');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleChange(transcript);
      setQuery(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice search failed');
    };
    recognition.start();
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search cars, brands, body type..."
          className="glass-input pl-12 pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button type="button" onClick={() => { setQuery(''); setSuggestions([]); }} className="p-1.5 text-white/40 hover:text-white">
              <FiX size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`p-1.5 rounded-lg transition-all ${isListening ? 'text-rose-400 bg-rose-400/10 animate-pulse' : 'text-white/40 hover:text-white'}`}
          >
            <FiMic size={16} />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden shadow-2xl z-50">
          {suggestions.map((car) => (
            <button
              key={car.id}
              onClick={() => {
                navigate(`/car/${car.id}`);
                setShowSuggestions(false);
                setQuery('');
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-all text-left"
            >
              <img src={car.image} alt={car.name} className="w-12 h-8 object-cover rounded-lg" />
              <div>
                <p className="text-sm font-medium">{car.brand} {car.name}</p>
                <p className="text-xs text-white/50">{car.bodyType} • {car.fuelType}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
