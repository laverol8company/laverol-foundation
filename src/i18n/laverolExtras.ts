// Laverol Systems — extra section translations
import type { Lang } from "./laverol";

type Extras = {
  trust: { label: string };
  cases: {
    eyebrow: string; title: string; sub: string;
    items: { niche: string; name: string; metric: string; desc: string; gradient: string }[];
  };
  team: {
    eyebrow: string; title: string;
    members: { name: string; role: string; bio: string; initials: string }[];
  };
  testimonials: {
    eyebrow: string; title: string;
    items: { quote: string; name: string; company: string; role: string }[];
  };
  ctaStrip: { title: string; sub: string; cta: string };
  pricing: { fromLabel: string; onRequest: string };
  reply: string;
  writeDirect: string;
  needHelp: string;
  // --- new keys ---
  meta: { title: string; desc: string };
  hero: { eyebrow: string; titleMain: string; titleAccent: string };
  goal: { recLabel: string };
  industries: { setupLabel: string };
  form: { replyTime: string; telegramAlt: string };
  stats: { projects: string; industries: string; launch: string; leads: string; uptime: string };
};

export const extras: Record<Lang, Extras> = {
  EN: {
    trust: { label: "Trusted by our clients" },
    cases: {
      eyebrow: "Selected work", title: "Real results from real systems", sub: "Three recent setups, three measurable outcomes.",
      items: [
        { niche: "Real Estate", name: "Smart Lead Bot", metric: "×3.2", desc: "Tripled qualified leads in 6 weeks for a regional agency through a bot-driven qualifier.", gradient: "from-teal-400/30 via-sky-400/20 to-indigo-500/20" },
        { niche: "Auto Service", name: "Booking Website", metric: "+62%", desc: "Online bookings up 62% after a clean landing page with smart appointment form.", gradient: "from-indigo-500/25 via-purple-400/20 to-teal-400/25" },
        { niche: "Local Service", name: "Lead System", metric: "−74%", desc: "Cut response time from hours to minutes with Telegram + CRM lead routing.", gradient: "from-sky-400/30 via-teal-400/25 to-indigo-400/20" },
      ],
    },
    team: {
      eyebrow: "Who's behind this", title: "A small team focused on shipping",
      members: [
        { name: "Mark Laverol", role: "Founder · Strategy", bio: "Designs the system around your business goal and how clients decide.", initials: "ML" },
        { name: "Anna Petrova", role: "Design · Frontend", bio: "Turns the plan into clean, mobile-first interfaces that convert.", initials: "AP" },
        { name: "Dmytro K.", role: "Engineering · Bots", bio: "Builds the backend, smart bots and the integrations behind every lead.", initials: "DK" },
      ],
    },
    testimonials: {
      eyebrow: "Client voices", title: "What clients say about working with us",
      items: [
        { quote: "They didn't just build a site — they built a system that finally sends us real, qualified leads.", name: "Olha Stepanenko", company: "AutoElite", role: "Owner" },
        { quote: "The smart bot does the first response for us. Our team only talks to people who are actually ready.", name: "Marius Popescu", company: "Domus RE", role: "Lead Broker" },
        { quote: "Clean, fast, and exactly what we needed. No fluff, no overpromising — just the right setup.", name: "Igor V.", company: "Prime Detailing", role: "Co-founder" },
      ],
    },
    ctaStrip: { title: "Ready to build a system that works instead of you?", sub: "Tell us about your business — we'll reply within a few hours with a clear next step.", cta: "Discuss project" },
    pricing: { fromLabel: "from", onRequest: "Price on request — reply within 24h" },
    reply: "We usually reply within 2 hours",
    writeDirect: "Write directly on Telegram",
    needHelp: "Need help choosing? Use the concierge",
    meta: { title: "Laverol Systems — Smart Websites, CRM & Bots", desc: "Laverol Systems builds custom websites, CRM systems and smart bots that automate sales and lead generation." },
    hero: { eyebrow: "SMART DIGITAL AGENCY", titleMain: "Systems that work", titleAccent: "instead of you" },
    goal: { recLabel: "Recommendation" },
    industries: { setupLabel: "Common setup" },
    form: { replyTime: "We usually reply within 2 hours", telegramAlt: "Or write directly on Telegram" },
    stats: { projects: "Projects launched", industries: "Industries", launch: "Time to launch", leads: "Avg lead growth", uptime: "Bot uptime" },
  },
  UA: {
    trust: { label: "Нам довіряють" },
    cases: {
      eyebrow: "Обрані проєкти", title: "Реальні результати від реальних систем", sub: "Три недавні сетапи — три виміряні результати.",
      items: [
        { niche: "Нерухомість", name: "Smart Lead Bot", metric: "×3.2", desc: "У 3 рази більше якісних заявок за 6 тижнів для агенції через бот-кваліфікацію.", gradient: "from-teal-400/30 via-sky-400/20 to-indigo-500/20" },
        { niche: "Автосервіс", name: "Booking сайт", metric: "+62%", desc: "Онлайн-записи зросли на 62% завдяки чистому лендингу зі smart-формою.", gradient: "from-indigo-500/25 via-purple-400/20 to-teal-400/25" },
        { niche: "Локальні послуги", name: "Lead-система", metric: "−74%", desc: "Час відповіді — з годин до хвилин завдяки Telegram + CRM маршрутизації.", gradient: "from-sky-400/30 via-teal-400/25 to-indigo-400/20" },
      ],
    },
    team: {
      eyebrow: "Хто за цим стоїть", title: "Невелика команда, сфокусована на результаті",
      members: [
        { name: "Марк Laverol", role: "Засновник · Стратегія", bio: "Будує систему під цілі бізнесу та поведінку клієнтів.", initials: "МЛ" },
        { name: "Анна Петрова", role: "Дизайн · Frontend", bio: "Перетворює план на чисті mobile-first інтерфейси.", initials: "АП" },
        { name: "Дмитро К.", role: "Розробка · Боти", bio: "Backend, smart-боти та інтеграції за кожною заявкою.", initials: "ДК" },
      ],
    },
    testimonials: {
      eyebrow: "Голоси клієнтів", title: "Що кажуть клієнти про роботу з нами",
      items: [
        { quote: "Вони не просто зробили сайт — побудували систему, яка нарешті дає реальні заявки.", name: "Ольга Степаненко", company: "AutoElite", role: "Власниця" },
        { quote: "Smart-бот робить першу відповідь за нас. Команда говорить лише з готовими клієнтами.", name: "Маріус Попеску", company: "Domus RE", role: "Lead-брокер" },
        { quote: "Чисто, швидко й саме те, що потрібно. Без води — лише правильний сетап.", name: "Ігор В.", company: "Prime Detailing", role: "Співзасновник" },
      ],
    },
    ctaStrip: { title: "Готові побудувати систему, яка працює замість вас?", sub: "Розкажіть про бізнес — відповімо за кілька годин із чітким наступним кроком.", cta: "Обговорити проєкт" },
    pricing: { fromLabel: "від", onRequest: "Ціна за запитом — відповідь протягом 24 год" },
    reply: "Зазвичай відповідаємо протягом 2 годин",
    writeDirect: "Написати напряму в Telegram",
    needHelp: "Не знаєте, що обрати? Скористайтесь concierge",
    meta: { title: "Laverol Systems — Смарт-сайти, CRM та боти для бізнесу", desc: "Laverol Systems створює кастомні сайти, CRM-системи та смарт-боти що автоматизують продажі і заявки." },
    hero: { eyebrow: "SMART DIGITAL AGENCY", titleMain: "Системи, які працюють", titleAccent: "замість вас" },
    goal: { recLabel: "Рекомендація" },
    industries: { setupLabel: "Типовий сетап" },
    form: { replyTime: "Зазвичай відповідаємо протягом 2 годин", telegramAlt: "Або написати напряму в Telegram" },
    stats: { projects: "Проєктів", industries: "Ніш", launch: "Старт", leads: "Ріст лідів", uptime: "Аптайм бота" },
  },
  RO: {
    trust: { label: "Au încredere în noi" },
    cases: {
      eyebrow: "Lucrări selectate", title: "Rezultate reale din sisteme reale", sub: "Trei setup-uri recente, trei rezultate măsurabile.",
      items: [
        { niche: "Real Estate", name: "Smart Lead Bot", metric: "×3.2", desc: "Triplarea lead-urilor calificate în 6 săptămâni printr-un bot de calificare.", gradient: "from-teal-400/30 via-sky-400/20 to-indigo-500/20" },
        { niche: "Auto Service", name: "Site Booking", metric: "+62%", desc: "Rezervări online cu 62% mai multe după un landing curat cu formular smart.", gradient: "from-indigo-500/25 via-purple-400/20 to-teal-400/25" },
        { niche: "Servicii locale", name: "Lead System", metric: "−74%", desc: "Timpul de răspuns redus de la ore la minute prin Telegram + CRM.", gradient: "from-sky-400/30 via-teal-400/25 to-indigo-400/20" },
      ],
    },
    team: {
      eyebrow: "Cine este în spate", title: "O echipă mică, focusată pe livrare",
      members: [
        { name: "Mark Laverol", role: "Fondator · Strategie", bio: "Construiește sistemul în jurul obiectivului tău și al deciziei clienților.", initials: "ML" },
        { name: "Anna Petrova", role: "Design · Frontend", bio: "Transformă planul în interfețe curate, mobile-first.", initials: "AP" },
        { name: "Dmytro K.", role: "Engineering · Boți", bio: "Backend, smart bots și integrările din spatele fiecărui lead.", initials: "DK" },
      ],
    },
    testimonials: {
      eyebrow: "Vocea clienților", title: "Ce spun clienții despre noi",
      items: [
        { quote: "Nu doar un site — un sistem care ne trimite în sfârșit lead-uri reale, calificate.", name: "Olha Stepanenko", company: "AutoElite", role: "Owner" },
        { quote: "Botul răspunde primul. Echipa vorbește doar cu cei pregătiți.", name: "Marius Popescu", company: "Domus RE", role: "Lead Broker" },
        { quote: "Curat, rapid și exact ce ne trebuia. Fără promisiuni goale.", name: "Igor V.", company: "Prime Detailing", role: "Co-fondator" },
      ],
    },
    ctaStrip: { title: "Gata să construim un sistem care lucrează în locul tău?", sub: "Spune-ne despre afacere — răspundem în câteva ore cu un pas clar.", cta: "Discută proiect" },
    pricing: { fromLabel: "de la", onRequest: "Preț la cerere — răspuns în 24h" },
    reply: "Răspundem de obicei în 2 ore",
    writeDirect: "Scrie direct pe Telegram",
    needHelp: "Nu ești sigur? Folosește concierge",
    meta: { title: "Laverol Systems — Site-uri Smart, CRM și Boți", desc: "Laverol Systems construiește site-uri custom, sisteme CRM și smart bots care automatizează vânzările." },
    hero: { eyebrow: "SMART DIGITAL AGENCY", titleMain: "Sisteme care lucrează", titleAccent: "în locul tău" },
    goal: { recLabel: "Recomandare" },
    industries: { setupLabel: "Setup comun" },
    form: { replyTime: "De obicei răspundem în 2 ore", telegramAlt: "Sau scrie direct pe Telegram" },
    stats: { projects: "Proiecte", industries: "Industrii", launch: "Timp lansare", leads: "Creștere lead-uri", uptime: "Bot uptime" },
  },
};
