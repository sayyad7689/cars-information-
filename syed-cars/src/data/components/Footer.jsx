import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="glass-nav mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">S</div>
              <span className="text-xl font-bold"><span className="gradient-text">Syed</span> Cars</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Drive Your Dream with Syed Cars. India's premium online car marketplace.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Quick Links</h3>
            <div className="space-y-2">
              {[['/', 'Home'], ['/cars', 'All Cars'], ['/offers', 'Offers'], ['/compare', 'Compare']].map(([to, label]) => (
                <Link key={to} to={to} className="block text-sm text-white/50 hover:text-cyan-400 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Brands</h3>
            <div className="space-y-2">
              {['Maruti Suzuki', 'Hyundai', 'Tata', 'BMW', 'Mercedes-Benz'].map((b) => (
                <Link key={b} to={`/cars?brand=${b}`} className="block text-sm text-white/50 hover:text-cyan-400 transition-colors">{b}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:info@syedcars.com" className="flex items-center space-x-2 text-sm text-white/50 hover:text-cyan-400 transition-colors">
                <FiMail size={14} /> <span>info@syedcars.com</span>
              </a>
              <a href="tel:+911234567890" className="flex items-center space-x-2 text-sm text-white/50 hover:text-cyan-400 transition-colors">
                <FiPhone size={14} /> <span>+91 12345 67890</span>
              </a>
              <p className="flex items-center space-x-2 text-sm text-white/50">
                <FiMapPin size={14} /> <span>Hyderabad, India</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-white/30">
          © {new Date().getFullYear()} Syed Cars. All rights reserved. | Drive Your Dream 🚗
        </div>
      </div>
    </footer>
  );
}
