import { useState, useEffect, useRef, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, AlertTriangle, Users, Bot, Zap, Copy, Phone } from "lucide-react";

interface ProfitCalculatorProps {
  t: any;
  onBookDemo?: () => void;
}

function useAnimatedCounter(target: number, duration: number = 500) {
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
  const dots = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2, dur: 2 + Math.random() * 2, size: 2 + Math.random() * 3,
  })), []);
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map(p => (
        <div key={p.id} className="absolute rounded-full bg-emerald-400/40"
          style={{ left: `${p.left}%`, bottom: -4, width: p.size, height: p.size, animation: `floatUp ${p.dur}s ease-out ${p.delay}s infinite` }} />
      ))}
      <style>{`@keyframes floatUp { 0% { transform:translateY(0) scale(1); opacity:.7 } 100% { transform:translateY(-180px) scale(.2); opacity:0 } }`}</style>
    </div>
  );
}

// Compact numeric input
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
    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-2 py-1 min-w-[90px] max-w-[120px] focus-within:border-cyan-500/50 transition-colors">
      {prefix && <span className="text-cyan-400/70 text-xs mr-1">{prefix}</span>}
      <input
        type="text" value={text}
        onChange={e => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={e => e.key === 'Enter' && commit()}
        className="bg-transparent text-cyan-400 font-bold text-sm w-full outline-none text-right"
      />
      {suffix && <span className="text-cyan-400/70 text-xs ml-1">{suffix}</span>}
    </div>
  );
}

