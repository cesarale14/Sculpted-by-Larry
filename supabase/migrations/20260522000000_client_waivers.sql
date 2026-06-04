-- ============================================================================
-- client_waivers — signed activity waivers + payment linkage
--
-- SENSITIVE: this table holds PII (name, email, DOB, phone, emergency contact)
-- AND a health attestation (clause 5 "fitness to participate"). Treat it as
-- sensitive data.
--
-- Security posture:
--   * Row Level Security is ENABLED.
--   * NO policies are created for the anon / authenticated roles, which means
--     default-DENY for them — the public anon key cannot SELECT/INSERT/UPDATE.
--   * All reads/writes happen ONLY server-side via the SERVICE ROLE key, which
--     bypasses RLS. The anon key is never used against this table.
--   * Executed PDFs live in a PRIVATE storage bucket (public = false), accessed
--     server-side via the service role / signed URLs only.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.client_waivers (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- Participant identity (PII)
  participant_name    text not null,
  participant_email   text not null,
  participant_dob     date,
  participant_phone   text,

  -- Emergency contact (clause 8)
  emergency_name      text,
  emergency_phone     text,

  -- Clause 5 health attestation: "no limitations / will obtain clearance"
  fitness_attestation boolean not null,

  -- Which document text the participant agreed to (e.g. "v1-2026-05")
  waiver_version      text not null,

  -- Typed e-signature
  signature_name      text not null,
  signature_method    text not null default 'typed',

  -- ── AUDIT TRAIL ──────────────────────────────────────────────────────────
  agreed_at           timestamptz,
  signer_ip           text,
  user_agent          text,

  -- Path to the executed PDF in the private storage bucket
  pdf_storage_path    text,

  -- Stripe payment linkage
  payment_status      text not null default 'pending',  -- pending | paid
  stripe_session_id   text
);

-- Enable RLS. Deliberately NO anon/authenticated policies => default deny.
alter table public.client_waivers enable row level security;

-- Belt-and-suspenders: ensure the public API roles hold no table grants.
revoke all on table public.client_waivers from anon, authenticated;

-- ── Private storage bucket for executed waiver PDFs ─────────────────────────
-- public = false: objects are NOT served over the public CDN. Access is via
-- the service role or short-lived signed URLs generated server-side.
insert into storage.buckets (id, name, public)
values ('waivers', 'waivers', false)
on conflict (id) do nothing;

-- No storage.objects policies for anon/authenticated => default deny for the
-- 'waivers' bucket. The service role bypasses RLS for storage as well.
