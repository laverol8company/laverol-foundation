import { Routes, Route, Navigate } from 'react-router-dom';
import AdminAuthGate from '../../components/admin/AdminAuthGate';
import AdminLayout from '../../components/admin/AdminLayout';
import LeadsTable from '../../components/admin/LeadsTable';
import ArchiveView from '../../components/admin/ArchiveView';
import TrashView from '../../components/admin/TrashView';
import StatisticsDashboard from '../../components/admin/StatisticsDashboard';
import { useEffect, useState } from 'react';
import { fetchLeads } from '../../lib/crmApi';
import { Lead } from '../../types/crm';

function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads().then(setLeads).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <StatisticsDashboard leads={leads} />
      <LeadsTable />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthGate>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsTable />} />
          <Route path="/archive" element={<ArchiveView />} />
          <Route path="/trash" element={<TrashView />} />
          <Route path="*" element={<Navigate to="/admin/crm" replace />} />
        </Routes>
      </AdminLayout>
    </AdminAuthGate>
  );
}
