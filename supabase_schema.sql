-- =========================================================
-- Dave Matchica Portfolio — Supabase Schema
-- Safe to re-run: uses IF NOT EXISTS and ON CONFLICT guards.
-- =========================================================

-- 1. Portfolio Content
CREATE TABLE IF NOT EXISTS portfolio_content (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section    text NOT NULL,
  key        text NOT NULL,
  value      text,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (section, key)
);

-- 2. Projects
CREATE TABLE IF NOT EXISTS projects (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title         text NOT NULL,
  description   text,
  tech_stack    text[],
  demo_url      text,
  github_url    text,
  emoji         text DEFAULT '🚀',
  accent_color  text DEFAULT '#6366f1',
  sort_order    int  DEFAULT 0,
  visible       boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- 3. Skills
CREATE TABLE IF NOT EXISTS skills (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category    text NOT NULL,
  name        text NOT NULL,
  color_class text DEFAULT 'tag-indigo'
);

-- =========================================================
-- Row Level Security
-- =========================================================
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills            ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_content'  AND tablename = 'portfolio_content') THEN
    CREATE POLICY "public_read_content"  ON portfolio_content FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_projects' AND tablename = 'projects') THEN
    CREATE POLICY "public_read_projects" ON projects          FOR SELECT USING (visible = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_skills'   AND tablename = 'skills') THEN
    CREATE POLICY "public_read_skills"   ON skills            FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'auth_all_content'     AND tablename = 'portfolio_content') THEN
    CREATE POLICY "auth_all_content"  ON portfolio_content FOR ALL USING (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'auth_all_projects'    AND tablename = 'projects') THEN
    CREATE POLICY "auth_all_projects" ON projects          FOR ALL USING (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'auth_all_skills'      AND tablename = 'skills') THEN
    CREATE POLICY "auth_all_skills"   ON skills            FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- =========================================================
-- Seed Data
-- =========================================================
INSERT INTO portfolio_content (section, key, value) VALUES
('hero', 'name',        'Dave E. Matchica'),
('hero', 'role',        'IT Student & Aspiring Web Developer'),
('hero', 'tagline',     'Passionate about crafting dynamic, responsive web experiences that drive real results — from boosting engagement to improving conversion rates.'),
('hero', 'stat1_num',   '3+'),
('hero', 'stat1_label', 'projects built'),
('hero', 'stat2_num',   '10+'),
('hero', 'stat2_label', 'technologies'),
('hero', 'stat3_num',   '4th'),
('hero', 'stat3_label', 'year IT student'),
('hero', 'avatar_url',  ''),
('about', 'bio1',       'I''m a passionate web developer currently pursuing my BS in Information Technology at Caraga State University. I partner with businesses to create dynamic, responsive websites that drive real results.'),
('about', 'bio2',       'I specialize in clean, maintainable code and best practices to build fast, accessible, and scalable solutions — allowing business owners to focus on what they do best while I handle the technical complexity.'),
('about', 'bio3',       'From interactive front-end interfaces to robust back-end APIs, I enjoy building complete solutions that look great and perform even better.'),
('about', 'strengths',  'Self-directed learner who thrives both independently and in collaborative team environments. Strong problem-solver with effective communication skills and a passion for clean, purposeful design.'),
('about', 'location',   'Ipil, Gigaquit, SDN, Philippines'),
('about', 'email',      'devvkun@gmail.com'),
('about', 'phone',      '+63 938 604 5189'),
('about', 'status',     'Open to work'),
('education', 'school',       'Caraga State University — Main Campus'),
('education', 'degree',       'Bachelor of Science in Information Technology'),
('education', 'period',       '2021 — PRESENT (Expected 2027)'),
('education', 'description',  'Currently pursuing a comprehensive IT degree covering full-stack web development, database management, software engineering principles, and systems analysis. Actively building real-world projects alongside academic learning.'),
('contact', 'email',     'devvkun@gmail.com'),
('contact', 'phone',     '+63 938 604 5189'),
('contact', 'github',    'https://github.com/davematchica'),
('contact', 'linkedin',  'https://linkedin.com/in/dave-matchica-718859290'),
('contact', 'instagram', 'Dave Matchica')
ON CONFLICT (section, key) DO NOTHING;

INSERT INTO projects (title, description, tech_stack, demo_url, github_url, emoji, accent_color, sort_order) VALUES
('Dynamic Portfolio Website with CMS', 'A fully dynamic portfolio website backed by a content management system, enabling easy updates without code changes. Features a clean UI with smooth transitions and real-time content rendering.', ARRAY['HTML','CSS','JavaScript','Node.js','Express.js','MySQL'], 'https://judith-portfolio-six.vercel.app/', '', '💼', '#6366f1', 1),
('Lost Artifact — Mini 3D Game', 'An immersive browser-based 3D mini-game built with Three.js. Players navigate a 3D environment to find hidden artifacts, showcasing advanced JavaScript and WebGL capabilities.', ARRAY['Three.js','Node.js','JavaScript','WebGL'], 'https://davematchica.github.io/lost_artifact/', 'https://github.com/davematchica', '🎮', '#22d3ee', 2),
('Smart Gadget Hub', 'A full-stack e-commerce platform for tech gadgets built with a modern React frontend and RESTful API backend. Features product listings, filtering, and a clean shopping experience.', ARRAY['ReactJS','TailwindCSS','Node.js','Express','REST API','PostgreSQL'], 'https://smart-gadget-hub-frontend.vercel.app/', 'https://github.com/davematchica', '🛒', '#a78bfa', 3)
ON CONFLICT DO NOTHING;

INSERT INTO skills (category, name, color_class) VALUES
('frontend', 'HTML5',             'tag-indigo'),
('frontend', 'CSS3',              'tag-indigo'),
('frontend', 'JavaScript ES6+',   'tag-indigo'),
('frontend', 'React',             'tag-indigo'),
('frontend', 'Vue.js',            'tag-indigo'),
('frontend', 'Bootstrap',         'tag-indigo'),
('frontend', 'Tailwind CSS',      'tag-indigo'),
('backend',  'Node.js',           'tag-cyan'),
('backend',  'Express.js',        'tag-cyan'),
('backend',  'Python',            'tag-cyan'),
('backend',  'RESTful API',       'tag-cyan'),
('database', 'MySQL',             'tag-violet'),
('database', 'PostgreSQL',        'tag-violet'),
('tools',    'Git',               'tag-green'),
('tools',    'GitHub',            'tag-green'),
('tools',    'Figma',             'tag-green'),
('tools',    'Netlify',           'tag-green'),
('tools',    'Vercel',            'tag-green'),
('tools',    'Heroku',            'tag-green'),
('soft',     'Communication',     'tag-indigo'),
('soft',     'Team Collaboration','tag-indigo'),
('soft',     'Self-directed',     'tag-indigo'),
('soft',     'Problem-solving',   'tag-indigo')
ON CONFLICT DO NOTHING;

-- =========================================================
-- STORAGE — Profile Picture (avatars bucket)
-- =========================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public avatar read'  AND tablename = 'objects') THEN
    CREATE POLICY "Public avatar read"  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth avatar upload'  AND tablename = 'objects') THEN
    CREATE POLICY "Auth avatar upload"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth avatar delete'  AND tablename = 'objects') THEN
    CREATE POLICY "Auth avatar delete"  ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- =========================================================
-- Seed: education chip fields (academic_year, grad_year, focus_area)
-- These power Hero floating chips, Education stat cards, and About education row.
-- Run this if you set up the DB before these fields were added.
-- =========================================================
INSERT INTO portfolio_content (section, key, value) VALUES
  ('education', 'academic_year', '4th Year'),
  ('education', 'grad_year',     '2027'),
  ('education', 'focus_area',    'Full-Stack Dev')
ON CONFLICT (section, key) DO NOTHING;