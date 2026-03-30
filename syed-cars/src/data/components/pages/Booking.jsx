import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, Smartphone, Building2, Calendar,
  CheckCircle, Car, IndianRupee, ArrowLeft, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../hooks/useFirestore';
import { carsData, formatPrice } from '../data/cars';
import toast from 'react-hot-toast';

export default function Booking() {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const car = location.state?.car || carsData.find((c) => c.id === carId);
  const variant = location.state?.variant || car?.variants?.[0];
  const color = location.state?.color || car?.colors?.[0];

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    city: '',
    address: '',
  });

  if (!car) {
    navigate('/cars');
    return null;
  }

  const bookingAmount = 11000;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!formData.phone || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      const id = await createBooking({
        userId: currentUser.uid,
        carId: car.id,
        carName: car.name,
        variant: variant.name,
        variantPrice: variant.price,
        color,
        bookingAmount,
        paymentMethod,
        customerDetails: formData,
      });
      setBookingId(id);
      setStep(3);
      toast.success('Booking confirmed! 🎉');
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-indigo-500 text-white' : 'glass text-slate-400'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 sm:w-24 h-0.5 transition-all ${step > s ? 'bg-indigo-500' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card">
                <h2 className="text-xl font-bold mb-6">Personal Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Full Name *</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="glass-input"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="glass-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Phone *</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="glass-input"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">City *</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      className="glass-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your full address"
                      rows={3}
                      className="glass-input resize-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!formData.fullName || !formData.email 