export function ProfitCalculator({ t, onBookDemo }: ProfitCalculatorProps) {
  const [mode, setMode] = useState<'Sale' | 'Rent'>('Sale');
  const [currency, setCurrency] = useState<'$' | '₴'>('$');
  const [leads, setLeads] = useState(50);
  const [price, setPrice] = useState(5000);
  const [conv, setConv] = useState(3);
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

  // Math
  const base = currency === '$' ? price : price / UAH;
  const nightRate = mode === 'Sale' ? 0.3 : 0.4;
  const boost = mode === 'Sale' ? 1.3 : 1.5;
  const commRate = mode === 'Sale' ? 1 : 0.5;
  const currentProfit = Math.round(leads * (conv / 100) * base * commRate);
  const savedDeals = Math.ceil(leads * nightRate * (conv / 100));
  const extraProfit = Math.round(savedDeals * base * commRate * boost);
  const totalProfit = currentProfit + extraProfit;
  const nightLoss = Math.round(leads * nightRate * (conv / 100) * base * commRate);
  const roi = extraProfit > 0 ? Math.max(0, extraProfit / 2299).toFixed(1) : "0";
  const growthPct = currentProfit > 0 ? Math.round((extraProfit / currentProfit) * 100) : 0;
  const barRatio = totalProfit > 0 ? Math.round((currentProfit / totalProfit) * 100) : 50;

  const toD = (v: number) => currency === '$' ? v : v * UAH;

  useEffect(() => {
    if (extraProfit > prevExtra.current) {
      setParticles(true);
      const t = setTimeout(() => setParticles(false), 2500);
      prevExtra.current = extraProfit;
      return () => clearTimeout(t);
    }
    prevExtra.current = extraProfit;
  }, [extraProfit]);

  const aTotal = useAnimatedCounter(toD(totalProfit));
  const aExtra = useAnimatedCounter(toD(extraProfit));
  const aLoss = useAnimatedCounter(toD(nightLoss));
  const aSaved = useAnimatedCounter(savedDeals);
  const aGrowth = useAnimatedCounter(growthPct);

  const fmt = (v: number) => {
    const s = currency;
    if (v >= 1_000_000) return `${s}${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1000) return `${s}${new Intl.NumberFormat('en-US').format(v)}`;
    return `${s}${v}`;
  };

  const pMin = mode === 'Sale' ? (currency === '$' ? 500 : 20000) : (currency === '$' ? 200 : 8000);
  const pMax = mode === 'Sale' ? (currency === '$' ? 20000 : 820000) : (currency === '$' ? 3000 : 123000);
  const pStep = mode === 'Sale' ? (currency === '$' ? 100 : 4100) : (currency === '$' ? 50 : 2050);

  const copyResult = () => {
    const text = `${t.calculator.yourProfit}: ${fmt(toD(totalProfit))}${t.calculator.perMonth} | ${t.calculator.growthLabel} +${growthPct}% ${t.calculator.growthSuffix}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="py-20 px-6 relative bg-zinc-950/50 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.07), transparent 40%)` }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-500 text-center text-sm mb-8">{t.calculator.sub}</p>

        {/* Controls Header */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex gap-0.5">
            {(['Sale', 'Rent'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 ${
                  currency === c
                    ? c === '$' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40' : 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Inputs */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/20 space-y-5">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1">{t.calculator.inputLabel}</div>

            {/* Leads */}
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-sm flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" /> {t.calculator.leads}
                </label>
                <NumInput value={leads} onChange={setLeads} min={5} max={1000} step={5} suffix={t.calculator.perMonth} />
              </div>
              <Slider value={[leads]} onValueChange={v => setLeads(v[0])} min={5} max={1000} step={5} className="w-full" />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-sm">{mode === 'Sale' ? t.calculator.comm : t.calculator.rentPrice}</label>
                <NumInput value={price} onChange={v => setPrice(v)} min={pMin} max={pMax} step={pStep} prefix={currency} />
              </div>
              <Slider value={[price]} onValueChange={v => setPrice(v[0])} min={pMin} max={pMax} step={pStep} className="w-full" />
            </div>

            {/* Conv */}
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <label className="text-zinc-400 text-sm">{t.calculator.conv}</label>
                <NumInput value={conv} onChange={setConv} min={1} max={mode === 'Sale' ? 15 : 25} step={1} suffix="%" />
              </div>
              <Slider value={[conv]} onValueChange={v => setConv(v[0])} min={1} max={mode === 'Sale' ? 15 : 25} step={1} className="w-full" />
            </div>

            <div className={`p-3 rounded-lg border text-xs ${mode === 'Sale' ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'}`}>
              {mode === 'Sale' ? t.calculator.saleHint : t.calculator.rentHint}
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="flex flex-col gap-4">
            {/* Hero Profit */}
            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] group flex-1">
              <ProfitParticles active={particles} />
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-500/15 blur-[70px] rounded-full group-hover:bg-emerald-500/25 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/70 font-medium text-sm uppercase tracking-wide">{t.calculator.yourProfit}</span>
                </div>
                <div className="text-4xl md:text-6xl font-black text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] mb-1">
                  {fmt(aTotal)}
                  <span className="text-lg text-emerald-400/50 font-medium ml-1">{t.calculator.perMonth}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">
                    +{aGrowth}% {t.calculator.growthSuffix}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>{t.calculator.currentResult}</span>
                    <span className="text-emerald-400">+ Laverol</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full flex rounded-full overflow-hidden transition-all duration-700">
                      <div className="bg-zinc-500/60 transition-all duration-700" style={{ width: `${barRatio}%` }} />
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700" style={{ width: `${100 - barRatio}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] mt-0.5">
                    <span className="text-zinc-600">{fmt(toD(currentProfit))}</span>
                    <span className="text-emerald-400">+{fmt(aExtra)}</span>
                  </div>
                </div>
              </div>

              {/* SVG Wave bg */}
              <div className="absolute bottom-0 left-0 w-full h-12 opacity-25 pointer-events-none">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                  <defs><linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs>
                  <path d={`M0,20 Q25,${Math.max(2, 20 - (extraProfit / 15000) * 14)} 50,${Math.max(2, 16 - (extraProfit / 15000) * 10)} T100,${Math.max(2, 12 - (extraProfit / 15000) * 6)}`} fill="none" stroke="url(#wg)" strokeWidth="1.2" className="transition-all duration-500"/>
                </svg>
              </div>
            </div>

            {/* Mini cards row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-0.5 group relative overflow-hidden">
                <div className="text-cyan-400/70 text-xs font-medium mb-1 flex items-center gap-1"><Users className="w-3 h-3"/>{t.calculator.savedLeads}</div>
                <div className="text-xl font-bold text-cyan-400">+{aSaved} {t.calculator.clients}</div>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 transition-all duration-300 hover:border-rose-500/40 hover:-translate-y-0.5 group relative overflow-hidden">
                <div className="text-rose-400/70 text-xs font-medium mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{t.calculator.loss}</div>
                <div className="text-xl font-bold text-rose-400">{fmt(aLoss)}{t.calculator.perMonth}</div>
              </div>
            </div>

            {/* ROI + Actions */}
            <div className="flex gap-3">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 flex-1 flex items-center justify-between transition-all duration-300 hover:border-violet-500/40">
                <div>
                  <div className="text-violet-400/70 text-xs font-medium mb-0.5">ROI</div>
                  <div className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">{roi}x</div>
                </div>
                <div className="flex items-center gap-1">
                  <Bot className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-400 text-sm font-medium">24/7</span>
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
              <button onClick={copyResult}
                className="bg-white/5 border border-white/10 rounded-xl px-4 flex items-center gap-2 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 text-sm">
                <Copy className="w-3.5 h-3.5" />
                {copied ? '✓' : t.calculator.copy}
              </button>
            </div>

            {/* CTA */}
            {onBookDemo && (
              <button onClick={onBookDemo}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" />
                {t.calculator.bookDemo}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
