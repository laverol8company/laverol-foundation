import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  { h: "Overview", p: "Laverol Systems builds custom websites, smart bots and simple lead systems. We collect only the information you choose to share when you contact us." },
  { h: "What we collect", p: "When you submit our contact form or use the concierge, we store: the contact handle you provide (Telegram, WhatsApp, email or phone), any project details you share, your selected language and a short user-agent string for spam protection." },
  { h: "How we use it", p: "We use this information only to respond to your request, prepare a recommendation, and keep records of project conversations. We do not sell or share it with third parties for marketing." },
  { h: "Storage", p: "Submissions are stored in our secure backend. Access is limited to the Laverol Systems team." },
  { h: "Your rights", p: "You can ask us to update or delete your information at any time by writing to laverol.company@gmail.com." },
  { h: "Contact", p: "Questions about this policy? Email laverol.company@gmail.com or message us on Telegram @laverol_company." },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-16 md:py-24 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
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
