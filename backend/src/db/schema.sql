-- The Hub Database Schema (PostgreSQL / Supabase compatible)
-- Idempotent schema definition with Row Level Security (RLS) policies

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'learner',
  district TEXT DEFAULT 'Kigali City',
  location TEXT DEFAULT 'Kigali City',
  avatar_url TEXT,
  passport_id TEXT,
  bio TEXT,
  learning_streak INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT DEFAULT 'Beginner',
  market_demand TEXT DEFAULT 'High',
  sector TEXT DEFAULT 'ICT & Services',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  duration TEXT,
  estimated_hours INTEGER DEFAULT 10,
  instructor TEXT,
  rating NUMERIC(3,2) DEFAULT 4.8,
  image TEXT,
  description TEXT,
  modules JSONB,
  enrolled INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  certificate_requested BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_date TEXT NOT NULL,
  credential_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nisr_indicators (
  id TEXT PRIMARY KEY,
  indicator TEXT NOT NULL,
  value TEXT NOT NULL,
  trend TEXT,
  category TEXT NOT NULL,
  definition TEXT,
  source TEXT,
  retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS peer_matches (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  partner_name TEXT NOT NULL,
  topic TEXT NOT NULL,
  match_score INTEGER DEFAULT 85,
  schedule TEXT,
  status TEXT DEFAULT 'Scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS system_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
