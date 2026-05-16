import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('Leads_Finder').insert([{
    business_name: 'Luxury Auto Studio',
    website_url: 'https://luxuryauto.com',
    phone: '+1 234 567 8900',
    address: '123 Luxury Lane, Auto City',
    rating: 4.9,
    review_count: 120,
    score: 9,
    outreach_priority: 'hot',
    recommended_offer: 'Premium Autopilot Detailing Service',
    cold_message_hook: 'Hello! I noticed you do great auto detailing. Our new autopilot feature could boost your sales.',
    ai_summary: 'High-end auto detailing shop with strong online presence but missing mobile booking.',
    instagram_url: 'https://instagram.com/luxuryautostudio',
    status: 'new'
  }]).select();
  if (error) console.error(error);
  else console.log('Inserted:', data[0].id);
}
run();
