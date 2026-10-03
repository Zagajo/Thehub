-- The Hub Database Schema (PostgreSQL / Supabase compatible)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT,
  location TEXT,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT,
  market_demand TEXT,
  sector TEXT
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  difficulty TEXT,
  duration TEXT,
  nisr_sector TEXT,
  rating NUMERIC(3,2),
  description TEXT,
  syllabus JSONB
);

CREATE TABLE IF NOT EXISTS nisr_indicators (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  value NUMERIC(6,2),
  unit TEXT,
  category TEXT,
  trend TEXT,
  source TEXT,
  dataset TEXT,
  provenance TEXT,
  target_skills TEXT[]
);

CREATE TABLE IF NOT EXISTS user_enrollments (
  user_id TEXT REFERENCES profiles(id),
  course_id TEXT REFERENCES courses(id),
  progress_percentage INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS user_skills (
  user_id TEXT REFERENCES profiles(id),
  skill_id TEXT REFERENCES skills(id),
  score INTEGER,
  level TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  course_id TEXT REFERENCES courses(id),
  skill_target TEXT,
  duration TEXT,
  theory_weight INTEGER,
  practical_weight INTEGER,
  project_weight INTEGER
);

CREATE TABLE IF NOT EXISTS credentials (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id),
  title TEXT NOT NULL,
  issued_by TEXT,
  issue_date DATE,
  evidence_url TEXT,
  score TEXT
);

CREATE TABLE IF NOT EXISTS peer_matches (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id),
  partner_name TEXT,
  topic TEXT,
  match_score INTEGER,
  schedule TEXT,
  status TEXT
);
