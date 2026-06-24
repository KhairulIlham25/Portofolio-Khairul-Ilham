-- ============================================
-- Seed Skills Data
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================

-- Insert categories
insert into skill_categories (id, name, sort_order) values
  ('a1000000-0000-0000-0000-000000000001', 'System Analysis & Design', 1),
  ('a1000000-0000-0000-0000-000000000002', 'Web Development', 2),
  ('a1000000-0000-0000-0000-000000000003', 'Lainnya', 3)
on conflict do nothing;

-- Insert skills: System Analysis & Design
insert into skills (category_id, name, percentage, sort_order) values
  ('a1000000-0000-0000-0000-000000000001', 'Diagram UML',         85, 1),
  ('a1000000-0000-0000-0000-000000000001', 'UI/UX Design (Figma)', 90, 2),
  ('a1000000-0000-0000-0000-000000000001', 'Scrum Methodology',   80, 3)
on conflict do nothing;

-- Insert skills: Web Development
insert into skills (category_id, name, percentage, sort_order) values
  ('a1000000-0000-0000-0000-000000000002', 'Laravel & PHP',      90, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Tailwind CSS',       95, 2),
  ('a1000000-0000-0000-0000-000000000002', 'JavaScript & Vite',  85, 3),
  ('a1000000-0000-0000-0000-000000000002', 'MySQL & WebGIS',     80, 4)
on conflict do nothing;

-- Insert skills: Lainnya
insert into skills (category_id, name, percentage, sort_order) values
  ('a1000000-0000-0000-0000-000000000003', 'Git / Version Control',       85, 1),
  ('a1000000-0000-0000-0000-000000000003', 'Python & Data Science',       75, 2),
  ('a1000000-0000-0000-0000-000000000003', 'AI Tools (Copilot/ChatGPT)', 90, 3),
  ('a1000000-0000-0000-0000-000000000003', 'Flutter & Dart',              90, 4)
on conflict do nothing;
