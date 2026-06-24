-- ============================================
-- Supabase Setup SQL
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================

-- profiles table (single row untuk portfolio owner)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  hero_badge text default 'IT Undergraduate • Full-Stack Web Developer',
  hero_name text default 'Khairul Ilham',
  hero_desc text default 'Informatics Engineering student dengan minat besar pada Full-Stack Web Development, UI/UX Design, dan System Analysis.',
  hero_typing_roles text[] default array['Web Developer','Informatics Student','Full Stack Dev'],
  availability_text text default 'Web Development',
  profile_image_url text,
  about_lead text default 'Halo! Saya Khairul Ilham, seorang mahasiswa Teknik Informatika di Universitas Maritim Raja Ali Haji.',
  about_desc text default 'Saya memiliki pengalaman praktis dalam merancang arsitektur sistem terstruktur menggunakan UML dan membangun aplikasi web terintegrasi.',
  about_name text default 'Khairul Ilham',
  about_email text default 'rulikhairul25@gmail.com',
  about_location text default 'Tanjungpinang, Indonesia',
  about_education text default 'Teknik Informatika, UMRAH',
  contact_email text default 'rulikhairul25@gmail.com',
  contact_phone text default '+6281275771644',
  contact_location text default 'Tanjungpinang, Indonesia',
  contact_github text default 'https://github.com/KhairulIlham25',
  contact_linkedin text default 'https://www.linkedin.com/in/khairul-ilham-7752a32a7/?locale=en',
  contact_instagram text default 'https://instagram.com/ilhamfatihulhaq',
  updated_at timestamptz default now()
);

-- Insert default profile row jika belum ada
insert into profiles (id) select gen_random_uuid() where not exists (select 1 from profiles);

-- experiences table
create table if not exists experiences (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text,
  period text,
  description text,
  tags text[] default array[]::text[],
  icon_type text default 'code',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- skill_categories table
create table if not exists skill_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  icon_svg text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- skills table
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references skill_categories(id) on delete cascade,
  name text not null,
  percentage int default 0,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text default 'development',
  description text,
  tags text[] default array[]::text[],
  github_url text,
  demo_url text,
  figma_url text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- articles table
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique,
  category text,
  excerpt text,
  content text,
  tags text[] default array[]::text[],
  read_time int default 5,
  thumbnail_url text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- messages table (contact form)
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ── Enable RLS ──────────────────────────────
alter table profiles enable row level security;
alter table experiences enable row level security;
alter table skill_categories enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table articles enable row level security;
alter table messages enable row level security;

-- ── Public read policies ─────────────────────
create policy if not exists "Public read profiles" on profiles for select using (true);
create policy if not exists "Public read experiences" on experiences for select using (true);
create policy if not exists "Public read skill_categories" on skill_categories for select using (true);
create policy if not exists "Public read skills" on skills for select using (true);
create policy if not exists "Public read projects" on projects for select using (true);
create policy if not exists "Public read articles" on articles for select using (true);
create policy if not exists "Public insert messages" on messages for insert with check (true);

-- ── Admin full access (authenticated) ────────
create policy if not exists "Admin all profiles" on profiles for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all experiences" on experiences for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all skill_categories" on skill_categories for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all skills" on skills for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all projects" on projects for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all articles" on articles for all using (auth.role() = 'authenticated');
create policy if not exists "Admin all messages" on messages for all using (auth.role() = 'authenticated');

-- ── Storage buckets ───────────────────────────
-- Buat manual di Storage > New Bucket:
-- - "projects"  (public)
-- - "articles"  (public)
-- - "profile"   (public)

