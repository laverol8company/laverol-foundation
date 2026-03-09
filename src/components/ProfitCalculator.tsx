import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, AlertTriangle, Users, Bot, DollarSign } from "lucide-react";

interface ProfitCalculatorProps {
  t: any;
}

function useAnimatedCounter(target: number, duration: number = 400) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    const startValue = prevTarget.current;
    const diff = target - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startValue + diff * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevTarget.current = target;
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

export function ProfitCalculator({ t }: ProfitCalculatorProps) {
  const [mode, setMode] = useState<'Sale' | 'Rent'>('Sale');
  const [currency, setCurrency] = useState<'$' | '₴'>('$');
  const [leads, setLeads] = useState(50);
  const [price, setPrice] = useState(5000);
  const [conv, setConv] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [tickerOffset, setTickerOffset] = useState(0);

  const UAH_RATE = 41;

  // Update defaults when mode changes
  useEffect(() => {
    if (mode === 'Sale') {
      setPrice(currency === '$' ? 5000 : 5000 * UAH_RATE);
    } else {
      setPrice(currency === '$' ? 600 : 600 * UAH_RATE);
    }
  }, [mode]);

  // Update prices when currency changes
  useEffect(() => {
    if (currency === '$') {
      setPrice(prev => Math.round(prev / UAH_RATE));
    } else {
      setPrice(prev => prev * UAH_RATE);
    }
  }, [currency]);

  // Mouse tracking for spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Calculations
  const basePrice = currency === '$' ? price : price / UAH_RATE;
  const nightLossRate = mode === 'Sale' ? 0.3 : 0.4;
  const tierMult = mode === 'Sale' ? 1.3 : 1.5;
  const commissionRate = mode === 'Sale' ? 1 : 0.5;
  
  const nightLoss = Math.round((leads * nightLossRate) * (conv / 100) * basePrice * commissionRate);
  const savedDeals = Math.ceil(leads * nightLossRate * (conv / 100));
  const netGain = Math.round(savedDeals * basePrice * commissionRate * tierMult);
  const tierPrice = 2299;
  const roi = tierPrice > 0 ? Math.max(0, (netGain / tierPrice)).toFixed(1) : "0";

  // Apply currency conversion
  const displayNetGain = currency === '$' ? netGain : netGain * UAH_RATE;
  const displayNightLoss = currency === '$' ? nightLoss : nightLoss * UAH_RATE;

  // Animated values
  const animatedNetGain = useAnimatedCounter(displayNetGain);
  const animatedNightLoss = useAnimatedCounter(displayNightLoss);
  const animatedSavedDeals = useAnimatedCounter(savedDeals);

  const formatCurrency = (val: number) => {
    const symbol = currency;
    if (val >= 1000000) return `${symbol}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${symbol}${new Intl.NumberFormat('en-US').format(val)}`;
    return `${symbol}${val}`;
  };

  const tickerMessages = [
    "Laverol рятує ліда в Insta Direct (00:05)",
    "Запис на перегляд подобово (03:15)",
    "Дані синхронізовано в amoCRM",
    "Брокер отримав сповіщення",
    "Нічний лід кваліфіковано автоматично"
  ];

  const priceMin = mode === 'Sale' ? (currency === '$' ? 500 : 20000) : (currency === '$' ? 200 : 8000);
  const priceMax = mode === 'Sale' ? (currency === '$' ? 20000 : 820000) : (currency === '$' ? 3000 : 123000);
  const priceStep = mode === 'Sale' ? (currency === '$' ? 100 : 4100) : (currency === '$' ? 50 : 2050);

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative bg-zinc-950/50 border-t border-white/5 overflow-hidden"
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.08), transparent 40%)`
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-400 text-center text-lg mb-12 max-w-2xl mx-auto">{t.calculator.sub}</p>

        {/* Top Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {/* Sale / Rent Toggle */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1">
            <button
              onClick={() => setMode('Sale')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                mode === 'Sale'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calculator.sale}
            </button>
            <button
              onClick={() => setMode('Rent')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                mode === 'Rent'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calculator.rent}
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 flex">
            <button
              onClick={() => setCurrency('$')}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                currency === '$'
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency('₴')}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                currency === '₴'
                  ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              ₴
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-8 transition-all duration-300 hover:border-cyan-500/30">
            
            {/* Leads Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {t.calculator.leads}
                </label>
                <span className="text-cyan-400 font-bold text-lg">{leads} {t.calculator.perMonth}</span>
              </div>
              <Slider
                value={[leads]}
                onValueChange={(v) => setLeads(v[0])}
                min={5}
                max={1000}
                step={5}
                className="w-full"
              />
            </div>

            {/* Price Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  {mode === 'Sale' ? t.calculator.comm : t.calculator.rentPrice}
                </label>
                <span className="text-cyan-400 font-bold text-lg">{formatCurrency(price)}</span>
              </div>
              <Slider
                value={[price]}
                onValueChange={(v) => setPrice(v[0])}
                min={priceMin}
                max={priceMax}
                step={priceStep}
                className="w-full"
              />
            </div>

            {/* Conversion Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.conv}</label>
                <span className="text-cyan-400 font-bold text-lg">{conv}%</span>
              </div>
              <Slider
                value={[conv]}
                onValueChange={(v) => setConv(v[0])}
                min={1}
                max={mode === 'Sale' ? 15 : 25}
                step={1}
                className="w-full"
              />
            </div>

            {/* Mode Hint */}
            <div className={`p-4 rounded-xl border ${
              mode === 'Sale' 
                ? 'bg-violet-500/10 border-violet-500/20' 
                : 'bg-emerald-500/10 border-emerald-500/20'
            }`}>
              <p className={`text-sm ${mode === 'Sale' ? 'text-violet-300' : 'text-emerald-300'}`}>
                {mode === 'Sale' ? t.calculator.saleHint : t.calculator.rentHint}
              </p>
            </div>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4">
            {/* Main Profit Card */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:-translate-y-1 flex-1 flex flex-col justify-center group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[50px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"></div>
              <div className="flex items-center gap-2 text-emerald-400/80 font-medium text-lg mb-2 relative z-10">
                <TrendingUp className="w-5 h-5" />
                {t.calculator.gain}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                +{formatCurrency(animatedNetGain)}
              </div>
              
              {/* SVG Curve */}
              <div className="absolute bottom-0 left-0 w-full h-20 opacity-40 pointer-events-none">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`M0,40 Q25,${Math.max(5, 40 - (netGain / 20000) * 30)} 50,${Math.max(5, 35 - (netGain / 20000) * 25)} T100,${Math.max(5, 30 - (netGain / 20000) * 20)}`} 
                    fill="none" 
                    stroke="url(#chartGradient)" 
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Saved Deals Card */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-cyan-500/10 blur-[25px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-cyan-400/80 font-medium text-sm mb-2 relative z-10">
                  <Users className="w-4 h-4" />
                  {t.calculator.savedLeads}
                </div>
                <div className="text-2xl font-bold text-cyan-400 relative z-10">
                  +{animatedSavedDeals} {t.calculator.clients}
                </div>
              </div>

              {/* AI Admin Card */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-violet-500/10 blur-[25px] rounded-full group-hover:bg-violet-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-violet-400/80 font-medium text-sm mb-2 relative z-10">
                  <Bot className="w-4 h-4" />
                  {t.calculator.aiAdmin}
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-2xl font-bold text-violet-400">24/7</span>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* Loss & ROI Card */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-rose-500/40 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-rose-500/10 blur-[25px] rounded-full group-hover:bg-rose-500/20 transition-all duration-500"></div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-rose-400/80 font-medium text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t.calculator.loss}
                  </div>
                  <div className="text-2xl font-bold text-rose-400">
                    {formatCurrency(animatedNightLoss)}{t.calculator.perMonth}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400/80 font-medium text-sm mb-2">ROI</div>
                  <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                    {roi}x <span className="text-sm font-normal text-cyan-400/70">{t.calculator.roi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Ticker */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 overflow-hidden">
          <div 
            className="flex gap-8 text-sm text-zinc-400 whitespace-nowrap"
            style={{ transform: `translateX(-${tickerOffset}%)` }}
          >
            {[...tickerMessages, ...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
