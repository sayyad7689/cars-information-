import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiGift, FiStar, FiZap, FiShield, FiDollarSign } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import CarCard from '../components/CarCard';
import carsData, { offersData, formatPrice } from '../data/cars';

export default function Home() {
  const trendingCars = [...carsData].sort((a, b) => b.views - a.views).slice(0, 8);
  const featuredCars = [...carsData].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const evCars = carsData.filter((c) => c.isElectric);
  const popularBrands = [...new Set(carsData.map((c) => c.brand))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-cyan-400 mb-6">
              🚗 India's Premium Car Marketplace
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Drive Your <span className="gradient-text">Dream</span>
              <br />with Syed Cars
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10">
              Explore 30+ brands, compare specs, calculate EMI, and book your dream car — all in one place.
            </p>
            <SearchBar className="max-w-2xl mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cars" className="glass-button flex items-center gap-2">
                Explore Cars <FiArrowRight />
              </Link>
              <Link to="/offers" className="glass-button-outline flex items-center gap-2">
                View Offers <FiGift />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { icon: '🚘', label: `${carsData.length}+ Cars`, sub: 'Available' },
              { icon: '🏢', label: `${popularBrands.length}+ Brands`, sub: 'Worldwide' },
              { icon: '⭐', label: '4.8 Rating', sub: 'User Reviews' },
              { icon: '🎉', label: `${offersData.length} Offers`, sub: 'Live Now' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="font-bold text-lg">{stat.label}</p>
                <p className="text-xs text-white/50">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="section-title">Popular Brands</h2>
              <p className="text-white/50 text-sm">Browse cars by your favorite brand</p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {popularBrands.map((brand) => (
              <Link
                key={brand}
                to={`/cars?brand=${brand}`}
                className="glass-card p-4 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl flex items-center justify-center text-lg font-bold group-hover:from-cyan-400/40 group-hover:to-blue-600/40 transition-all">
                  {brand[0]}
                </div>
                <p className="text-xs font-medium text-white/70 group-hover:text-white truncate">{brand}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Cars */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="section-title flex items-center gap-2"><FiTrendingUp /> Trending Cars</h2>
              <p className="text-white/50 text-sm">Most viewed and booked cars</p>
            </div>
            <Link to="/cars" className="glass-button-outline text-sm px-4 py-2 flex items-center gap-1">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="section-title flex items-center gap-2"><FiGift /> Offers & Gifts</h2>
              <p className="text-white/50 text-sm">Exclusive deals and discounts</p>
            </div>
            <Link to="/offers" className="glass-button-outline text-sm px-4 py-2">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {offersData.slice(0, 3).map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover car-image-hover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-bold rounded-full">
                    {offer.discount}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{offer.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <code className="text-xs bg-white/5 px-2 py-1 rounded font-mono text-cyan-400">{offer.code}</code>
                    <span className="text-xs text-white/40">Till {offer.validTill}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Top Rated */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="section-title flex items-center gap-2"><FiStar /> Top Rated Cars</h2>
              <p className="text-white/50 text-sm">Highest rated by our community</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Electric Vehicles */}
      {evCars.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="section-title flex items-center gap-2"><FiZap /> Electric Vehicles</h2>
                <p className="text-white/50 text-sm">Go green with zero-emission cars</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {evCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Syed Cars */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title mb-12">Why Choose Syed Cars?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiShield size={28} />, title: 'Trusted Platform', desc: 'Verified dealers and authentic listings' },
              { icon: <FiDollarSign size={28} />, title: 'Best Prices', desc: 'Transparent pricing with no hidden charges' },
              { icon: <FiStar size={28} />, title: 'AI Powered', desc: 'Smart recommendations tailored for you' },
              { icon: <FiZap size={28} />, title: 'Instant Booking', desc: 'Book your dream car in minutes' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Drive Your Dream?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">Join thousands of happy car owners who found their perfect ride with Syed Cars.</p>
            <Link to="/cars" className="glass-button inline-flex items-center gap-2 text-lg px-8 py-4">
              Start Exploring <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
