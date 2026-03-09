import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface ProfitCalculatorProps {
  t: any;
}

export function ProfitCalculator({ t }: ProfitCalculatorProps) {
  const [leads, setLeads] = useState(200);
  const [comm, setComm] = useState(5000);
  const [conv, setConv] = useState(3);

  const tierMult = 1.3; // Default Quantum
  const nightLoss = Math.round((leads * 0.3) * (conv / 100) * comm);
  const netGain = Math.round(nightLoss * tierMult);
  const roi = (netGain / 2299).toFixed(1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  return (
    <section className="py-24 px-6 relative bg-zinc-950/50 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {t.calculator.title}
        </h2>
        <p className="text-zinc-400 text-center text-lg mb-16">{t.calculator.sub}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-8 shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.leads}</label>
                <span className="text-cyan-400 font-bold">{leads}</span>
              </div>
              <Slider
                value={[leads]}
                onValueChange={(v) => setLeads(v[0])}
                min={50}
                max={2000}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium">{t.calculator.comm} ($)</label>
                <span className="text-cyan-400 font-bold">${formatCurrency(comm)}</span>
              </div>
              <Slider
                value={[comm]}
                onValueChange={(v) => setComm(v[0])}
                min={500}
                max={20000}
                step={100}
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
                max={15}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4">
            {/* Emerald Card - Net Gain */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.15)] flex-1 flex flex-col justify-center">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[50px] rounded-full"></div>
              <div className="text-emerald-400/80 font-medium text-lg mb-2 relative z-10">{t.calculator.gain}</div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                +${formatCurrency(netGain)}
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
              {/* Red Card - Night Loss */}
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-rose-500/40">
                <div className="text-rose-400/80 font-medium text-sm mb-2">{t.calculator.loss}</div>
                <div className="text-2xl font-bold text-rose-400">
                  ${formatCurrency(nightLoss)}/міс
                </div>
              </div>

              {/* Cyan Card - ROI */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <div className="text-cyan-400/80 font-medium text-sm mb-2">ROI</div>
                <div className="text-2xl font-bold text-cyan-400">
                  {roi}x <span className="text-sm font-normal text-cyan-400/70">{t.calculator.roi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}