import { useEffect, useState } from 'react';
import { useCrmLang } from '../../contexts/CrmLangContext';

export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { t, lang, setLang } = useCrmLang();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('crm_auth') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (password === correctPassword) {
      sessionStorage.setItem('crm_auth', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (loading) return null;

  if (true || authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative glass-strong p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500">
        {/* Language switcher on login screen */}
        <div className="absolute top-4 right-4 flex rounded-lg overflow-hidden border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setLang('ru')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'ru' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            EN
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            CRM Admin
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t('enterPassword')}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 font-medium animate-in slide-in-from-top-1">
                {t('wrongPassword')}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-[0.98]"
          >
            {t('loginBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
