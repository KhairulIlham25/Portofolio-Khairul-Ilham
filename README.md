# 🚀 KIF Portfolio — Static Version

A fully static portfolio website converted from a Laravel/Vite project to pure **HTML5**, **CSS3**, and **Vanilla JavaScript** — zero framework dependencies.

## 📁 Project Structure

```
portofolio-static/
├── index.html          ← Home (Hero, About, Skills, Experience)
├── projects.html       ← Projects with filter
├── articles.html       ← Articles listing
├── contact.html        ← Contact form + info cards
├── vercel.json         ← Vercel deployment config
├── admin/
│   └── index.html      ← Admin login page (Firebase-ready)
├── assets/
│   └── images/         ← Copied from Laravel public/images/
│       ├── Logo 2.png
│       ├── profile.jpg
│       ├── about.jpeg
│       ├── project-singgahkepri.png
│       ├── project-simawa.png
│       └── project-logitim.png
├── css/
│   └── style.css       ← All styles (design tokens, responsive, animations)
└── js/
    ├── theme.js        ← Dark/Light mode with LocalStorage
    ├── firebase.js     ← Firebase integration stub
    └── app.js          ← All JS logic (scroll, menu, filter, form)
```

## ✨ Features

- ✅ **Dark/Light Mode** — persisted via `localStorage`
- ✅ **Smooth Scroll** — anchor links with scroll offset
- ✅ **Mobile Hamburger Menu** — responsive for all screens
- ✅ **Scroll-Reveal Animations** — `IntersectionObserver`-based
- ✅ **Progress Bar Animations** — triggered on scroll into view
- ✅ **Project Filter** — All / UI/UX / Web Dev / Full-Stack
- ✅ **Contact Form** — Firebase-ready with mailto fallback
- ✅ **SEO Meta Tags** — title, description, OG tags on every page
- ✅ **Accessible** — ARIA labels, semantic HTML5, keyboard navigation

## 🔥 Firebase Integration

The site is **pre-wired** for Firebase. To enable it:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Open `js/firebase.js`
3. Replace the `firebaseConfig` object with your project credentials
4. Uncomment the initialization block and service functions
5. Add Firebase CDN scripts to `<head>` in each HTML file

## 🚀 Deploy to Vercel

### Option 1: Drag & Drop

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag the `portofolio-static/` folder into the dropzone
3. Click **Deploy** — live in ~60 seconds

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd portofolio-static
vercel --prod
```

### Option 3: GitHub + Vercel

1. Push this folder to a GitHub repository
2. Import from Vercel dashboard
3. Set **Root Directory** to `portofolio-static/`
4. Deploy

## 🖼️ Adding Images

Place images in `assets/images/` and reference them as:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

## 📧 Contact Form Behavior

Without Firebase configured, the contact form uses a `mailto:` fallback that opens the user's email client with the form data pre-filled.

---

Built with ❤️ by **Khairul Ilham** | [GitHub](https://github.com/KhairulIlham25)
