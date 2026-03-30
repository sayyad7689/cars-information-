import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiMenu, FiX, FiUser, FiHeart, FiGrid, FiLogOut, FiSettings, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowProfile(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cars', label: 'Cars' },
    { path: '/offers', label: 'Offers' },
    { path: '/compare', label: 'Compare' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
              S
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Syed</span> Cars
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white/10 text-cyan-400 border border-cyan-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/cars" className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <FiSearch size={20} />
            </Link>
            {user ? (
              <>
                <Link to="/wishlist" className="p-2 text-white/60 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-all">
                  <FiHeart size={20} />
                </Link>
                <Link to="/dashboard" className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <FiGrid size={20} />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </button>
                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 shadow-2xl"
                      >
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <p className="text-sm font-semibold">{user.displayName}</p>
                          <p className="text-xs text-white/50">{user.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setShowProfile(false)} className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                          <FiUser size={16} /> <span>Profile</span>
                        </Link>
                        <Link to="/dashboard" onClick={() => setShowProfile(false)} className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                          <FiGrid size={16} /> <span>Dashboard</span>
                        </Link>
                        {userData?.isAdmin && (
                          <Link to="/admin" onClick={() => setShowProfile(false)} className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            <FiSettings size={16} /> <span>Admin Panel</span>
                          </Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center space-x-2 px-3 py-2 text-sm text-rose-400 hover:bg-white/5 rounded-xl transition-all w-full">
                          <FiLogOut size={16} /> <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link to="/login" className="glass-button text-sm px-5 py-2.5">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white/70 hover:text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-white/10 text-cyan-400'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5">❤️ Wishlist</Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5">📊 Dashboard</Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5">👤 Profile</Link>
                  {userData?.isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5">⚙️ Admin</Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-white/5">
                    🚪 Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 glass-button text-center text-sm mt-2">
                  Login / Signup
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
