import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Please fill all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await signup(email, password, name);
      setOtpSent(true);
      toast.success('Account created! Verification email sent.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already registered' :
                  err.code === 'auth/weak-password' ? 'Password is too weak' : 'Signup failed';
      toast.error(msg);
    }
    setLoading(false);
  };

  if (otpSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✉️</div>
          <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
          <p className="text-white/50 mb-6">A verification email has been sent to <span className="text-cyan-400">{email}</span>. Please check your inbox.</p>
          <Link to="/" className="glass-button inline-block">Go to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-cyan-500/30">S</div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-white/50 text-sm mt-1">Join Syed Cars today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="glass-input pl-11" />
            </div>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="glass-input pl-11" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="glass-input pl-11 pr-11" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="glass-input pl-11" />
            </div>

            <button type="submit" disabled={loading} className="glass-button w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
