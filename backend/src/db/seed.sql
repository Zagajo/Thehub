-- Initial seed data for The Hub backend
INSERT INTO profiles (id, name, email, role, district, passport_id, avatar)
VALUES 
  ('u-admin-1', 'System Administrator', 'admin@thehub.rw', 'admin', 'Kigali City (HQ)', 'HUB-RW-ADMIN-01', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'),
  ('u-kezia-1', 'Kezia Umutoni', 'kezia.umutoni@thehub.rw', 'learner', 'Kigali City (Gasabo)', 'HUB-RW-88392', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO courses (id, slug, title, category, difficulty, duration, enrolled, rating, image, description)
VALUES 
  ('c1', 'fullstack-python-react', 'Full-Stack Web Engineering (Python & React)', 'Software Engineering', 'Intermediate', '8 Weeks', 1420, 4.80, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', 'Master modern web development with Python FastAPI backends and React frontends. Aligned with Rwanda NST2 digital transformation goals.'),
  ('c2', 'data-analytics-nisr', 'Data Analytics & Labour Market Intelligence', 'Data Science', 'Beginner', '6 Weeks', 2150, 4.90, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'Learn data cleaning, statistical modelling, and visualization using Python pandas and Tableau, utilizing official NISR datasets.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO nisr_indicators (id, indicator, value, trend, category, definition, source)
VALUES 
  ('ind-1', 'Services Sector Employment Share', '38.6%', '+3.2% YoY', 'Macroeconomic', 'Percentage of total employed population working in services and digital sectors.', 'National Institute of Statistics of Rwanda (NISR), Labour Force Survey 2023'),
  ('ind-2', 'Youth Labour Force Participation Rate', '52.4%', '+1.8% YoY', 'Demographics', 'Percentage of youth aged 16-30 active in the labour market.', 'NISR LFS Annual Report'),
  ('ind-3', 'Internet Access & Digital Connectivity', '34.2%', '+5.6% YoY', 'Digital Infrastructure', 'Household internet penetration rate across urban and rural districts.', 'NISR ICT Household Survey'),
  ('ind-4', 'Agriculture Sector Employment Share', '44.8%', '-2.1% YoY', 'Agriculture', 'Percentage of total workforce engaged in primary agricultural production.', 'NISR Seasonal Agricultural Survey')
ON CONFLICT (id) DO NOTHING;
