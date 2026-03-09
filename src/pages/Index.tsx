import { ArrowRight, Globe, MessageSquare, Building2, CheckCircle2, TrendingDown, TrendingUp, Smartphone, Brain, Database, Calendar, Shield, Lock, Server, X, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef, type RefObject } from "react";
import { ProfitCalculator } from "@/components/ProfitCalculator";

function useScrollReveal(): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

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
      titlePart1: "Швидкість. Результат. ",
      titleHighlight: "Абсолютний контроль.",
      titlePart2: "24/7.",
      desc: "Єдина екосистема, розроблена спеціально для ніші Real Estate. Ми розуміємо специфіку об'єктів, тонкощі планувань та алгоритми роботи професійних брокерів. Миттєва відповідь за 5 секунд, експертна консультація по базі нерухомості та запис клієнтів на перегляд. ,з використанням новітніших AI технологій.",
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
    },
    deepDive: [
      {
        tab: "Омніканальне захоплення",
        icon: "Smartphone",
        howTitle: "Як це працює",
        how: "Збір лідів з Instagram, WhatsApp, Telegram та сайту в єдине вікно 24/7.",
        mathTitle: "Маркетинговий важіль",
        math: "Якщо ви витрачаєте $1,000 на рекламу, а менеджери пропускають 30% нічних лідів — ви втрачаєте $300 щомісяця. Laverol рятує ці $300, окупаючи себе ще до першої угоди.",
        profit: "$300/міс економії"
      },
      {
        tab: "AI-Кваліфікація",
        icon: "Brain",
        howTitle: "Як це працює",
        how: "Система ставить 4 критичні питання: Бюджет, Термін, Локація, Кількість кімнат.",
        mathTitle: "Економія часу",
        math: "Брокер витрачає 20 хв на пусті розмови з нецільовими лідами. При 100 лідах — це 33 години на місяць. Laverol відсіює \"туристів\", даючи брокеру тільки тих, хто готовий купувати.",
        profit: ">$1,500/міс вартість часу"
      },
      {
        tab: "Синхронізація з CRM",
        icon: "Database",
        howTitle: "Як це працює",
        how: "Миттєве створення картки клієнта в amoCRM/Bitrix24 з усіма тегами та історією листування.",
        mathTitle: "Цифрова дисципліна",
        math: "15% лідів губляться через те, що менеджер не вніс їх у базу. При середній комісії $5,000 — це пряма втрата величезних грошей. Laverol вносить 100% лідів без помилок.",
        profit: "0% втрачених лідів"
      },
      {
        tab: "Календар та покази",
        icon: "Calendar",
        howTitle: "Як це працює",
        how: "AI бачить вільні вікна брокерів та сам пропонує клієнту час для зустрічі або зуму.",
        mathTitle: "Швидкість угоди",
        math: "Клієнт найбільш \"гарячий\" у перші 10 хвилин. Можливість записатися на перегляд миттєво підвищує ймовірність угоди на 25%.",
        profit: "+25% конверсія"
      }
    ],
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
      tier1Name: "пакет \"Фундамент\"",
      tier1Price: "$699 разово",
      tier1F1: "1 месенджер (Insta/TG)",
      tier1F2: "Відповідь 5 сек",
      tier1F3: "Базова кваліфікація",
      tier1F4: "Сповіщення в Telegram",
      tier2Name: "пакет \"Екосистема\"",
      tier2Price: "$2,299",
      tier2Freq: "+ $200/міс",
      tier2F1: "Омніканальність",
      tier2F2: "Синхронізація з CRM",
      tier2F3: "Розпізнавання аудіо",
      tier2F4: "Календар показів",
      tier3Name: "пакет \"Потужність\"",
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
    journey: {
      title: "Подорож ліда за 5 секунд",
      steps: [
        { time: "24/7", label: "Захоплення", desc: "Лід пише на сайт або у мессенджер" },
        { time: "5 сек", label: "Миттєвий відгук", desc: "Система надсилає презентацію об'єктів" },
        { time: "2 хв", label: "Кваліфікація", desc: "AI виявляє бюджет та терміни" },
        { time: "5 хв", label: "Готовий показ", desc: "Угода в CRM, брокер отримує сповіщення" }
      ]
    },
    dashboard: {
      title: "Контроль та прозорість",
      subtitle: "Повний контроль у вашій кишені. Керуйте логікою AI та аналізуйте ефективність кожного брокера в реальному часі.",
      managerDashboard: "Панель менеджера",
      stat1Label: "КОНВЕРСІЯ НОВИХ ЛІДІВ",
      stat1Value: "98%",
      stat2Label: "Заощаджено часу",
      stat2Value: "120+ годин/міс",
      stat3Label: "Статус системи",
      stat3Value: "Активна 24/7"
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
    },
    calculator: {
      title: "Розрахуйте свій прибуток з Laverol",
      sub: "Введіть або виберіть значення — побачте реальний фінансовий результат.",
      leads: "Ліди за місяць",
      comm: "Середня комісія",
      rentPrice: "Вартість оренди",
      conv: "Поточна конверсія (%)",
      gain: "Додатковий прибуток:",
      loss: "Упущена вигода:",
      roi: "Окупність",
      sale: "Продаж",
      rent: "Оренда",
      saleHint: "Режим продажу: втрата 30% нічних лідів, буст конверсії 1.3x",
      rentHint: "Режим оренди: втрата 40% лідів (орендарі швидші), буст 1.5x",
      savedLeads: "Врятовано угод",
      perMonth: "/міс",
      aiAdmin: "AI-адміністратор",
      clients: "клієнтів",
      yourProfit: "Ваш прибуток з Laverol",
      growthLabel: "Це на",
      growthSuffix: "більше",
      currentResult: "Поточний результат",
      paidOff: "Система окупила себе",
      inputLabel: "Налаштування показників",
      copy: "Копіювати",
      bookDemo: "Забронювати демо"
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
    },
    deepDive: [
      {
        tab: "Omnichannel Capture",
        icon: "Smartphone",
        howTitle: "How it works",
        how: "Collecting leads from Instagram, WhatsApp, Telegram and your website into a single window 24/7.",
        mathTitle: "Marketing Leverage",
        math: "If you spend $1,000 on ads and managers miss 30% of night leads — you lose $300/month. Laverol saves that $300, paying for itself before the first deal.",
        profit: "$300/mo saved"
      },
      {
        tab: "AI Qualification",
        icon: "Brain",
        howTitle: "How it works",
        how: "The system asks 4 critical questions: Budget, Timeline, Location, Number of rooms.",
        mathTitle: "Time Savings",
        math: "A broker spends 20 min on empty conversations with unqualified leads. At 100 leads — that's 33 hours/month. Laverol filters out \"tourists\", giving the broker only ready buyers.",
        profit: ">$1,500/mo time value"
      },
      {
        tab: "CRM Synchronization",
        icon: "Database",
        howTitle: "How it works",
        how: "Instant client card creation in amoCRM/Bitrix24 with all tags and conversation history.",
        mathTitle: "Digital Discipline",
        math: "15% of leads are lost because managers don't add them to the database. At an average commission of $5,000 — that's a direct loss. Laverol adds 100% of leads without errors.",
        profit: "0% leads lost"
      },
      {
        tab: "Calendar & Viewings",
        icon: "Calendar",
        howTitle: "How it works",
        how: "AI sees brokers' available slots and proposes meeting or Zoom time to the client.",
        mathTitle: "Deal Speed",
        math: "A client is most \"hot\" in the first 10 minutes. Instant booking increases deal probability by 25%.",
        profit: "+25% conversion"
      }
    ],
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
      tier1Name: "пакет \"Фундамент\"",
      tier1Price: "$699 one-time",
      tier1F1: "1 messenger (Insta/TG)",
      tier1F2: "5-second response",
      tier1F3: "Basic qualification",
      tier1F4: "Telegram notifications",
      tier2Name: "пакет \"Екосистема\"",
      tier2Price: "$2,299",
      tier2Freq: "+ $200/mo",
      tier2F1: "Omnichannel",
      tier2F2: "CRM synchronization",
      tier2F3: "Audio recognition",
      tier2F4: "Viewing calendar",
      tier3Name: "пакет \"Потужність\"",
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
    journey: {
      title: "The 5-Second Lead Journey",
      steps: [
        { time: "24/7", label: "Capture", desc: "Lead writes on the website or messenger" },
        { time: "5 sec", label: "Instant Response", desc: "System sends property presentation" },
        { time: "2 min", label: "Qualification", desc: "AI identifies budget & timeline" },
        { time: "5 min", label: "Ready to Show", desc: "Deal in CRM, broker gets notified" }
      ]
    },
    dashboard: {
      title: "Control & Transparency",
      subtitle: "Full control in your pocket. Manage AI logic and analyze every broker's performance in real time.",
      managerDashboard: "Manager Dashboard",
      stat1Label: "NEW LEAD CONVERSION",
      stat1Value: "98%",
      stat2Label: "Time saved",
      stat2Value: "120+ hrs/mo",
      stat3Label: "System status",
      stat3Value: "Active 24/7"
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
    },
    calculator: {
      title: "Calculate your profit with Laverol",
      sub: "Enter or select values — see the real financial impact.",
      leads: "Leads per month",
      comm: "Average commission",
      rentPrice: "Rent price",
      conv: "Current conversion (%)",
      gain: "Extra Profit:",
      loss: "Lost opportunity:",
      roi: "Payback",
      sale: "Sale",
      rent: "Rent",
      saleHint: "Sale mode: 30% night leads lost, 1.3x conversion boost",
      rentHint: "Rent mode: 40% leads lost (renters move faster), 1.5x boost",
      savedLeads: "Deals saved",
      perMonth: "/mo",
      aiAdmin: "AI Admin",
      clients: "clients",
      yourProfit: "Your Profit with Laverol",
      growthLabel: "That's",
      growthSuffix: "more",
      currentResult: "Current result",
      paidOff: "System paid for itself",
      inputLabel: "Configure metrics",
      copy: "Copy",
      bookDemo: "Book a Demo"
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
    },
    deepDive: [
      {
        tab: "Captură Omnicanal",
        icon: "Smartphone",
        howTitle: "Cum funcționează",
        how: "Colectarea lead-urilor de pe Instagram, WhatsApp, Telegram și site în o singură fereastră 24/7.",
        mathTitle: "Pârghie de Marketing",
        math: "Dacă cheltuiți $1,000 pe reclame și managerii pierd 30% din lead-urile de noapte — pierdeți $300/lună. Laverol salvează acești $300.",
        profit: "$300/lună economii"
      },
      {
        tab: "Calificare AI",
        icon: "Brain",
        howTitle: "Cum funcționează",
        how: "Sistemul pune 4 întrebări critice: Buget, Termen, Locație, Număr de camere.",
        mathTitle: "Economie de Timp",
        math: "Un broker petrece 20 min cu lead-uri necalificate. La 100 lead-uri — 33 ore/lună. Laverol filtrează \"turiștii\".",
        profit: ">$1,500/lună timp salvat"
      },
      {
        tab: "Sincronizare CRM",
        icon: "Database",
        howTitle: "Cum funcționează",
        how: "Creare instantanee a cardului clientului în amoCRM/Bitrix24 cu toate etichetele și istoricul conversațiilor.",
        mathTitle: "Disciplină Digitală",
        math: "15% din lead-uri se pierd pentru că managerii nu le adaugă în bază. La un comision mediu de $5,000 — pierdere directă. Laverol adaugă 100% fără erori.",
        profit: "0% lead-uri pierdute"
      },
      {
        tab: "Calendar & Vizionări",
        icon: "Calendar",
        howTitle: "Cum funcționează",
        how: "AI vede sloturile libere ale brokerilor și propune clientului timp de întâlnire sau Zoom.",
        mathTitle: "Viteza Tranzacției",
        math: "Clientul este cel mai \"fierbinte\" în primele 10 minute. Programarea instantanee crește probabilitatea tranzacției cu 25%.",
        profit: "+25% conversie"
      }
    ],
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
      tier1Name: "пакет \"Фундамент\"",
      tier1Price: "$699 o singură dată",
      tier1F1: "1 messenger (Insta/TG)",
      tier1F2: "Răspuns în 5 secunde",
      tier1F3: "Calificare de bază",
      tier1F4: "Notificări Telegram",
      tier2Name: "пакет \"Екосистема\"",
      tier2Price: "$2.299",
      tier2Freq: "+ $200/lună",
      tier2F1: "Omnicanal",
      tier2F2: "Sincronizare CRM",
      tier2F3: "Recunoaștere audio",
      tier2F4: "Calendar vizionări",
      tier3Name: "пакет \"Потужність\"",
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
    journey: {
      title: "Călătoria Lead-ului în 5 Secunde",
      steps: [
        { time: "24/7", label: "Captură", desc: "Lead-ul scrie pe site sau în messenger" },
        { time: "5 sec", label: "Răspuns Instant", desc: "Sistemul trimite prezentarea proprietăților" },
        { time: "2 min", label: "Calificare", desc: "AI identifică bugetul și termenele" },
        { time: "5 min", label: "Gata de Vizionare", desc: "Tranzacție în CRM, brokerul primește notificare" }
      ]
    },
    dashboard: {
      title: "Control & Transparență",
      subtitle: "Control complet în buzunarul tău. Gestionează logica AI și analizează performanța fiecărui broker în timp real.",
      managerDashboard: "Panoul Managerului",
      stat1Label: "CONVERSIE LEAD-URI NOI",
      stat1Value: "98%",
      stat2Label: "Timp economisit",
      stat2Value: "120+ ore/lună",
      stat3Label: "Starea sistemului",
      stat3Value: "Activă 24/7"
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
    },
    calculator: {
      title: "Calculează-ți profitul cu Laverol",
      sub: "Introdu sau selectează valori — vezi impactul financiar real.",
      leads: "Lead-uri pe lună",
      comm: "Comision mediu",
      rentPrice: "Preț chirie",
      conv: "Conversie curentă (%)",
      gain: "Profit suplimentar:",
      loss: "Oportunitate pierdută:",
      roi: "Amortizare",
      sale: "Vânzare",
      rent: "Închiriere",
      saleHint: "Mod vânzare: 30% lead-uri pierdute noaptea, boost conversie 1.3x",
      rentHint: "Mod închiriere: 40% lead-uri pierdute, boost 1.5x",
      savedLeads: "Tranzacții salvate",
      perMonth: "/lună",
      aiAdmin: "Admin AI",
      clients: "clienți",
      yourProfit: "Profitul Tău cu Laverol",
      growthLabel: "Cu",
      growthSuffix: "mai mult",
      currentResult: "Rezultat curent",
      paidOff: "Sistemul s-a amortizat",
      inputLabel: "Configurare metrici",
      copy: "Copiază",
      bookDemo: "Rezervă Demo"
    }
  }
};

