# NEXORA — Autonomous Cloud & AI Intelligence Platform (Design 2)

## Project Overview
**NEXORA** is a next-generation enterprise cloud and AI pipeline intelligence platform created as **Design Version 2** of Task 2 for the **Enteropia LLP Frontend Development Internship Challenge**.

Where Design 1 (TaskFlow) targets product team workflow management, **Design 2 (NEXORA)** is an enterprise platform marketing site tailored for VP of Engineering, DevOps leaders, and AI infrastructure teams. It showcases autonomous cluster autoscaling, real-time edge telemetry, token caching, security compliance, and an interactive cloud savings ROI calculator.

## Design Concept & Visual Direction
- **Theme:** Cybernetic Dark Glassmorphism.
- **Color Palette:**
  - Background: Deep Space Obsidian (`#07090e`) & Layered Surfaces (`#0c101a`, `#111828`)
  - Accent Colors: Neon Cyan (`#06b6d4`), Electric Purple (`#8b5cf6`), Telemetry Green (`#10b981`)
  - Typography: Space Grotesk (Headings & UI elements), JetBrains Mono (Terminal telemetry, data gauges, code indicators), and Inter (Body copy)
- **Visual Identity:** High-tech cybernetic interface inspired by modern AI/Cloud developer tools (Supabase, Datadog, Modal, Cloudflare Workers), featuring animated console terminals, real-time wave charts, and ambient neon glows.

## Technologies Used
- **HTML5:** Semantic landmark architecture, accessible forms, WAI-ARIA modal dialogs (`role="dialog"`, `aria-modal="true"`, `aria-expanded`).
- **CSS3:** Custom variables, CSS Grid, Flexbox, glassmorphic backdrop filters, custom slider styling, and `prefers-reduced-motion` media queries.
- **JavaScript (Vanilla ES6+):** Simulated real-time terminal log streaming, interactive AI model workload switcher with dynamic wave bar graphs, mathematical ROI calculator engine, annual billing toggle, and tabbed modal authentication with `localStorage` persistence.

## Main Sections & Features
1. **Cybernetic Navbar:** Glowing orb brand badge, platform anchor links, and direct Console Sign In / Request Access buttons.
2. **Hero Section:** Value proposition for hyper-scale infrastructure, live telemetry terminal with live metrics gauges, and edge latency counters.
3. **Enterprise Compliance Strip:** Verification badges for SOC 2 Type II, ISO/IEC 27001, HIPAA, GDPR, and 99.99% Financial SLA.
4. **Interactive Telemetry Dashboard:**
   - **Model Workload Switcher:** Toggle between LLM Gateway (vLLM), Vision Neural Pipeline, and Time-Series Anomaly Detector.
   - **Waveform Telemetry Chart:** Real-time visual representation of request velocities, average latencies, and error rates.
   - **Edge Cluster Nodes List:** Live status of multi-region deployment zones (Mumbai, N. Virginia, Frankfurt, Singapore) with interactive ping refresh.
5. **Core Architecture Capabilities:** 4 structured engineering cards highlighting Autonomous Scaling, Token Guard, Zero-Trust mTLS, and Deep Distributed Tracing.
6. **Interactive Cloud Savings / ROI Calculator:**
   - Dual interactive range sliders for Monthly API Tokens (1M to 100M) and Microservices (5 to 150).
   - Real-time mathematical formulation displaying annual financial savings (in Lakhs), caching efficiency, and reclaimed engineering hours.
7. **Transparent Pricing Matrix:**
   - Monthly vs. Annual toggle with a 20% discount badge.
   - Tiers: Developer (Free), Team Growth (₹1,599/mo annual), Enterprise Scale (Custom).
8. **Technical Comparison Matrix:** Feature breakdown covering median latency, autoscaling thresholds, HSM token encryption, and audit retention.
9. **Interactive Technical FAQ Accordion:** Expandable answers addressing GPU cold-start elimination, private VPC hosting, and protocol support.
10. **Console Authentication Modal Suite:** Tabbed interface for Sign In and Workspace Deployment with client-side validation and browser session storage.
11. **Footer:** Architecture whitepaper links, Bengaluru headquarters attribution, and dynamic copyright year.

## Interactive Functionality
- **Live Workload Telemetry:** Switch between LLM, Vision, and Time-Series models in the Telemetry section to watch the wave graphs, latencies, and request velocities update instantly.
- **ROI Sliders:** Move the API call and microservice count sliders to calculate your enterprise savings in real-time.
- **Edge Ping:** Click "↻ Refresh" in the cluster nodes list to trigger a live ping simulation across all edge regions.
- **Annual Billing Toggle:** Switch between Monthly and Annual billing to see annual price reductions across all tiers.
- **Console Sign-In:** Complete the modal form with validation and session persistence.

## Folder Structure
```
02-saas-platform/02-saas-design-2/
│
├── index.html       # Semantic HTML5 document
├── style.css        # Responsive CSS3 cybernetic design system
├── script.js        # Waveform engine, telemetry switcher, ROI calculator & modal logic
└── README.md        # Technical documentation & project guide
```

## How to Run Using VS Code & Live Server
1. Open Visual Studio Code.
2. Navigate to `ENTEROPIA_INTERNSHIP/02-saas-platform/02-saas-design-2`.
3. Right-click on `index.html`.
4. Click **"Open with Live Server"**.
5. The platform will launch in your browser at `http://127.0.0.1:5500/02-saas-platform/02-saas-design-2/index.html`.

## Responsive Breakpoint Testing
- **Mobile (375px & 420px):** Single-column dashboard layout, full-width touch sliders, responsive terminal window, collapsed navigation drawer.
- **Tablet (768px & 1024px):** 2-column capabilities, optimized ROI calculator, scaled telemetry waveforms.
- **Desktop (1440px):** Full-width dual-pane telemetry terminal, 3-column pricing matrix, maximum container constraints.

## Known Limitations
- This is a frontend demonstration project.
- Telemetry streams simulate live cluster events using client-side timing.
- Authentication tokens are preserved locally in `localStorage` without a remote OAuth provider.

## Future Enhancements
- Interactive node topology map using Canvas or SVG.
- Live WebSocket connectivity to remote cluster health APIs.
- Exportable cluster metrics in Prometheus/Grafana format.
