export type LeadStatus = 'new' | 'analyzing' | 'qualified' | 'outreach_sent' | 'replied';

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string | null;
  
  business_name: string | null;
  website_url: string | null;
  google_place_id: string | null;
  
  rating: number | null;
  review_count: number | null;
  phone: string | null;
  address: string | null;
  
  score: number | null;
  score_block_a: number | null;
  score_block_b: number | null;
  score_penalties: number | null;
  score_breakdown: Record<string, unknown> | null;
  outreach_priority: 'hot' | 'warm' | 'cold' | null;
  
  has_website: boolean | null;
  audit_has_booking: boolean | null;
  audit_mobile_ready: boolean | null;
  audit_has_apple_pay: boolean | null;
  audit_seo_score: number | null;
  audit_legacy_tech: boolean | null;
  
  money_leaks: Record<string, unknown> | null;
  business_vibe: string | null;
  unique_signals: Record<string, unknown> | null;
  services_detected: Record<string, unknown> | null;
  
  price_range: string | null;
  instagram_active: boolean | null;
  instagram_url: string | null;
  languages_detected: Record<string, unknown> | null;
  recent_review_snippet: string | null;
  
  recommended_offer: string | null;
  cold_message_hook: string | null;
  ai_summary: string | null;
  
  is_hot: boolean;
  status: LeadStatus;
  outreach_sent_at: string | null;
  outreach_response: string | null;
  
  is_archived: boolean;
  archived_at: string | null;
  is_trashed: boolean;
  trashed_at: string | null;
}

export interface Contact {
  id: string;
  created_at: string;
  lead_id: string;
  full_name: string | null;
  email: string | null;
  email_status: string | null;
  linkedin_url: string | null;
  phone: string | null;
  title: string | null;
}
