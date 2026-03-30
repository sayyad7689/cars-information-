import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import carsData, { formatPrice } from '../data/cars';

const getResponse = (msg) => {
  const lower = msg.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return 'Hello! 👋 Welcome to Syed Cars! I can help you find your dream car. Ask me about any brand, price, or type!';

  if (lower.includes('cheapest') || lower.includes('budget') || lower.includes('affordable')) {
    const cheapest = [...carsData].sort((a, b) => a.price - b.price)[0];
    return `The most affordable car is the ${cheapest.brand} ${cheapest.name} starting at ${formatPrice(cheapest.price)}! 🚗`;
  }

  if (lower.includes('expensive') || lower.includes('luxury') || lower.includes('premium')) {
    const expensive = [...carsData].sort((a, b) => b.price - a.price)[0];
    return `The most premium car is the ${expensive.brand} ${expensive.name} at ${formatPrice(expensive.price)}! ✨`;
  }

  if (lower.includes('electric') || lower.includes('ev')) {
    const evs = carsData.filter((c) => c.isElectric);
    return `We have ${evs.length} electric vehicles: ${evs.map((c) => `${c.brand} ${c.name}`).join(', ')}. ⚡`;
  }

  if (lower.includes('suv')) {
    const suvs = carsData.filter((c) => c.bodyType === 'SUV');
    return `We have ${suvs.length} SUVs! Popular picks: ${suvs.slice(0, 4).map((c) => c.name).join(', ')}. 🏔️`;
  }

  if (lower.includes('sedan')) {
    const sedans = carsData.filter((c) => c.bodyType === 'Sedan');
    return `We have ${sedans.length} sedans: ${sedans.map((c) => `${c.brand} ${c.name}`).join(', ')}. 🚘`;
  }

  if (lower.includes('emi') || lower.includes('loan') || lower.includes('finance'))
    return 'We offer EMI options from 12 to 84 months at rates starting 8.5%! Check the EMI calculator on any car page. 💰';

  if (lower.includes('offer') || lower.includes('discount'))
    return 'We have amazing offers! Up to ₹2L off on SUVs, 0% EMI on luxury cars, and free accessories. Check our Offers page! 🎉';

  if (lower.includes('book') || lower.includes('buy'))
    return 'To book a car: Browse → Select → Book → Pay! You can pay via UPI, Card, or EMI. 📝';

  const brand = carsData.find((c) => lower.includes(c.brand.toLowerCase()) || lower.includes(c.name.toLowerCase()));
  if (brand)
    return `${brand.brand} ${brand.name}: Starting at ${formatPrice(brand.price)}. ${brand.engine}, ${brand.power}, ${brand.mileage}. Rating: ⭐${brand.rating}. ${brand.description}`;

  return "I can help with car recommendations, prices, EMI info, offers, and more! Try asking about a specific brand or type. 🚗";
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm Syed Cars AI Assistant. How can I help you find your dream car?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(userMsg), isBot: true }]);
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 z-50 glass rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '70vh' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">AI</div>
                <div>
                  <p className="text-sm font-semibold">Syed Cars Assistant</p>
                  <p className="text-xs text-emerald-400">● Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/5 rounded-lg">
                <FiX size={18} />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '50vh' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.isBot
                      ? 'bg-white/5 border border-white/10 rounded-tl-md'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 rounded-tr-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cars..."
                className="flex-1 glass-input text-sm py-2"
              />
              <button type="submit" className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:shadow-lg transition-all">
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 transition-all"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>
    </>
  );
}
