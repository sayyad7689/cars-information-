import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Car, Heart, Bell, User,
  Calendar, MapPin, Package, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserBookings } from '../hooks/useFirestore';
import { formatPrice } from '../data/cars';

export default function Dashboard() {
  const { currentUser, userData } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      getUserBookings(currentUser.uid)
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [currentUser]);

  const quickActions = [
    { icon: Car, label: 'Browse Cars', path: '/cars', color: 'from-blue-500 to-indigo-500' },
    { icon: Heart, label: 'My Wishlist', path: '/wishlist', color: 'from-pink-500 to-red-500' },
    { icon: User, label: 'My Profile', path: '/profile', color: 'from-green-500 to-emerald-500' },
    { icon: MapPin, label: 'Find Dealers', path: '/dealers', color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {currentUser?.displayName?.split(' ')[0]}!</h1>
                <p className="text-sm text-slate-400">{currentUser?.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="glass rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-indigo-300">{bookings.length}</p>
                <p className="text-xs text-slate-400">Bookings</p>
              </div>
              <div className="glass rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-pink-300">{userData?.wishlist?.length || 0}</p>
                <p className="text-xs text-slate-400">Wishlist</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(action.path)}
              className="glass-card text-center group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">{action.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Bookings */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-400" /> My Bookings
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Car className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{booking.carName}</p>
                      <p className="text-xs text-slate-400">
                        {booking.variant} • {booking.color}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Booking ID: <span className="font-mono text-indigo-300">{booking.bookingId}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(booking.bookingAmount)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">No Bookings Yet</h3>
              <p className="text-slate-400 mb-4">Start your car buying journey today!</p>
              <button onClick={() => navigate('/cars')} className="glass-button text-white">
                Browse Cars
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
