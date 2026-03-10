import { useState, useEffect, useRef, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, AlertTriangle, Users, Bot, Copy, Phone, ArrowRight } from "lucide-react";

interface ProfitCalculatorProps {
  t: any;
  onBookDemo?: () => void;
}

function useAnimatedCounter(target: number, duration: number = 300) {
  const [value, setValue] = useState(0);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      setValue(Math.round(start + diff * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function ProfitParticles({ active }: { active: boolean }) {
  const dots = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2, dur: 2 + Math.random() * 2, size: 2 + Math.random() * 3,
  })), []);
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map(p => (
        <div key={p.id} className="absolute rounded-full bg-emerald-400/40"
          style={{ left: `${p.left}%`, bottom: -4, width: p.size, height: p.size, animation: `floatUp ${p.dur}s ease-out ${p.delay}s infinite` }} />
      ))}
      <style>{`@keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:.7}100%{transform:translateY(-180px) scale(.2);opacity:0}}`}</style>
    </div>
  );
}

function NumInput({ value, onChange, min, max, step, prefix, suffix }: {
  value: number; onChange: (v: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = () => {
    const n = Number(text.replace(/[^0-9.-]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, Math.round(n / step) * step)));
    else setText(String(value));
  };
  return (
    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 min-w-[80px] max-w-[110px] focus-within:border-cyan-500/50 transition-colors">
      {prefix && <span className="text-cyan-400/70 text-xs mr-1 shrink-0">{prefix}</span>}
      <input
        type="text" inputMode="numeric" value={text}
        onChange={e => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={e => e.key === 'Enter' && commit()}
        className="bg-transparent text-cyan-400 font-bold text-sm w-full outline-none text-right min-w-0"
      />
      {suffix && <span className="text-cyan-400/70 text-xs ml-1 shrink-0">{suffix}</span>}
    </div>
  );
}

export function ProfitCalculator({ t, onBookDemo }: ProfitCalculatorProps) {
  const [mode, setMode] = useState<'Sale' | 'Rent'>('Sale');
  const [currency, setCurrency] = useState<'$' | '₴'>('$');
  const [leads, setLeads] = useState(50);
  const [currentDeals, setCurrentDeals] = useState(3);
  const [price, setPrice] = useState(5000);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevExtra = useRef(0);

  const UAH = 41;

  useEffect(() => {
    setPrice(mode === 'Sale' ? (currency === '$' ? 5000 : 205000) : (currency === '$' ? 600 : 24600));
  }, [mode]);

  useEffect(() => {
    setPrice(p => currency === '$' ? Math.round(p / UAH) : p * UAH);
  }, [currency]);

  // Clamp deals to leads
  useEffect(() => {
    if (currentDeals > leads) setCurrentDeals(leads);
  }, [leads, currentDeals]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', fn);
    return () => el?.removeEventListener('mousemove', fn);
  }, []);

  // ── Core Logic ──
  const base = currency === '$' ? price : price / UAH;
  const currentConv = leads > 0 ? (currentDeals / leads) * 100 : 0;
  const nightTraffic = leads * 0.3;
  const boostMultiplier = mode === 'Sale' ? 1.3 : 1.5;
  const commRate = mode === 'Sale' ? 1 : 0.5;
  const savedDeals = Math.ceil(nightTraffic * (currentConv / 100) * boostMultiplier);
  const totalFutureDeals = currentDeals + savedDeals;
  const netGain = Math.round(savedDeals * base * commRate);
  const currentProfit = Math.round(currentDeals * base * commRate);
  const totalProfit = currentProfit + netGain;
  const nightLoss = Math.round(nightTraffic * (currentConv / 100) * base * commRate);
  const roi = netGain > 0 ? Math.max(0, netGain / 2299).toFixed(1) : "0";
  const growthPct = currentProfit > 0 ? Math.round((netGain / currentProfit) * 100) : 0;
  const barRatio = totalProfit > 0 ? Math.round((currentProfit / totalProfit) * 100) : 50;

  const toD = (v: number) => currency === '$' ? v : v * UAH;

  useEffect(() => {
    if (netGain > prevExtra.current) {
      setParticles(true);
      const timer = setTimeout(() => setParticles(false), 2500);
      prevExtra.current = netGain;
      return () => clearTimeout(timer);
    }
    prevExtra.current = netGain;
  }, [netGain]);

  const aTotal = useAnimatedCounter(toD(totalProfit));
  const aExtra = useAnimatedCounter(toD(netGain));
  const aLoss = useAnimatedCounter(toD(nightLoss));
  const aSaved = useAnimatedCounter(savedDeals);
  const aGrowth = useAnimatedCounter(growthPct);
  const aTotalDeals = useAnimatedCounter(totalFutureDeals);
  const aCurrentDealsAnim = useAnimatedCounter(currentDeals);

  const fmt = (v: number) => {
    const s = currency;
    if (v >= 1_000_000) return `${s}${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1000) return `${s}${new Intl.NumberFormat('en-US').format(v)}`;
    return `${s}${v}`;
  };

  const pMin = mode === 'Sale' ? (currency === '$' ? 500 : 20000) : (currency === '$' ? 200 : 8000);
  const pMax = mode === 'Sale' ? (currency === '$' ? 20000 : 820000) : (currency === '$' ? 3000 : 123000);
  const pStep = mode === 'Sale' ? (currency === '$' ? 100 : 4100) : (currency === '$' ? 50 : 2050);
  const dealsMax = Math.min(100, leads);

  const copyResult = () => {
    const text = `${t.calculator.yourProfit}: ${fmt(toD(totalProfit))}${t.calculator.perMonth} | ${t.calculator.growthLabel} +${growthPct}% ${t.calculator.growthSuffix}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="py-12 md:py-20 px-4 md:px-6 relative bg-zinc-950/50 border-t border-white/5 overflow-hidden">
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-50 hidden md:block"
        style={{ background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.07), transparent 40%)` }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-center mb-1 md:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-500 text-center text-xs md:text-sm mb-5 md:mb-8">{t.calculator.sub}</p>

        {/* Toggles */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-5 md:mb-8">
          <div className="bg-white/5 border border-white/10 rounded-full p-0.5 md:p-1 flex gap-0.5">
            {(['Sale', 'Rent'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  mode === m
                    ? m === 'Sale' ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-500 hover:text-white'
                }`}>
                {t.calculator[m.toLowerCase()]}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-full p-0.5 flex">
            {(['$', '₴'] as const).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  currency === c
                    ? c === '$' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40' : 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* LEFT: Inputs */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 md:p-6 transition-all duration-300 hover:border-cyan-500/20 space-y-4 md:space-y-5 order-2 lg:order-1">
            <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-medium">{t.calculator.inputLabel}</div>

            {/* Leads */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-xs md:text-sm flex items-center gap-1.5 shrink-0">
                  <Users className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-400" /> {t.calculator.leads}
                </label>
                <NumInput value={leads} onChange={setLeads} min={5} max={1000} step={5} suffix={t.calculator.perMonth} />
              </div>
              <Slider value={[leads]} onValueChange={v => setLeads(v[0])} min={5} max={1000} step={5} className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 md:[&_[role=slider]]:h-4 md:[&_[role=slider]]:w-4 [&_[data-orientation=horizontal]]:h-1.5" />
            </div>

            {/* Current Deals */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-xs md:text-sm flex items-center gap-1.5 shrink-0">
                  <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-violet-400" /> {t.calculator.deals}
                </label>
                <NumInput value={currentDeals} onChange={setCurrentDeals} min={0} max={dealsMax} step={1} suffix={t.calculator.perMonth} />
              </div>
              <Slider value={[currentDeals]} onValueChange={v => setCurrentDeals(v[0])} min={0} max={dealsMax} step={1} className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 md:[&_[role=slider]]:h-4 md:[&_[role=slider]]:w-4 [&_[data-orientation=horizontal]]:h-1.5" />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-xs md:text-sm shrink-0">{mode === 'Sale' ? t.calculator.comm : t.calculator.rentPrice}</label>
                <NumInput value={price} onChange={v => setPrice(v)} min={pMin} max={pMax} step={pStep} prefix={currency} />
              </div>
              <Slider value={[price]} onValueChange={v => setPrice(v[0])} min={pMin} max={pMax} step={pStep} className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 md:[&_[role=slider]]:h-4 md:[&_[role=slider]]:w-4 [&_[data-orientation=horizontal]]:h-1.5" />
            </div>

            <div className={`p-2.5 md:p-3 rounded-lg border text-[11px] md:text-xs ${mode === 'Sale' ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'}`}>
              {mode === 'Sale' ? t.calculator.saleHint : t.calculator.rentHint}
            </div>
          </div>

          {/* RIGHT: Results — on mobile appears FIRST */}
          <div className="flex flex-col gap-3 md:gap-4 order-1 lg:order-2">
            {/* MAIN: Total Profit */}
            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl px-4 py-4 md:p-6 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] group">
              <ProfitParticles active={particles} />
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-500/15 blur-[70px] rounded-full group-hover:bg-emerald-500/25 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/70 font-medium text-xs md:text-sm uppercase tracking-wide">{t.calculator.yourProfit}</span>
                </div>
                <div className="text-2xl md:text-4xl lg:text-5xl font-black text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] mb-1">
                  {fmt(aTotal)}
                  <span className="text-sm md:text-lg text-emerald-400/50 font-medium ml-1">{t.calculator.perMonth}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] md:text-xs font-bold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                    +{aGrowth}% {t.calculator.growthSuffix}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 md:mt-4">
                  <div className="flex justify-between text-[9px] md:text-[10px] text-zinc-500 mb-1">
                    <span>{t.calculator.currentResult}</span>
                    <span className="text-emerald-400">+ Laverol</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full flex rounded-full overflow-hidden transition-all duration-700">
                      <div className="bg-zinc-500/60 transition-all duration-700" style={{ width: `${barRatio}%` }} />
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700" style={{ width: `${100 - barRatio}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] md:text-[10px] mt-0.5">
                    <span className="text-zinc-600">{fmt(toD(currentProfit))}</span>
                    <span className="text-emerald-400">+{fmt(aExtra)}</span>
                  </div>
                </div>
              </div>

              {/* SVG Wave */}
              <div className="absolute bottom-0 left-0 w-full h-10 md:h-12 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                  <defs><linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs>
                  <path d={`M0,20 Q25,${Math.max(2, 20 - (netGain / 15000) * 14)} 50,${Math.max(2, 16 - (netGain / 15000) * 10)} T100,${Math.max(2, 12 - (netGain / 15000) * 6)}`} fill="none" stroke="url(#wg)" strokeWidth="1.2" className="transition-all duration-500"/>
                </svg>
              </div>
            </div>

            {/* Bento Grid: Growth + Loss + Saved + ROI */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {/* GROWTH CARD */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-2.5 md:p-4 transition-all duration-300 hover:border-cyan-500/40">
                <div className="text-cyan-400/70 text-[10px] md:text-xs font-medium mb-1 md:mb-2">{t.calculator.growthDeals}</div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-base md:text-xl font-bold text-zinc-400">{aCurrentDealsAnim}</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-base md:text-xl font-bold text-cyan-400">{aTotalDeals}</span>
                </div>
                <div className="text-[9px] md:text-[10px] text-zinc-600 mt-0.5">{t.calculator.dealsArrow}</div>
              </div>

              {/* LOSS CARD */}
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5 md:p-4 transition-all duration-300 hover:border-rose-500/40">
                <div className="text-rose-400/70 text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3" />{t.calculator.loss}
                </div>
                <div className="text-base md:text-xl font-bold text-rose-400">{fmt(aLoss)}{t.calculator.perMonth}</div>
              </div>

              {/* SAVED DEALS */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2.5 md:p-4 transition-all duration-300 hover:border-violet-500/40">
                <div className="text-violet-400/70 text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 flex items-center gap-1">
                  <Bot className="w-2.5 h-2.5 md:w-3 md:h-3" />{t.calculator.savedLeads}
                </div>
                <div className="text-base md:text-xl font-bold text-violet-400">+{aSaved} {t.calculator.clients}</div>
              </div>

              {/* ROI */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2.5 md:p-4 transition-all duration-300 hover:border-violet-500/40">
                <div className="text-violet-400/70 text-[10px] md:text-xs font-medium mb-0.5 md:mb-1">ROI</div>
                <div className="text-base md:text-xl font-bold text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">{roi}x</div>
              </div>
            </div>

            {/* Loss explanation */}
            <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl px-3 py-2 md:px-4 md:py-2.5">
              <p className="text-rose-400/60 text-[10px] md:text-xs leading-relaxed">{t.calculator.lossExplain}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:gap-3">
              <button onClick={copyResult}
                className="bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2.5 flex items-center gap-2 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 text-xs md:text-sm shrink-0">
                <Copy className="w-3.5 h-3.5" />
                {copied ? '✓' : t.calculator.copy}
              </button>
              {onBookDemo && (
                <button onClick={onBookDemo}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base">
                  <Phone className="w-4 h-4" />
                  {t.calculator.bookDemo}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
