import { useState } from 'react';
import LeadsTable from '../../components/admin/LeadsTable';
import StorageView from '../../components/admin/StorageView';

export default function CrmDashboard() {
  const [activeTab, setActiveTab] = useState<'main' | 'storage'>('main');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-border/50 pb-2">
        <button
          onClick={() => setActiveTab('main')}
          className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'main' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Все лиды
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'storage' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Хранилище
        </button>
      </div>

      {activeTab === 'main' && <LeadsTable />}
      {activeTab === 'storage' && <StorageView />}
    </div>
  );
}
