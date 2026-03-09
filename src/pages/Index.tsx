import { ArrowRight, Globe, MessageSquare, Building2, CheckCircle2, TrendingDown, TrendingUp, Smartphone, Brain, Database, Calendar } from "lucide-react";

const Index = () => {
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
              <a href="#how-it-works" className="hover:text-white transition-colors">Як це працює</a>
              <a href="#economics" className="hover:text-white transition-colors">Економіка</a>
              <a href="#pricing" className="hover:text-white transition-colors">Тарифи</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="hidden sm:flex items-center gap-2 text-zinc-500">
              <Globe className="w-4 h-4" />
              <button className="text-white">UA</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">EN</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">RO</button>
            </div>
            <button className="px-5 py-2.5 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
              Демо-дзвінок
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
                Real Estate AI
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Захоплюйте <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">100% лідів</span><br />
                на нерухомість вночі та під час блекаутів.
              </h1>
              
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Автоматизована система миттєвої відповіді Laverol. Ми відповідаємо за 5 секунд, консультуємо по базі ЖК та записуємо на перегляд.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]">
                  Подивитися систему в дії
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Відповідь за 5 сек</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>24/7/365</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Інтеграція з CRM</span>
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
                        <div className="text-white font-medium">ЖК "Новопечерські Липки"</div>
                        <div className="text-zinc-500 text-xs">Laverol AI Console</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      Active
                    </div>
                  </div>

                  {/* Chat Mockup */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-zinc-300 max-w-[80%]">
                        Доброго вечора. Чи є в наявності 2-кімнатні квартири від 70м²?
                      </div>
                    </div>
                    
                    <div className="flex items-end gap-2 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <span className="text-cyan-400 text-xs font-bold">L</span>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl rounded-br-none px-4 py-3 text-sm text-cyan-50 max-w-[80%]">
                        Добрий вечір! Так, у нас є 3 варіанти 2-кімнатних квартир площею від 72м² до 85м². Ціни починаються від $120,000. Бажаєте записатися на перегляд завтра?
                      </div>
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">Response Time</div>
                      <div className="text-cyan-400 font-semibold">1.2s</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">Leads Today</div>
                      <div className="text-white font-semibold">142</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs mb-1">Conversion</div>
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
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Ваше агентство втрачає гроші щоночі.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-colors duration-300 hover:border-red-500/50 flex flex-col items-start gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-xl text-zinc-300 leading-relaxed">
                <strong className="text-white">30% заявок</strong> приходять у неробочий час. В середньому це <strong className="text-red-400">$4,500 втраченої комісії</strong> щомісяця.
              </p>
            </div>
            
            {/* The Solution */}
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] flex flex-col items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center relative z-10">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-xl text-zinc-300 leading-relaxed relative z-10">
                <strong className="text-white">Laverol AI-асистент.</strong> Швидкість відповіді 5 секунд. 0 лікарняних. Економія до <strong className="text-cyan-400">$44,400 на рік.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Features Section */}
      <section id="how-it-works" className="py-24 px-6 relative bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Один AI-мозок. Всі ваші канали.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Омніканальне захоплення", desc: "Instagram, WhatsApp, Site" },
              { icon: Brain, title: "AI-Кваліфікація", desc: "Аналіз бюджету та потреб інвестора" },
              { icon: Database, title: "Синхронізація з CRM", desc: "Автоматичне створення угод без помилок" },
              { icon: Calendar, title: "Календар та покази", desc: "Миттєве бронювання зустрічей" }
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
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Прозорі тарифи</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            
            {/* Base Capture */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">Base Capture</h3>
              <div className="text-3xl font-bold text-white mb-6">$699 <span className="text-lg text-zinc-500 font-normal">разово</span></div>
              <button className="w-full py-3 rounded-xl border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors">
                Обрати тариф
              </button>
            </div>

            {/* Smart Agent (Featured) */}
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-400 rounded-2xl p-8 flex flex-col relative shadow-[0_0_20px_rgba(34,211,238,0.2)] md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                Найпопулярніший
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Agent</h3>
              <div className="text-3xl font-bold text-white mb-6">$2,299 <span className="text-lg text-zinc-500 font-normal">+ $200/міс</span></div>
              <button className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors">
                Обрати тариф
              </button>
            </div>

            {/* Pro Eco */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">Pro Eco</h3>
              <div className="text-3xl font-bold text-white mb-6">$4,999 <span className="text-lg text-zinc-500 font-normal">+ $500/міс</span></div>
              <button className="w-full py-3 rounded-xl border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors">
                Обрати тариф
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;