import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Users, Bot, Home, Building } from "lucide-react";

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

export function ProfitCalculator({ t }: ProfitCalculatorProps) {
  const [mode, setMode] = useState<'Sale' | 'Rent'>('Sale');
  const [leads, setLeads] = useState(200);
  const [price, setPrice] = useState(5000);
  const [conv, setConv] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update defaults when mode changes
  useEffect(() => {
    if (mode === 'Sale') {
      setLeads(200);
      setPrice(5000);
      setConv(3);
    } else {
      setLeads(500);
      setPrice(600);
      setConv(5);
    }
  }, [mode]);

  // Mouse tracking for spotlight effect
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

  // Calculations based on mode
  const nightLossRate = mode === 'Sale' ? 0.3 : 0.4;
  const tierMult = mode === 'Sale' ? 1.3 : 1.5;
  const commissionRate = mode === 'Sale' ? 1 : 0.5;
  
  const nightLoss = Math.round((leads * nightLossRate) * (conv / 100) * price * commissionRate);
  const netGain = Math.round(nightLoss * tierMult);
  const savedLeads = Math.round(leads * nightLossRate * (conv / 100));
  const tierPrice = 2299;
  const roi = tierPrice > 0 ? Math.max(0, (netGain / tierPrice)).toFixed(1) : "0";

  // Animated values
  const animatedNetGain = useAnimatedCounter(netGain);
  const animatedNightLoss = useAnimatedCounter(nightLoss);
  const animatedSavedLeads = useAnimatedCounter(savedLeads);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${new Intl.NumberFormat('en-US').format(val)}`;
    return `$${val}`;
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative bg-zinc-950/50 border-t border-white/5 overflow-hidden"
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      } as React.CSSProperties}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.06), transparent 40%)`
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-400 text-center text-lg mb-8">{t.calculator.sub}</p>

        {/* Sale / Rent Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1">
            <button
              onClick={() => setMode('Sale')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                mode === 'Sale'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              {t.calculator.sale}
            </button>
            <button
              onClick={() => setMode('Rent')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                mode === 'Rent'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              {t.calculator.rent}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-8 shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.leads}</label>
                <span className="text-cyan-400 font-bold">{leads}</span>
              </div>
              <Slider
                value={[leads]}
                onValueChange={(v) => setLeads(v[0])}
                min={50}
                max={mode === 'Sale' ? 2000 : 3000}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">
                  {mode === 'Sale' ? t.calculator.comm : t.calculator.rentPrice}
                </label>
                <span className="text-cyan-400 font-bold">{formatCurrency(price)}</span>
              </div>
              <Slider
                value={[price]}
                onValueChange={(v) => setPrice(v[0])}
                min={mode === 'Sale' ? 500 : 200}
                max={mode === 'Sale' ? 20000 : 3000}
                step={mode === 'Sale' ? 100 : 50}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.conv}</label>
                <span className="text-cyan-400 font-bold">{conv}%</span>
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

            {/* Mode hint */}
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
            {/* Emerald Card - Net Gain */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex-1 flex flex-col justify-center group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[50px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"></div>
              <div className="flex items-center gap-2 text-emerald-400/80 font-medium text-lg mb-2 relative z-10">
                <TrendingUp className="w-5 h-5" />
                {t.calculator.gain}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                +{formatCurrency(animatedNetGain)}
              </div>
              
              {/* SVG Curve */}
              <div className="absolute bottom-0 left-0 w-full h-24 opacity-30 pointer-events-none">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                  <path 
                    d={`M0,40 Q20,${Math.max(0, 40 - (netGain / 50000) * 20)} 50,${Math.max(0, 40 - (netGain / 50000) * 30)} T100,${Math.max(0, 40 - (netGain / 50000) * 40)}`} 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="2" 
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cyan Card - Saved Leads */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 blur-[30px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-cyan-400/80 font-medium text-sm mb-2 relative z-10">
                  <Users className="w-4 h-4" />
                  {t.calculator.savedLeads}
                </div>
                <div className="text-2xl font-bold text-cyan-400 relative z-10">
                  +{animatedSavedLeads} {t.calculator.perMonth}
                </div>
              </div>

              {/* Purple Card - AI Admin */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/10 blur-[30px] rounded-full group-hover:bg-violet-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-violet-400/80 font-medium text-sm mb-2 relative z-10">
                  <Bot className="w-4 h-4" />
                  {t.calculator.aiAdmin}
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-2xl font-bold text-violet-400">24/7</span>
                  {/* Pulsing dot */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* ROI Card */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-rose-500/40 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/10 blur-[30px] rounded-full group-hover:bg-rose-500/20 transition-all duration-500"></div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="text-rose-400/80 font-medium text-sm mb-2">{t.calculator.loss}</div>
                  <div className="text-2xl font-bold text-rose-400">
                    {formatCurrency(animatedNightLoss)}/{t.calculator.perMonth}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400/80 font-medium text-sm mb-2">ROI</div>
                  <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                    {roi}x <span className="text-sm font-normal text-cyan-400/70">{t.calculator.roi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
