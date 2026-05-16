import { Lead } from '../../types/crm';
import { Users, Flame, Send, Activity } from 'lucide-react';

interface StatsProps {
  leads: Lead[];
}

export default function StatisticsDashboard({ leads }: StatsProps) {
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.is_hot).length;
  const outreachSent = leads.filter(l => l.status === 'outreach_sent').length;
  
  const leadsWithScore = leads.filter(l => l.score !== null && l.score !== undefined);
  const avgScore = leadsWithScore.length > 0 
    ? Math.round(leadsWithScore.reduce((sum, l) => sum + (l.score || 0), 0) / leadsWithScore.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-primary/20 p-3 rounded-full mr-4 text-primary">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Active Leads</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>
      </div>
      
      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-amber-500/20 p-3 rounded-full mr-4 text-amber-500">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">🔥 Hot Leads</p>
          <p className="text-2xl font-bold">{hotLeads}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-blue-600/20 p-3 rounded-full mr-4 text-blue-600">
          <Send className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Outreach Sent</p>
          <p className="text-2xl font-bold">{outreachSent}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center border border-border/50">
        <div className="bg-violet-500/20 p-3 rounded-full mr-4 text-violet-500">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Average Score</p>
          <p className="text-2xl font-bold">avg: {avgScore}</p>
        </div>
      </div>
    </div>
  );
}
