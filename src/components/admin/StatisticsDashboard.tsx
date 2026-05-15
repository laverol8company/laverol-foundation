import { Lead } from '../../types/crm';
import { Users, CheckCircle, Activity, XCircle } from 'lucide-react';

interface StatsProps {
  leads: Lead[];
}

export default function StatisticsDashboard({ leads }: StatsProps) {
  // Statistics based on live leads array (exclude archived/trashed by definition since they are fetched in LeadsTable)
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const wonLeads = leads.filter(l => l.status === 'closed_won').length;
  const lostLeads = leads.filter(l => l.status === 'closed_lost').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-primary/20 p-3 rounded-full mr-4 text-primary">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Active</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>
      </div>
      
      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-blue-500/20 p-3 rounded-full mr-4 text-blue-500">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">New Leads</p>
          <p className="text-2xl font-bold">{newLeads}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-green-500/20 p-3 rounded-full mr-4 text-green-500">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Closed Won</p>
          <p className="text-2xl font-bold">{wonLeads}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-red-500/20 p-3 rounded-full mr-4 text-red-500">
          <XCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Closed Lost</p>
          <p className="text-2xl font-bold">{lostLeads}</p>
        </div>
      </div>
    </div>
  );
}
