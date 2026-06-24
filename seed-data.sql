-- ============================================
-- Seed: Experiences, Projects, Articles
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================

-- ── EXPERIENCES ──────────────────────────────
insert into experiences (title, company, period, description, tags, icon_type, sort_order) values
(
  'Web Developer Intern',
  'Dinas Komunikasi dan Informatika Kota Tanjungpinang',
  'Januari 2026 — Sekarang',
  'Merancang blueprint arsitektur sistem berbasis UML dan mengimplementasikan metodologi Scrum dalam siklus pengembangan platform. Menangani integrasi fungsionalitas WebGIS untuk memvisualisasikan data spasial secara responsif.',
  array['Laravel','Tailwind CSS','WebGIS','Scrum','UML'],
  'code',
  1
),
(
  'Full-Stack & UI/UX (Project Based)',
  null,
  '2023 — Sekarang',
  'Mengembangkan dan mendeploy berbagai proyek website mulai dari desain antarmuka (wireframing & prototyping) hingga tahap production. Terbiasa memecahkan masalah melalui pendekatan desain yang berorientasi pada pengguna (User-Centered Design).',
  array['Figma','UI/UX Design','JavaScript','PHP'],
  'chat',
  2
),
(
  'Mahasiswa Teknik Informatika',
  'Universitas Maritim Raja Ali Haji',
  '2023 — Sekarang',
  'Aktif memperdalam rekayasa perangkat lunak, algoritma, serta teknologi jaringan (wireless networks). Mengikuti program sertifikasi eksternal dari Dicoding Indonesia dan DBS Coding Camp untuk menunjang kompetensi profesional.',
  array['System Architecture','Data Analysis'],
  'education',
  3
)
on conflict do nothing;

-- ── PROJECTS ─────────────────────────────────
insert into projects (title, category, description, tags, github_url, demo_url, figma_url, sort_order) values
(
  'Public Service Information System',
  'fullstack',
  'Portal web responsif yang terintegrasi dengan WebGIS untuk memetakan data institusi dan layanan publik secara spasial menggunakan metodologi Scrum.',
  array['Laravel','Tailwind CSS','WebGIS'],
  null, null, null, 1
),
(
  'UMRAH Student Portal',
  'development',
  'Sistem informasi akademik berbasis web untuk memfasilitasi kebutuhan pendataan mahasiswa Universitas Maritim Raja Ali Haji (UMRAH).',
  array['PHP','JavaScript','UI Design'],
  'https://github.com/KhairulIlham25/Sistem-Informasi-Mahasiswa-UMRAH',
  null, null, 2
),
(
  'Logitim - Maritime Logistics',
  'design',
  'Perancangan antarmuka (user interface) dan prototipe interaktif untuk sistem logistik maritim, berfokus pada kelancaran user experience.',
  array['Figma','UI Design','Prototyping'],
  'https://github.com/KhairulIlham25/Webiste-Logistic-Maritime-LOGITIM-',
  null,
  'https://www.figma.com/design/XxogTyGlEb5wRboZe666QW/Untitled?node-id=0-1&t=QhwAijz7cHGMDNMd-1',
  3
),
(
  'SinggahKepri Destination',
  'fullstack',
  'Platform pariwisata yang dirancang untuk mempromosikan destinasi lokal di Provinsi Kepulauan Riau beserta fitur pendukungnya.',
  array['JavaScript','UI Design','Figma'],
  'https://github.com/KhairulIlham25/SINGGAH-KEPRI',
  null,
  'https://www.figma.com/design/7kX35l56QM9Jxrx5l8qNoS/',
  4
),
(
  'Interactive 3D Graphics',
  'development',
  'Eksplorasi rendering objek 3D interaktif di dalam browser menggunakan native web technologies (HTML, CSS, JS).',
  array['HTML/CSS','JavaScript'],
  'https://github.com/KhairulIlham25/3D-simple-Graphic',
  null, null, 5
),
(
  'SantosoFishing Brand Identity',
  'design',
  'Perancangan identitas visual yang komprehensif, mencakup desain logo, panduan warna, tipografi, dan branding korporat.',
  array['Illustrator','Visual Identity','Branding'],
  null, null,
  'https://www.figma.com/design/g7Q1hn1gPIempnFQYJxJHG/',
  6
),
(
  'Smart Courier Interface',
  'development',
  'Implementasi antarmuka pencarian rute kurir pintar memanfaatkan Algoritma A* (A-Star) untuk menghitung optimasi jarak.',
  array['JavaScript','HTML/CSS'],
  'https://github.com/KhairulIlham25/Project_SmartCourier',
  null, null, 7
),
(
  'Interactive Weather Station Dashboard',
  'development',
  'A dynamic and fully interactive weather reporting station dashboard supporting multi-city charts, dark theme modes, and live data telemetry integrations.',
  array['React','Node.js','Chart.js'],
  'https://github.com/KhairulIlham25/weather-station',
  null, null, 8
)
on conflict do nothing;

