import { useEffect, useState } from 'react';
import { Lead } from '../../types/crm';
import { fetchTrashedLeads, restoreLeadFromTrash, permanentlyDeleteLead } from '../../lib/crmApi';
import { Trash2, AlertCircle, RefreshCw, Undo2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useCrmLang } from '../../contexts/CrmLangContext';

export default function TrashView() {
  const { t } = useCrmLang();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrashedLeads();
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
      await restoreLeadFromTrash(id);
      await loadData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await permanentlyDeleteLead(id);
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
      <h2 className="text-2xl font-bold">{t('trashTitle')}</h2>
      <div className="glass rounded-xl overflow-hidden border border-border/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/50">
              <th className="p-4 font-medium text-muted-foreground">{t('name')}</th>
              <th className="p-4 font-medium text-muted-foreground">{t('contact')}</th>
              <th className="p-4 font-medium text-muted-foreground">{t('trashedDate')}</th>
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
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                      <Trash2 className="w-8 h-8 opacity-50" />
                    </div>
                    <p>{t('trashEmpty')}</p>
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
                    {lead.trashed_at ? new Date(lead.trashed_at).toLocaleDateString() : ''}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleRestore(lead.id)} className="flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition text-sm" title={t('restore')}>
                      <Undo2 className="w-4 h-4 mr-2" /> {t('restore')}
                    </button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-1.5 bg-destructive text-destructive-foreground rounded-md hover:bg-red-600 transition" title={t('delete')}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass-strong">
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('deleteWarning').replace('{name}', lead.name || '')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(lead.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {t('delete')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
