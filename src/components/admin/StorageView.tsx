import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lead } from '../../types/crm';
import { fetchLeads } from '../../lib/crmApi';
import { Search, Loader2 } from 'lucide-react';

export default function StorageView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchLeads('contacted');
        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredLeads = leads.filter((lead) =>
    lead.business_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadge = (priority: string | null) => {
    if (priority === 'hot') return <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold">Hot 🔥</span>;
    if (priority === 'warm') return <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-bold">Warm 🌡</span>;
    if (priority === 'cold') return <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-bold">Cold ❄️</span>;
    return <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs font-bold">-</span>;
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 8) return 'text-green-500 font-bold';
    if (score >= 5) return 'text-yellow-500 font-bold';
    return 'text-red-500 font-bold';
  };

  const getDaysToDeletion = (updatedAt: string | null) => {
    if (!updatedAt) return 90;
    const updateDate = new Date(updatedAt);
    const diffTime = Math.abs(new Date().getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, 90 - diffDays);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Связанные лиды</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg bg-muted border-none focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border/50 overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-border/50 bg-muted/50">
              <th className="p-4 font-medium text-muted-foreground">Название бизнеса</th>
              <th className="p-4 font-medium text-muted-foreground">Телефон</th>
              <th className="p-4 font-medium text-muted-foreground">Приоритет</th>
              <th className="p-4 font-medium text-muted-foreground text-center">Score</th>
              <th className="p-4 font-medium text-muted-foreground">Статус</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Удаление через</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Пусто
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const daysLeft = getDaysToDeletion(lead.updated_at || lead.created_at);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => navigate(`/admin/crm/${lead.id}`)}
                    className="border-b border-border/50 hover:bg-muted/30 transition cursor-pointer"
                  >
                    <td className="p-4 font-bold">{lead.business_name || 'Неизвестно'}</td>
                    <td className="p-4 font-mono text-sm">{lead.phone || '-'}</td>
                    <td className="p-4">{getPriorityBadge(lead.outreach_priority)}</td>
                    <td className={`p-4 text-center text-lg ${getScoreColor(lead.score)}`}>
                      {lead.score ?? '-'}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium uppercase">
                        Contacted
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${daysLeft < 10 ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
                        {daysLeft} дней
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
