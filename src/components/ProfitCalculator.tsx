import { useState, useEffect, useRef, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, AlertTriangle, Users, Bot, DollarSign, Zap } from "lucide-react";

interface ProfitCalculatorProps {
  t: any;
}

function useAnimatedCounter(target: number, duration: number = 500) {
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

// Particle system for "money rain" effect
function ProfitParticles({ active }: { active: boolean }) {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 3 + Math.random() * 4,
    })), []
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/40"
          style={{
            left: `${p.left}%`,
            bottom: '-8px',
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.duration}s ease-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-200px) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function ProfitCalculator({ t }: ProfitCalculatorProps) {
  const [mode, setMode] = useState<'Sale' | 'Rent'>('Sale');
  const [currency, setCurrency] = useState<'$' | '₴'>('$');
  const [leads, setLeads] = useState(50);
  const [price, setPrice] = useState(5000);
  const [conv, setConv] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tickerOffset, setTickerOffset] = useState(0);
  const prevNetGain = useRef(0);

  const UAH_RATE = 41;

  useEffect(() => {
    if (mode === 'Sale') {
      setPrice(currency === '$' ? 5000 : 5000 * UAH_RATE);
    } else {
      setPrice(currency === '$' ? 600 : 600 * UAH_RATE);
    }
  }, [mode]);

  useEffect(() => {
    if (currency === '$') {
      setPrice(prev => Math.round(prev / UAH_RATE));
    } else {
      setPrice(prev => prev * UAH_RATE);
    }
  }, [currency]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
  const commRate = mode === 'Sale' ? 1 : 0.5;
  
  const currentProfit = Math.round(leads * (conv / 100) * basePrice * commRate);
  const savedDeals = Math.ceil(leads * nightLossRate * (conv / 100));
  const extraProfit = Math.round(savedDeals * basePrice * commRate * tierMult);
  const totalFutureProfit = currentProfit + extraProfit;
  const nightLoss = Math.round((leads * nightLossRate) * (conv / 100) * basePrice * commRate);
  const tierPrice = 2299;
  const roi = tierPrice > 0 ? Math.max(0, extraProfit / tierPrice).toFixed(1) : "0";
  const growthPercent = currentProfit > 0 ? Math.round((extraProfit / currentProfit) * 100) : 0;
  const profitRatio = totalFutureProfit > 0 ? Math.round((currentProfit / totalFutureProfit) * 100) : 50;

  // Trigger particles when profit increases
  useEffect(() => {
    if (extraProfit > prevNetGain.current) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 3000);
      prevNetGain.current = extraProfit;
      return () => clearTimeout(timer);
    }
    prevNetGain.current = extraProfit;
  }, [extraProfit]);

  // Currency display
  const toDisplay = (val: number) => currency === '$' ? val : val * UAH_RATE;
  
  const animatedTotal = useAnimatedCounter(toDisplay(totalFutureProfit));
  const animatedExtra = useAnimatedCounter(toDisplay(extraProfit));
  const animatedNightLoss = useAnimatedCounter(toDisplay(nightLoss));
  const animatedSavedDeals = useAnimatedCounter(savedDeals);
  const animatedGrowth = useAnimatedCounter(growthPercent);

  const fmt = (val: number) => {
    const s = currency;
    if (val >= 1000000) return `${s}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${s}${new Intl.NumberFormat('en-US').format(val)}`;
    return `${s}${val}`;
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
      {/* Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.08), transparent 40%)`
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-400 text-center text-lg mb-12 max-w-2xl mx-auto">{t.calculator.sub}</p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1">
            <button
              onClick={() => setMode('Sale')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                mode === 'Sale'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calculator.sale}
            </button>
            <button
              onClick={() => setMode('Rent')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                mode === 'Rent'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calculator.rent}
            </button>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 flex">
            <button
              onClick={() => setCurrency('$')}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                currency === '$' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >$</button>
            <button
              onClick={() => setCurrency('₴')}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                currency === '₴' ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >₴</button>
          </div>
        </div>

        {/* === HERO PROFIT CARD === */}
        <div className="mb-8 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] group">
          <ProfitParticles active={showParticles} />
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/15 blur-[80px] rounded-full group-hover:bg-emerald-500/25 transition-all duration-700"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-cyan-500/10 blur-[60px] rounded-full"></div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <span className="text-emerald-400/80 font-semibold text-lg tracking-wide uppercase">
                {t.calculator.yourProfit}
              </span>
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="text-5xl md:text-7xl font-black text-emerald-400 mb-3 drop-shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300">
              {fmt(animatedTotal)}
              <span className="text-2xl md:text-3xl text-emerald-400/60 font-medium ml-2">{t.calculator.perMonth}</span>
            </div>

            <p className="text-zinc-300 text-lg mb-6">
              {t.calculator.growthLabel}{' '}
              <span className="text-emerald-400 font-bold">+{animatedGrowth}%</span>{' '}
              {t.calculator.growthSuffix}
            </p>

            {/* Progress Bar: Current vs Boost */}
            <div className="max-w-lg mx-auto">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>{t.calculator.currentResult}</span>
                <span className="text-emerald-400 font-medium">+ Laverol Boost</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div className="h-full flex rounded-full overflow-hidden transition-all duration-700">
                  <div 
                    className="bg-gradient-to-r from-zinc-500 to-zinc-400 transition-all duration-700"
                    style={{ width: `${profitRatio}%` }}
                  />
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${100 - profitRatio}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-zinc-500">{fmt(toDisplay(currentProfit))}</span>
                <span className="text-emerald-400 font-medium">+{fmt(animatedExtra)}</span>
              </div>
            </div>
          </div>

          {/* SVG Wave */}
          <div className="absolute bottom-0 left-0 w-full h-16 opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path 
                d={`M0,30 Q20,${Math.max(3, 30 - (extraProfit / 15000) * 20)} 50,${Math.max(3, 25 - (extraProfit / 15000) * 15)} T100,${Math.max(3, 20 - (extraProfit / 15000) * 10)}`} 
                fill="none" stroke="url(#waveGrad)" strokeWidth="1.5"
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Sliders */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-8 transition-all duration-300 hover:border-cyan-500/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {t.calculator.leads}
                </label>
                <span className="text-cyan-400 font-bold text-lg">{leads} {t.calculator.perMonth}</span>
              </div>
              <Slider value={[leads]} onValueChange={(v) => setLeads(v[0])} min={5} max={1000} step={5} className="w-full" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  {mode === 'Sale' ? t.calculator.comm : t.calculator.rentPrice}
                </label>
                <span className="text-cyan-400 font-bold text-lg">{fmt(price)}</span>
              </div>
              <Slider value={[price]} onValueChange={(v) => setPrice(v[0])} min={priceMin} max={priceMax} step={priceStep} className="w-full" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.conv}</label>
                <span className="text-cyan-400 font-bold text-lg">{conv}%</span>
              </div>
              <Slider value={[conv]} onValueChange={(v) => setConv(v[0])} min={1} max={mode === 'Sale' ? 15 : 25} step={1} className="w-full" />
            </div>
            <div className={`p-4 rounded-xl border ${mode === 'Sale' ? 'bg-violet-500/10 border-violet-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
              <p className={`text-sm ${mode === 'Sale' ? 'text-violet-300' : 'text-emerald-300'}`}>
                {mode === 'Sale' ? t.calculator.saleHint : t.calculator.rentHint}
              </p>
            </div>
          </div>

          {/* Right: Stats Cards */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Saved Deals */}
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
              {/* AI Admin */}
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
            {/* Loss & ROI */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-rose-500/40 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-rose-500/10 blur-[25px] rounded-full group-hover:bg-rose-500/20 transition-all duration-500"></div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-rose-400/80 font-medium text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t.calculator.loss}
                  </div>
                  <div className="text-2xl font-bold text-rose-400">{fmt(animatedNightLoss)}{t.calculator.perMonth}</div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400/80 font-medium text-sm mb-2">ROI</div>
                  <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                    {roi}x <span className="text-sm font-normal text-cyan-400/70">{t.calculator.roi}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Payback badge */}
            {extraProfit > 0 && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                <span className="text-emerald-400 text-sm font-medium">
                  ✓ {t.calculator.paidOff}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ticker */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 overflow-hidden">
          <div className="flex gap-8 text-sm text-zinc-400 whitespace-nowrap" style={{ transform: `translateX(-${tickerOffset}%)` }}>
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
