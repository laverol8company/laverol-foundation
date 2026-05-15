export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'closed_won' | 'closed_lost';

export interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  status: LeadStatus;
  lead_type?: string;
  source?: string;
  is_archived: boolean;
  archived_at?: string | null;
  is_trashed: boolean;
  trashed_at?: string | null;
  created_at: string;
}

export interface Contact {
  id: string;
  lead_id: string;
  contact_method: string;
  notes: string;
  created_at: string;
}
