import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jjkscqkessritixnyrei.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqa3NjcWtlc3NyaXRpeG55cmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDU1NzAsImV4cCI6MjA2NTQyMTU3MH0.R2DFzm4SzN0_sluZ3eGleAwvJUzKBdNnkoraifIJyHs"
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseKey);
