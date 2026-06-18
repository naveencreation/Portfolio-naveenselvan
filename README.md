# 🚀 VoidStack Portfolio

A modern, high-performance personal portfolio website built with React 19, featuring a stunning dark theme with glassmorphism design, smooth scroll-driven storytelling, and production-ready Vercel optimizations.

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13-green?logo=greensock&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Optimized-black?logo=vercel&logoColor=white)

</div>

---

## ✨ Features

- 🎨 **Dark Theme** - Sleek purple/indigo gradient aesthetic with modern glassmorphism panels
- 📱 **Fully Responsive** - Asymmetric layouts optimized for desktop, tablet, and mobile views
- ⚡ **Instant & Serverless** - Static site serving portfolio data instantly with zero API latency
- 📧 **Working Contact Form** - Powered by Web3Forms for secure form-to-email routing
- 🎭 **Smooth Animations** - Built with GSAP ScrollTrigger and Framer Motion for cinematic storytelling
- 🚀 **Vercel Optimized** - Custom SPA rewriting, rendering path improvements, and bundle code splitting

---

## ⚡ Performance Optimizations

To prepare the portfolio for production on Vercel's global CDN network, the following frontend optimizations were implemented:

1. **Rollup Vendor Chunk Splitting**: Split stable dependencies into separate bundles:
   - `vendor-*.js` (React, React-DOM)
   - `animation-*.js` (GSAP, Framer Motion)
   - `index-*.js` (Application logic and portfolio data)
   This allows parallel downloads, keeps the main thread light, and enables long-term caching of animation libraries.
2. **Immutable CDN Caching**: Defined a `vercel.json` config with header directives to cache compiled assets in `/assets/*` immutably for `31536000` seconds (1 year) on the Edge CDN.
3. **Optimized Critical Rendering Path**: Replaced render-blocking CSS `@import` font tags with direct preconnect and stylesheet `<link>` declarations in `index.html` to load Google Fonts and Clash Display in parallel with CSS parsing.
4. **SPA Rewrite Fallbacks**: Configured routing rules inside `vercel.json` to handle client-side route navigation fallback redirects.

---

## 📁 Project Structure

All project assets, documents, and code are located inside the self-contained `frontend/` directory to facilitate deployment:

```
Portfolio/
├── frontend/                # Self-contained React Application
│   ├── Resource/            # Projects data resources
│   ├── images/              # Showcase images & profile source assets
│   ├── public/              # Static public assets (icons, site images)
│   ├── src/                 # Application source code
│   │   ├── components/      # Scroll-driven narrative Acts (Acts I - VI)
│   │   ├── data/            # Static portfolio.json dataset
│   │   ├── lib/             # API clients & utility hooks
│   │   └── index.css        # Custom CSS scrollbars, variables & styles
│   ├── vercel.json          # Vercel deployment routing & headers config
│   ├── vite.config.ts       # Vite compiler config & code splitting
│   └── package.json         # Node.json configuration & scripts
└── README.md                # Root project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git

### Setup
1. Clone the repository
2. Navigate to `frontend/`
3. Create a `.env` file with your Web3Forms key:
   ```env
   VITE_WEB3FORMS_KEY=your-web3forms-access-key
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

---

## 📦 Deployment

Deploy the `frontend/` folder directly to **Vercel** or **Netlify**. Ensure you configure `VITE_WEB3FORMS_KEY` as an environment variable in your deployment platform's dashboard.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

<div align="center">

**Built with ❤️ by [Naveen S](https://github.com/naveencreation)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-naveen0004-blue?logo=linkedin)](https://linkedin.com/in/naveen0004)
[![GitHub](https://img.shields.io/badge/GitHub-naveencreation-black?logo=github)](https://github.com/naveencreation)

</div>