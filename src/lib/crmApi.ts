import { supabase } from './supabase';
import { Lead, LeadStatus, Contact } from '../types/crm';

export const fetchLeads = async (status: LeadStatus = 'new'): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('Leads_Finder')
    .select('*')
    .eq('status', status)
    .order('score', { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }
  return data || [];
};

export const getLeadById = async (id: string): Promise<Lead> => {
  const { data, error } = await supabase
    .from('Leads_Finder')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch lead: ${error.message}`);
  }
  return data;
};

export const updateLeadStatus = async (id: string, status: LeadStatus): Promise<void> => {
  const updateData: any = { status };
  
  if (status === 'deleted') {
    updateData.deleted_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('Leads_Finder')
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update lead status: ${error.message}`);
  }
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
