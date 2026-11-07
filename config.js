/* ============================================================
   Elite Home Care — public runtime config
   ------------------------------------------------------------
   Optional Supabase (backend) wiring. Get your values from
   Supabase Dashboard → Project Settings → API →
     - Project URL  → supabaseUrl
     - anon public  → supabaseAnonKey   (public-safe, RLS protects data)

   Leave empty to run the WhatsApp-only booking flow (default).
   For anonymous DB-backed bookings also run:
     supabase-allow-anon-bookings.sql  (in this repo, optional)
   Never put service_role keys here.
   ============================================================ */
window.EHC_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};
