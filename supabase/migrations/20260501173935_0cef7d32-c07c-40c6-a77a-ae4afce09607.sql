-- Leads table for contact form + concierge submissions
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'contact_form',
  name text,
  business_name text,
  business_type text,
  website_or_social text,
  need text,
  contact text,
  language text,
  concierge_answers jsonb,
  recommendation text,
  bonus_code text,
  user_agent text
);

alter table public.leads enable row level security;

-- Public can submit leads (insert only); nobody can read via anon
create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- No select policy = no one can read via API (only via Cloud dashboard / service role)