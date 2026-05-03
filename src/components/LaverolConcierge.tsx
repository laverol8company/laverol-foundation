import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, X, Sparkles, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t, type Lang } from "@/i18n/laverol";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Stage = "welcome" | "question" | "rec" | "contact" | "done";
type RecKey = "WebsiteStart" | "LeadWebsite" | "WebsiteBot" | "Booking" | "Full";

function recommend(answers: number[]): RecKey {
  const [biz, goal, has, issue] = answers;
  // goal index mapping (0-5): More inquiries, Better conv, Online booking, Faster responses, Stronger presentation, Not sure
  if (goal === 2) return "Booking";
  if (goal === 3 || issue === 3 || issue === 2) return "WebsiteBot";
  if (goal === 0 || issue === 0 || has === 3) return "LeadWebsite";
  if (goal === 4 || issue === 5 || has === 0 || has === 2) return "WebsiteStart";
  if (has === 4) return "Full";
  return "LeadWebsite";
}

interface Props { lang: Lang; }

export function LaverolConcierge({ lang }: Props) {
  const c = t[lang].concierge;
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [rec, setRec] = useState<RecKey>("LeadWebsite");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", biz: "", site: "", contact: "" });

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const reset = () => {
    setStage("welcome"); setStep(0); setAnswers([]);
    setForm({ name: "", biz: "", site: "", contact: "" });
  };

  const handleAnswer = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (step + 1 < c.questions.length) {
      setStep(step + 1);
    } else {
      setRec(recommend(next));
      setStage("rec");
    }
  };

  const handleBack = () => {
    if (stage === "contact") { setStage("rec"); return; }
    if (stage === "rec") { setStage("question"); setStep(c.questions.length - 1); setAnswers(answers.slice(0, -1)); return; }
    if (stage === "question" && step > 0) {
      setStep(step - 1); setAnswers(answers.slice(0, -1));
    } else if (stage === "question") {
      setStage("welcome"); setAnswers([]);
    }
  };

  const submit = async () => {
    if (!form.contact.trim()) {
      toast({ title: c.contact.contact, description: "—", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const recTitle = c.recs[rec].title;
    const { error } = await supabase.from("leads").insert({
      source: "concierge",
      name: form.name || null,
      business_name: form.biz || null,
      website_or_social: form.site || null,
      contact: form.contact,
      language: lang,
      concierge_answers: { answers, questions: c.questions.map((q, i) => ({ q: q.q, a: c.questions[i].opts[answers[i]] })) },
      recommendation: recTitle,
      bonus_code: "SMART-START",
      user_agent: navigator.userAgent.slice(0, 500),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setStage("done");
  };

  const q = c.questions[step];
  const progress = stage === "question" ? ((step + 1) / c.questions.length) * 100 : stage === "rec" ? 100 : 0;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group glass-strong rounded-full pl-4 pr-5 py-3 flex items-center gap-2.5 lift hover:border-primary/40"
          aria-label={c.btn}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-primary opacity-60 pulse-soft" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-sm font-medium">{c.btn}</span>
        </button>
      )}

      {/* Overlay + panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex sm:items-end sm:justify-end">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          {/* Panel: uniform clean glass — no gradient top overlay */}
          <div
            className="relative w-full sm:w-[400px] sm:m-6 sm:rounded-2xl rounded-t-2xl mt-auto sm:mt-0 max-h-[92vh] sm:max-h-[80vh] flex flex-col animate-slide-up overflow-hidden"
            style={{
              background: "hsl(0 0% 8% / 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid hsl(0 0% 100% / 0.07)",
              boxShadow: "0 -8px 40px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(0 0% 100% / 0.05) inset",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-border/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.subtitle}</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/50" aria-label={c.close}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            {(stage === "question" || stage === "rec") && (
              <div className="h-1 bg-muted/40">
                <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {stage === "welcome" && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm leading-relaxed whitespace-pre-line">{c.welcome}</p>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => { setStage("question"); setStep(0); }} className="w-full justify-between" size="lg">
                      {c.start} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <button onClick={() => { setAnswers([5,5,5,6,4]); setRec("LeadWebsite"); setStage("rec"); }} className="text-sm text-muted-foreground hover:text-foreground py-2">
                      {c.laterUnsure}
                    </button>
                  </div>
                </div>
              )}

              {stage === "question" && (
                <div className="space-y-4 animate-fade-in" key={step}>
                  <div className="text-xs text-muted-foreground">{c.step} {step + 1} {c.of} {c.questions.length}</div>
                  <h3 className="text-base font-semibold leading-snug">{q.q}</h3>
                  {"helper" in q && q.helper && <p className="text-xs text-muted-foreground">{q.helper}</p>}
                  <div className="flex flex-col gap-2 pt-1">
                    {q.opts.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="text-left text-sm px-4 py-3 rounded-xl border border-border bg-secondary/40 hover:bg-primary/10 hover:border-primary/40 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {stage === "rec" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                    <div className="text-xs uppercase tracking-wider text-primary font-medium">Recommended</div>
                    <div className="text-lg font-semibold">{c.recs[rec].title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.recs[rec].text}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 text-primary" /> {c.bonus.title}
                    </div>
                    <div className="font-mono text-sm text-primary">{c.bonus.code}</div>
                    <p className="text-xs text-muted-foreground">{c.bonus.text}</p>
                  </div>
                  <Button onClick={() => setStage("contact")} className="w-full" size="lg">{c.send}</Button>
                </div>
              )}

              {stage === "contact" && (
                <div className="space-y-3 animate-fade-in">
                  <h3 className="text-base font-semibold">{c.contact.title}</h3>
                  <div className="space-y-2">
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={c.contact.name} className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" maxLength={200} />
                    <input value={form.biz} onChange={e => setForm({...form, biz: e.target.value})} placeholder={c.contact.biz} className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" maxLength={200} />
                    <input value={form.site} onChange={e => setForm({...form, site: e.target.value})} placeholder={c.contact.site} className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" maxLength={500} />
                    <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder={c.contact.contact} className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" maxLength={500} required />
                  </div>
                  <Button onClick={submit} disabled={submitting} className="w-full" size="lg">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{c.contact.send} <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </div>
              )}

              {stage === "done" && (
                <div className="space-y-4 text-center py-6 animate-fade-in">
                  <div className="mx-auto h-12 w-12 rounded-full bg-success/15 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{c.confirm}</p>
                  <Button variant="ghost" onClick={() => { reset(); setOpen(false); }}>{c.close}</Button>
                </div>
              )}
            </div>

            {/* Footer */}
            {(stage === "question" || stage === "contact" || stage === "rec") && (
              <div className="border-t border-border/60 p-3 flex items-center justify-between">
                <button onClick={handleBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
                </button>
                <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1.5">
                  {c.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
