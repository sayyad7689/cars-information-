import { useState } from 'react';
import { calculateEMI, formatPrice } from '../data/cars';

export default function EMICalculator({ carPrice = 1000000 }) {
  const [principal, setPrincipal] = useState(carPrice * 0.8);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(60);

  const emi = calculateEMI(principal, rate, tenure);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - principal;

  return (
    <div className="glass rounded-2xl p-6 space-y-5">
      <h3 className="text-xl font-bold gradient-text">EMI Calculator</h3>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Loan Amount</span>
          <span className="font-semibold">{formatPrice(principal)}</span>
        </div>
        <input type="range" min={100000} max={carPrice} step={50000} value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Interest Rate</span>
          <span className="font-semibold">{rate}%</span>
        </div>
        <input type="range" min={5} max={18} step={0.1} value={rate}
          onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Tenure</span>
          <span className="font-semibold">{tenure} months</span>
        </div>
        <input type="range" min={12} max={84} step={6} value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
        <div className="text-center">
          <p className="text-xs text-white/50 mb-1">Monthly EMI</p>
          <p className="text-lg font-bold text-cyan-400">{formatPrice(emi)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-white/50 mb-1">Total Interest</p>
          <p className="text-lg font-bold text-amber-400">{formatPrice(totalInterest)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-white/50 mb-1">Total Amount</p>
          <p className="text-lg font-bold text-emerald-400">{formatPrice(totalPayment)}</p>
        </div>
      </div>
    </div>
  );
}
