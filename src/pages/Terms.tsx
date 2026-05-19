import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  { h: "Scope", p: "These terms cover the use of laverol.systems and any projects delivered by Laverol Systems." },
  { h: "Service", p: "We design and build custom websites, smart bots, lead systems and integrations on a project-by-project basis. Each engagement is defined by a separate written proposal." },
  { h: "Estimates and timelines", p: "Estimates are based on the scope agreed at the start of a project. Changes to scope may affect timeline or price; we will inform you in writing before proceeding." },
  { h: "Payments", p: "Payment terms are defined per project and confirmed in writing before work begins." },
  { h: "Ownership", p: "After full payment, the final deliverables of your project belong to your business. Reusable components, frameworks and tools developed by Laverol Systems remain ours." },
  { h: "Confidentiality", p: "We treat business information you share during the project as confidential and do not disclose it to third parties without consent." },
  { h: "Liability", p: "Laverol Systems is not liable for indirect or consequential losses. Our liability is limited to the amount paid for the affected project." },
  { h: "Changes", p: "We may update these terms occasionally. The version on the site at the time of your project is the one that applies." },
  { h: "Contact", p: "Questions? Email laverol.company@gmail.com or message @laverol_company on Telegram." },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-16 md:py-24 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: May 2026</p>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold mb-2">{s.h}</h2>
              <p className="text-muted-foreground leading-[1.75]">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
