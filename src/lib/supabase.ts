import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://qezkerxxntfmqtdwykla.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlemtlcnh4bnRmbXF0ZHd5a2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNDQ0NzAsImV4cCI6MjA4MTkyMDQ3MH0.wgH9kZV3tI_SMQKGthNNabHZg9WFtTmKJ_nnt52PciM'
)
