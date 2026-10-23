# Personal Portfolio

Minimalist portfolio built with **Vite + HTML/CSS/JS vanilla**. Lightweight, fast, and easy to customize.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── index.html      # Main HTML with all sections
├── style.css       # Complete styles (CSS variables for theming)
├── main.js         # Minimal JS: smooth scroll, animations, form handling
├── vite.config.js  # Vite configuration
├── package.json
└── public/         # Static assets (favicon, images)
```

## ✨ Included Sections

- **Hero** - Introduction with name, title, and CTAs
- **About Me** - Text + tech skills/tags
- **Projects** - Grid of 3 cards with image, description, tags, and links
- **Contact** - Form ready for Formspree/Netlify Forms
- **Footer** - Simple copyright

## 🎨 Quick Customization

### Colors (Auto Dark/Light Mode)
Edit CSS variables in `style.css` (lines 10-35):

```css
:root {
  --color-primary: #6366f1;      /* Primary color */
  --color-accent: #22d3ee;       /* Accent color */
  --color-bg: #0f0f12;           /* Main background */
  --color-text: #f4f4f5;         /* Main text */
  /* ... more variables */
}
```

### Content
Edit `index.html` and change:
- "Your Name" → your real name
- Hero, about, projects texts
- GitHub, LinkedIn, email links
- Form `action` (see deployment)

### Project Images
Replace `<svg>` placeholders in `.project-image` with real images:
```html
<img src="/assets/project1.jpg" alt="Project description" />
```
Place your images in `public/assets/`.

## 🌐 Free Deployment

### Netlify (Recommended - Easiest)
1. Push repo to GitHub
2. In Netlify: "Add new site" → "Import from Git"
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done! You get a `*.netlify.app` URL

### Vercel
1. Import repo in Vercel
2. Auto-detects Vite
3. Auto-deploy to `*.vercel.app`

### GitHub Pages
1. In `vite.config.js` change `base: '/'` to `base: '/your-repo/'`
2. In Settings → Pages: Source = "GitHub Actions"
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Cloudflare Pages
1. Connect repository
2. Build command: `npm run build`
3. Output directory: `dist`

## 📧 Contact Form

The form uses **Formspree** by default (free up to 50 submissions/month):

1. Create account at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the `form-id` (e.g., `xaybqwer`)
4. In `index.html` change:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Free Alternatives:**
- Netlify Forms (add `data-netlify="true"` to form)
- EmailJS (more control, requires JS)
- Web3Forms (no registration, free)

## 🛠 Useful Scripts

```json
{
  "scripts": {
    "dev": "vite",           // Development with HMR
    "build": "vite build",   // Production build to /dist
    "preview": "vite preview" // Serve /dist locally
  }
}
```

## 📱 Responsive & Accessible

- Mobile-first (breakpoints: 640px, 768px, 1024px)
- Auto dark/light mode (`prefers-color-scheme`)
- Respects `prefers-reduced-motion`
- Correct HTML5 semantics
- Visible focus for keyboard navigation

## 📄 License

MIT - Use freely for your personal portfolio.