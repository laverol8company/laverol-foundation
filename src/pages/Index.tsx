import { ArrowRight, Globe, MessageSquare, Building2, CheckCircle2, TrendingDown, TrendingUp, Smartphone, Brain, Database, Calendar, Shield, Lock, Server, X, XCircle, ChevronDown, ChevronUp } from "lucide-react";
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
      titlePart2: "на нерухомість 24/7",
      desc: "Автоматизована система миттєвої відповіді Laverol. Ми відповідаємо за 5 секунд, консультуємо по базі ЖК та записуємо на перегляд.",
      cta: "Подивитися систему в дії",
      feature1: "Відповідь за 5 сек",
      feature2: "24/7/365",
      feature3: "Інтеграція з CRM"
    },
    chat: {
      complex: "ЖК \"Новопечерські Липки\"",
      console: "Laverol AI Console",
      status: "Online",
      msgUser: "Привіт! Шукаю 2к квартиру з видом на Дніпро, бюджет до $150K. Є варіанти?",
      msgAi: "Вітаю! 🏙️ Знайшла 4 квартири під ваш запит. Топ-варіант: 78м², 12 поверх, панорамні вікна на Дніпро — $142,000. Вільний слот на перегляд завтра о 14:00. Забронювати?",
      statTime: "Відповідь",
      statTimeVal: "1.2с",
      statLeads: "Ліди сьогодні",
      statLeadsVal: "142",
      statConv: "Конверсія",
      statConvVal: "+34%"
    },
    economics: {
      title: "Ваше агентство втрачає клієнтів у неробочий час.",
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
    ecoJustify: {
      title: "Економіка: Люди проти Системи",
      subtitle: "Чому інвестиція в Laverol окупується в перший же місяць",
      humanTitle: "Живий відділ продажу (3 людини)",
      humanPoint1: "Зарплата: ~$3,000/міс",
      humanPoint2: "Податки та робочі місця",
      humanPoint3: "Сплять, хворіють, вигорають",
      humanTotal: "Витрати: ~$46,800 / рік",
      aiTitle: "Нашa AI система",
      aiPoint1: "Єдиноразова оплата за впровадження",
      aiPoint2: "0 податків, 0 лікарняних",
      aiPoint3: "Відповідає за 5 секунд, 24/7",
      aiTotal: "Витрати: від $699 (Разово)",
      ecoBadge: "Окупається в перший же місяць"
    },
    pricing: {
      title: "Прозорі тарифи",
      btn: "Обрати тариф",
      popular: "Хіт продажу",
      tier1Name: "Core Capture",
      tier1Price: "$699 разово",
      tier1F1: "1 месенджер (Insta/TG)",
      tier1F2: "Відповідь 5 сек",
      tier1F3: "Базова кваліфікація",
      tier1F4: "Сповіщення в Telegram",
      tier2Name: "Quantum Broker",
      tier2Price: "$2,299",
      tier2Freq: "+ $200/міс",
      tier2F1: "Омніканальність",
      tier2F2: "Синхронізація з CRM",
      tier2F3: "Розпізнавання аудіо",
      tier2F4: "Календар показів",
      tier3Name: "Omni Matrix",
      tier3Price: "$4,999",
      tier3Freq: "+ $500/міс",
      tier3F1: "Все з Quantum",
      tier3F2: "Преміум-сайт під ключ",
      tier3F3: "Кастомне навчання AI",
      tier3F4: "Виділений сервер"
    },
    caseStudy: {
      title: "Кейси: +42% до конверсії в перший місяць",
      text: "Середній результат наших клієнтів після впровадження Laverol AI. Жодного втраченого нічного ліда."
    },
    faq: {
      title: "Часті запитання",
      q1: "Чи буде AI вигадувати неіснуючі квартири?",
      a1: "Ні. Система працює суворо по вашій базі об'єктів (XML/API) і не фантазує. Якщо квартири немає — вона запропонує альтернативу.",
      q2: "Скільки часу займає впровадження?",
      a2: "Від 3 до 7 днів. Ми самі підключаємо ваші месенджери та CRM, ви отримуєте готовий інструмент.",
      q3: "Чи потрібно мені змінювати мою CRM?",
      a3: "Ні, Laverol безшовно інтегрується з amoCRM, Bitrix24, Zoho та іншими популярними системами."
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
      titlePart2: "in real estate 24/7",
      desc: "Automated instant response system by Laverol. We reply in 5 seconds, consult on properties, and book viewings.",
      cta: "See the system in action",
      feature1: "5s response time",
      feature2: "24/7/365",
      feature3: "CRM Integration"
    },
    chat: {
      complex: "Riverside Towers",
      console: "Laverol AI Console",
      status: "Online",
      msgUser: "Hi! Looking for a 2-bed apartment with river view, budget up to $150K. Any options?",
      msgAi: "Welcome! 🏙️ Found 4 apartments matching your request. Top pick: 78m², 12th floor, panoramic river view — $142,000. Free slot for viewing tomorrow at 2 PM. Shall I book it?",
      statTime: "Response",
      statTimeVal: "1.2s",
      statLeads: "Leads Today",
      statLeadsVal: "142",
      statConv: "Conversion",
      statConvVal: "+34%"
    },
    economics: {
      title: "Your agency loses clients outside working hours.",
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
    ecoJustify: {
      title: "Economics: Humans vs System",
      subtitle: "Why investing in Laverol pays for itself in the first month",
      humanTitle: "Live sales team (3 people)",
      humanPoint1: "Salary: ~$3,000/mo",
      humanPoint2: "Taxes and office space",
      humanPoint3: "Sleep, get sick, burn out",
      humanTotal: "Cost: ~$46,800 / year",
      aiTitle: "Our AI System",
      aiPoint1: "One-time implementation fee",
      aiPoint2: "0 taxes, 0 sick days",
      aiPoint3: "Responds in 5 seconds, 24/7",
      aiTotal: "Cost: from $699 (One-time)",
      ecoBadge: "Pays for itself in the first month"
    },
    pricing: {
      title: "Transparent Pricing",
      btn: "Choose Plan",
      popular: "Best Seller",
      tier1Name: "Core Capture",
      tier1Price: "$699 one-time",
      tier1F1: "1 messenger (Insta/TG)",
      tier1F2: "5-second response",
      tier1F3: "Basic qualification",
      tier1F4: "Telegram notifications",
      tier2Name: "Quantum Broker",
      tier2Price: "$2,299",
      tier2Freq: "+ $200/mo",
      tier2F1: "Omnichannel",
      tier2F2: "CRM synchronization",
      tier2F3: "Audio recognition",
      tier2F4: "Viewing calendar",
      tier3Name: "Omni Matrix",
      tier3Price: "$4,999",
      tier3Freq: "+ $500/mo",
      tier3F1: "Everything in Quantum",
      tier3F2: "Premium turnkey website",
      tier3F3: "Custom AI training",
      tier3F4: "Dedicated server"
    },
    caseStudy: {
      title: "Case Studies: +42% Conversion in the First Month",
      text: "Average results for our clients after implementing Laverol AI. Zero missed night leads."
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "Will the AI make up non-existent apartments?",
      a1: "No. The system works strictly based on your property database (XML/API) and does not hallucinate. If an apartment doesn't exist, it will suggest an alternative.",
      q2: "How long does implementation take?",
      a2: "3 to 7 days. We connect your messengers and CRM ourselves; you receive a ready-to-use tool.",
      q3: "Do I need to change my CRM?",
      a3: "No, Laverol seamlessly integrates with amoCRM, Bitrix24, Zoho, and other popular systems."
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
      titlePart2: "imobiliare 24/7",
      desc: "Sistem automatizat de răspuns instant Laverol. Răspundem în 5 secunde, oferim consultanță imobiliară și programăm vizionări.",
      cta: "Vezi sistemul în acțiune",
      feature1: "Răspuns în 5 sec",
      feature2: "24/7/365",
      feature3: "Integrare CRM"
    },
    chat: {
      complex: "Complexul Riverside",
      console: "Laverol AI Console",
      status: "Online",
      msgUser: "Bună! Caut apartament 2 camere cu vedere la râu, buget până la 150K$. Există opțiuni?",
      msgAi: "Bine ați venit! 🏙️ Am găsit 4 apartamente conform cererii. Top: 78m², etaj 12, panoramă spre râu — 142.000$. Slot liber pentru vizionare mâine la 14:00. Rezerv?",
      statTime: "Răspuns",
      statTimeVal: "1.2s",
      statLeads: "Lead-uri Azi",
      statLeadsVal: "142",
      statConv: "Conversie",
      statConvVal: "+34%"
    },
    economics: {
      title: "Agenția ta pierde clienți în afara orelor de lucru.",
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
    ecoJustify: {
      title: "Economie: Oameni vs Sistem",
      subtitle: "De ce investiția în Laverol se amortizează în prima lună",
      humanTitle: "Echipă de vânzări (3 persoane)",
      humanPoint1: "Salariu: ~$3.000/lună",
      humanPoint2: "Taxe și spațiu de birou",
      humanPoint3: "Dorm, se îmbolnăvesc, se epuizează",
      humanTotal: "Cost: ~$46.800 / an",
      aiTitle: "Sistemul nostru AI",
      aiPoint1: "Plată unică pentru implementare",
      aiPoint2: "0 taxe, 0 zile de concediu medical",
      aiPoint3: "Răspunde în 5 secunde, 24/7",
      aiTotal: "Cost: de la $699 (O singură dată)",
      ecoBadge: "Se amortizează în prima lună"
    },
    pricing: {
      title: "Prețuri Transparente",
      btn: "Alege Planul",
      popular: "Cel mai vândut",
      tier1Name: "Core Capture",
      tier1Price: "$699 o singură dată",
      tier1F1: "1 messenger (Insta/TG)",
      tier1F2: "Răspuns în 5 secunde",
      tier1F3: "Calificare de bază",
      tier1F4: "Notificări Telegram",
      tier2Name: "Quantum Broker",
      tier2Price: "$2.299",
      tier2Freq: "+ $200/lună",
      tier2F1: "Omnicanal",
      tier2F2: "Sincronizare CRM",
      tier2F3: "Recunoaștere audio",
      tier2F4: "Calendar vizionări",
      tier3Name: "Omni Matrix",
      tier3Price: "$4.999",
      tier3Freq: "+ $500/lună",
      tier3F1: "Tot din Quantum",
      tier3F2: "Site premium la cheie",
      tier3F3: "Antrenament AI personalizat",
      tier3F4: "Server dedicat"
    },
    caseStudy: {
      title: "Studii de caz: +42% conversie în prima lună",
      text: "Rezultatele medii ale clienților noștri după implementarea Laverol AI. Zero lead-uri de noapte pierdute."
    },
    faq: {
      title: "Întrebări frecvente",
      q1: "Va inventa AI apartamente inexistente?",
      a1: "Nu. Sistemul funcționează strict pe baza bazei de date a proprietăților (XML/API) și nu halucinează. Dacă un apartament nu există, va sugera o alternativă.",
      q2: "Cât durează implementarea?",
      a2: "De la 3 la 7 zile. Noi conectăm mesageria și CRM-ul; primești un instrument gata de utilizare.",
      q3: "Trebuie să îmi schimb CRM-ul?",
      a3: "Nu, Laverol se integrează perfect cu amoCRM, Bitrix24, Zoho și alte sisteme populare."
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
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
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] group">
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

      {/* Economic Justification Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
            {t.ecoJustify.title}
          </h2>
          <p className="text-gray-400 text-center text-lg mb-16">{t.ecoJustify.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Human Card */}
            <div className="bg-white/5 border border-red-500/20 rounded-2xl p-8 relative h-full transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
              <h3 className="text-xl font-semibold text-white mb-6">{t.ecoJustify.humanTitle}</h3>
              <ul className="space-y-4">
                {[t.ecoJustify.humanPoint1, t.ecoJustify.humanPoint2, t.ecoJustify.humanPoint3].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-red-400 text-xl font-bold mt-6">{t.ecoJustify.humanTotal}</p>
            </div>

            {/* AI Card */}
            <div className="bg-white/5 border border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.1)] rounded-2xl p-8 z-10 relative h-full transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]">
              <h3 className="text-xl font-semibold text-white mb-6">{t.ecoJustify.aiTitle}</h3>
              <ul className="space-y-4">
                {[t.ecoJustify.aiPoint1, t.ecoJustify.aiPoint2, t.ecoJustify.aiPoint3].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-cyan-400 text-2xl font-bold mt-6">{t.ecoJustify.aiTotal}</p>
            </div>
          </div>

          {/* Savings Badge */}
          <div className="flex justify-center mt-6 relative z-20">
            <span className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              {t.ecoJustify.ecoBadge}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.pricing.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            
            {/* Tier 1: Core Capture */}
            <div className="bg-blue-950/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
              <h3 className="text-xl font-semibold text-white mb-2">{t.pricing.tier1Name}</h3>
              <div className="text-3xl font-bold text-white mb-6">{t.pricing.tier1Price}</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t.pricing.tier1F1, t.pricing.tier1F2, t.pricing.tier1F3, t.pricing.tier1F4].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

            {/* Tier 2: Quantum Broker (HOT) */}
            <div className="bg-gradient-to-b from-cyan-950/40 to-cyan-900/20 backdrop-blur-xl border-2 border-cyan-400 rounded-2xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(34,211,238,0.25)] scale-105 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                {t.pricing.popular}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.pricing.tier2Name}</h3>
              <div className="text-3xl font-bold text-white mb-6 whitespace-nowrap">{t.pricing.tier2Price} <span className="text-lg text-zinc-500 font-normal">{t.pricing.tier2Freq}</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t.pricing.tier2F1, t.pricing.tier2F2, t.pricing.tier2F3, t.pricing.tier2F4].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

            {/* Tier 3: Omni Matrix */}
            <div className="bg-violet-950/30 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
              <h3 className="text-xl font-semibold text-white mb-2">{t.pricing.tier3Name}</h3>
              <div className="text-3xl font-bold text-white mb-6 whitespace-nowrap">{t.pricing.tier3Price} <span className="text-lg text-zinc-500 font-normal">{t.pricing.tier3Freq}</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t.pricing.tier3F1, t.pricing.tier3F2, t.pricing.tier3F3, t.pricing.tier3F4].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl border border-violet-500 text-violet-400 font-medium hover:bg-violet-500/10 transition-colors"
              >
                {t.pricing.btn}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Case Study Banner */}
      <section className="px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-cyan-900/30 to-violet-900/30 border-y border-white/10 py-12 px-8 rounded-2xl my-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse rounded-2xl"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              {t.caseStudy.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">
              {t.caseStudy.text}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.faq.title}</h2>
          <div className="space-y-4">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl cursor-pointer transition-all duration-300 hover:border-cyan-500/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-zinc-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Guarantee Section */}
      <section className="py-24 px-6 relative bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.security.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Tech Cards */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t1}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              <Lock className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t2}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              <Server className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">{t.security.t3}</span>
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