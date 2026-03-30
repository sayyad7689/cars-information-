import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiZap } from 'react-icons/fi';
import { formatPrice } from '../data/cars';
import { useAuth } from '../AuthContext';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function CarCard({ car, index = 0 }) {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'wishlists', `${user.uid}_${car.id}`)).then((snap) => {
        setWishlisted(snap.exists());
      });
    }
  }, [user, car.id]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error('Please login first'); return; }
    const ref = doc(db, 'wishlists', `${user.uid}_${car.id}`);
    if (wishlisted) {
      await deleteDoc(ref);
      setWishlisted(false);
      toast.success('Removed from wishlist');
    } else {
      await setDoc(ref, { userId: user.uid, carId: car.id, addedAt: new Date().toISOString() });
      setWishlisted(true);
      toast.success('Added to wishlist');
    }
  };

  const addToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const existing = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (existing.find((c) => c.id === car.id)) {
      toast.error('Already in compare list');
      return;
    }
    if (existing.length >= 3) {
      toast.error('Max 3 cars can be compared');
      return;
    }
    existing.push(car);
    localStorage.setItem('compareList', JSON.stringify(existing));
    toast.success('Added to compare');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/car/${car.id}`} className="block glass-card overflow-hidden group">
        <div className="relative overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 sm:h-52 object-cover car-image-hover"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {car.isElectric && (
              <span className="px-2 py-1 bg-emerald-500/80 backdrop-blur-sm text-xs font-semibold rounded-lg flex items-center gap-1">
                <FiZap size={12} /> EV
              </span>
            )}
            <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-xs font-medium rounded-lg">{car.bodyType}</span>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={toggleWishlist} className={`p-2 rounded-full backdrop-blur-sm transition-all ${wishlisted ? 'bg-rose-500/80 text-white' : 'bg-black/40 text-white/70 hover:text-white'}`}>
              <FiHeart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="absolute bottom-3 right-3">
            <button onClick={addToCompare} className="px-2 py-1 bg-black/40 backdrop-blur-sm text-xs font-medium rounded-lg hover:bg-cyan-500/60 transition-all">
              + Compare
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-cyan-400 font-medium">{car.brand}</p>
              <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{car.name}</h3>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              <FiStar size={14} fill="currentColor" /> {car.rating}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-white/60">{car.fuelType}</span>
            <span className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-white/60">{car.transmission.split('/')[0].trim()}</span>
            <span className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-white/60">{car.mileage}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold gradient-text">{formatPrice(car.price)}</p>
            <span className="text-xs text-white/40">onwards</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
