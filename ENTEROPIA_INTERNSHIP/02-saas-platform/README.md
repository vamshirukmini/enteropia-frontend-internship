# TaskFlow by Nexora — SaaS Project Management Platform (Design 1)

## Project Overview
**TaskFlow by Nexora** is a high-conversion, professional SaaS product marketing landing page and interactive live workspace developed as part of the **Enteropia LLP Frontend Development Internship Challenge** (Task 2, Design Version 1).

The platform communicates modern work management features, sprint velocity telemetry, integration capabilities, comprehensive tier pricing, and real-time interactive task tracking without third-party frameworks.

## Design Concept & Visual Direction
- **Theme:** Clean, High-Conversion Modern SaaS.
- **Color Palette:**
  - Background: Crisp Slate Mist (`#f8fafc`) & Pure White (`#ffffff`)
  - Primary Brand Colors: Electric Indigo (`#4f46e5`), Deep Violet (`#4338ca`), Light Indigo Accents (`#eef2ff`)
  - Functional Accents: Emerald Green (`#10b981`), Sky Blue (`#0284c7`), Amber (`#f59e0b`)
  - Typography: Plus Jakarta Sans (Brand mark, headlines, metric cards) & Inter (Body, table data, forms)
- **Visual Identity:** Modern product interface inspired by high-growth B2B SaaS platforms (Linear, Raycast, Vercel), featuring subtle elevations, interactive workspace previews, and accessible typography.

## Technologies Used
- **HTML5:** Semantic landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), accessible ARIA controls (`role="dialog"`, `aria-expanded`, `aria-valuenow`).
- **CSS3:** Custom CSS variables, CSS Grid and Flexbox layouts, fluid clamp typography, smooth transitions, and `prefers-reduced-motion` media queries.
- **JavaScript (Vanilla ES6+):** Client-side state management for live sprint tasks, dynamic SVG/CSS chart rendering across multiple timeframes, billing calculation engine, smooth accordion toggles, and modal auth with `localStorage` persistence.

## Main Sections & Features
1. **Sticky Navigation Bar:** Logo with Nexora brand badge, anchor navigation links, and direct modal auth triggers.
2. **Hero Section:** Value proposition, 14-day free trial CTA, proof badges, and an interactive hero sprint card displaying real-time velocity.
3. **Customer Logo Strip:** Trust markers representing scale-up engineering teams.
4. **Core Capabilities Grid:** 4 structured feature articles (Sprint Management, Analytics, Collaboration, No-Code Automation) with colorful icon cards.
5. **Interactive Live Workspace (Dashboard):**
   - **Timeframe Selector:** Toggle between Weekly (7 days), Monthly (4 weeks), and Quarterly views with instant chart recalculation.
   - **Clickable Sprint Tasks:** Click any task to cycle between "Pending", "In Progress", and "Completed".
   - **Live Progress Synchronization:** Toggling tasks automatically recalculates completion percentage, progress bars, and sidebar status metrics in real-time.
   - **Milestone Deadlines:** Upcoming calendar deadlines with priority tags.
6. **Connected Ecosystem (Integrations):** 6 integration cards highlighting Slack, GitHub, Figma, Google Calendar, Google Drive, and APM tools.
7. **Pricing Section:**
   - **Billing Cycle Toggle:** Switch between Monthly and Annual billing with a "Save 20%" discount badge that recalculates all plan prices dynamically.
   - **Plan Cards:** Starter (Free), Professional (₹499/mo or ₹399/mo annual), and Enterprise (Custom).
8. **Comprehensive Feature Comparison Table:** Detailed matrix comparing active projects, automation quotas, SSO, and SLA guarantees.
9. **Customer Reviews & Testimonials:** 3 verified client reviews with 5-star ratings and executive designations.
10. **Interactive FAQ Accordion:** Clean animated expand/collapse accordion answering key onboarding questions.
11. **Bottom CTA Banner:** Final conversion banner with direct registration triggers.
12. **Modal Authentication Suite:** Full tabbed popup supporting Sign In and Account Creation with input validation and session logging.
13. **Footer:** Product, resources, company links, and dynamic copyright year.

## Interactive Functionality
- **Live Task Status Cycling:** Click any task in the "Interactive Sprint Tasks" panel to mark it as Completed, In Progress, or Pending. Notice how the completion percentage updates simultaneously across both the dashboard and the hero banner.
- **Timeframe Switching:** Click "Weekly", "Monthly", or "Quarterly" to view different bar heights and velocity metrics.
- **Annual Billing Engine:** Toggle the switch in the pricing section to recalculate monthly vs. annual pricing.
- **Auth Modal:** Click "Log In" or "Get Started Free" to access the modal suite. Validate inputs and test demo account registration.

## Folder Structure
```
02-saas-platform/
│
├── index.html       # Semantic HTML5 document
├── style.css        # Responsive CSS3 styling & SaaS design system
├── script.js        # Dashboard state engine, billing toggle & modal logic
└── README.md        # Technical documentation & project guide
```

## How to Run Using VS Code & Live Server
1. Open Visual Studio Code.
2. Open the project folder: `ENTEROPIA_INTERNSHIP/02-saas-platform`.
3. Right-click on `index.html`.
4. Select **"Open with Live Server"**.
5. The website will launch at `http://127.0.0.1:5500/02-saas-platform/index.html`.

## Responsive Breakpoint Testing
- **Mobile (375px & 420px):** Single-column dashboard layout, horizontal scrolling for comparison table, stacked hero buttons, touch-friendly task checkboxes.
- **Tablet (768px & 1024px):** 2-column feature grids, optimized dashboard layout, scaled chart heights.
- **Desktop (1440px):** Full-width telemetry layout, 3-column pricing cards, maximum container constraints.

## Known Limitations
- This is a frontend demonstration project.
- Authentication data is preserved in browser `localStorage` and does not connect to a live OAuth server.
- Integrations are frontend UI demonstrations.

## Future Enhancements
- Drag-and-drop task reordering using HTML5 Drag and Drop API.
- Exportable CSV sprint report downloads.
- Dark mode theme toggle.
