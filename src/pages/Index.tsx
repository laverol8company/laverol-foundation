import { ArrowRight, Globe, MessageSquare, Building2, CheckCircle2, TrendingDown, TrendingUp, Smartphone, Brain, Database, Calendar, Shield, Lock, Server, X } from "lucide-react";
import { useState } from "react";

const translations = {
  UA: {
    nav: {
      howItWorks: "Як це працює",
      economics: "Економіка",
      pricing: "Тарифи",
      demoCall: "Демо-дзвінок"
    },
    hero: {
      tag: "Real Estate AI",
      titlePart1: "Захоплюйте ",
      titleHighlight: "100% лідів",
      titlePart2: "на нерухомість вночі та під час блекаутів.",
      desc: "Автоматизована система миттєвої відповіді Laverol. Ми відповідаємо за 5 секунд, консультуємо по базі ЖК та записуємо на перегляд.",
      cta: "Подивитися систему в дії",
      feature1: "Відповідь за 5 сек",
      feature2: "24/7/365",
      feature3: "Інтеграція з CRM"
    },
    chat: {
      complex: "ЖК \"Новопечерські Липки\"",
      console: "Laverol AI Console",
      status: "Active",
      msgUser: "Доброго вечора. Чи є в наявності 2-кімнатні квартири від 70м²?",
      msgAi: "Добрий вечір! Так, у нас є 3 варіанти 2-кімнатних квартир площею від 72м² до 85м². Ціни починаються від $120,000. Бажаєте записатися на перегляд завтра?",
      statTime: "Response Time",
      statLeads: "Leads Today",
      statConv: "Conversion"
    },
    economics: {
      title: "Ваше агентство втрачає гроші щоночі.",
      probStat: "30% заявок",
      probText: " приходять у неробочий час. В середньому це ",
      probLoss: "$4,500 втраченої комісії",
      probEnd: " щомісяця.",
      solTitle: "Laverol AI-асистент.",
      solText: " Швидкість відповіді 5 секунд. 0 лікарняних. Економія до ",
      solSave: "$44,400 на рік."
    },
    features: {
      title: "Один AI-мозок. Всі ваші канали.",
      f1Title: "Омніканальне захоплення",
      f1Desc: "Instagram, WhatsApp, Site",
      f2Title: "AI-Кваліфікація",
      f2Desc: "Аналіз бюджету та потреб інвестора",
      f3Title: "Синхронізація з CRM",
      f3Desc: "Автоматичне створення угод без помилок",
      f4Title: "Календар та покази",
      f4Desc: "Миттєве бронювання зустрічей"
    },
    pricing: {
      title: "Прозорі тарифи",
      btn: "Обрати тариф",
      popular: "Найпопулярніший",
      freq1: "разово",
      freq2: "+ $200/міс",
      freq3: "+ $500/міс"
    },
    security: {
      title: "Криптографічна безпека та гарантії",
      t1: "100% GDPR Compliance",
      t2: "AES-256 Шифрування",
      t3: "Ізольовані сервери",
      quote: "\"Ми не продаємо вам 'ще одного чат-бота'. Ми впроваджуємо цифрову дисципліну у ваш бізнес. Якщо за 30 днів система Laverol не окупить себе — ми повернемо гроші без питань.\"",
      sign: "Керуючі партнери Laverol"
    },
    cta: {
      title: "Готові до еволюції продажів?",
      desc: "Забронюйте 15-хвилинний дзвінок. Ми покажемо систему Laverol на прикладі ваших об'єктів.",
      btn: "Забронювати Демо"
    },
    footer: {
      copy: "© 2026 Laverol AI. Усі права захищено.",
      privacy: "Політика конфіденційності",
      terms: "Умови використання"
    },
    modal: {
      title: "Забронювати Демо",
      name: "Ваше ім'я",
      agency: "Назва агентства",
      contact: "Телефон або Telegram",
      submit: "Надіслати заявку"
    }
  },
  EN: {
    nav: {
      howItWorks: "How it works",
      economics: "Economics",
      pricing: "Pricing",
      demoCall: "Demo Call"
    },
    hero: {
      tag: "Real Estate AI",
      titlePart1: "Capture ",
      titleHighlight: "100% of leads",
      titlePart2: "in real estate at night and during blackouts.",
      desc: "Automated instant response system by Laverol. We reply in 5 seconds, consult on properties, and book viewings.",
      cta: "See the system in action",
      feature1: "5s response time",
      feature2: "24/7/365",
      feature3: "CRM Integration"
    },
    chat: {
      complex: "Novopecherskie Lipki",
      console: "Laverol AI Console",
      status: "Active",
      msgUser: "Good evening. Do you have 2-bedroom apartments from 70m²?",
      msgAi: "Good evening! Yes, we have 3 options of 2-bedroom apartments ranging from 72m² to 85m². Prices start at $120,000. Would you like to schedule a viewing tomorrow?",
      statTime: "Response Time",
      statLeads: "Leads Today",
      statConv: "Conversion"
    },
    economics: {
      title: "Your agency is losing money every night.",
      probStat: "30% of inquiries",
      probText: " arrive during non-working hours. On average, this is ",
      probLoss: "$4,500 in lost commission",
      probEnd: " every month.",
      solTitle: "Laverol AI Assistant.",
      solText: " 5-second response time. 0 sick leaves. Savings up to ",
      solSave: "$44,400 per year."
    },
    features: {
      title: "One AI brain. All your channels.",
      f1Title: "Omnichannel capture",
      f1Desc: "Instagram, WhatsApp, Site",
      f2Title: "AI Qualification",
      f2Desc: "Analysis of budget and investor needs",
      f3Title: "CRM Synchronization",
      f3Desc: "Automatic deal creation without errors",
      f4Title: "Calendar & Viewings",
      f4Desc: "Instant meeting booking"
    },
    pricing: {
      title: "Transparent Pricing",
      btn: "Choose Plan",
      popular: "Most Popular",
      freq1: "one-time",
      freq2: "+ $200/mo",
      freq3: "+ $500/mo"
    },
    security: {
      title: "Cryptographic Security & Guarantees",
      t1: "100% GDPR Compliance",
      t2: "AES-256 Encryption",
      t3: "Isolated Servers",
      quote: "\"We don't sell you 'just another chatbot'. We implement digital discipline in your business. If the Laverol system doesn't pay for itself in 30 days, we will refund your money without questions.\"",
      sign: "Managing Partners at Laverol"
    },
    cta: {
      title: "Ready for the sales evolution?",
      desc: "Book a 15-minute call. We will show you the Laverol system using your properties as an example.",
      btn: "Book a Demo"
    },
    footer: {
      copy: "© 2026 Laverol AI. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use"
    },
    modal: {
      title: "Book a Demo",
      name: "Your Name",
      agency: "Agency Name",
      contact: "Phone or Telegram",
      submit: "Submit Application"
    }
  },
  RO: {
    nav: {
      howItWorks: "Cum funcționează",
      economics: "Economie",
      pricing: "Prețuri",
      demoCall: "Apel Demo"
    },
    hero: {
      tag: "Real Estate AI",
      titlePart1: "Captează ",
      titleHighlight: "100% din lead-uri",
      titlePart2: "imobiliare noaptea și în timpul penelor de curent.",
      desc: "Sistem automatizat de răspuns instant Laverol. Răspundem în 5 secunde, oferim consultanță imobiliară și programăm vizionări.",
      cta: "Vezi sistemul în acțiune",
      feature1: "Răspuns în 5 sec",
      feature2: "24/7/365",
      feature3: "Integrare CRM"
    },
    chat: {
      complex: "Complexul Rezidențial",
      console: "Laverol AI Console",
      status: "Active",
      msgUser: "Bună seara. Aveți apartamente cu 2 camere de la 70m²?",
      msgAi: "Bună seara! Da, avem 3 variante de apartamente cu 2 camere cu suprafețe între 72m² și 85m². Prețurile încep de la 120.000$. Doriți să programați o vizionare pentru mâine?",
      statTime: "Timp Răspuns",
      statLeads: "Lead-uri Azi",
      statConv: "Conversie"
    },
    economics: {
      title: "Agenția ta pierde bani în fiecare noapte.",
      probStat: "30% din cereri",
      probText: " sosesc în afara orelor de program. În medie, asta înseamnă ",
      probLoss: "4.500$ comision pierdut",
      probEnd: " în fiecare lună.",
      solTitle: "Asistent AI Laverol.",
      solText: " Timp de răspuns de 5 secunde. 0 zile de concediu medical. Economii de până la ",
      solSave: "44.400$ pe an."
    },
    features: {
      title: "Un creier AI. Toate canalele tale.",
      f1Title: "Captură omnicanal",
      f1Desc: "Instagram, WhatsApp, Site",
      f2Title: "Calificare AI",
      f2Desc: "Analiza bugetului și a nevoilor investitorului",
      f3Title: "Sincronizare CRM",
      f3Desc: "Creare automată a tranzacțiilor fără erori",
      f4Title: "Calendar & Vizionări",
      f4Desc: "Programare instantanee a întâlnirilor"
    },
    pricing: {
      title: "Prețuri Transparente",
      btn: "Alege Planul",
      popular: "Cel mai popular",
      freq1: "o singură dată",
      freq2: "+ 200$/lună",
      freq3: "+ 500$/lună"
    },
    security: {
      title: "Securitate Criptografică & Garanții",
      t1: "100% Conformitate GDPR",
      t2: "Criptare AES-256",
      t3: "Servere Izolate",
      quote: "\"Nu vă vindem 'încă un chatbot'. Implementăm disciplină digitală în afacerea dumneavoastră. Dacă sistemul Laverol nu se amortizează în 30 de zile, vă vom returna banii fără întrebări.\"",
      sign: "Parteneri Manageriali Laverol"
    },
    cta: {
      title: "Gata pentru evoluția vânzărilor?",
      desc: "Rezervați un apel de 15 minute. Vă vom arăta sistemul Laverol folosind proprietățile dumneavoastră ca exemplu.",
      btn: "Rezervă Demo"
    },
    footer: {
      copy: "© 2026 Laverol AI. Toate drepturile rezervate.",
      privacy: "Politica de Confidențialitate",
      terms: "Termeni de Utilizare"
    },
    modal: {
      title: "Rezervă Demo",
      name: "Numele Tău",
      agency: "Numele Agenției",
      contact: "Telefon sau Telegram",
      submit: "Trimite Aplicația"
    }
  }
};

