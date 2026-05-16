import { Routes, Route, Navigate } from 'react-router-dom';
import AdminAuthGate from '../../components/admin/AdminAuthGate';
import AdminLayout from '../../components/admin/AdminLayout';
import CrmDashboard from './CrmDashboard';
import LeadDetailPage from './LeadDetailPage';
import { CrmLangProvider } from '../../contexts/CrmLangContext';

export default function AdminPage() {
  return (
    <CrmLangProvider>
      <AdminAuthGate>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<CrmDashboard />} />
            <Route path="/:id" element={<LeadDetailPage />} />
            <Route path="*" element={<Navigate to="/admin/crm" replace />} />
          </Routes>
        </AdminLayout>
      </AdminAuthGate>
    </CrmLangProvider>
  );
}
