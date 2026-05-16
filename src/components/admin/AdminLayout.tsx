import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Archive, Trash2, LogOut, Languages } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCrmLang } from '../../contexts/CrmLangContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { lang, setLang, t } = useCrmLang();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { key: 'crm', name: 'CRM Лиды', path: '/admin/crm', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 glass-strong border-r border-border flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            {t('crmPanel')}
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin/crm' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50 space-y-2">
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t('logout')}
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div />
          {/* Language switcher in header */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <div className="flex rounded-lg overflow-hidden border border-border/60 bg-muted/30">
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                  lang === 'ru'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                РУ
              </button>
              <div className="w-px bg-border/40" />
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