type Language = 'UA' | 'EN' | 'RO';

const Index = () => {
  const [language, setLanguage] = useState<Language>('UA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [econRef, econVis] = useScrollReveal();
  const [featRef, featVis] = useScrollReveal();
  const [justRef, justVis] = useScrollReveal();
  const [priceRef, priceVis] = useScrollReveal();
  const [caseRef, caseVis] = useScrollReveal();
  const [journeyRef, journeyVis] = useScrollReveal();
  const [dashRef, dashVis] = useScrollReveal();
  const [faqRef, faqVis] = useScrollReveal();
  const [secRef, secVis] = useScrollReveal();
  const [ctaRef, ctaVis] = useScrollReveal();

  useEffect(() => {
    const t1 = setTimeout(() => setNavVisible(true), 100);
    const t2 = setTimeout(() => setHeroVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 transition-all duration-700 ${navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl font-bold tracking-tight group relative">
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                Laverol solutions
              </span>
              <span className="absolute -inset-2 bg-cyan-400/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
            <div className="hidden md:flex items-center gap-1 text-sm font-medium">
              {[
                { href: "#how-it-works", label: t.nav.howItWorks },
                { href: "#economics", label: t.nav.economics },
                { href: "#pricing", label: t.nav.pricing },
              ].map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="hidden sm:flex items-center gap-2 text-zinc-500">
              <Globe className="w-4 h-4" />
              {(['UA', 'EN', 'RO'] as Language[]).map((lang, idx, arr) => (
                <span key={lang} className="flex items-center gap-2">
                  <button 
                    onClick={() => setLanguage(lang)}
                    className={`transition-all duration-300 hover:scale-110 ${language === lang ? 'text-cyan-400 font-bold' : 'text-gray-500 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                  {idx < arr.length - 1 && <span>|</span>}
                </span>
              ))}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative px-5 py-2.5 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">{t.nav.demoCall}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-cyan-500/25 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-violet-500/25 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-emerald-500/15 blur-[80px] rounded-full"></div>
                
                {/* Glass Card */}
                <div className="relative w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col shadow-[0_0_60px_-15px_rgba(0,200,255,0.3),0_0_30px_-10px_rgba(139,92,246,0.2)]">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-violet-400/30 rounded-br-3xl"></div>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{t.chat.complex}</div>
                        <div className="text-zinc-500 text-xs">{t.chat.console}</div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      {t.chat.status}
                    </div>
                  </div>

                  {/* Chat Mockup */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* User message */}
                    <div className="flex items-end gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                        <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                      <div className="bg-white/[0.07] border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-zinc-200 max-w-[85%] leading-relaxed">
                        {t.chat.msgUser}
                      </div>
                    </div>
                    
                    {/* AI message */}
                    <div className="flex items-end gap-2.5 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                        <span className="text-white text-xs font-bold">L</span>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/15 to-violet-500/10 border border-cyan-500/20 rounded-2xl rounded-br-sm px-4 py-3 text-sm text-white/90 max-w-[85%] leading-relaxed">
                        {t.chat.msgAi}
                      </div>
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-auto pt-5 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{t.chat.statTime}</div>
                      <div className="text-cyan-400 font-bold text-lg">{t.chat.statTimeVal}</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{t.chat.statLeads}</div>
                      <div className="text-white font-bold text-lg">{t.chat.statLeadsVal}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{t.chat.statConv}</div>
                      <div className="text-emerald-400 font-bold text-lg">{t.chat.statConvVal}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Cost of Inaction Section */}
      <section id="economics" ref={econRef} className={`py-24 px-6 relative transition-all duration-700 ${econVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

      {/* System Features — Interactive Deep-Dive */}
      <section id="how-it-works" ref={featRef} className={`py-24 px-6 relative bg-zinc-950/50 transition-all duration-700 ${featVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.features.title}</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Tab Cards */}
            <div className="flex flex-row lg:flex-col gap-3 lg:w-80 shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {t.deepDive.map((item, i) => {
                const icons = [Smartphone, Brain, Database, Calendar];
                const Icon = icons[i];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl backdrop-blur-xl border text-left transition-all duration-300 hover:-translate-y-1 min-w-[200px] lg:min-w-0 ${
                      activeTab === i
                        ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)]'
                        : 'bg-white/5 border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === i ? 'bg-cyan-500/20 border border-cyan-400/40' : 'bg-white/5 border border-white/10'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${activeTab === i ? 'text-cyan-400' : 'text-zinc-400'}`} />
                    </div>
                    <span className={`font-medium text-sm transition-colors ${activeTab === i ? 'text-white' : 'text-zinc-400'}`}>
                      {item.tab}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Detail Panel */}
            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              
              {t.deepDive.map((item, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    activeTab === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                  style={{ display: activeTab === i ? 'block' : 'none' }}
                >
                  {/* How it works */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                      {item.howTitle}
                    </div>
                    <p className="text-lg text-zinc-300 leading-relaxed">{item.how}</p>
                  </div>

                  {/* Math / Profit Box */}
                  <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                      📊 {item.mathTitle}
                    </div>
                    <p className="text-zinc-300 leading-relaxed mb-4 relative z-10">{item.math}</p>
                    <div className="flex items-center gap-2 relative z-10">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold text-lg">{item.profit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Economic Justification Section */}
      <section ref={justRef} className={`py-24 px-6 relative transition-all duration-700 ${justVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

      {/* Profit Calculator Section */}
      <ProfitCalculator t={t} onBookDemo={() => setIsModalOpen(true)} />

      {/* Pricing Section */}
      <section id="pricing" ref={priceRef} className={`py-24 px-6 relative transition-all duration-700 ${priceVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
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


      {/* The 5-Second Journey */}
      <section ref={journeyRef} className={`py-24 px-6 relative transition-all duration-700 ${journeyVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.journey.title}</h2>
          
          {/* Pipeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-cyan-500/20"></div>
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-400/40 to-cyan-500/0 blur-sm"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {t.journey.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  {/* Glowing dot */}
                  <div className="relative mb-6">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      <span className="text-cyan-400 font-bold text-sm">{i + 1}</span>
                    </div>
                    <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md animate-pulse"></div>
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-full transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                    <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">{step.time}</div>
                    <h3 className="text-white font-semibold mb-1">{step.label}</h3>
                    <p className="text-zinc-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Control & Transparency — Dashboard Preview */}
      <section ref={dashRef} className={`py-24 px-6 relative transition-all duration-700 ${dashVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">{t.dashboard.title}</h2>
          <p className="text-zinc-400 text-lg text-center max-w-2xl mx-auto mb-16">{t.dashboard.subtitle}</p>

          {/* Dashboard Mockup */}
          <div className="animate-float relative">
            {/* Glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/15 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_-15px_rgba(0,200,255,0.2)]">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                  </div>
                  <span className="text-zinc-400 text-sm font-medium ml-2">{t.dashboard.managerDashboard}</span>
                </div>
                <div className="text-zinc-500 text-xs">laverol.ai/dashboard</div>
              </div>

              {/* 3 Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat 1 — Conversion */}
                <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.dashboard.stat1Label}</div>
                  <div className="text-emerald-400 text-3xl font-bold">{t.dashboard.stat1Value}</div>
                </div>

                {/* Stat 2 — Time */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.dashboard.stat2Label}</div>
                  <div className="text-white text-3xl font-bold">{t.dashboard.stat2Value}</div>
                </div>

                {/* Stat 3 — Status */}
                <div className="bg-black/40 border border-cyan-500/20 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.dashboard.stat3Label}</div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-cyan-400 text-3xl font-bold">{t.dashboard.stat3Value}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section ref={faqRef} className={`py-24 px-6 relative transition-all duration-700 ${faqVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
      <section ref={secRef} className={`py-24 px-6 relative bg-black transition-all duration-700 ${secVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
      <section ref={ctaRef} className={`py-24 px-6 relative transition-all duration-700 ${ctaVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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