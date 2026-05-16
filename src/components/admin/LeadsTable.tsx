import { useEffect, useState } from 'react';
import { Lead, LeadStatus } from '../../types/crm';
import { fetchLeads, updateLeadStatus, archiveLead, trashLead } from '../../lib/crmApi';
import { supabase } from '../../lib/supabase';
import { Loader2, Trash2, Archive, AlertCircle, RefreshCw, Circle, MessageSquare } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import LeadDrawer from './LeadDrawer';
import SendMessageModal from './SendMessageModal';

const StatusBadge = ({ status, onChange }: { status: string, onChange: (val: string) => void }) => {
  return (
    <select
      className="bg-background border border-border rounded-md px-2 py-1 text-sm font-medium"
      value={status}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    >
      <option value="new">New</option>
      <option value="analyzing">Analyzing</option>
      <option value="qualified">Qualified</option>
      <option value="outreach_sent">Outreach Sent</option>
      <option value="replied">Replied</option>
    </select>
  );
};

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realtime, setRealtime] = useState(false);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load data. Check Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel('leads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Leads_Finder' }, () => {
        loadData();
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtime(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setLeads(leads.map(l => l.id === id ? { ...l, status: status as LeadStatus } : l));
      await updateLeadStatus(id, status as LeadStatus);
    } catch (err: any) {
      console.error(err);
      loadData(); // Revert on error
    }
  };

  const handleArchive = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await archiveLead(id);
      await loadData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleTrash = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await trashLead(id);
      await loadData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const openDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const openModal = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="glass-strong border-red-500/50 bg-red-500/10 p-4 rounded-xl flex items-center justify-between mb-4">
        <div className="flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
        <button onClick={loadData} className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          Active Leads
          {realtime && <Circle className="w-3 h-3 ml-2 text-green-500 fill-current animate-pulse" title="Live" />}
        </h2>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border/50 overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-border/50 bg-muted/50">
              <th className="p-4 font-medium text-muted-foreground w-12 text-center">🔥</th>
              <th className="p-4 font-medium text-muted-foreground">Business Name</th>
              <th className="p-4 font-medium text-muted-foreground">Score</th>
              <th className="p-4 font-medium text-muted-foreground">Priority</th>
              <th className="p-4 font-medium text-muted-foreground">Phone</th>
              <th className="p-4 font-medium text-muted-foreground">Rating</th>
              <th className="p-4 font-medium text-muted-foreground text-center">Has Website</th>
              <th className="p-4 font-medium text-muted-foreground">Status</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="border-b border-border/10">
                  <td className="p-4"><Skeleton className="h-4 w-4" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-12" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-12" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-8 mx-auto" /></td>
                  <td className="p-4"><Skeleton className="h-8 w-24 rounded-full" /></td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                      <Archive className="w-8 h-8 opacity-50" />
                    </div>
                    <p>No active leads. Add leads via n8n parser.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} onClick={() => openDrawer(lead)} className="border-b border-border/50 hover:bg-muted/20 transition cursor-pointer">
                  <td className="p-4 text-center">{lead.is_hot ? '🔥' : ''}</td>
                  <td className="p-4 font-bold">{lead.business_name || 'Unknown'}</td>
                  <td className="p-4 font-medium">
                    {lead.score !== null ? (
                      <span className={lead.score >= 70 ? 'text-green-500' : lead.score >= 40 ? 'text-yellow-500' : 'text-red-500'}>
                        {lead.score}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="p-4">
                    {lead.outreach_priority && (
                      <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium uppercase tracking-wider">
                        {lead.outreach_priority}
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-sm">{lead.phone || '-'}</td>
                  <td className="p-4">
                    {lead.rating !== null ? `★ ${lead.rating} (${lead.review_count})` : '-'}
                  </td>
                  <td className="p-4 text-center">{lead.has_website ? '✅' : '❌'}</td>
                  <td className="p-4">
                    <StatusBadge status={lead.status} onChange={(val) => handleStatusChange(lead.id, val)} />
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={(e) => openModal(lead, e)} className="p-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition" title="Send Message">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => handleArchive(lead.id, e)} className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => handleTrash(lead.id, e)} className="p-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition" title="Trash">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <LeadDrawer lead={selectedLead} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
      <SendMessageModal lead={selectedLead} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
