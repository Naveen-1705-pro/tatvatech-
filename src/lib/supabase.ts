import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback demo mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// True if real credentials provided, otherwise uses high-fidelity local state store
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-url') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

console.log(
  `[NEXORA Core] Database runtime: ${
    isSupabaseConfigured ? '🟢 Connected to Supabase Cloud' : '🔵 Running in Local Reactive Demo Mode (Fully Functional)'
  }`
);
