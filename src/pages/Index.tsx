import { useEffect, useRef, useState, type RefObject } from "react";
import {
  ArrowRight, Globe, MessageSquare, Sparkles, Workflow, Bot, FileText,
  Target, Zap, Award, Search, ChevronRight, Check, Menu, X, Loader2,
  CheckCircle2, Mail, Send, Wrench, Building2, Store, Gem, ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaverolConcierge } from "@/components/LaverolConcierge";
import { t, type Lang, type Dict } from "@/i18n/laverol";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

function useReveal<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
      <span className="font-bold text-primary-foreground text-sm">L</span>
    </div>
    <div className="leading-none">
      <div className="font-bold text-[15px] tracking-tight">Laverol</div>
      <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Systems</div>
    </div>
  </div>
);

export default function Index() {
  const [lang, setLang] = useState<Lang>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const d = t[lang];

  useEffect(() => {
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("uk") || browser.startsWith("ru")) setLang("UA");
    else if (browser.startsWith("ro")) setLang("RO");
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-30">
        <div className="glass-strong border-b border-border/60">
          <div className="container flex h-16 items-center justify-between gap-4">
            <button onClick={() => scrollTo("hero")} className="focus:outline-none"><Logo /></button>
            <nav className="hidden md:flex items-center gap-7 text-sm">
              <button onClick={() => scrollTo("build")} className="text-muted-foreground hover:text-foreground transition">{d.nav.build}</button>
              <button onClick={() => scrollTo("how")} className="text-muted-foreground hover:text-foreground transition">{d.nav.how}</button>
              <button onClick={() => scrollTo("industries")} className="text-muted-foreground hover:text-foreground transition">{d.nav.industries}</button>
              <button onClick={() => scrollTo("options")} className="text-muted-foreground hover:text-foreground transition">{d.nav.options}</button>
              <button onClick={() => scrollTo("contact")} className="text-muted-foreground hover:text-foreground transition">{d.nav.contact}</button>
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-0.5 text-xs bg-secondary/60 rounded-full p-0.5 border border-border/60">
                {(["EN", "UA", "RO"] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full transition ${lang === l ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
                ))}
              </div>
              <Button onClick={() => scrollTo("contact")} size="sm" className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
                {d.nav.cta}
              </Button>
              <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted/50" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-x-4 top-4 glass-strong rounded-2xl p-5 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <Logo />
              <button onClick={() => setMenuOpen(false)} className="p-1.5"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-1 text-base">
              {[
                { id: "build", label: d.nav.build },
                { id: "how", label: d.nav.how },
                { id: "industries", label: d.nav.industries },
                { id: "options", label: d.nav.options },
                { id: "contact", label: d.nav.contact },
              ].map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left py-3 px-2 rounded-lg hover:bg-muted/50">{item.label}</button>
              ))}
            </nav>
            <div className="flex items-center gap-1 text-xs bg-secondary/60 rounded-full p-0.5 border border-border/60 mt-4 w-fit">
              {(["EN", "UA", "RO"] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-full ${lang === l ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground"}`}>{l}</button>
              ))}
            </div>
            <Button onClick={() => scrollTo("contact")} className="w-full mt-4">{d.nav.cta}</Button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero pointer-events-none" />
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="absolute -top-32 left-1/3 h-[400px] w-[400px] orb bg-primary/30 drift hidden md:block" />
        <div className="absolute top-40 right-10 h-[300px] w-[300px] orb bg-accent/20 drift hidden md:block" style={{ animationDelay: "3s" }} />

        <div className="container relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-soft" />
                  {d.hero.tag}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                  {d.hero.title.split(" ").slice(0, -3).join(" ")}{" "}
                  <span className="text-gradient">{d.hero.title.split(" ").slice(-3).join(" ")}</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">{d.hero.sub}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] h-12">
                    {d.hero.cta1} <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollTo("build")} className="border-border bg-secondary/40 hover:bg-secondary h-12">
                    {d.hero.cta2}
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                  {[d.hero.v1, d.hero.v2, d.hero.v3].map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" /> {v}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <HeroDashboard d={d} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="build" className="py-20 md:py-28 relative">
        <div className="container">
          <Reveal>
            <SectionHead title={d.build.title} sub={d.build.sub} />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {d.build.items.map((it, i) => {
              const Icon = [Globe, FileText, Bot, Workflow][i];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass rounded-2xl p-6 lift h-full">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{it.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHOOSE GOAL */}
      <GoalSection d={d} />

      {/* WEBSITE VS SYSTEM */}
      <CompareSection d={d} />

      {/* SYSTEM MAP */}
      <MapSection d={d} onCta={() => scrollTo("contact")} />

      {/* HOW WE WORK */}
      <section id="how" className="py-20 md:py-28">
        <div className="container">
          <Reveal><SectionHead title={d.how.title} sub={d.how.sub} /></Reveal>
          <div className="grid md:grid-cols-5 gap-4 mt-12">
            {d.how.steps.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="glass rounded-2xl p-5 h-full lift relative">
                  <div className="text-xs font-mono text-primary mb-2">0{i + 1}</div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <IndustriesSection d={d} onCta={() => scrollTo("contact")} />

      {/* PROJECT OPTIONS */}
      <section id="options" className="py-20 md:py-28">
        <div className="container">
          <Reveal><SectionHead title={d.options.title} sub={d.options.sub} /></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {d.options.items.map((o, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="glass rounded-2xl p-6 lift h-full flex flex-col">
                  <div className="text-xs font-mono text-primary mb-2">0{i + 1}</div>
                  <h3 className="font-semibold text-lg mb-2">{o.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{o.text}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {o.incl.map((inc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => scrollTo("contact")} variant="outline" size="sm" className="w-full border-border hover:border-primary/50 hover:bg-primary/5">
                    {d.options.cta} <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NOT SURE */}
      <section className="py-16">
        <div className="container">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 orb bg-primary/30" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{d.unsure.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{d.unsure.text}</p>
                </div>
                <Button size="lg" onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 whitespace-nowrap">
                  {d.unsure.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactSection d={d} lang={lang} />

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12 mt-10">
        <div className="container">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-8">
            <div>
              <Logo />
              <p className="text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">{d.footer.desc}</p>
              <p className="text-xs text-muted-foreground/70 mt-4 italic">{d.footer.tag}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{d.footer.links}</div>
              <div className="flex flex-col gap-2 text-sm">
                <button onClick={() => scrollTo("build")} className="text-left text-muted-foreground hover:text-foreground">{d.nav.build}</button>
                <button onClick={() => scrollTo("how")} className="text-left text-muted-foreground hover:text-foreground">{d.nav.how}</button>
                <button onClick={() => scrollTo("industries")} className="text-left text-muted-foreground hover:text-foreground">{d.nav.industries}</button>
                <button onClick={() => scrollTo("options")} className="text-left text-muted-foreground hover:text-foreground">{d.nav.options}</button>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{d.footer.contact}</div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span>hello@laverol.systems</span>
                <span>Telegram: @laverol</span>
                <span>WhatsApp: on request</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border/60 mt-10 pt-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} Laverol Systems</span>
            <span>Built with care.</span>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <Button onClick={() => scrollTo("contact")} className="w-full pointer-events-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)] h-12">
          {d.nav.cta} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* CONCIERGE */}
      <LaverolConcierge lang={lang} />
    </div>
  );
}

/* ================= SECTION HEAD ================= */
function SectionHead({ title, sub, center = true }: { title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {sub && <p className="text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ================= HERO DASHBOARD ================= */
function HeroDashboard({ d }: { d: Dict }) {
  return (
    <div className="relative">
      <div className="glass-strong rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-success/15 border border-success/30 flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            </div>
            <div className="text-sm font-medium">{d.hero.panelTitle}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-soft" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Live</span>
          </div>
        </div>
        {/* Rows */}
        <div className="space-y-2.5">
          {[
            { k: d.hero.panelType, v: d.hero.panelTypeVal, Icon: Wrench },
            { k: d.hero.panelGoal, v: d.hero.panelGoalVal, Icon: Target },
            { k: d.hero.panelSource, v: d.hero.panelSourceVal, Icon: Globe },
            { k: d.hero.panelStatus, v: d.hero.panelStatusVal, Icon: Zap },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 px-3.5 py-2.5">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <r.Icon className="h-3.5 w-3.5" /> {r.k}
              </div>
              <div className="text-sm font-medium">{r.v}</div>
            </div>
          ))}
        </div>
        {/* Flow */}
        <div className="mt-5 pt-5 border-t border-border/60">
          <div className="flex items-center justify-between gap-1.5 text-[10px] sm:text-xs">
            {d.hero.flow.map((step, i) => (
              <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`px-2 py-1 rounded-md ${i === d.hero.flow.length - 1 ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary border border-border"}`}>
                  {step}
                </span>
                {i < d.hero.flow.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 bg-primary/10 blur-2xl -z-10 rounded-3xl" />
    </div>
  );
}

/* ================= GOAL ================= */
function GoalSection({ d }: { d: Dict }) {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = d.goal.options.find(o => o.id === selected);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container">
        <Reveal><SectionHead title={d.goal.title} sub={d.goal.sub} /></Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {d.goal.options.map(o => (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={`px-5 py-3 rounded-xl border transition text-sm font-medium ${
                  selected === o.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
                    : "glass border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Reveal>
        {sel && (
          <div className="mt-8 max-w-2xl mx-auto animate-scale-in">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border-primary/30">
              <div className="text-xs uppercase tracking-wider text-primary mb-2">Recommendation</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{sel.recTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{sel.recText}</p>
              <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
    <section className="py-20 md:py-28">
      <div className="container">
        <Reveal><SectionHead title={d.compare.title} sub={d.compare.sub} /></Reveal>
        <div className="max-w-4xl mx-auto mt-10">
          {/* Mobile tabs */}
          <div className="md:hidden flex p-1 bg-secondary/40 rounded-xl border border-border mb-6">
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
                <div key={k} className={`${k === "site" ? "" : "md:scale-100"} ${visible ? "block" : "hidden md:block"}`}>
                  <div className={`glass rounded-2xl p-6 h-full ${k === "system" ? "border-primary/30 lift" : ""}`}>
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

/* ================= MAP ================= */
function MapSection({ d, onCta }: { d: Dict; onCta: () => void }) {
  const [active, setActive] = useState(0);
  const Icons = [Search, Globe, Bot, Send];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container">
        <Reveal><SectionHead title={d.map.title} sub={d.map.sub} /></Reveal>

        <div className="max-w-5xl mx-auto mt-12">
          {/* Desktop horizontal */}
          <div className="hidden md:flex items-stretch gap-2">
            {d.map.steps.map((s, i) => {
              const Icon = Icons[i];
              return (
                <div key={s.id} className="flex-1 flex items-stretch">
                  <button
                    onClick={() => setActive(i)}
                    className={`flex-1 glass rounded-2xl p-5 text-left transition lift ${active === i ? "border-primary/50 bg-primary/5" : ""}`}
                  >
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center mb-3 ${active === i ? "bg-primary/15 border border-primary/30" : "bg-secondary border border-border"}`}>
                      <Icon className={`h-4 w-4 ${active === i ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mb-1">0{i + 1}</div>
                    <div className="font-semibold mb-1.5">{s.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{s.text}</div>
                  </button>
                  {i < d.map.steps.length - 1 && (
                    <div className="flex items-center px-1 text-muted-foreground">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-3">
            {d.map.steps.map((s, i) => {
              const Icon = Icons[i];
              return (
                <div key={s.id} className="relative">
                  <div className="glass rounded-2xl p-4 flex gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-1">{s.text}</div>
                    </div>
                  </div>
                  {i < d.map.steps.length - 1 && (
                    <div className="flex justify-center py-1 text-muted-foreground">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" onClick={onCta} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {d.map.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
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
        <Reveal><SectionHead title={d.industries.title} sub={d.industries.sub} /></Reveal>

        {/* Desktop tabs */}
        <div className="hidden md:block max-w-5xl mx-auto mt-12">
          <div className="flex gap-2 mb-6 flex-wrap">
            {d.industries.items.map((it, i) => {
              const Icon = Icons[i];
              return (
                <button key={it.id} onClick={() => setTab(i)} className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition ${tab === i ? "bg-primary text-primary-foreground border-primary" : "glass border-border hover:border-primary/40"}`}>
                  <Icon className="h-4 w-4" /> {it.title}
                </button>
              );
            })}
          </div>
          <div className="glass-strong rounded-2xl p-8 animate-fade-in" key={tab}>
            <h3 className="text-2xl font-bold mb-3">{d.industries.items[tab].title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{d.industries.items[tab].text}</p>
            <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Common setup</div>
              <div className="text-sm font-mono text-foreground/90">{d.industries.items[tab].flow}</div>
            </div>
            <Button onClick={onCta} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {d.industries.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-3 mt-10">
          {d.industries.items.map((it, i) => {
            const Icon = Icons[i];
            const open = tab === i;
            return (
              <div key={it.id} className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setTab(open ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-semibold">{it.title}</div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition ${open ? "rotate-90" : ""}`} />
                </button>
                {open && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-in">
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                    <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs font-mono">{it.flow}</div>
                  </div>
                )}
              </div>
            );
          })}
          <Button onClick={onCta} className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
            {d.industries.cta} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function ContactSection({ d, lang }: { d: Dict; lang: Lang }) {
  const [form, setForm] = useState({ name: "", btype: "", site: "", need: d.form.needs[0], contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact.trim()) {
      toast({ title: d.form.contact, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      source: "contact_form",
      name: form.name || null,
      business_type: form.btype || null,
      website_or_social: form.site || null,
      need: form.need,
      contact: form.contact,
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
          <Reveal><SectionHead title={d.form.title} sub={d.form.sub} /></Reveal>

          <Reveal delay={100}>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mt-10">
              {done ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="mx-auto h-14 w-14 rounded-full bg-success/15 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold">{d.form.done}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">{d.form.doneSub}</p>
                  <p className="text-xs text-muted-foreground/70">{d.form.doneHint}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <Field label={d.form.name}>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} maxLength={200} className="input-field" />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label={d.form.btype}>
                      <input value={form.btype} onChange={e => setForm({...form, btype: e.target.value})} maxLength={200} className="input-field" />
                    </Field>
                    <Field label={d.form.site}>
                      <input value={form.site} onChange={e => setForm({...form, site: e.target.value})} maxLength={500} placeholder="@instagram / yoursite.com" className="input-field" />
                    </Field>
                  </div>
                  <Field label={d.form.need}>
                    <select value={form.need} onChange={e => setForm({...form, need: e.target.value})} className="input-field">
                      {d.form.needs.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                  <Field label={d.form.contact} required>
                    <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} maxLength={500} required placeholder="@telegram / +380... / email@..." className="input-field" />
                  </Field>
                  <p className="text-xs text-muted-foreground">{d.form.micro}</p>
                  <Button type="submit" size="lg" disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{d.form.send} <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`.input-field { width: 100%; background: hsl(var(--secondary) / 0.4); border: 1px solid hsl(var(--border)); border-radius: 0.625rem; padding: 0.7rem 0.875rem; font-size: 0.875rem; outline: none; transition: border-color .2s; color: hsl(var(--foreground)); }
.input-field:focus { border-color: hsl(var(--primary) / 0.6); }`}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}
