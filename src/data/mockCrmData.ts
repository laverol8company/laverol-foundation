import { Lead } from '../types/crm';

export const mockCrmData: Lead[] = [
  {
    id: '1',
    name: 'Ivan Ivanov',
    phone: '+7 999 123 45 67',
    email: 'ivan@example.com',
    status: 'new',
    lead_type: 'Sales',
    is_archived: false,
    is_trashed: false,
    created_at: new Date().toISOString()
  }
];
