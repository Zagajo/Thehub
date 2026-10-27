-- ==============================================================================
-- THE HUB (RWANDA) - PRODUCTION SUPABASE DATABASE SCHEMA & MIGRATION SCRIPT
-- ==============================================================================
-- Run this script directly in your Supabase project's SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- Fully idempotent with automatic ALTER TABLE column additions for existing schemas.
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'learner',
  district TEXT DEFAULT 'Kigali City',
  location TEXT DEFAULT 'Kigali City',
  avatar_url TEXT,
  passport_id TEXT,
  bio TEXT,
  learning_streak INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist on existing profiles table
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'learner';
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS district TEXT DEFAULT 'Kigali City';
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Kigali City';
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS passport_id TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS learning_streak INTEGER DEFAULT 1;

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  duration TEXT DEFAULT '6 Weeks',
  estimated_hours INTEGER DEFAULT 10,
  instructor TEXT,
  instructor_name TEXT,
  rating NUMERIC(3,2) DEFAULT 4.8,
  image TEXT,
  thumbnail_url TEXT,
  description TEXT,
  short_description TEXT,
  modules JSONB,
  enrolled INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '6 Weeks';
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS instructor TEXT;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS instructor_name TEXT;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS modules JSONB;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS enrolled INTEGER DEFAULT 0;
ALTER TABLE IF EXISTS public.courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

-- 3. Course Enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT,
  status TEXT DEFAULT 'in_progress',
  completed BOOLEAN DEFAULT FALSE,
  certificate_requested BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.enrollments ADD COLUMN IF NOT EXISTS course_title TEXT;
ALTER TABLE IF EXISTS public.enrollments ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'in_progress';
ALTER TABLE IF EXISTS public.enrollments ADD COLUMN IF NOT EXISTS completed BOOLEAN DEFAULT FALSE;
ALTER TABLE IF EXISTS public.enrollments ADD COLUMN IF NOT EXISTS certificate_requested BOOLEAN DEFAULT FALSE;
ALTER TABLE IF EXISTS public.enrollments ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0;

-- 4. Certificates & Verified Credentials
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_date TEXT NOT NULL,
  credential_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Official NISR Labour Market Indicators
CREATE TABLE IF NOT EXISTS public.nisr_indicators (
  id TEXT PRIMARY KEY,
  indicator TEXT NOT NULL,
  indicator_code TEXT,
  value NUMERIC,
  trend TEXT,
  category TEXT,
  definition TEXT,
  source TEXT,
  dataset TEXT,
  year INT DEFAULT 2023,
  period TEXT DEFAULT 'Annual',
  geography TEXT DEFAULT 'Rwanda - National',
  unit TEXT DEFAULT '%',
  metadata JSONB,
  retrieved_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.nisr_indicators ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE IF EXISTS public.nisr_indicators ADD COLUMN IF NOT EXISTS trend TEXT;
ALTER TABLE IF EXISTS public.nisr_indicators ADD COLUMN IF NOT EXISTS definition TEXT;
ALTER TABLE IF EXISTS public.nisr_indicators ADD COLUMN IF NOT EXISTS indicator_code TEXT;

-- 6. Peer Matching Sessions
CREATE TABLE IF NOT EXISTS public.peer_matches (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  partner_name TEXT NOT NULL,
  topic TEXT NOT NULL,
  match_score INTEGER DEFAULT 85,
  schedule TEXT,
  status TEXT DEFAULT 'Scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. System Audit Logs
CREATE TABLE IF NOT EXISTS public.system_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);

-- Enable Row Level Security (RLS) safely
DO $$
BEGIN
  EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.nisr_indicators ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN OTHERS THEN
  -- Table security already enabled
END $$;

-- Permissive Read & Write Policies for Application Keys
DO $$
BEGIN
  CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Public read nisr" ON public.nisr_indicators FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Public read enrollments" ON public.enrollments FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow insert certificates" ON public.certificates FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow update enrollments" ON public.enrollments FOR UPDATE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Initial Seed Data (Idempotent)
INSERT INTO public.profiles (id, full_name, name, email, role, district, location, passport_id, learning_streak)
VALUES
  ('u-admin-1', 'System Administrator', 'System Administrator', 'admin@thehub.rw', 'admin', 'Kigali City (HQ)', 'Kigali City (HQ)', 'HUB-RW-ADMIN-01', 12),
  ('u-kezia-1', 'Kezia Umutoni', 'Kezia Umutoni', 'kezia.umutoni@thehub.rw', 'learner', 'Kigali City (Gasabo)', 'Kigali City (Gasabo)', 'HUB-RW-88392', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.certificates (id, user_id, user_name, course_title, issued_date, credential_hash)
VALUES
  ('cert-1', 'u-kezia-1', 'Kezia Umutoni', 'Full-Stack Web Engineering (Python & React)', '2026-10-15', 'SHA-256: 8fbc91e4a27b9c9f0e1d823456789abc')
ON CONFLICT (id) DO NOTHING;
