import { useEffect, useRef, useState, lazy, Suspense, type RefObject } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Globe, MessageSquare, Sparkles, Workflow, Bot, FileText,
  Target, Zap, Search, ChevronRight, Check, Menu, X, Loader2, Quote, Star,
  CheckCircle2, Mail, Send, Wrench, Building2, Store, Gem, ArrowDown, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { t, type Lang, type Dict } from "@/i18n/laverol";
import { extras } from "@/i18n/laverolExtras";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LaverolConcierge = lazy(() =>
  import("@/components/LaverolConcierge").then((m) => ({ default: m.LaverolConcierge }))
);

function useReveal<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.08 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const Logo = ({ inverted = false }: { inverted?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <div className={`relative h-9 w-9 rounded-lg ${inverted ? "bg-white" : "bg-[hsl(var(--dark-base))]"} flex items-center justify-center`}>
      <Zap className="h-5 w-5" style={{ color: "hsl(var(--primary))", fill: "hsl(var(--primary))" }} />
    </div>
    <div className={`font-extrabold text-[17px] tracking-tight leading-none ${inverted ? "text-white" : "text-[hsl(var(--dark-base))]"}`}>
      LAV<span style={{ color: "hsl(var(--primary))" }}>/</span>EROL
    </div>
  </div>
);

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="h-px w-6 bg-primary" />
    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-primary">{children}</span>
  </div>
);

