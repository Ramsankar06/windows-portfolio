-- ============================================================
-- Portfolio XP — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  tech_stack text,
  github_url text,
  live_url text,
  image_url text,
  created_at timestamp DEFAULT now()
);

-- SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  category text,
  name text,
  level text
);

-- CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  issuer text,
  date text,
  certificate_url text
);

-- WORKSHOPS
CREATE TABLE IF NOT EXISTS workshops (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  organization text,
  date text,
  description text
);

-- ABOUT (includes resume_url)
CREATE TABLE IF NOT EXISTS about (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  bio text,
  location text,
  email text,
  linkedin text,
  github text,
  resume_url text
);

-- MESSAGES (contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text,
  email text,
  message text,
  created_at timestamp DEFAULT now()
);

-- ============================================================
-- Row Level Security (RLS) — Required for Supabase
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE projects     ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills       ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops    ENABLE ROW LEVEL SECURITY;
ALTER TABLE about        ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages     ENABLE ROW LEVEL SECURITY;

-- Public READ access (anyone can view portfolio)
CREATE POLICY "Public read projects"     ON projects     FOR SELECT USING (true);
CREATE POLICY "Public read skills"       ON skills       FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read workshops"    ON workshops    FOR SELECT USING (true);
CREATE POLICY "Public read about"        ON about        FOR SELECT USING (true);

-- Anyone can submit a contact message
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Auth all projects"     ON projects     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all skills"       ON skills       FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all workshops"    ON workshops    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all about"        ON about        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all messages"     ON messages     FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage: Create a public "resumes" bucket for resume uploads
-- Do this in Supabase Dashboard > Storage > New Bucket
-- Name: resumes
-- Public: YES (toggle on)
-- ============================================================
