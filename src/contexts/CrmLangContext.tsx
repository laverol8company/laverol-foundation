import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'ru';

const translations = {
  en: {
    // Layout
    crmPanel: 'CRM Panel',
    dashboard: 'Dashboard',
    activeLeads: 'Active Leads',
    archive: 'Archive',
    trash: 'Trash',
    logout: 'Logout',

    // Dashboard page title
    dashboardTitle: 'Dashboard',

    // StatisticsDashboard
    totalActiveLeads: 'Total Active Leads',
    hotLeads: '🔥 Hot Leads',
    outreachSent: 'Outreach Sent',
    averageScore: 'Average Score',

    // LeadsTable
    businessName: 'Business Name',
    score: 'Score',
    priority: 'Priority',
    phone: 'Phone',
    rating: 'Rating',
    hasWebsite: 'Has Website',
    status: 'Status',
    actions: 'Actions',
    retry: 'Retry',
    noActiveLeads: 'No active leads. Add leads via n8n parser.',
    unknown: 'Unknown',

    // StatusBadge
    statusNew: 'New',
    statusAnalyzing: 'Analyzing',
    statusQualified: 'Qualified',
    statusOutreachSent: 'Outreach Sent',
    statusReplied: 'Replied',

    // LeadDrawer
    leadDetails: 'Lead Details & Communication History',
    businessInfo: 'Business Info',
    website: 'Website',
    address: 'Address',
    priceRange: 'Price Range',
    businessVibe: 'Business Vibe',
    scoring: 'Scoring',
    totalScore: 'Total Score',
    penalties: 'Penalties',
    auditFlags: 'Audit Flags',
    auditHasWebsite: 'Has Website',
    auditHasBooking: 'Has Booking System',
    auditMobileReady: 'Mobile Ready',
    auditHasApplePay: 'Has Apple Pay',
    auditLegacyTech: 'Legacy Tech',
    auditSeoScore: 'SEO Score',
    aiInsights: 'AI Insights',
    aiSummary: 'AI Summary',
    noSummary: 'No summary available.',
    recommendedOffer: 'Recommended Offer',
    coldMessageHook: 'Cold Message Hook',
    recentReviewSnippet: 'Recent Review Snippet',
    noReviews: 'No reviews',
    contacts: 'Contacts',
    noContacts: 'No contacts found.',
    noTitle: 'No Title',
    yes: 'Yes',
    no: 'No',
    na: 'N/A',
    reviews: 'reviews',
    close: 'Close',
    unknownLead: 'Unknown Lead',

    // SendMessageModal
    sendMessage: 'Send Message',
    sendMessageTo: 'Send a customized outreach message to',
    sendMessageToSuffix: '.',
    typeMessageHere: 'Type your message here...',
    cancel: 'Cancel',
    send: 'Send',
    sending: 'Sending...',

    // Archive / Trash
    name: 'Name',
    contact: 'Contact',
    archivedDate: 'Archived Date',
    trashedDate: 'Trashed Date',
    restore: 'Restore',
    archiveEmpty: 'Archive is empty.',
    trashEmpty: 'Trash is empty.',
    trashTitle: 'Trash (30 Days)',
    areYouSure: 'Are you absolutely sure?',
    deleteWarning: 'This action cannot be undone. This will permanently delete the lead "{name}" and remove all related data from our servers.',
    delete: 'Delete',

    // Auth Gate
    enterPassword: 'Enter password to access',
    passwordPlaceholder: 'Password...',
    loginBtn: 'Sign In',
    wrongPassword: 'Incorrect password',
  },
  ru: {
    // Layout
    crmPanel: 'CRM Панель',
    dashboard: 'Дашборд',
    activeLeads: 'Активные лиды',
    archive: 'Архив',
    trash: 'Корзина',
    logout: 'Выйти',

    // Dashboard page title
    dashboardTitle: 'Дашборд',

    // StatisticsDashboard
    totalActiveLeads: 'Всего активных лидов',
    hotLeads: '🔥 Горячие лиды',
    outreachSent: 'Отправлено рассылок',
    averageScore: 'Средний балл',

    // LeadsTable
    businessName: 'Название бизнеса',
    score: 'Балл',
    priority: 'Приоритет',
    phone: 'Телефон',
    rating: 'Рейтинг',
    hasWebsite: 'Есть сайт',
    status: 'Статус',
    actions: 'Действия',
    retry: 'Повторить',
    noActiveLeads: 'Нет активных лидов. Добавьте лиды через n8n парсер.',
    unknown: 'Неизвестно',

    // StatusBadge
    statusNew: 'Новый',
    statusAnalyzing: 'Анализ',
    statusQualified: 'Квалифицирован',
    statusOutreachSent: 'Рассылка отправлена',
    statusReplied: 'Ответил',

    // LeadDrawer
    leadDetails: 'Детали лида и история переписки',
    businessInfo: 'Информация о бизнесе',
    website: 'Сайт',
    address: 'Адрес',
    priceRange: 'Ценовой диапазон',
    businessVibe: 'Атмосфера бизнеса',
    scoring: 'Скоринг',
    totalScore: 'Итоговый балл',
    penalties: 'Штрафы',
    auditFlags: 'Аудит',
    auditHasWebsite: 'Есть сайт',
    auditHasBooking: 'Система бронирования',
    auditMobileReady: 'Адаптирован для мобильных',
    auditHasApplePay: 'Есть Apple Pay',
    auditLegacyTech: 'Устаревшие технологии',
    auditSeoScore: 'SEO балл',
    aiInsights: 'ИИ-аналитика',
    aiSummary: 'Резюме ИИ',
    noSummary: 'Резюме недоступно.',
    recommendedOffer: 'Рекомендуемое предложение',
    coldMessageHook: 'Крюк холодного сообщения',
    recentReviewSnippet: 'Последний отзыв',
    noReviews: 'Нет отзывов',
    contacts: 'Контакты',
    noContacts: 'Контакты не найдены.',
    noTitle: 'Без должности',
    yes: 'Да',
    no: 'Нет',
    na: 'Н/Д',
    reviews: 'отзывов',
    close: 'Закрыть',
    unknownLead: 'Неизвестный лид',

    // SendMessageModal
    sendMessage: 'Отправить сообщение',
    sendMessageTo: 'Отправить персональное сообщение для',
    sendMessageToSuffix: '.',
    typeMessageHere: 'Введите ваше сообщение...',
    cancel: 'Отмена',
    send: 'Отправить',
    sending: 'Отправка...',

    // Archive / Trash
    name: 'Имя',
    contact: 'Контакт',
    archivedDate: 'Дата архивации',
    trashedDate: 'Дата удаления',
    restore: 'Восстановить',
    archiveEmpty: 'Архив пуст.',
    trashEmpty: 'Корзина пуста.',
    trashTitle: 'Корзина (30 дней)',
    areYouSure: 'Вы абсолютно уверены?',
    deleteWarning: 'Это действие необратимо. Лид "{name}" и все связанные данные будут удалены с сервера.',
    delete: 'Удалить',

    // Auth Gate
    enterPassword: 'Введите пароль для доступа',
    passwordPlaceholder: 'Пароль...',
    loginBtn: 'Войти',
    wrongPassword: 'Неверный пароль',
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface CrmLangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const CrmLangContext = createContext<CrmLangContextValue | null>(null);

export function CrmLangProvider({ children }: { children: ReactNode }) {
  const stored = (typeof window !== 'undefined' && localStorage.getItem('crm_lang')) as Lang | null;
  const [lang, setLangState] = useState<Lang>(stored === 'ru' ? 'ru' : 'en');

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('crm_lang', l);
  };

  const t = (key: TranslationKey): string => translations[lang][key];

  return (
    <CrmLangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </CrmLangContext.Provider>
  );
}

export function useCrmLang(): CrmLangContextValue {
  const ctx = useContext(CrmLangContext);
  if (!ctx) throw new Error('useCrmLang must be used inside CrmLangProvider');
  return ctx;
}
