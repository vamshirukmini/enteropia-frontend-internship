# Enteropia LLP — Corporate Website (Design 1: Neo-Dark Enterprise)

## Project Overview
This project represents **Design Version 1** of Task 1 for the **Enteropia LLP Frontend Development Internship Challenge**.

It is an enterprise technology marketing website engineered to represent Enteropia LLP's corporate identity, services catalog (custom software development, cloud infrastructure, AI automation, and zero-trust security), and active software platforms (Agro-Hub, Maatri Suraksha, and Demand Forecasting).

## Design Concept & Visual Direction
- **Theme:** Neo-Dark Precision Engineering.
- **Color Palette:**
  - Background: Deep Obsidian (`#07080e`) & Layered Surfaces (`#0e111a`, `#141824`)
  - Accent Brand Colors: Vibrant Electric Purple (`#9333ea`), Lavender Highlights (`#c084fc`), Neon Cyan (`#38bdf8`)
  - Typography: Space Grotesk (Headings, data markers, navigation) & DM Sans (Body copy, documentation)
- **Visual Identity:** Sophisticated corporate tech aesthetic featuring ambient particle networks, orbital telemetry circles, live system dashboards, and polished micro-interactions.

## Technologies Used
- **HTML5:** Semantic markup, WAI-ARIA accessibility attributes (`aria-expanded`, `aria-controls`, `role="dialog"`).
- **CSS3:** Custom CSS variables, responsive CSS Grid and Flexbox, backdrop-filter glassmorphism, clamp-based fluid typography, keyframe animations, and `prefers-reduced-motion` media queries.
- **JavaScript (Vanilla ES6+):** HTML5 Canvas particle physics, IntersectionObserver scroll reveal and counter animations, interactive modal systems, tabs, and client-side form validation with `localStorage` persistence.

## Main Sections & Features
1. **Glassmorphic Navigation Bar:** Sticky top navigation with dynamic scroll blur and mobile hamburger drawer.
2. **Hero Section:** High-impact value proposition, interactive particle/mesh canvas with mouse repulsion, orbital system rings, and quick navigation CTAs.
3. **Animated Metrics Strip:** Live counting statistics showing 99.9% uptime, 50+ enterprise deployments, 15+ cloud architectures, and 24/7 security operations.
4. **Ticker Strip:** Marquee highlighting core competencies.
5. **About Section:** Bengaluru headquarters profile, engineering philosophy, and enterprise scalability feature blocks.
6. **Services Grid:** 4 structured service cards (Software Engineering, Cloud & DevOps, AI Automation, Zero-Trust Security) with technology tags and interactive modal inspect triggers.
7. **Enterprise Solutions Showcase:** Tabbed preview of Enteropia platforms (Agro-Hub, Maatri Suraksha, Demand Forecasting) with a real-time system telemetry window.
8. **Portfolio & Case Studies:** Interactive project cards with deep-dive case study modals showing problem statements, technical architecture, and measurable outcomes.
9. **Client Testimonials:** Verified leader reviews with 5-star ratings, quotes, and executive designations.
10. **Careers Portal:** Culture overview, open positions badge list, and interactive 1-click apply triggers.
11. **Interactive Contact Form:** Name, email, service category, and project scope inputs with real-time validation, loading feedback, and `localStorage` logging.
12. **Corporate Footer:** Quick navigation, legal links, office location in Basavanagudi, Bengaluru, and dynamic copyright year.

## Interactive Functionality
- **Interactive Geometric Canvas:** Move your mouse over the hero visual to repel connected particle nodes in real time.
- **Modal System:** Click any portfolio card or "Explore Service Details" button to open detailed architectural breakdowns.
- **Solution Tabs:** Click between Agro-Hub, Maatri Suraksha, and Demand Engine to inspect different platform summaries.
- **Contact Form Validation:** Form rigorously validates inputs, prevents empty submissions, logs entries to browser `localStorage`, and displays a toast notification.
- **Mobile Menu Drawer:** Tested hamburger toggle that manages ARIA states and closes smoothly upon link selection or outside clicks.

## Folder Structure
```
01-enteropia-corporate/
│
├── index.html       # Semantic HTML5 document
├── style.css        # Responsive CSS3 styling & dark design system
├── script.js        # Vanilla JS interactions, canvas engine & modals
└── README.md        # Technical documentation & project guide
```

## How to Run Using VS Code & Live Server
1. Open Visual Studio Code.
2. Open the project folder: `ENTEROPIA_INTERNSHIP/01-enteropia-corporate`.
3. Right-click on `index.html`.
4. Click **"Open with Live Server"** (or use shortcut `Alt + L, Alt + O`).
5. The website will launch in your default web browser at `http://127.0.0.1:5500/01-enteropia-corporate/index.html`.

## Responsive Breakpoint Testing
Tested and verified across modern device viewport sizes:
- **Mobile (375px & 420px):** Single-column grid layouts, full-width touch targets, collapsed mobile navigation drawer.
- **Tablet (768px & 1024px):** 2-column balanced service and portfolio grids, scaled typography, optimized whitespace.
- **Desktop (1440px):** 4-column service grid, 3-column portfolio, full visual canvas width, maximum container containment.

## Known Limitations
- This is a frontend demonstration project.
- Contact form messages are stored in browser `localStorage` and are not transmitted to a live SMTP server.
- Interactive telemetry bars demonstrate dynamic CSS visualizers rather than live production server ping metrics.

## Future Enhancements
- Integration of WebGL (Three.js) for 3D model orbit rendering.
- Live backend API connectivity with email notification dispatch.
- Multi-language localization (English / Kannada) for regional enterprise clients.
