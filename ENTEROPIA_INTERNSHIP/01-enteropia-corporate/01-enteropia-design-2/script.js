/**
 * ============================================================================
 * ENTEROPIA STUDIO — DESIGN 2 JAVASCRIPT ENGINE
 * Architectural Systems Studio · Kinetic Canvas · Drawer · Validation
 * ============================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM REFERENCES
    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");
    const currentYear = document.getElementById("currentYear");
    const toast = document.getElementById("toast");
    const liveTimeEl = document.getElementById("liveTime");
    const canvasCoordinates = document.getElementById("canvasCoordinates");

    // Drawer Elements
    const editorialDrawer = document.getElementById("editorialDrawer");
    const drawerClose = document.getElementById("drawerClose");
    const drawerDismiss = document.getElementById("drawerDismiss");
    const drawerKicker = document.getElementById("drawerKicker");
    const drawerTitle = document.getElementById("drawerTitle");
    const drawerMeta = document.getElementById("drawerMeta");
    const drawerContent = document.getElementById("drawerContent");
    const drawerCta = document.getElementById("drawerCta");

    // Contact Form
    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactDomain = document.getElementById("contactDomain");
    const contactMessage = document.getElementById("contactMessage");
    const contactSubmit = document.getElementById("contactSubmit");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formStatus = document.getElementById("formStatus");

    // 2. DYNAMIC TIME & YEAR
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function updateLiveTime() {
        if (!liveTimeEl) return;
        const now = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        liveTimeEl.textContent = `BENGALURU ${now.toLocaleTimeString("en-GB", options)} IST (UTC+05:30)`;
    }
    updateLiveTime();
    setInterval(updateLiveTime, 1000);

    // 3. HEADER SCROLL DETECTION
    function handleScroll() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 4. MOBILE NAVIGATION DRAWER
    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("active");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        // Close when clicking nav link
        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });

        // Close on outside click
        document.addEventListener("click", e => {
            if (!navigation.contains(e.target) && !menuButton.contains(e.target)) {
                navigation.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 5. TOAST NOTIFICATION HELPER
    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    // 6. INTERACTIVE KINETIC GEOMETRIC CANVAS
    const canvas = document.getElementById("heroStudioCanvas");
    const visualWrap = document.getElementById("heroVisualWrap");

    if (canvas && visualWrap) {
        const ctx = canvas.getContext("2d");
        let width, height;
        let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
        let rotationAngle = 0;

        // 3D Wireframe Prisms and Node Network
        let nodes = [];
        const numNodes = 28;

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            initNodes();
        }

        function initNodes() {
            nodes = [];
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.32;

            for (let i = 0; i < numNodes; i++) {
                const theta = (i / numNodes) * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                nodes.push({
                    baseX: centerX + radius * Math.sin(phi) * Math.cos(theta),
                    baseY: centerY + radius * Math.cos(phi),
                    baseZ: radius * Math.sin(phi) * Math.sin(theta),
                    x: 0,
                    y: 0,
                    z: 0,
                    vx: 0,
                    vy: 0,
                    speed: 0.003 + Math.random() * 0.004
                });
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            rotationAngle += 0.006;

            // Draw Subtle Architectural Grid Lines
            ctx.strokeStyle = "rgba(229, 227, 219, 0.4)";
            ctx.lineWidth = 1;
            const gridStep = 40;
            for (let x = 0; x < width; x += gridStep) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridStep) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Update & Project 3D Nodes
            const projected = [];
            const cosA = Math.cos(rotationAngle);
            const sinA = Math.sin(rotationAngle);

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                // Rotate around Y axis
                const relX = n.baseX - centerX;
                const relZ = n.baseZ;
                const rotX = relX * cosA - relZ * sinA;
                const rotZ = relX * sinA + relZ * cosA;

                const curBaseX = centerX + rotX;
                const curBaseY = n.baseY;

                // Mouse deflection physics
                const dx = mouse.x - curBaseX;
                const dy = mouse.y - curBaseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let pushX = 0;
                let pushY = 0;

                if (dist < 130) {
                    const force = (1 - dist / 130) * 32;
                    pushX = -(dx / dist) * force;
                    pushY = -(dy / dist) * force;
                }

                n.x = curBaseX + pushX;
                n.y = curBaseY + pushY;
                n.z = rotZ;

                projected.push(n);
            }

            // Draw Geometric Inter-Connecting Facet Lines
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const p1 = projected[i];
                    const p2 = projected[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                    if (dist < 95) {
                        const alpha = (1 - dist / 95) * 0.35;
                        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes
            for (let i = 0; i < projected.length; i++) {
                const p = projected[i];
                const scaleFactor = (p.z + 180) / 360;
                const nodeSize = Math.max(2.5, 4 * scaleFactor);

                ctx.fillStyle = p.z > 0 ? "#4f46e5" : "#111216";
                ctx.beginPath();
                ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
                ctx.fill();

                // Outer telemetry ring on key nodes
                if (i % 5 === 0) {
                    ctx.strokeStyle = "rgba(79, 70, 229, 0.6)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, nodeSize + 4, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas, { passive: true });

            canvas.addEventListener("mousemove", e => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                if (canvasCoordinates) {
                    canvasCoordinates.textContent = `X: ${Math.round(mouse.x)} | Y: ${Math.round(mouse.y)}`;
                }
            });

            canvas.addEventListener("mouseleave", () => {
                mouse.x = -1000;
                mouse.y = -1000;
                if (canvasCoordinates) {
                    canvasCoordinates.textContent = `X: 000 | Y: 000`;
                }
            });

            animateCanvas();
        }
    }

    // 7. SCROLL REVEAL OBSERVER
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add("visible"));
    }

    // 8. ANIMATED NUMBER COUNTERS
    const counters = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.dataset.target);
                    const decimals = parseInt(counter.dataset.decimals || "0", 10);
                    const duration = 1600;
                    const startTime = performance.now();

                    function count(time) {
                        const elapsed = Math.min((time - startTime) / duration, 1);
                        const progress = 1 - Math.pow(1 - elapsed, 3);
                        counter.textContent = (target * progress).toFixed(decimals);

                        if (elapsed < 1) {
                            requestAnimationFrame(count);
                        } else {
                            counter.textContent = target.toFixed(decimals);
                        }
                    }

                    requestAnimationFrame(count);
                    obs.unobserve(counter);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(c => counterObserver.observe(c));
    } else {
        counters.forEach(c => c.textContent = c.dataset.target);
    }

    // 9. WORK FILTERING
    const filterButtons = document.querySelectorAll(".filter-btn");
    const workCards = document.querySelectorAll(".work-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            workCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === "all" || category === filter) {
                    card.style.display = "";
                    card.classList.add("visible");
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 10. ARCHITECTURAL BLUEPRINT SPECIFICATION STORE
    const blueprints = {
        software: {
            kicker: "CAPABILITY BLUEPRINT · 01",
            title: "Software Engineering & Distributed Systems",
            meta: [
                { label: "PARADIGM", value: "Event-Driven & Reactive" },
                { label: "PRIMARY STACK", value: "TypeScript, Go, React, Kafka" },
                { label: "COMPLIANCE", value: "WCAG 2.1 AA / Strict Typing" }
            ],
            content: `
                <p>We construct resilient, high-throughput software systems engineered around real-world enterprise constraints. Codebases feature clean domain boundaries, decoupled modular microservices, and continuous automated regression testing.</p>
                <h4>Core Architectural Principles:</h4>
                <ul>
                    <li><strong>Domain-Driven Design (DDD):</strong> Clear bounded contexts preventing monolithic dependency bleed.</li>
                    <li><strong>Reactive GraphQL & REST APIs:</strong> Generated schema validations, sub-millisecond query parsing, and rate limiting.</li>
                    <li><strong>Event Sourcing & CQRS:</strong> High-velocity ledger and audit integrity powered by Apache Kafka streaming partitions.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>CODE COVERAGE</span><b>&gt; 92% Unit & Integration</b></div>
                    <div class="spec-tile"><span>P99 RESPONSE SLA</span><b>&lt; 45ms Global</b></div>
                    <div class="spec-tile"><span>API CONCURRENCY</span><b>100K+ req/sec Multi-Zone</b></div>
                    <div class="spec-tile"><span>DOCUMENTATION</span><b>Automated OpenAPI 3.1</b></div>
                </div>
            `
        },
        cloud: {
            kicker: "CAPABILITY BLUEPRINT · 02",
            title: "Cloud Infrastructure & Kubernetes DevOps",
            meta: [
                { label: "PROVIDERS", value: "AWS & Google Cloud (GCP)" },
                { label: "ORCHESTRATION", value: "Kubernetes (EKS / GKE)" },
                { label: "IAC FRAMEWORK", value: "Terraform & ArgoCD" }
            ],
            content: `
                <p>Enterprise cloud foundations engineered as code. We establish automated GitOps delivery pipelines, resilient multi-region disaster recovery topologies, and dynamic cluster auto-scaling with zero-downtime rolling upgrades.</p>
                <h4>Infrastructure Capabilities:</h4>
                <ul>
                    <li><strong>Immutable Infrastructure as Code:</strong> 100% Terraform state governance across multi-account AWS organizations.</li>
                    <li><strong>Kubernetes Service Mesh:</strong> Istio mTLS encrypted tunnels, dynamic traffic splitting, and circuit breakers.</li>
                    <li><strong>GitOps Delivery (ArgoCD):</strong> Declarative synchronization from version control with automated rollback triggers.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>DISASTER RECOVERY</span><b>RTO &lt; 5m / RPO &lt; 1m</b></div>
                    <div class="spec-tile"><span>PROVISIONING SPEED</span><b>100% Automated CI/CD</b></div>
                    <div class="spec-tile"><span>AUTO-SCALING</span><b>Horizontal Pod HPA / KEDA</b></div>
                    <div class="spec-tile"><span>COST OPTIMIZATION</span><b>Up to 34% Cloud Reclaimed</b></div>
                </div>
            `
        },
        ai: {
            kicker: "CAPABILITY BLUEPRINT · 03",
            title: "AI Automation & Time-Series Analytics",
            meta: [
                { label: "FRAMEWORKS", value: "PyTorch, vLLM, Ray" },
                { label: "PIPELINE ORCHESTRATION", value: "Kubeflow & MLflow" },
                { label: "DEPLOYMENT", value: "GPU Triton Inference Server" }
            ],
            content: `
                <p>We take machine learning beyond prototypes into robust production environments. Our AI pipelines handle live feature ingestion, distributed training orchestration, model drift detection, and sub-10ms inference latencies.</p>
                <h4>Machine Learning Workflows:</h4>
                <ul>
                    <li><strong>Deep-Learning Time-Series Models:</strong> Temporal Fusion Transformers for high-accuracy demand replenishment.</li>
                    <li><strong>Real-Time Feature Store:</strong> Low-latency online Redis cache combined with offline BigQuery data lakes.</li>
                    <li><strong>Automated Model Governance:</strong> Continuous telemetry monitoring concept drift, latency degradation, and bias.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>INFERENCE LATENCY</span><b>&lt; 12ms P95</b></div>
                    <div class="spec-tile"><span>FORECAST ACCURACY</span><b>94.6% Historical Precision</b></div>
                    <div class="spec-tile"><span>COLD-START PENALTY</span><b>Zero GPU Standby Latency</b></div>
                    <div class="spec-tile"><span>DATA SCALE</span><b>Billions of telemetry tokens</b></div>
                </div>
            `
        },
        security: {
            kicker: "CAPABILITY BLUEPRINT · 04",
            title: "Zero-Trust Cybersecurity & Audit Governance",
            meta: [
                { label: "ARCHITECTURE", value: "BeyondCorp / Zero-Trust" },
                { label: "STANDARDS", value: "ISO 27001 & SOC 2 Type II" },
                { label: "KEY MANAGEMENT", value: "HashiCorp Vault HSM" }
            ],
            content: `
                <p>Security cannot be an afterthought bolted on at deployment. We architect cryptographic identity enforcement into every network packet, database connection, and API gateway interface.</p>
                <h4>Cybersecurity Safeguards:</h4>
                <ul>
                    <li><strong>Mutual TLS (mTLS):</strong> Ephemeral cryptographic certificates rotating automatically every 24 hours.</li>
                    <li><strong>Fine-Grained RBAC & ABAC:</strong> Attribute-based access control with centralized Open Policy Agent (OPA) enforcement.</li>
                    <li><strong>Cryptographic Audit Trails:</strong> Append-only immutable system event streams for compliance verification.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>ENCRYPTION</span><b>AES-256-GCM / TLS 1.3</b></div>
                    <div class="spec-tile"><span>COMPLIANCE</span><b>SOC 2, ISO 27001, GDPR</b></div>
                    <div class="spec-tile"><span>PEN-TEST SLA</span><b>Zero Unmitigated CVEs</b></div>
                    <div class="spec-tile"><span>KEY ROTATION</span><b>Automated Vault Leases</b></div>
                </div>
            `
        },
        agro: {
            kicker: "ENTERPRISE PLATFORM MONOGRAPH · 01",
            title: "Agro-Hub: Distributed Logistics & Supply Chain",
            meta: [
                { label: "DOMAIN", value: "Agricultural Logistics" },
                { label: "SCALE", value: "14 Rural Terminals · 25,000+ Growers" },
                { label: "OUTCOME", value: "35% Spoilage Reduction" }
            ],
            content: `
                <p>Agro-Hub was engineered to eliminate multi-tier middleman friction and post-harvest produce degradation across southern India. By connecting farm cooperatives directly with municipal bulk retail centers, the system synchronizes transport fleets, temperature telematics, and direct bank remittances.</p>
                <h4>Technical Architecture & Implementation:</h4>
                <ul>
                    <li>Offline-first mobile PWA for weighment terminals operating under spotty 2G/3G connectivity.</li>
                    <li>Dynamic route-optimization algorithms matching harvest perishability curves with available reefer truck capacity.</li>
                    <li>Automated escrow settlement engine releasing payments to growers via UPI/IMPS within 4 minutes of terminal receipt.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>TRANSIT TIME</span><b>Cut by 35% across regions</b></div>
                    <div class="spec-tile"><span>SETTLEMENT VOLUME</span><b>₹42+ Crores disbursed</b></div>
                    <div class="spec-tile"><span>SPOILAGE REDUCTION</span><b>Estimated ₹8.2Cr saved</b></div>
                    <div class="spec-tile"><span>AVAILABILITY</span><b>99.98% uninterrupted</b></div>
                </div>
            `
        },
        maatri: {
            kicker: "ENTERPRISE PLATFORM MONOGRAPH · 02",
            title: "Maatri Suraksha: Maternal Telemetry & Healthcare",
            meta: [
                { label: "DOMAIN", value: "Preventative Maternal Health" },
                { label: "POPULATION", value: "120,000+ Monitored Mothers" },
                { label: "DATA SECURITY", value: "End-to-End HIPAA / ISO 27001" }
            ],
            content: `
                <p>Maatri Suraksha empowers frontline community health officers with encrypted mobile telemetry tools. The platform logs maternal vitals, automated blood pressure risk flags, and ultrasound appointment milestones, relaying high-priority alerts to senior obstetricians in regional tertiary care centers.</p>
                <h4>Healthcare Informatics Architecture:</h4>
                <ul>
                    <li>Field-tested SQLite encryption running on Android tablets with automatic background cloud sync upon cell reconnection.</li>
                    <li>Automated triage classifier prioritizing high-risk gestational diabetic and hypertensive patients.</li>
                    <li>Emergency 1-click ambulance telemetry dispatch integrated directly into district medical command centers.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>ON-TIME TRIAGE</span><b>98.4% emergency SLA</b></div>
                    <div class="spec-tile"><span>ACTIVE HEALTHCARE WORKERS</span><b>3,400+ field personnel</b></div>
                    <div class="spec-tile"><span>ENCRYPTION</span><b>End-to-end zero-knowledge</b></div>
                    <div class="spec-tile"><span>MATERNAL OUTCOMES</span><b>41% drop in unassisted delivery</b></div>
                </div>
            `
        },
        demand: {
            kicker: "ENTERPRISE PLATFORM MONOGRAPH · 03",
            title: "Time-Series Multi-Tier Demand Forecasting",
            meta: [
                { label: "DOMAIN", value: "Retail & Supply Chain AI" },
                { label: "SKU VOLUME", value: "45,000+ Tracked Products" },
                { label: "FINANCIAL IMPACT", value: "22.6% Stockout Reduction" }
            ],
            content: `
                <p>A mission-critical predictive replenishment platform serving regional distribution centers. By analyzing historical purchase velocities, weather patterns, festive calendar spikes, and supplier manufacturing lead times, the system predicts demand with unmatched accuracy.</p>
                <h4>Deep Learning Systems Engineering:</h4>
                <ul>
                    <li>Temporal Fusion Transformers (TFT) modeling complex non-linear feature interactions across multi-horizon forecasts.</li>
                    <li>Automated Purchase Order (PO) dispatch API bridges connecting directly to enterprise ERPs (SAP & Oracle).</li>
                    <li>Real-time counterfactual scenario simulations enabling supply chain planners to model supplier delay shocks.</li>
                </ul>
                <div class="blueprint-spec-grid">
                    <div class="spec-tile"><span>STOCKOUT DROP</span><b>22.6% fewer missed sales</b></div>
                    <div class="spec-tile"><span>WORKING CAPITAL</span><b>18.5% inventory freed</b></div>
                    <div class="spec-tile"><span>CALCULATION TIME</span><b>Reduced from 6 hours to 4 mins</b></div>
                    <div class="spec-tile"><span>ACCURACY</span><b>94.6% mean directional accuracy</b></div>
                </div>
            `
        }
    };

    // 11. OPEN & CLOSE DRAWER
    function openDrawer(id) {
        const data = blueprints[id];
        if (!data || !editorialDrawer) return;

        drawerKicker.textContent = data.kicker;
        drawerTitle.textContent = data.title;

        // Render Meta Bar
        drawerMeta.innerHTML = data.meta.map(m => `
            <div class="drawer-meta-item">
                <small>${m.label}</small>
                <strong>${m.value}</strong>
            </div>
        `).join("");

        // Render Body
        drawerContent.innerHTML = data.content;

        // Display Drawer
        editorialDrawer.removeAttribute("hidden");
        // Force reflow
        void editorialDrawer.offsetWidth;
        editorialDrawer.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        if (!editorialDrawer) return;
        editorialDrawer.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => {
            editorialDrawer.setAttribute("hidden", "true");
        }, 320);
    }

    // Attach drawer triggers
    document.querySelectorAll("[data-open-drawer]").forEach(btn => {
        btn.addEventListener("click", () => {
            const drawerId = btn.getAttribute("data-open-drawer");
            openDrawer(drawerId);
        });
    });

    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawerDismiss) drawerDismiss.addEventListener("click", closeDrawer);
    if (drawerCta) drawerCta.addEventListener("click", closeDrawer);

    if (editorialDrawer) {
        editorialDrawer.addEventListener("click", e => {
            if (e.target === editorialDrawer) {
                closeDrawer();
            }
        });
    }

    // ESC key closes drawer
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && editorialDrawer && !editorialDrawer.hasAttribute("hidden")) {
            closeDrawer();
        }
    });

    // 12. ROLE PRE-FILL TRIGGER FROM CAREERS
    document.querySelectorAll("[data-career-role]").forEach(btn => {
        btn.addEventListener("click", () => {
            const role = btn.getAttribute("data-career-role");
            if (contactDomain) {
                contactDomain.value = "Careers / Studio Fellowship";
            }
            if (contactMessage) {
                contactMessage.value = `Hello Enteropia Studio Team,\n\nI am writing to express my strong interest in the "${role}" position at your Bengaluru studio. Here is a summary of my background and recent engineering projects:\n`;
            }
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
                if (contactName) contactName.focus();
            }
            showToast(`Role selected: ${role}. Form prepared.`);
        });
    });

    // 13. CLIENT-SIDE VALIDATED CONTACT FORM
    if (contactForm) {
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            let isValid = true;
            nameError.textContent = "";
            emailError.textContent = "";
            messageError.textContent = "";
            formStatus.className = "form-status-box";
            formStatus.textContent = "";

            const nameVal = contactName.value.trim();
            const emailVal = contactEmail.value.trim();
            const domainVal = contactDomain.value;
            const msgVal = contactMessage.value.trim();

            if (!nameVal || nameVal.length < 2) {
                nameError.textContent = "Please provide your full name (minimum 2 characters).";
                isValid = false;
            }

            if (!emailVal || !validateEmail(emailVal)) {
                emailError.textContent = "Please enter a valid work email address (e.g. name@company.com).";
                isValid = false;
            }

            if (!msgVal || msgVal.length < 10) {
                messageError.textContent = "Please describe your project scope or challenge (minimum 10 characters).";
                isValid = false;
            }

            if (!isValid) {
                showToast("Please review the highlighted form errors.");
                return;
            }

            // Simulate Transmission
            contactSubmit.disabled = true;
            const originalBtnHTML = contactSubmit.innerHTML;
            contactSubmit.innerHTML = `<span>Transmitting to Studio...</span>`;

            setTimeout(() => {
                // Save to localStorage
                try {
                    const existing = JSON.parse(localStorage.getItem("enteropia_d2_inquiries") || "[]");
                    existing.push({
                        id: `ENT-${Date.now()}`,
                        name: nameVal,
                        email: emailVal,
                        domain: domainVal,
                        message: msgVal,
                        timestamp: new Date().toISOString()
                    });
                    localStorage.setItem("enteropia_d2_inquiries", JSON.stringify(existing));
                } catch (err) {
                    console.warn("Storage error:", err);
                }

                contactSubmit.disabled = false;
                contactSubmit.innerHTML = originalBtnHTML;
                contactForm.reset();

                formStatus.classList.add("success");
                formStatus.innerHTML = `<strong>Brief Transmitted Successfully ✓</strong><br>Thank you, ${nameVal}. Our senior architecture squad will review your objectives and respond via ${emailVal}.`;

                showToast("Technical brief transmitted successfully.");
            }, 850);
        });
    }
});
