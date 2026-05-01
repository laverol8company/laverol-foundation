create or replace function public.validate_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Require at least a contact channel
  if (coalesce(length(trim(new.contact)), 0) = 0) then
    raise exception 'Contact is required';
  end if;
  -- Length limits
  if length(coalesce(new.name,'')) > 200
     or length(coalesce(new.business_name,'')) > 200
     or length(coalesce(new.business_type,'')) > 200
     or length(coalesce(new.website_or_social,'')) > 500
     or length(coalesce(new.need,'')) > 100
     or length(coalesce(new.contact,'')) > 500
     or length(coalesce(new.language,'')) > 10
     or length(coalesce(new.recommendation,'')) > 100
     or length(coalesce(new.bonus_code,'')) > 50
     or length(coalesce(new.source,'')) > 50
     or length(coalesce(new.user_agent,'')) > 500 then
    raise exception 'Field length exceeded';
  end if;
  if new.source is null or new.source not in ('contact_form','concierge') then
    new.source := 'contact_form';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_validate_lead on public.leads;
create trigger trg_validate_lead
before insert on public.leads
for each row execute function public.validate_lead();