# Dave E. Matchica — Portfolio

A modern, professional portfolio website built with **React + Vite + Tailwind CSS + Supabase**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key

# 3. Set up Supabase database
# Copy contents of supabase_schema.sql and run in Supabase SQL Editor

# 4. Create an admin user in Supabase
# Dashboard → Authentication → Users → Add User

# 5. Start dev server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── public/          # Portfolio sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── admin/           # Admin dashboard
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── panels/
│   │       ├── HeroPanel.jsx
│   │       ├── AboutPanel.jsx
│   │       ├── ProjectsPanel.jsx
│   │       ├── SkillsPanel.jsx
│   │       ├── EducationPanel.jsx
│   │       └── ContactPanel.jsx
│   └── ui/              # Shared UI
│       ├── NavBar.jsx
│       ├── AmbientBackground.jsx
│       ├── SectionHeader.jsx
│       └── RevealOnScroll.jsx
├── context/
│   └── PortfolioContext.jsx
├── hooks/
│   └── usePortfolioData.js
├── lib/
│   ├── supabase.js
│   └── staticData.js    # Fallback data (no Supabase needed)
└── pages/
    ├── Portfolio.jsx
    └── Admin.jsx
```

## 🔑 Admin Panel

Visit `/admin` to access the admin dashboard.
- Secured via **Supabase Auth**
- Edit all portfolio sections live
- Add/edit/delete projects with emoji + color pickers
- Add/remove individual skills by category

## 🌐 Routes

| Path     | Description              |
|----------|--------------------------|
| `/`      | Public portfolio         |
| `/admin` | Admin login & dashboard  |

## 📦 Deploy to Vercel

```bash
npm run build
npx vercel --prod
```

Add these environment variables in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🎨 Design System

| Role       | Font       | Usage            |
|------------|------------|------------------|
| Display    | Syne 700–800 | Headings, logo |
| Monospace  | DM Mono    | Labels, code, nav |
| Body       | DM Sans    | Paragraphs, UI   |

| Token      | Value      |
|------------|------------|
| `accent`   | `#6366f1` (Indigo) |
| `accent2`  | `#22d3ee` (Cyan)   |
| `accent3`  | `#a78bfa` (Violet) |
| Background | `#0a0a0f`          |
| Surface    | `#1a1a2e`          |