-- ── ARTICLES ─────────────────────────────────
insert into articles (title, slug, category, excerpt, tags, read_time, published, created_at) values
(
  'Implementing WebGIS for Public Services using Laravel & Scrum',
  'implementing-webgis-public-services-laravel-scrum',
  'Web Development',
  'Eksplorasi teknis dalam mengintegrasikan fungsionalitas WebGIS untuk memvisualisasikan data spasial secara aman, serta bagaimana Scrum framework membantu adaptasi siklus development.',
  array['WebGIS','Laravel','Scrum'],
  8, true,
  '2026-03-12T00:00:00Z'
),
(
  'Designing for Maritime Logistics: LOGITIM Case Study',
  'designing-maritime-logistics-logitim-case-study',
  'UI/UX Design',
  'Studi kasus perancangan antarmuka website logistik menggunakan Figma. Fokus pada optimalisasi user experience dan pemenuhan kebutuhan spesifik bagi profesional di industri maritim.',
  array['UI/UX','Figma','Maritime'],
  6, true,
  '2026-01-22T00:00:00Z'
),
(
  'Development Journey: UMRAH Student Information System',
  'development-journey-umrah-student-information-system',
  'Web Development',
  'Bagaimana saya memadukan native PHP dan JavaScript untuk membangun sistem informasi akademik kampus, mengatasi tantangan arsitektur data, dan merancang UI yang fungsional.',
  array['PHP','JavaScript','System Design'],
  7, true,
  '2025-11-10T00:00:00Z'
),
(
  'Pathfinding Optimization: Smart Courier with A-Star Algorithm',
  'pathfinding-optimization-smart-courier-astar-algorithm',
  'Algorithm',
  'Membahas implementasi logika teknis algoritma A* (A-Star) menggunakan JavaScript murni untuk menghitung optimasi jarak dan pencarian rute pada interface kurir pintar.',
  array['JavaScript','Algorithm','Logic'],
  9, true,
  '2025-09-28T00:00:00Z'
),
(
  'Promoting Local Tourism: The SinggahKepri Web Platform',
  'promoting-local-tourism-singgahkepri-web-platform',
  'Web Development',
  'Proses end-to-end merancang dan membangun platform pariwisata Provinsi Kepulauan Riau, menyeimbangkan daya tarik estetika visual dengan fungsionalitas sistem.',
  array['UI Design','JavaScript','Tourism'],
  7, true,
  '2025-07-15T00:00:00Z'
),
(
  'Mastering Figma & UI/UX Fundamentals',
  'mastering-figma-uiux-fundamentals',
  'UI/UX Design',
  'Perjalanan saya mendalami prinsip UI/UX Design, mulai dari menyusun struktur wireframing hingga menciptakan visual identity yang kuat untuk berbagai proyek pengembangan web.',
  array['Figma','UI/UX','Branding'],
  5, true,
  '2025-05-18T00:00:00Z'
),
(
  'Masa Depan Web Development dengan Laravel 11',
  'masa-depan-web-development-laravel-11',
  'Web Development',
  'Membahas pembaruan minimalis struktur folder dan efisiensi konfigurasi di Laravel 11 yang membuat pengembangan menjadi lebih cepat dan efisien.',
  array['Laravel','Web Development','Architecture'],
  5, true,
  '2026-05-19T00:00:00Z'
)
on conflict (slug) do nothing;
