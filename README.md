# 🪟 Portfolio XP

A Windows XP–themed interactive portfolio website built with React + Vite + Supabase.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
The `.env` file already has your Supabase credentials. For deployment, add these to your hosting platform's environment variables.

### 3. Set up Supabase Database
1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard)
2. Open the file `supabase-setup.sql`
3. Copy and run the entire SQL script
4. This creates all tables + Row Level Security policies

### 4. Set up Supabase Storage (for Resume upload)
1. Go to Supabase Dashboard → **Storage**
2. Click **New Bucket**
3. Name it: `resumes`
4. Toggle **Public bucket** to ON
5. Click Create

### 5. Create your admin user
1. Go to Supabase Dashboard → **Authentication** → Users
2. Click **Invite user** or **Add user**
3. Enter your email + password
4. This is what you'll use to log into `/admin`

### 6. Run locally
```bash
npm run dev
```

## 📱 Usage

- **Portfolio**: Visit `/` — double-click icons to open windows
- **Admin Panel**: Visit `/admin` — login with your Supabase auth credentials
- **Start Menu**: Click the Start button for navigation + Shut Down

## 🌐 Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify
1. Push to GitHub
2. Import repo in [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Site Settings
6. Deploy!

## 📁 Project Structure

```
src/
├── lib/
│   └── supabase.js          # Supabase client
├── components/
│   ├── BootScreen.jsx       # XP boot animation
│   ├── Desktop.jsx          # Main desktop
│   ├── XPWindow.jsx         # Draggable window component
│   ├── DesktopIcon.jsx      # Desktop icons
│   ├── Taskbar.jsx          # Bottom taskbar
│   └── StartMenu.jsx        # Start menu
├── windows/
│   ├── ProjectsWindow.jsx
│   ├── SkillsWindow.jsx
│   ├── CertificatesWindow.jsx
│   ├── WorkshopsWindow.jsx
│   ├── AboutWindow.jsx
│   ├── ContactWindow.jsx
│   ├── ResumeWindow.jsx
│   └── CatWindow.jsx        # 🐱 Secret easter egg
├── admin/
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── adminUI.jsx          # Shared UI components
│   └── tabs/
│       ├── ProjectsTab.jsx  # Full CRUD
│       ├── SkillsTab.jsx    # Full CRUD
│       ├── CertificatesTab.jsx
│       ├── WorkshopsTab.jsx
│       ├── AboutTab.jsx     # + Resume upload
│       └── MessagesTab.jsx  # View + Delete
└── App.jsx
```

## ✨ Features

- 🖥️ Full Windows XP desktop simulation
- 🪟 Draggable, resizable, minimizable windows
- 📁 All content loaded from Supabase
- 🔐 Protected admin panel with Supabase Auth
- 📄 Resume upload to Supabase Storage
- 🐱 Secret cat easter egg (cataas.com)
- ✉️ Contact form → saved to Supabase
- 📱 Taskbar with live clock
- 🌱 Bliss wallpaper background
- 🚀 Ready for Vercel/Netlify deployment