type Language = 'UA' | 'EN' | 'RO';

const Index = () => {
  const [language, setLanguage] = useState<Language>('UA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl font-bold text-cyan-400 tracking-tight">
              Laverol
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
              <a href="#economics" className="hover:text-white transition-colors">{t.nav.economics}</a>
              <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="hidden sm:flex items-center gap-2 text-zinc-500">
              <Globe className="w-4 h-4" />
              {(['UA', 'EN', 'RO'] as Language[]).map((lang, idx, arr) => (
                <span key={lang} className="flex items-center gap-2">
                  <button 
                    onClick={() => setLanguage(lang)}
                    className={`transition-colors ${language === lang ? 'text-cyan-400 font-bold' : 'text-gray-500 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                  {idx < arr.length - 1 && <span>|</span>}
                </span>
              ))}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              {t.nav.demoCall}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t.hero.tag}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                {t.hero.titlePart1}<br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">{t.hero.titleHighlight}</span><br />
                {t.hero.titlePart2}
              </h1>
              
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>{t.hero.feature1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>{t.hero.feature2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>{t.hero.feature3}</span>
                </div>
              </div>
            </div>

            {/* Visual Abstract UI Card */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/20 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-violet-500/20 blur-[80px] rounded-full"></div>
                
                {/* Glass Card */}
                <div className="relative w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{t.chat.complex}</div>
                        <div className="text-zinc-500 text-xs">{t.chat.console}</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      {t.chat.status}
                    </div>
                  </div>

                  {/* Chat Mockup */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-zinc-300 max-w-[80%]">
                        {t.chat.msgUser}
                      </div>
                    </div>
                    
                    <div className="flex items-end gap-2 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <span className="text-cyan-400 text-xs font-bold">L</span>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl rounded-br-none px-4 py-3 text-sm text-cyan-50 max-w-[80%]">
                        {t.chat.msgAi}
                      </div>
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">{t.chat.statTime}</div>
                      <div className="text-cyan-400 font-semibold">1.2s</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">{t.chat.statLeads}</div>
                      <div className="text-white font-semibold">142</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">{t.chat.statConv}</div>
                      <div className="text-violet-400 font-semibold">+34%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Cost of Inaction Section */}
      <section id="economics" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.economics.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-colors duration-300 hover:border-red-500/50 flex flex-col items-start gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-xl text-zinc-300 leading-relaxed">
                <strong className="text-white">{t.economics.probStat}</strong>{t.economics.probText}<strong className="text-red-400">{t.economics.probLoss}</strong>{t.economics.probEnd}
              </p>
            </div>
            
            {/* The Solution */}
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] flex flex-col items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center relative z-10">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-xl text-zinc-300 leading-relaxed relative z-10">
                <strong className="text-white">{t.economics.solTitle}</strong>{t.economics.solText}<strong className="text-cyan-400">{t.economics.solSave}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Features Section */}
      <section id="how-it-works" className="py-24 px-6 relative bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: t.features.f1Title, desc: t.features.f1Desc },
              { icon: Brain, title: t.features.f2Title, desc: t.features.f2Desc },
              { icon: Database, title: t.features.f3Title, desc: t.features.f3Desc },
              { icon: Calendar, title: t.features.f4Title, desc: t.features.f4Desc }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-cyan-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.pricing.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            
            {/* Base Capture */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">Base Capture</h3>
              <div className="text-3xl font-bold text-white mb-6">$699 <span className="text-lg text-zinc-500 font-normal">{t.pricing.freq1}</span></div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

            {/* Smart Agent (Featured) */}
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-400 rounded-2xl p-8 flex flex-col relative shadow-[0_0_20px_rgba(34,211,238,0.2)] md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                {t.pricing.popular}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Agent</h3>
              <div className="text-3xl font-bold text-white mb-6">$2,299 <span className="text-lg text-zinc-500 font-normal">{t.pricing.freq2}</span></div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

            {/* Pro Eco */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">Pro Eco</h3>
              <div className="text-3xl font-bold text-white mb-6">$4,999 <span className="text-lg text-zinc-500 font-normal">{t.pricing.freq3}</span></div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Security & Guarantee Section */}
      <section className="py-24 px-6 relative bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.security.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Tech Cards */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t1}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center">
              <Lock className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t2}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center">
              <Server className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t3}</span>
            </div>
          </div>

          {/* Founders' Letter */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-8 max-w-4xl mx-auto italic">
              {t.security.quote}
            </p>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 font-medium text-lg">
              {t.security.sign}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black border border-white/10 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              {t.cta.title}
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl">
              {t.cta.desc}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 rounded-xl bg-cyan-400 text-black font-semibold text-xl hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]"
            >
              {t.cta.btn}
            </button>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="bg-black border-t border-white/10 py-8 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-500 text-sm">
            {t.footer.copy}
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950/95 border border-white/10 p-8 rounded-2xl w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">{t.modal.title}</h3>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <input 
                type="text" 
                placeholder={t.modal.name} 
                className="bg-black/50 border border-white/10 focus:border-cyan-500 outline-none rounded-lg p-3 w-full text-white placeholder:text-zinc-500 transition-colors"
                required
              />
              <input 
                type="text" 
                placeholder={t.modal.agency} 
                className="bg-black/50 border border-white/10 focus:border-cyan-500 outline-none rounded-lg p-3 w-full text-white placeholder:text-zinc-500 transition-colors"
                required
              />
              <input 
                type="text" 
                placeholder={t.modal.contact} 
                className="bg-black/50 border border-white/10 focus:border-cyan-500 outline-none rounded-lg p-3 w-full text-white placeholder:text-zinc-500 transition-colors"
                required
              />
              <button 
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
              >
                {t.modal.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;