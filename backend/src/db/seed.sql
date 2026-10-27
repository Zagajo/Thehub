-- The Hub Initial Seed Data

-- Skills
INSERT INTO skills (id, name, slug, description, category, difficulty_level) VALUES
('sk-excel', 'Excel & Spreadsheets', 'excel-spreadsheets', 'Formulas, data modeling, pivots and analysis', 'Data', 'Beginner'),
('sk-sql', 'SQL Database Querying', 'sql-database-querying', 'Relational database schema, joins, aggregations and analysis', 'Data', 'Intermediate'),
('sk-python', 'Python Programming', 'python-programming', 'Syntax, data structures, automation and data analysis', 'Technology', 'Beginner'),
('sk-webdev', 'HTML & CSS Web Development', 'html-css-webdev', 'Modern responsive semantic layouts and styling', 'Technology', 'Beginner'),
('sk-english', 'Professional English Communication', 'professional-english', 'Workplace verbal, written, and presentation communication', 'Languages', 'Intermediate'),
('sk-agri', 'Agribusiness & Market Linkages', 'agribusiness-markets', 'Modern value chains, farm management and distribution', 'Agriculture', 'Beginner'),
('sk-tourism', 'Customer Experience & Hospitality', 'customer-experience-hospitality', 'Service excellence, visitor reception, and tourism operations', 'Tourism', 'Beginner'),
('sk-finlit', 'Financial Literacy & Small Business', 'financial-literacy', 'Budgeting, bookkeeping, cash flow and capital management', 'Business', 'Beginner')
ON CONFLICT (id) DO NOTHING;

