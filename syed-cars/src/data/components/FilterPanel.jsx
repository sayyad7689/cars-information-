import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { brands, bodyTypes, fuelTypes } from '../data/cars';

export default function FilterPanel({ filters, setFilters, onClear }) {
  const [open, setOpen] = useState({ brand: true, body: true, fuel: true, price: true });

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const priceRanges = [
    { label: 'Under ₹5L', min: 0, max: 500000 },
    { label: '₹5L - ₹10L', min: 500000, max: 1000000 },
    { label: '₹10L - ₹20L', min: 1000000, max: 2000000 },
    { label: '₹20L - ₹50L', min: 2000000, max: 5000000 },
    { label: 'Above ₹50L', min: 5000000, max: Infinity },
  ];

  const activeCount = (filters.brands?.length || 0) + (filters.bodyTypes?.length || 0) + (filters.fuelTypes?.length || 0) + (filters.priceRange ? 1 : 0);

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <FiX size={14} /> Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* Brand */}
      <div>
        <button onClick={() => toggle('brand')} className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white/80">
          Brand <FiChevronDown className={`transition-transform ${open.brand ? 'rotate-180' : ''}`} />
        </button>
        {open.brand && (
          <div className="space-y-1 mt-1 max-h-40 overflow-y-auto">
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm text-white/60 hover:text-white cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(b) || false}
                  onChange={() => toggleFilter('brands', b)}
                  className="rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400/30"
                />
                {b}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Body Type */}
      <div>
        <button onClick={() => toggle('body')} className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white/80">
          Body Type <FiChevronDown className={`transition-transform ${open.body ? 'rotate-180' : ''}`} />
        </button>
        {open.body && (
          <div className="flex flex-wrap gap-2 mt-1">
            {bodyTypes.map((t) => (
              <button
                key={t}
                onClick={() => toggleFilter('bodyTypes', t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.bodyTypes?.includes(t) ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <div>
        <button onClick={() => toggle('fuel')} className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white/80">
          Fuel Type <FiChevronDown className={`transition-transform ${open.fuel ? 'rotate-180' : ''}`} />
        </button>
        {open.fuel && (
          <div className="flex flex-wrap gap-2 mt-1">
            {fuelTypes.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter('fuelTypes', f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.fuelTypes?.includes(f) ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button onClick={() => toggle('price')} className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white/80">
          Price Range <FiChevronDown className={`transition-transform ${open.price ? 'rotate-180' : ''}`} />
        </button>
        {open.price && (
          <div className="space-y-1 mt-1">
            {priceRanges.map((r) => (
              <label key={r.label} className="flex items-center gap-2 text-sm text-white/60 hover:text-white cursor-pointer py-1">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.label === r.label}
                  onChange={() => setFilters((prev) => ({ ...prev, priceRange: r }))}
                  className="text-cyan-400 focus:ring-cyan-400/30"
                />
                {r.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