export default function Index() {
  const [lang, setLang] = useState<Lang>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<string>(
    () => new URLSearchParams(window.location.search).get("package") || "pkg_unknown"
  );
  const d = t[lang];
  const x = extras[lang];

  useEffect(() => {
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("uk") || browser.startsWith("ru")) setLang("UA");
    else if (browser.startsWith("ro")) setLang("RO");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "UA" ? "uk" : lang.toLowerCase();
    document.title = x.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", x.meta.desc);
  }, [lang, x.meta]);

  const scrollTo = (id: string, pkgId?: string) => {
    setMenuOpen(false);
    if (pkgId) {
      setSelectedPkg(pkgId);
      window.history.pushState({}, "", `?package=${pkgId}`);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-30">
        <div className="bg-white/95 backdrop-blur-md border-b border-border">
          <div className="container flex h-16 items-center justify-between gap-4">
            <button onClick={() => scrollTo("hero")} className="focus:outline-none"><Logo /></button>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <button onClick={() => scrollTo("build")} className="text-muted-foreground hover:text-foreground transition font-medium">{d.nav.build}</button>
              <button onClick={() => scrollTo("cases")} className="text-muted-foreground hover:text-foreground transition font-medium">Cases</button>
              <button onClick={() => scrollTo("industries")} className="text-muted-foreground hover:text-foreground transition font-medium">{d.nav.industries}</button>
              <button onClick={() => scrollTo("team")} className="text-muted-foreground hover:text-foreground transition font-medium">About</button>
            </nav>
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-[11px] text-muted-foreground font-mono">laverol.systems</span>
              <a href="https://t.me/laverol_company" target="_blank" rel="noopener" aria-label="Telegram" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition">
                <Send className="h-4 w-4" />
              </a>
              <Button onClick={() => scrollTo("contact")} size="sm" className="hidden md:inline-flex bg-[hsl(var(--dark-base))] hover:bg-[hsl(var(--dark-base))]/90 text-white h-9 px-4 rounded-lg">
                {d.nav.cta} <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "hsl(var(--primary))" }} />
              </Button>
              <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-x-4 top-4 bg-white border border-border shadow-xl rounded-2xl p-5 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <Logo />
              <button onClick={() => setMenuOpen(false)} className="p-1.5"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-1 text-base">
              {[
                { id: "build", label: d.nav.build },
                { id: "cases", label: "Cases" },
                { id: "industries", label: d.nav.industries },
                { id: "team", label: "About" },
                { id: "options", label: d.nav.options },
                { id: "contact", label: d.nav.contact },
              ].map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left py-3 px-2 rounded-lg hover:bg-muted">{item.label}</button>
              ))}
            </nav>
            <Button onClick={() => scrollTo("contact")} className="w-full mt-4 bg-[hsl(var(--dark-base))] text-white">
              {d.nav.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-border hidden lg:block" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-7">
                <Eyebrow>{x.hero.eyebrow}</Eyebrow>
                <h1 className="text-[38px] md:text-[44px] lg:text-[52px] leading-[1.05] font-extrabold tracking-tight">
                  {x.hero.titleMain}<br />
                  <span className="text-gradient">{x.hero.titleAccent}</span>
                </h1>
                <p className="text-[14px] leading-[1.75] text-muted-foreground max-w-[380px]">
                  {d.hero.sub}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={() => scrollTo("contact")} className="bg-[hsl(var(--dark-base))] hover:bg-[hsl(var(--dark-base))]/90 text-white h-12 rounded-xl px-5">
                    {d.nav.cta} <ArrowUpRight className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollTo("cases")} className="h-12 rounded-xl px-5 border-border bg-transparent text-foreground hover:bg-muted">
                    View cases
                  </Button>
                </div>
                {/* Social proof */}
                <div className="flex items-center gap-4 pt-3">
                  <div className="flex -space-x-2">
                    {["ML","AP","DK","IV"].map((i, k) => (
                      <div key={k} className={`h-9 w-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${["bg-primary","bg-[hsl(var(--indigo))]","bg-[hsl(var(--sky))]","bg-[hsl(var(--dark-base))]"][k]}`}>{i}</div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    <div className="font-semibold text-foreground text-[13px]">40+ projects</div>
                    <div>across 8 niches</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <HeroDashboard d={d} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 bg-muted/40 border-y border-border">
        <div className="container">
          <div className="text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-5">
            {x.trust.label}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["AUTOELITE","DOMUS·RE","PRIME","NORDIC LABS","KAVA&CO","ATELIER 7"].map((n, i) => (
              <div key={i} className="text-sm font-bold tracking-widest text-muted-foreground/80">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD (Services) */}
      <section id="build" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <Eyebrow className="mb-3">Services</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.build.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{d.build.sub}</p>
              </div>
              <button onClick={() => scrollTo("options")} className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.build.items.map((it, i) => {
              const Icon = [Globe, FileText, Bot, Workflow][i];
              const accents = ["primary", "indigo", "sky", "dark-base"];
              const tints = ["bg-primary/10 text-primary", "bg-[hsl(var(--indigo))]/10 text-[hsl(var(--indigo))]", "bg-[hsl(var(--sky))]/10 text-[hsl(var(--sky))]", "bg-[hsl(var(--dark-base))]/8 text-[hsl(var(--dark-base))]"];
              const tops = ["bg-primary", "bg-[hsl(var(--indigo))]", "bg-[hsl(var(--sky))]", "bg-[hsl(var(--dark-base))]"];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="card-surface lift h-full overflow-hidden relative">
                    <div className={`absolute top-0 inset-x-0 h-1 ${tops[i]}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className={`h-11 w-11 rounded-xl ${tints[i]} flex items-center justify-center`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground/70">0{i + 1}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{it.title}</h3>
                      <p className="text-sm text-muted-foreground leading-[1.7]">{it.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 bg-[hsl(var(--dark-base))]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 text-center">
            {[
              { num: "40+", label: x.stats.projects, color: "text-primary" },
              { num: "8", label: x.stats.industries, color: "text-[hsl(var(--indigo))]" },
              { num: "2 wks", label: x.stats.launch, color: "text-primary" },
              { num: "×3.2", label: x.stats.leads, color: "text-white" },
              { num: "24/7", label: x.stats.uptime, color: "text-primary" },
            ].map((s, i) => (
              <div key={i}>
                <div className={`text-3xl md:text-4xl font-extrabold tracking-tight ${s.color}`}>{s.num}</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-white/60 mt-1.5 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <Eyebrow className="mb-3">{x.cases.eyebrow}</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{x.cases.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{x.cases.sub}</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {x.cases.items.map((c, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="card-surface lift h-full overflow-hidden flex flex-col">
                  <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[56px] md:text-[64px] font-extrabold text-foreground/15 tracking-tighter">{c.metric}</div>
                    </div>
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">{c.niche}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                    <div className="text-3xl font-extrabold text-primary mb-3">{c.metric}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOAL */}
      <GoalSection d={d} x={x} />

      {/* COMPARE */}
      <CompareSection d={d} />

      {/* HOW WE WORK */}
      <section id="how" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow className="justify-center mb-3 inline-flex">Process</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.how.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{d.how.sub}</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-4">
            {d.how.steps.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-surface lift p-5 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mb-3">{i + 1}</div>
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <IndustriesSection d={d} x={x} onCta={() => scrollTo("contact")} />

      {/* PROJECT OPTIONS / PRICING */}
      <section id="options" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow className="justify-center mb-3 inline-flex">Packages</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.options.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{d.options.sub}</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.options.items.map((o, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="card-surface lift h-full p-6 flex flex-col">
                  <div className="font-mono text-xs text-muted-foreground mb-2">0{i + 1}</div>
                  <h3 className="font-bold text-lg mb-2">{o.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{o.text}</p>
                  <div className="text-xs text-primary font-medium mb-4">{x.pricing.onRequest}</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {o.incl.map((inc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => scrollTo("contact", o.id)} variant="outline" size="sm" className="w-full border-border hover:border-primary hover:text-primary">
                    {d.options.cta} <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow className="justify-center mb-3 inline-flex">{x.team.eyebrow}</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{x.team.title}</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {x.team.members.map((m, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="card-surface lift p-6 text-center">
                  <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center text-xl font-bold text-white mb-4 ${["bg-gradient-to-br from-primary to-[hsl(var(--sky))]","bg-gradient-to-br from-[hsl(var(--indigo))] to-primary","bg-gradient-to-br from-[hsl(var(--sky))] to-[hsl(var(--indigo))]"][i]}`}>
                    {m.initials}
                  </div>
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mt-1 mb-3">{m.role}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-[hsl(var(--card-tint))] border-y border-border">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow className="justify-center mb-3 inline-flex">{x.testimonials.eyebrow}</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{x.testimonials.title}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {x.testimonials.items.map((tst, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="card-surface p-6 h-full flex flex-col">
                  <Quote className="h-7 w-7 text-primary mb-3" />
                  <p className="text-[15px] leading-[1.7] text-foreground/90 flex-1">"{tst.quote}"</p>
                  <div className="flex items-center gap-0.5 mt-5 mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-sm">{tst.name}</div>
                    <div className="text-xs text-muted-foreground">{tst.role} · {tst.company}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection d={d} x={x} lang={lang} preselected={selectedPkg} />

      {/* DARK CTA STRIP */}
      <section className="py-16 md:py-20 bg-[hsl(var(--dark-base))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(var(--primary) / 0.25), transparent 60%)" }} />
        <div className="container relative">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{x.ctaStrip.title}</h3>
              <p className="text-white/60 leading-relaxed max-w-xl">{x.ctaStrip.sub}</p>
            </div>
            <Button size="lg" onClick={() => scrollTo("contact")} className="h-14 px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-[var(--shadow-teal)] whitespace-nowrap">
              {x.ctaStrip.cta} <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--dark-base))] text-white pt-16 pb-8">
        <div className="container">
          <div className="grid md:grid-cols-[1.5fr_1fr_1.4fr] gap-10">
            <div>
              <Logo inverted />
              <p className="text-sm text-white/60 mt-5 max-w-sm leading-relaxed">{d.footer.desc}</p>
              <p className="text-xs text-white/40 mt-4 italic">{d.footer.tag}</p>
              <div className="flex items-center gap-1 text-xs bg-white/5 rounded-lg p-0.5 border border-white/10 mt-6 w-fit">
                {(["EN", "UA", "RO"] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-md transition ${lang === l ? "bg-primary text-primary-foreground font-medium" : "text-white/60 hover:text-white"}`}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4 font-semibold">{d.footer.links}</div>
              <div className="flex flex-col gap-2.5 text-sm">
                <button onClick={() => scrollTo("build")} className="text-left text-white/70 hover:text-primary transition">{d.nav.build}</button>
                <button onClick={() => scrollTo("cases")} className="text-left text-white/70 hover:text-primary transition">Cases</button>
                <button onClick={() => scrollTo("industries")} className="text-left text-white/70 hover:text-primary transition">{d.nav.industries}</button>
                <button onClick={() => scrollTo("options")} className="text-left text-white/70 hover:text-primary transition">{d.nav.options}</button>
                <Link to="/privacy" className="text-white/70 hover:text-primary transition">Privacy Policy</Link>
                <Link to="/terms" className="text-white/70 hover:text-primary transition">Terms</Link>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4 font-semibold">{d.footer.contact}</div>
              <a href="mailto:laverol.company@gmail.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition mb-4">
                <Mail className="h-4 w-4" /> laverol.company@gmail.com
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://t.me/laverol_company" target="_blank" rel="noopener" className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition">
                  <div className="rounded-lg overflow-hidden w-full aspect-square bg-white flex items-center justify-center">
                    <img src="/qr-telegram.png" alt="Telegram QR" className="w-full h-full object-contain p-1.5" />
                  </div>
                  <span className="text-[11px] font-medium text-white/70">Telegram</span>
                </a>
                <a href="https://wa.me/380934086798" target="_blank" rel="noopener" className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition">
                  <div className="rounded-lg overflow-hidden w-full aspect-square bg-white flex items-center justify-center">
                    <img src="/qr-whatsapp.png" alt="WhatsApp QR" className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="text-[11px] font-medium text-white/70">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-6 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} Laverol Systems</span>
            <span>Built with care.</span>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-20 sticky-bottom-bar bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none pt-6 px-4">
        <Button
          onClick={() => scrollTo("contact")}
          className="w-full pointer-events-auto bg-[hsl(var(--dark-base))] hover:bg-[hsl(var(--dark-base))]/90 text-white h-12 rounded-xl shadow-[var(--shadow-elevated)]"
        >
          {d.nav.cta} <ArrowUpRight className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} />
        </Button>
      </div>

      {/* CONCIERGE */}
      <LaverolConcierge lang={lang} />
    </div>
  );
}

/* ================= HERO DASHBOARD ================= */
function HeroDashboard({ d }: { d: Dict }) {
  return (
    <div className="relative">
      {/* Floating top-left chip */}
      <div className="hidden md:flex absolute -top-4 -left-4 z-20 items-center gap-2 bg-white border border-border rounded-xl shadow-lg px-3 py-2">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">Request received</span>
      </div>
      {/* Floating bottom-right chip */}
      <div className="hidden md:flex absolute -bottom-4 -right-2 z-20 items-center gap-2 bg-[hsl(var(--dark-base))] text-white rounded-xl shadow-xl px-3 py-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">+23% conversion</span>
      </div>

      <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">Analytics</div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 border border-green-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 pulse-soft" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-green-700">Live</span>
          </div>
        </div>
        {/* 2x2 metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "+14", l: "leads today", c: "primary" },
            { v: "38", l: "bot replies", c: "indigo" },
            { v: "6.2%", l: "conversion", c: "primary" },
            { v: "14s", l: "avg response", c: "dark" },
          ].map((m, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted/30 p-3.5">
              <div className={`text-2xl font-extrabold tracking-tight ${m.c === "primary" ? "text-primary" : m.c === "indigo" ? "text-[hsl(var(--indigo))]" : "text-foreground"}`}>{m.v}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="my-5 h-px bg-border" />
        {/* Activity feed */}
        <div className="space-y-2.5">
          {[
            { Icon: MessageSquare, c: "primary", t: "New chat from Instagram", time: "now" },
            { Icon: Bot, c: "indigo", t: "Bot qualified +2 leads", time: "2m" },
            { Icon: Target, c: "sky", t: "Form submission → CRM", time: "5m" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${r.c === "primary" ? "bg-primary/10 text-primary" : r.c === "indigo" ? "bg-[hsl(var(--indigo))]/10 text-[hsl(var(--indigo))]" : "bg-[hsl(var(--sky))]/10 text-[hsl(var(--sky))]"}`}>
                <r.Icon className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs flex-1 font-medium">{r.t}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{r.time}</div>
            </div>
          ))}
        </div>
        {/* Pipeline chips */}
        <div className="mt-5 pt-5 border-t border-border">
          <div className="flex items-center justify-between gap-1.5 text-[10px] sm:text-xs flex-wrap">
            {["Inquiry","Bot","CRM","Deal"].map((step, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-md font-semibold ${i % 2 === 0 ? "bg-primary/10 text-primary border border-primary/25" : "bg-[hsl(var(--indigo))]/10 text-[hsl(var(--indigo))] border border-[hsl(var(--indigo))]/25"}`}>
                  {step}
                </span>
                {i < 3 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= GOAL ================= */
function GoalSection({ d, x }: { d: Dict; x: typeof extras["EN"] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = d.goal.options.find(o => o.id === selected);
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow className="justify-center mb-3 inline-flex">Start with your goal</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.goal.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{d.goal.sub}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {d.goal.options.map(o => (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition ${
                  selected === o.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_6px_20px_-6px_hsl(var(--primary)/0.5)]"
                    : "bg-white border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Reveal>
        {sel && (
          <div className="mt-8 max-w-2xl mx-auto animate-scale-in">
            <div className="card-surface p-6 md:p-8 border-primary/30">
              <div className="text-[10px] uppercase tracking-[0.18em] text-primary mb-2 font-semibold">{x.goal.recLabel}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{sel.recTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{sel.recText}</p>
              <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-[hsl(var(--dark-base))] text-white">
                {d.goal.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= COMPARE ================= */
function CompareSection({ d }: { d: Dict }) {
  const [tab, setTab] = useState<"site" | "system">("system");
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow className="justify-center mb-3 inline-flex">Website vs System</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.compare.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{d.compare.sub}</p>
          </div>
        </Reveal>
        <div className="max-w-4xl mx-auto">
          <div className="md:hidden flex p-1 bg-white border border-border rounded-xl mb-6">
            {(["site", "system"] as const).map(k => (
              <button key={k} onClick={() => setTab(k)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                {k === "site" ? d.compare.tab1 : d.compare.tab2}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {(["site", "system"] as const).map(k => {
              const c = k === "site" ? d.compare.site : d.compare.system;
              const visible = tab === k;
              return (
                <div key={k} className={`${visible ? "block" : "hidden md:block"}`}>
                  <div className={`card-surface p-6 h-full ${k === "system" ? "border-primary/30" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {k === "system" && <Sparkles className="h-4 w-4 text-primary" />}
                      <h3 className="text-xl font-bold">{c.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{c.text}</p>
                    <ul className="space-y-2.5">
                      {c.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                          <div className={`h-1.5 w-1.5 rounded-full mt-2 ${k === "system" ? "bg-primary" : "bg-muted-foreground"}`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          <Reveal delay={150}>
            <div className="mt-8 text-center text-sm md:text-base text-muted-foreground italic max-w-xl mx-auto">
              "{d.compare.key}"
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= INDUSTRIES ================= */
function IndustriesSection({ d, onCta }: { d: Dict; onCta: () => void }) {
  const [tab, setTab] = useState(0);
  const Icons = [Wrench, Building2, Store, Gem];
  return (
    <section id="industries" className="py-20 md:py-28">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow className="justify-center mb-3 inline-flex">Industries</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.industries.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{d.industries.sub}</p>
          </div>
        </Reveal>

        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="flex gap-2 mb-6 flex-wrap">
            {d.industries.items.map((it, i) => {
              const Icon = Icons[i];
              return (
                <button key={it.id} onClick={() => setTab(i)} className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition ${tab === i ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border hover:border-primary/40"}`}>
                  <Icon className="h-4 w-4" /> {it.title}
                </button>
              );
            })}
          </div>
          <div className="card-surface p-8 animate-fade-in" key={tab}>
            <h3 className="text-2xl font-bold mb-3">{d.industries.items[tab].title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{d.industries.items[tab].text}</p>
            <div className="rounded-xl border border-border bg-muted/40 p-4 mb-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 font-semibold">Common setup</div>
              <div className="text-sm font-mono text-foreground/80">{d.industries.items[tab].flow}</div>
            </div>
            <Button onClick={onCta} className="bg-[hsl(var(--dark-base))] text-white">
              {d.industries.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-3">
          {d.industries.items.map((it, i) => {
            const Icon = Icons[i];
            const open = tab === i;
            return (
              <div key={it.id} className="card-surface overflow-hidden">
                <button onClick={() => setTab(open ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-semibold">{it.title}</div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition ${open ? "rotate-90" : ""}`} />
                </button>
                {open && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-in">
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                    <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs font-mono">{it.flow}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function ContactSection({ d, x, lang, preselected }: { d: Dict; x: typeof extras["EN"]; lang: Lang; preselected: string }) {
  const [form, setForm] = useState({ need: preselected, contact: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm(f => ({ ...f, need: preselected })); }, [preselected]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact.trim()) {
      toast({ title: d.form.contact, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const needLabel = d.form.needs.find(n => n.id === form.need)?.label ?? form.need;
    const { error } = await supabase.from("leads").insert({
      source: "contact_form",
      need: needLabel,
      contact: form.contact,
      website_or_social: form.message || null,
      language: lang,
      user_agent: navigator.userAgent.slice(0, 500),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 pb-32 md:pb-28">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <Eyebrow className="justify-center mb-3 inline-flex">Contact</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{d.form.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{d.form.sub}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-surface p-6 md:p-8">
              {done ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{d.form.done}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">{d.form.doneSub}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-foreground/70 mb-1.5 block">{d.form.need}</span>
                    <select value={form.need} onChange={e => setForm({...form, need: e.target.value})} className="contact-input">
                      {d.form.needs.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-foreground/70 mb-1.5 block">{d.form.contact} *</span>
                    <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} maxLength={500} required placeholder="@telegram / +380... / email@..." className="contact-input" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-foreground/70 mb-1.5 block">{d.form.need}</span>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} maxLength={1000} rows={4} placeholder="Tell us what you'd like to build…" className="contact-input resize-none" />
                  </label>
                  <Button type="submit" size="lg" disabled={submitting} className="w-full h-13 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold shadow-[var(--shadow-teal)]">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{d.form.send} <ArrowUpRight className="h-4 w-4" /></>}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">{x.reply}</p>
                </form>
              )}
            </div>
          </Reveal>

          {!done && (
            <Reveal delay={200}>
              <a href="https://t.me/laverol_company" target="_blank" rel="noopener" className="mt-4 flex items-center justify-center gap-2 h-12 rounded-xl bg-[hsl(var(--dark-base))] text-white hover:opacity-90 transition font-semibold">
                <Send className="h-4 w-4 text-primary" /> {x.writeDirect} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          )}
        </div>
      </div>
      <style>{`.contact-input { width:100%; background:hsl(var(--muted)/0.5); border:1px solid hsl(var(--border)); border-radius:0.75rem; padding:0.75rem 0.95rem; font-size:0.9rem; outline:none; transition:border-color .2s, background .2s, box-shadow .2s; color:hsl(var(--foreground)); }
.contact-input:focus { border-color:hsl(var(--primary)/0.7); background:#fff; box-shadow:0 0 0 4px hsl(var(--primary)/0.12); }
.contact-input::placeholder{color:hsl(var(--muted-foreground));}`}</style>
    </section>
  );
}
