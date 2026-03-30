import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Enter your email'); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Reset email sent!');
    } catch {
      toast.error('Failed to send reset email');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-white/50 mb-6">Password reset link sent to <span className="text-cyan-400">{email}</span></p>
              <Link to="/login" className="glass-button inline-flex items-center gap-2">
                <FiArrowLeft /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Forgot Password?</h1>
                <p className="text-white/50 text-sm mt-1">Enter your email to reset your password</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="glass-input pl-11" />
                </div>
                <button type="submit" disabled={loading} className="glass-button w-full disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <p className="text-center text-sm text-white/50 mt-6">
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1">
                  <FiArrowLeft size={14} /> Back to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
