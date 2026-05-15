import { supabase } from './supabase';
import { Lead, LeadStatus, Contact } from '../types/crm';

export const fetchLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('Leads_Finder')
    .select('*')
    .is('is_archived', false)
    .is('is_trashed', false)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }
  return data || [];
};

export const fetchArchivedLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('Leads_Finder')
    .select('*')
    .eq('is_archived', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch archived leads: ${error.message}`);
  }
  return data || [];
};

export const fetchTrashedLeads = async (): Promise<Lead[]> => {
  // 30 days calculation
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from('Leads_Finder')
    .select('*')
    .eq('is_trashed', true)
    .gte('trashed_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch trashed leads: ${error.message}`);
  }
  return data || [];
};

export const fetchContactsByLeadId = async (leadId: string): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }
  return data || [];
};

export const updateLeadStatus = async (id: string, status: LeadStatus): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update lead status: ${error.message}`);
  }
};

export const archiveLead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .update({ is_archived: true, archived_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to archive lead: ${error.message}`);
  }
};

export const restoreLeadFromArchive = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .update({ is_archived: false, archived_at: null })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to restore lead from archive: ${error.message}`);
  }
};

export const trashLead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .update({ is_trashed: true, trashed_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to trash lead: ${error.message}`);
  }
};

export const restoreLeadFromTrash = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .update({ is_trashed: false, trashed_at: null })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to restore lead from trash: ${error.message}`);
  }
};

export const permanentlyDeleteLead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('Leads_Finder')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to permanently delete lead: ${error.message}`);
  }
};
