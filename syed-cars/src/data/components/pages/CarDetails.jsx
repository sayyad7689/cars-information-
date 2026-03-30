import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CarCard from '../components/CarCard';
import carsData from '../data/cars';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cars() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ brands: [], bodyTypes: [], fuelTypes: [], priceRange: null });
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    if (brand) setFilters((p) => ({ ...p, brands: [brand] }));
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const filteredCars = useMemo(() => {
    let result = [...carsData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.bodyType.toLowerCase().includes(q) || c.fuelType.toLowerCase().includes(q)
      );
    }

    if (filters.brands?.length) result = result.filter((c) => filters.brands.includes(c.brand));
    if (filters.bodyTypes?.length) result = result.filter((c) => filters.bodyTypes.includes(c.bodyType));
    if (filters.fuelTypes?.length) result = result.filter((c) => filters.fuelTypes.some((f) => c.fuelType.includes(f)));
    if (filters.priceRange) result = result.filter((c) => c.price >= filters.priceRange.min && c.price <= filters.priceRange.max);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.year - a.year); break;
      default: result.sort((a, b) => b.views - a.views);
    }

    return result;
  },
