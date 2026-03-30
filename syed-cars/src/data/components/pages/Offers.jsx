import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc, setDoc, query, orderBy, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGift, FaPercent, FaTag, FaClock, FaCopy, FaCheck, FaCar, FaFire, FaStar, FaBolt, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [claimedOffers, setClaimedOffers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Offers', icon: <FaGift /> },
    { id: 'cashback', label: 'Cashback', icon: <FaPercent /> },
    { id: 'discount', label: 'Discounts', icon: <FaTag /> },
    { id: 'accessory', label: 'Free Accessories', icon: <FaCar /> },
    { id: 'festival', label: 'Festival Special', icon: <FaStar /> },
    { id: 'flash', label: 'Flash Deals', icon: <FaBolt /> },
  ];

  const defaultOffers = [
    {
      id: 'offer1',
      title: 'Mega Cashback Offer',
      description: 'Get up to ₹1,50,000 cashback on booking any SUV. Limited time offer for premium SUV buyers.',
      category: 'cashback',
      discount: '₹1,50,000',
      discountType: 'cashback',
      code: 'SYEDSUV150',
      validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      minBooking: '₹10,00,000',
      applicableBrands: ['Tata', 'Mahindra', 'Hyundai', 'Kia'],
      termsAndConditions: [
        'Valid on SUV segment only',
        'Minimum booking amount ₹10,00,000',
        'Cashback credited within 30 days of delivery',
        'Cannot be combined with other offers',
        'Valid for first-time buyers only'
      ],
      featured: true,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGlow: 'rgba(239, 68, 68, 0.3)',
      maxClaims: 500,
      currentClaims: 342,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800'
    },
    {
      id: 'offer2',
      title: 'Festival Season Discount',
      description: 'Celebrate the festive season with exclusive discounts up to 15% on selected sedan models.',
      category: 'festival',
      discount: '15%',
      discountType: 'percentage',
      code: 'SYEDFEST15',
      validTill: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      minBooking: '₹5,00,000',
      applicableBrands: ['Maruti Suzuki', 'Honda', 'Toyota', 'Hyundai'],
      termsAndConditions: [
        'Valid on sedan segment only',
        'Maximum discount capped at ₹2,00,000',
        'Valid during festival season',
        'One offer per customer'
      ],
      featured: true,
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      bgGlow: 'rgba(139, 92, 246, 0.3)',
      maxClaims: 1000,
      currentClaims: 567,
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800'
    },
    {
      id: 'offer3',
      title: 'Free Premium Accessories Kit',
      description: 'Book any car above ₹8 Lakhs and get premium accessories worth ₹50,000 absolutely free!',
      category: 'accessory',
      discount: '₹50,000',
      discountType: 'freebie',
      code: 'SYEDACC50',
      validTill: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      minBooking: 
