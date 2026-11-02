/**
 * ============================================================================
 * ENTEROPIA LLP — DESIGN 1 JAVASCRIPT
 * Enterprise Technology Experience, Interactive Canvas, Modals & Validation
 * ============================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. CORE DOM REFERENCES
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const currentYear = document.getElementById("currentYear");
    const toast = document.getElementById("toast");
    const caseStudyModal = document.getElementById("caseStudyModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalSecondaryClose = document.getElementById("modalSecondaryClose");
    const modalBadge = document.getElementById("modalBadge");
    const modalTitle = document.getElementById("modalTitle");
    const modalMeta = document.getElementById("modalMeta");
    const modalBody = document.getElementById("modalBody");
    const contactForm = document.getElementById("contactForm");
    const contactSubmitBtn = document.getElementById("contactSubmitBtn");
    const formStatus = document.getElementById("formStatus");

    // Dynamic Copyright Year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 2. STICKY HEADER SCROLL EFFECT
    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // 3. RESPONSIVE MOBILE NAVIGATION
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = navMenu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isExpanded));
        });

        // Close menu on navigation link click
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 4. TOAST NOTIFICATION UTILITY
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

    // 5. INTERACTIVE HERO CANVAS (PARTICLE / GEOMETRIC MESH)
    const heroCanvas = document.getElementById("heroCanvas");
    const heroVisual = document.getElementById("heroVisual");

    if (heroCanvas && heroVisual) {
        const ctx = heroCanvas.getContext("2d");
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, maxDist: 100 };

        function resizeCanvas() {
            const rect = heroVisual.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            heroCanvas.width = width * dpr;
            heroCanvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            initParticles();
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor(width / 18), 36);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1.2,
                    alpha: Math.random() * 0.5 + 0.25
                });
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Connect particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 90) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 * (1 - dist / 90)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.maxDist) {
                        p.x -= (dx / dist) * 1.2;
                        p.y -= (dy / dist) * 1.2;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(animateCanvas);
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas, { passive: true });
            heroVisual.addEventListener("mousemove", e => {
                const rect = heroVisual.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            heroVisual.addEventListener("mouseleave", () => {
                mouse.x = null;
                mouse.y = null;
            });
            animateCanvas();
        }
    }

    // 6. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // 7. ANIMATED NUMBER COUNTERS
    const counterElements = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.dataset.target);
                    const decimals = parseInt(counter.dataset.decimals || "0", 10);
                    const duration = 1600;
                    const startTime = performance.now();

                    function updateNumber(now) {
                        const elapsed = Math.min((now - startTime) / duration, 1);
                        // Ease Out Cubic
                        const progress = 1 - Math.pow(1 - elapsed, 3);
                        const current = target * progress;
                        counter.textContent = current.toFixed(decimals);

                        if (elapsed < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            counter.textContent = target.toFixed(decimals);
                        }
                    }

                    requestAnimationFrame(updateNumber);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.4 });

        counterElements.forEach(el => counterObserver.observe(el));
    } else {
        counterElements.forEach(el => {
            el.textContent = el.dataset.target;
        });
    }

    // 8. INTERACTIVE SOLUTION TABS
    const solutionTabs = document.querySelectorAll(".sol-tab");
    const solutionContents = document.querySelectorAll(".solution-tab-content");

    solutionTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = `sol-${tab.dataset.sol}`;
            solutionTabs.forEach(t => t.classList.remove("active"));
            solutionContents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    // 9. CASE STUDY & SERVICE MODAL DATA
    const caseStudies = {
        agro: {
            badge: "DIGITAL AGRICULTURE & SUPPLY CHAIN",
            title: "Agro-Hub: Distributed Agri-Logistics Platform",
            meta: [
                { label: "INDUSTRY", value: "Agriculture & Retail" },
                { label: "TIMELINE", value: "6 Months Delivery" },
                { label: "IMPACT", value: "35% Faster Dispatch" }
            ],
            body: `
                <p><strong>The Challenge:</strong> Regional agricultural supply chains suffer from disjointed communications between rural growers, cold storage operators, and metropolitan distribution hubs, causing spoilage and pricing opacity.</p>
                <h4>The Enteropia Engineering Solution:</h4>
                <ul>
                    <li>Engineered an event-driven microservices architecture using Node.js and Redis messaging.</li>
                    <li>Integrated real-time GPS telemetry and quality audit logging for freight containers.</li>
                    <li>Built an accessible offline-first web portal for field distribution operators.</li>
                </ul>
                <h4>Measurable Outcomes:</h4>
                <p>35% reduction in freight transit turnaround, zero inventory discrepancies across 12 distribution points, and 99.98% platform availability during peak harvest seasons.</p>
            `
        },
        maatri: {
            badge: "HEALTHCARE TELEMETRY & PUBLIC WELLNESS",
            title: "Maatri Suraksha: Maternal Health Monitoring",
            meta: [
                { label: "INDUSTRY", value: "Public Healthcare & NGOs" },
                { label: "TIMELINE", value: "5 Months Delivery" },
                { label: "IMPACT", value: "98% On-Time Intervention" }
            ],
            body: `
                <p><strong>The Challenge:</strong> Rural healthcare centers required an encrypted, dependable telemetry tool for field health volunteers to log prenatal indicators and schedule clinical checkups without connectivity drops.</p>
                <h4>The Enteropia Engineering Solution:</h4>
                <ul>
                    <li>Constructed a secure, HIPAA/ISO-compliant backend with PostgreSQL encryption at rest and in transit.</li>
                    <li>Built an intuitive mobile client with local synchronization for remote clinics.</li>
                    <li>Automated critical alert dispatch to district medical officers when vital thresholds fluctuate.</li>
                </ul>
                <h4>Measurable Outcomes:</h4>
                <p>Over 14,000 mothers registered across pilot districts with a 98% timeliness score for high-risk triage interventions.</p>
            `
        },
        demand: {
            badge: "PREDICTIVE DATA INTELLIGENCE",
            title: "Demand Forecasting & Supply Chain ML Engine",
            meta: [
                { label: "INDUSTRY", value: "E-Commerce & Manufacturing" },
                { label: "TIMELINE", value: "4 Months Delivery" },
                { label: "IMPACT", value: "22% Reduced Stockouts" }
            ],
            body: `
                <p><strong>The Challenge:</strong> Fast-scaling retail logistics networks faced unpredictable regional demand surges, leading to excessive buffer stock in some hubs and empty shelves in others.</p>
                <h4>The Enteropia Engineering Solution:</h4>
                <ul>
                    <li>Developed automated time-series machine learning models in Python deployed as AWS Lambda endpoints.</li>
                    <li>Integrated seasonal holiday patterns, regional weather trends, and historical buying velocity.</li>
                    <li>Created an interactive operations dashboard providing daily procurement recommendations.</li>
                </ul>
                <h4>Measurable Outcomes:</h4>
                <p>Reduced stockout incidents by 22%, lowered inventory carrying costs by 14%, and automated 85% of routine replenishment orders.</p>
            `
        },
        software: {
            badge: "CORE CAPABILITY OVERVIEW",
            title: "Software Engineering & Architecture",
            meta: [
                { label: "CAPABILITY", value: "Full-Stack Development" },
                { label: "STACK", value: "React, Node, Go, Python" },
                { label: "DELIVERY", value: "Agile CI/CD Sprints" }
            ],
            body: `
                <p>Enteropia designs mission-critical enterprise applications built on modular microservices, REST/GraphQL standards, and high-performance databases.</p>
                <h4>Our Engineering Standards:</h4>
                <ul>
                    <li>Domain-Driven Design (DDD) to cleanly isolate business logic.</li>
                    <li>Comprehensive automated testing with high coverage benchmarks.</li>
                    <li>Modern frontend design systems with strict WCAG 2.1 AA accessibility.</li>
                </ul>
            `
        },
        cloud: {
            badge: "CORE CAPABILITY OVERVIEW",
            title: "Cloud Infrastructure & DevOps",
            meta: [
                { label: "CAPABILITY", value: "Cloud Native Systems" },
                { label: "PLATFORMS", value: "AWS, Google Cloud, Azure" },
                { label: "STANDARDS", value: "Zero-Downtime Releases" }
            ],
            body: `
                <p>We build resilient, automated cloud infrastructure that scales elastically with business growth while keeping operational overhead minimal.</p>
                <h4>Core Cloud Practices:</h4>
                <ul>
                    <li>Infrastructure as Code (Terraform, CloudFormation) for reproducible setups.</li>
                    <li>Kubernetes container orchestration with autoscaling and load balancing.</li>
                    <li>Automated CI/CD deployment pipelines with canary releases and rollbacks.</li>
                </ul>
            `
        },
        ai: {
            badge: "CORE CAPABILITY OVERVIEW",
            title: "AI & Automation Pipelines",
            meta: [
                { label: "CAPABILITY", value: "Intelligent Systems" },
                { label: "FOCUS", value: "Predictive Models & NLP" },
                { label: "SECURITY", value: "Private VPC Inference" }
            ],
            body: `
                <p>We bridge the gap between experimental data science and production-grade ML engineering, embedding AI directly into everyday business workflows.</p>
                <h4>Key AI Solutions:</h4>
                <ul>
                    <li>Custom LLM and NLP automation pipelines for document parsing and intelligence.</li>
                    <li>Predictive maintenance and time-series demand forecasting engines.</li>
                    <li>Secure model serving infrastructure running inside your private enterprise perimeter.</li>
                </ul>
            `
        },
        security: {
            badge: "CORE CAPABILITY OVERVIEW",
            title: "Zero-Trust Cybersecurity & Compliance",
            meta: [
                { label: "CAPABILITY", value: "Enterprise Defense" },
                { label: "FRAMEWORK", value: "NIST & Zero-Trust Architecture" },
                { label: "AUDIT", value: "Continuous Governance" }
            ],
            body: `
                <p>Security is not an afterthought at Enteropia — it is designed into every line of code, network interface, and access token.</p>
                <h4>Our Security Framework:</h4>
                <ul>
                    <li>Role-Based and Attribute-Based Access Control (RBAC/ABAC) integration.</li>
                    <li>Automated vulnerability scanning across container registries and codebases.</li>
                    <li>Full compliance readiness for ISO 27001, SOC2, and regional data protection acts.</li>
                </ul>
            `
        }
    };

    function openModalWithData(data) {
        if (!caseStudyModal || !data) return;
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalMeta.innerHTML = data.meta.map(m => `
            <div><small>${m.label}</small><strong>${m.value}</strong></div>
        `).join("");
        modalBody.innerHTML = data.body;
        caseStudyModal.hidden = false;
        caseStudyModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!caseStudyModal) return;
        caseStudyModal.classList.remove("open");
        setTimeout(() => {
            caseStudyModal.hidden = true;
            document.body.style.overflow = "";
        }, 250);
    }

    // Bind Portfolio card clicks
    document.querySelectorAll(".portfolio-card[data-project]").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.project;
            if (caseStudies[key]) openModalWithData(caseStudies[key]);
        });
    });

    // Bind Service modal buttons
    document.querySelectorAll(".service-modal-btn[data-open-service]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const key = btn.dataset.openService;
            if (caseStudies[key]) openModalWithData(caseStudies[key]);
        });
    });

    // Modal close listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalSecondaryClose) modalSecondaryClose.addEventListener("click", closeModal);
    if (caseStudyModal) {
        caseStudyModal.addEventListener("click", event => {
            if (event.target === caseStudyModal) closeModal();
        });
    }
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && caseStudyModal && !caseStudyModal.hidden) {
            closeModal();
        }
    });

    // 10. CAREERS APPLY DEMO BUTTONS
    document.querySelectorAll(".apply-btn[data-apply]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const role = btn.dataset.apply;
            const messageField = document.getElementById("message");
            const serviceField = document.getElementById("serviceInterest");

            if (serviceField) serviceField.value = "Other";
            if (messageField) {
                messageField.value = `Hello Enteropia Recruiting Team,\n\nI am expressing interest in the ${role} opening. Here is a brief summary of my technical background...`;
            }
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
            showToast(`Role selected: ${role}. Complete the form below to apply.`);
        });
    });

    // 11. CONTACT FORM VALIDATION & PERSISTENCE
    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            let isValid = true;
            nameError.textContent = "";
            emailError.textContent = "";
            messageError.textContent = "";
            formStatus.className = "form-status";
            formStatus.textContent = "";

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            const serviceInterest = document.getElementById("serviceInterest").value;

            if (!name || name.length < 2) {
                nameError.textContent = "Please provide your full name (at least 2 characters).";
                isValid = false;
            }

            if (!email || !validateEmail(email)) {
                emailError.textContent = "Please provide a valid business email address.";
                isValid = false;
            }

            if (!message || message.length < 10) {
                messageError.textContent = "Please provide a brief project overview (at least 10 characters).";
                isValid = false;
            }

            if (!isValid) return;

            // Simulate realistic submission
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = "<span>Transmitting Inquiry...</span>";

            setTimeout(() => {
                // Save to localStorage for demo persistence
                try {
                    const existingInquiries = JSON.parse(localStorage.getItem("enteropia_inquiries") || "[]");
                    existingInquiries.push({
                        name,
                        email,
                        serviceInterest,
                        message,
                        timestamp: new Date().toISOString()
                    });
                    localStorage.setItem("enteropia_inquiries", JSON.stringify(existingInquiries));
                } catch {
                    // Ignore storage quota errors
                }

                formStatus.className = "form-status success";
                formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been registered in this frontend demonstration. We will review your ${serviceInterest} roadmap.`;
                contactForm.reset();
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.innerHTML = "<span>Send Inquiry ↗</span>";
                showToast("Inquiry recorded successfully (Demo Mode)");
            }, 800);
        });
    }

    // 12. SMOOTH ANCHOR LINK NAVIGATION
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
