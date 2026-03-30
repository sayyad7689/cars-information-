import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Booking from './pages/Booking';
import Compare from './pages/Compare';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/booking/:carId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}
