-- The Hub / SkillBridge Rwanda Database Schema (PostgreSQL)
CREATE TABLE IF NOT EXISTS profiles (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(32) DEFAULT 'learner',
  district VARCHAR(128),
  passport_id VARCHAR(64) UNIQUE,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  difficulty VARCHAR(64) NOT NULL,
  duration VARCHAR(64) NOT NULL,
  enrolled INT DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 5.00,
  image TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS modules (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(64),
  notes TEXT,
  video_url TEXT
);

CREATE TABLE IF NOT EXISTS certificates (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES profiles(id),
  user_name VARCHAR(255) NOT NULL,
  course_title VARCHAR(255) NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  credential_hash VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS nisr_indicators (
  id VARCHAR(64) PRIMARY KEY,
  indicator VARCHAR(255) NOT NULL,
  value VARCHAR(64) NOT NULL,
  trend VARCHAR(64),
  category VARCHAR(128),
  definition TEXT,
  source TEXT
);
