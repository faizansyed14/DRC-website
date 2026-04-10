# Deccan Readymix Group Website

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📁 Image Folders

Add your own images to these folders in `/public/images/`:

| Folder | What to put inside |
|--------|-------------------|
| `hero/` | Hero banner background (save as `hero-banner.png`) |
| `about/` | Batching plant / facility aerial photo (`plant.png`) |
| `services/` | `readymix.png`, `pumping.png` |
| `projects/` | `highrise.png`, `bridge.png`, any project photos |
| `fleet/` | Mixer truck photos |
| `gallery/` | Any site/plant photos for the gallery grid |
| `team/` | Team member portraits |

> **Tip:** Images are referenced in components. Simply replace the placeholder images  
> with your real photos using the **same filenames**, and they will auto-appear on the site.

## 🎨 Dark / Light Mode

Click the toggle in the navbar top-right. Preference is saved in localStorage.

## 🌐 Deploying to Vercel

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** ✅

## 🌐 Deploying to Render

1. Push to GitHub
2. New → Static Site on [render.com](https://render.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Create Static Site** ✅

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Framer Motion** — all animations / transitions
- **React Three Fiber + Three.js** — 3D star-field background
- **react-countup** — animated stat counters
- **react-intersection-observer** — scroll-triggered animations
- **react-icons** — icon library
- **Vanilla CSS** — full design system with CSS variables

## ✏️ Customization

- Brand colors → `src/index.css` → `:root` section
- Company info → individual component files in `src/components/`
- Navigation items → `src/components/Navbar.jsx`
- Services list → `src/components/Services.jsx`
- Contact details → `src/components/Contact.jsx` & `src/components/Footer.jsx`
