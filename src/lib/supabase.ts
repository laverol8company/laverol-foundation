import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  if (!url || !key || key === 'placeholder-key') {
    console.warn('Supabase env vars not configured')
    return null
  }
  
  if (!_supabase) {
    _supabase = createClient(url, key)
  }
  
  return _supabase
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabase()
    if (!client) return () => ({ data: null, error: new Error('Supabase not configured') })
    return (client as any)[prop]
  }
})
