import { useEffect, useState } from 'react';
import { Lead } from '../../types/crm';
import { fetchArchivedLeads, restoreLeadFromArchive } from '../../lib/crmApi';
import { Loader2, ArchiveRestore, Archive, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useCrmLang } from '../../contexts/CrmLangContext';

export default function ArchiveView() {
  const { t } = useCrmLang();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArchivedLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load data. Check Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await restoreLeadFromArchive(id);
      await loadData();
    } catch (err: any) {
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="glass-strong border-red-500/50 bg-red-500/10 p-4 rounded-xl flex items-center justify-between mb-4">
        <div className="flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
        <button onClick={loadData} className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          <RefreshCw className="w-4 h-4 mr-2" /> {t('retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('archive')}</h2>
      <div className="glass rounded-xl overflow-hidden border border-border/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/50">
              <th className="p-4 font-medium text-muted-foreground">{t('name')}</th>
              <th className="p-4 font-medium text-muted-foreground">{t('contact')}</th>
              <th className="p-4 font-medium text-muted-foreground">{t('archivedDate')}</th>
              <th className="p-4 font-medium text-muted-foreground text-right">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2].map(i => (
                <tr key={i} className="border-b border-border/10">
                  <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="p-4 text-right flex justify-end">
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                      <Archive className="w-8 h-8 opacity-50" />
                    </div>
                    <p>{t('archiveEmpty')}</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/20 transition">
                  <td className="p-4 font-medium">{lead.name || t('unknown')}</td>
                  <td className="p-4 text-sm">
                    {lead.phone && <div>{lead.phone}</div>}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {lead.archived_at ? new Date(lead.archived_at).toLocaleDateString() : ''}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleRestore(lead.id)} className="flex items-center ml-auto px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm">
                      <ArchiveRestore className="w-4 h-4 mr-2" /> {t('restore')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