-- Courses (Across 7 diverse sectors)
INSERT INTO courses (id, title, slug, description, short_description, thumbnail_url, category, difficulty, estimated_hours, instructor_name, language) VALUES
('crs-web-fund', 'Web Development Fundamentals: HTML & CSS', 'web-development-fundamentals', 'Build modern, mobile-first responsive web interfaces using semantic HTML5 and clean CSS styling principles.', 'Learn to build clean, responsive websites from scratch.', 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop', 'Technology', 'Beginner', 10, 'Aline Uwase', 'English'),
('crs-excel-data', 'Excel Fundamentals for Business & Data Analysis', 'excel-fundamentals-data-analysis', 'Master formulas, VLOOKUP/XLOOKUP, pivot tables, data visualization, and financial modelling in modern spreadsheets.', 'Spreadsheet mastery for everyday workplace efficiency.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop', 'Data', 'Beginner', 8, 'Jean-Paul Habimana', 'English'),
('crs-python-prog', 'Python Fundamentals for Practical Problem Solving', 'python-fundamentals-practical', 'Core Python programming syntax, data structures, algorithms, and practical automation scripts.', 'Learn programming from zero with hands-on projects.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop', 'Technology', 'Beginner', 14, 'Eric Mugisha', 'English'),
('crs-english-work', 'Workplace English Communication & Presentation', 'workplace-english-communication', 'Confidence in professional correspondence, workplace meetings, public speaking, and technical interview situations.', 'Master verbal and written communication for modern careers.', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop', 'Languages', 'Intermediate', 12, 'Grace Mukamana', 'English'),
('crs-agri-bus', 'Agribusiness Fundamentals: Value Chains & Tools', 'agribusiness-fundamentals-value-chains', 'Explore modern agricultural value chains in Rwanda, cost optimization, digital market linkage tools, and cooperative management.', 'Transform farming insights into sustainable agribusiness enterprises.', 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop', 'Agriculture', 'Beginner', 9, 'Emmanuel Nsengimana', 'English'),
('crs-sql-mastery', 'SQL Fundamentals for Relational Databases', 'sql-fundamentals-relational-databases', 'Write production queries, schema filters, grouped metrics, and relational table joins.', 'Structured query language for business intelligence.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop', 'Data', 'Intermediate', 10, 'David Kayitare', 'English'),
('crs-tourism-hosp', 'Hospitality Fundamentals & Service Excellence', 'hospitality-fundamentals-service-excellence', 'Professional guest relations, cross-cultural customer etiquette, and eco-tourism principles aligned with Rwanda tourism standards.', 'Delivering world-class guest satisfaction in hospitality.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop', 'Tourism', 'Beginner', 8, 'Diane Ingabire', 'English'),
('crs-biz-model', 'Business Model Canvas & Entrepreneurship', 'business-model-canvas-entrepreneurship', 'Validate startup hypotheses, identify high-value customer segments, and build sustainable unit economics.', 'Turn practical ideas into viable business models.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop', 'Business', 'Beginner', 11, 'Robert Gasana', 'English')
ON CONFLICT (id) DO NOTHING;

-- Modules & Lessons for Web Development
INSERT INTO course_modules (id, course_id, title, description, position) VALUES
('mod-web-1', 'crs-web-fund', 'Module 1: The Structure of the Web (HTML5)', 'Core elements, doctype, semantics, links, media, and accessible markup.', 1),
('mod-web-2', 'crs-web-fund', 'Module 2: Styling and Layouts with CSS3', 'Box model, Flexbox, responsive grid systems, and typography.', 2),
('mod-web-3', 'crs-web-fund', 'Module 3: Final Hands-on Web Portfolio Project', 'Build and publish a responsive personal portfolio site.', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons (id, module_id, title, slug, content, duration_minutes, position, lesson_type) VALUES
('lsn-101', 'mod-web-1', 'Introduction to HTML5 & Web Standards', 'intro-html5', 'HTML is the foundational language of the World Wide Web. Learn about elements, tags, document trees, and accessibility standards.', 15, 1, 'article'),
('lsn-102', 'mod-web-1', 'Semantic Elements & Content Hierarchy', 'semantic-elements', 'Semantic tags like <header>, <nav>, <main>, <section>, and <footer> ensure clarity, SEO optimization, and screen-reader accessibility.', 20, 2, 'article'),
('lsn-103', 'mod-web-2', 'CSS Box Model Explained', 'css-box-model', 'Master margins, borders, padding, and content dimensions to avoid layout clipping and overflow bugs.', 25, 1, 'article'),
('lsn-104', 'mod-web-2', 'Responsive Design with Modern Flexbox', 'responsive-flexbox', 'Use display: flex, justify-content, and align-items to build fluid layouts that fit smartphones and desktops.', 30, 2, 'exercise'),
('lsn-105', 'mod-web-3', 'Portfolio Capstone Project Brief', 'portfolio-capstone', 'Build a 3-page responsive personal portfolio demonstrating HTML5 and CSS3 proficiency.', 45, 1, 'project')
ON CONFLICT (id) DO NOTHING;

-- Official NISR Labour Market Indicators (National Institute of Statistics of Rwanda)
INSERT INTO nisr_indicators (id, source, dataset, indicator, indicator_code, year, period, geography, unit, value, metadata) VALUES
('ind-1', 'National Institute of Statistics of Rwanda (NISR)', 'Labour Force Survey (LFS) Annual Report', 'Employment Share: Services Sector', 'NISR-LFS-EMP-SRV', 2023, 'Annual', 'Rwanda - National', '% of total employment', 38.6, '{"definition": "Percentage of employed population engaged in tertiary/services economic activities including ICT, trade, finance, and hospitality."}'),
('ind-2', 'National Institute of Statistics of Rwanda (NISR)', 'Labour Force Survey (LFS) Annual Report', 'Youth Labour Force Participation Rate', 'NISR-LFS-YOUTH-LFPR', 2023, 'Annual', 'Rwanda - National', '%', 52.4, '{"definition": "Proportion of youth population (aged 16-30) that is economically active in the labour market."}'),
('ind-3', 'National Institute of Statistics of Rwanda (NISR)', 'Statistical Yearbook / ICT Access Surveys', 'Internet & Digital Connectivity Penetration', 'NISR-ICT-ACCESS', 2023, 'Annual', 'Rwanda - National', '% individuals accessing broadband', 34.2, '{"definition": "Proportion of individuals with regular access to digital services and broadband internet."}'),
('ind-4', 'National Institute of Statistics of Rwanda (NISR)', 'Labour Force Survey (LFS) Annual Report', 'Employment Share: Agriculture Sector', 'NISR-LFS-AGRI-SHARE', 2023, 'Annual', 'Rwanda - National', '% of total employment', 44.8, '{"definition": "Share of employed individuals working in farming, livestock, forestry, and agricultural processing."}')
ON CONFLICT (id) DO NOTHING;

-- Learning Pathways
INSERT INTO learning_paths (id, title, slug, target_role, description, estimated_weeks) VALUES
('lp-data', 'Become a Data Analyst', 'become-a-data-analyst', 'Data Analyst', 'Comprehensive pathway from foundational spreadsheet literacy through SQL databases, statistical reasoning, and data storytelling.', 10),
('lp-web', 'Become a Full-Stack Web Developer', 'become-a-web-developer', 'Web Developer', 'Structured journey mastering HTML/CSS, modern JavaScript, Git/GitHub, API architecture, and portfolio production.', 12),
('lp-biz', 'Modern Agribusiness & Entrepreneurship', 'modern-agribusiness-entrepreneurship', 'Agri-Entrepreneur', 'Bridging agricultural innovation with financial literacy, business model validation, and supply-chain logistics.', 8)
ON CONFLICT (id) DO NOTHING;
