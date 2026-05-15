import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Archive, Trash2, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/crm', icon: LayoutDashboard },
    { name: 'Active Leads', path: '/admin/crm/leads', icon: Users },
    { name: 'Archive', path: '/admin/crm/archive', icon: Archive },
    { name: 'Trash', path: '/admin/crm/trash', icon: Trash2 },
  ];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 glass-strong border-r border-border flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            CRM Panel
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin/crm' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
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
        <div className="p-4 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
