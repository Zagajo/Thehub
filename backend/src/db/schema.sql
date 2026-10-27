<<<<<<< HEAD
-- The Hub Database Schema (Idempotent DDL)

-- 1. Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  location TEXT DEFAULT 'Kigali, Rwanda',
  preferred_language TEXT DEFAULT 'en',
  learning_streak INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skills Taxonomy
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT DEFAULT 'Beginner',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Assessed Skills
CREATE TABLE IF NOT EXISTS user_skills (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id TEXT REFERENCES skills(id) ON DELETE CASCADE,
  level TEXT DEFAULT 'Beginner',
  assessment_score INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  evidence TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Courses
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  estimated_hours INT DEFAULT 6,
  instructor_name TEXT,
  language TEXT DEFAULT 'English',
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Course Modules
CREATE TABLE IF NOT EXISTS course_modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  position INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration_minutes INT DEFAULT 15,
  position INT DEFAULT 1,
  lesson_type TEXT DEFAULT 'article',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress',
  progress_percentage INT DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 8. Assessments & Questions
CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  skill_id TEXT REFERENCES skills(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INT DEFAULT 70,
  duration_minutes INT DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_questions (
  id TEXT PRIMARY KEY,
  assessment_id TEXT REFERENCES assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option INT NOT NULL,
  explanation TEXT,
  position INT DEFAULT 1
);

-- 9. Learning Paths
CREATE TABLE IF NOT EXISTS learning_paths (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  target_role TEXT NOT NULL,
  description TEXT,
  estimated_weeks INT DEFAULT 8,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NISR Labour Market Indicators
CREATE TABLE IF NOT EXISTS nisr_indicators (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  dataset TEXT NOT NULL,
  indicator TEXT NOT NULL,
  indicator_code TEXT UNIQUE NOT NULL,
  year INT NOT NULL,
  period TEXT DEFAULT 'Annual',
  geography TEXT DEFAULT 'Rwanda - National',
  unit TEXT NOT NULL,
  value NUMERIC NOT NULL,
  metadata JSONB,
  retrieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  requirements JSONB,
  difficulty TEXT DEFAULT 'Intermediate',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Peer Learning Sessions
CREATE TABLE IF NOT EXISTS peer_sessions (
  id TEXT PRIMARY KEY,
  creator_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id TEXT REFERENCES skills(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  language TEXT DEFAULT 'English',
  status TEXT DEFAULT 'open',
  scheduled_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
=======
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
  difficulty TEXT,
  duration TEXT,
  theory_weight INTEGER,
  practical_weight INTEGER,
  project_weight INTEGER,
  theory_questions JSONB,
  practical_task JSONB,
  capstone_brief TEXT
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
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
);
