import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toggleWishlist } from '../hooks/useFirestore';
import { carsData, formatPrice } from '../data/cars';
import CarCard from '../components/CarCard';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { currentUser } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), (snapshot) => {
        if (snapshot.exists()) {
          setWishlistIds(snapshot.data().wishlist || []);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser
