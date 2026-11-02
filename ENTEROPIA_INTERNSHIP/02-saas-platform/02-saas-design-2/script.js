/**
 * ============================================================================
 * NEXORA — DESIGN 2 JAVASCRIPT
 * Autonomous Cloud Telemetry, Waveform Engine, ROI Calculator & Auth Suite
 * ============================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. CORE DOM REFERENCES
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const currentYear = document.getElementById("currentYear");
    const toast = document.getElementById("toast");

    // Modal References
    const authModal = document.getElementById("authModal");
    const modalExitBtn = document.getElementById("modalExitBtn");
    const btnTabSignin = document.getElementById("btnTabSignin");
    const btnTabSignup = document.getElementById("btnTabSignup");
    const modalHeading = document.getElementById("modalHeading");
    const modalSubheading = document.getElementById("modalSubheading");
    const orgGroup = document.getElementById("orgGroup");
    const orgName = document.getElementById("orgName");
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");
    const authSubmitBtn = document.getElementById("authSubmitBtn");
    const authForm = document.getElementById("authForm");
    const authMessage = document.getElementById("authMessage");
    const orgError = document.getElementById("orgError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Dynamic Copyright Year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 2. STICKY NAVBAR SCROLL
    function handleNavbarScroll() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // 3. RESPONSIVE MOBILE NAVIGATION
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", event => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 4. TOAST NOTIFICATION UTILITY
    let toastTimer;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    // 5. TERMINAL STREAM GENERATOR
    const terminalStream = document.getElementById("terminalStream");
    if (terminalStream) {
        const streamLogs = [
            "[TRACE] us-east-1 // vLLM-inference-shard-02: 4.12ms",
            "[ROUTER] Token payload routed -> Zero-Trust mTLS Enclave",
            "[HEALTH] Automatic health check passed: 64/64 pods nominal",
            "[AUTOSCALE] Scaling threshold evaluated: Traffic normal (1,480 req/s)",
            "[CACHE] Semantic token cache hit ratio: 41.8% (Cost saved)"
        ];
        let logIndex = 0;

        function addLogLine() {
            const line = document.createElement("div");
            line.className = "terminal-line text-cyan";
            line.textContent = `> ${streamLogs[logIndex % streamLogs.length]}`;
            terminalStream.prepend(line);
            if (terminalStream.children.length > 5) {
                terminalStream.removeChild(terminalStream.lastChild);
            }
            logIndex++;
        }

        setInterval(addLogLine, 2800);
    }

    // 6. INTERACTIVE TELEMETRY DASHBOARD
    const waveChart = document.getElementById("waveChart");
    const telemetrySubtitle = document.getElementById("telemetrySubtitle");
    const activeModelPill = document.getElementById("activeModelPill");
    const avgLatencyText = document.getElementById("avgLatencyText");
    const reqVelocityText = document.getElementById("reqVelocityText");
    const errorRateText = document.getElementById("errorRateText");
    const nodesList = document.getElementById("nodesList");
    const refreshNodesBtn = document.getElementById("refreshNodesBtn");

    const telemetryModels = {
        llm: {
            name: "LLM Gateway (vLLM)",
            subtitle: "Streaming live request telemetry across 16 edge points",
            avgLatency: "18.4 ms",
            reqVelocity: "1,480 req/sec",
            errorRate: "0.002%",
            bars: [35, 48, 62, 54, 78, 92, 84, 68, 72, 88, 95, 82, 76, 89, 94, 86]
        },
        vision: {
            name: "Vision Neural Pipeline",
            subtitle: "GPU frame inference cluster telemetry (TensorRT-LLM)",
            avgLatency: "34.2 ms",
            reqVelocity: "840 req/sec",
            errorRate: "0.001%",
            bars: [55, 68, 72, 85, 94, 76, 82, 88, 79, 64, 70, 85, 92, 88, 74, 80]
        },
        timeseries: {
            name: "Time-Series Anomaly Detector",
            subtitle: "Edge telemetry stream across 128 distributed VPC containers",
            avgLatency: "4.8 ms",
            reqVelocity: "4,200 req/sec",
            errorRate: "0.000%",
            bars: [22, 28, 34, 42, 38, 45, 52, 48, 56, 62, 44, 38, 50, 48, 52, 46]
        }
    };

    const edgeNodes = [
        { name: "node-ap-south-1 (Mumbai)", status: "Active", latency: "2.4 ms" },
        { name: "node-us-east-1 (N. Virginia)", status: "Active", latency: "4.1 ms" },
        { name: "node-eu-central-1 (Frankfurt)", status: "Active", latency: "3.8 ms" },
        { name: "node-ap-southeast-1 (Singapore)", status: "Active", latency: "5.2 ms" }
    ];

    function renderWaveChart(modelKey = "llm") {
        if (!waveChart) return;
        const config = telemetryModels[modelKey];
        if (!config) return;

        if (activeModelPill) activeModelPill.textContent = `${config.name} · Active`;
        if (telemetrySubtitle) telemetrySubtitle.textContent = config.subtitle;
        if (avgLatencyText) avgLatencyText.textContent = config.avgLatency;
        if (reqVelocityText) reqVelocityText.textContent = config.reqVelocity;
        if (errorRateText) errorRateText.textContent = config.errorRate;

        waveChart.innerHTML = config.bars.map((h, i) => `
            <div class="wave-bar" style="height: ${h}%" title="Node ${i+1}: ${h}% capacity"></div>
        `).join("");
    }

    function renderNodes() {
        if (!nodesList) return;
        nodesList.innerHTML = edgeNodes.map(node => `
            <div class="node-item">
                <div class="node-info">
                    <strong>${node.name}</strong>
                    <small>● ${node.status} · Enclave verified</small>
                </div>
                <span class="node-metric">${node.latency}</span>
            </div>
        `).join("");
    }

    // Model tab clicks
    document.querySelectorAll(".model-tab[data-model]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".model-tab").forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
            renderWaveChart(btn.dataset.model);
            showToast(`Switched telemetry to: ${telemetryModels[btn.dataset.model]?.name}`);
        });
    });

    if (refreshNodesBtn) {
        refreshNodesBtn.addEventListener("click", () => {
            refreshNodesBtn.textContent = "↻ Ping...";
            setTimeout(() => {
                refreshNodesBtn.textContent = "↻ Refresh";
                renderNodes();
                showToast("Edge cluster ping completed (4/4 nodes nominal)");
            }, 400);
        });
    }

    renderWaveChart("llm");
    renderNodes();

    // 7. INTERACTIVE ROI SAVINGS CALCULATOR
    const sliderCalls = document.getElementById("sliderCalls");
    const sliderServices = document.getElementById("sliderServices");
    const valCalls = document.getElementById("valCalls");
    const valServices = document.getElementById("valServices");
    const savingsAmount = document.getElementById("savingsAmount");
    const cacheSavings = document.getElementById("cacheSavings");
    const idleSavings = document.getElementById("idleSavings");
    const hoursSavings = document.getElementById("hoursSavings");
    const calcDeployBtn = document.getElementById("calcDeployBtn");

    function calculateSavings() {
        if (!sliderCalls || !sliderServices) return;

        const calls = parseInt(sliderCalls.value, 10);
        const services = parseInt(sliderServices.value, 10);

        valCalls.textContent = `${calls} Million`;
        valServices.textContent = `${services} Services`;

        // Mathematical formulation
        const annualLakhs = (calls * 0.95 + services * 0.35).toFixed(1);
        const cachePct = Math.min(Math.round(25 + calls * 0.2), 65);
        const idleLakhs = (annualLakhs * 0.45).toFixed(1);
        const hours = Math.round(180 + services * 11);

        savingsAmount.textContent = `₹${annualLakhs} Lakhs`;
        cacheSavings.textContent = `${cachePct}% Savings`;
        idleSavings.textContent = `₹${idleLakhs}L Saved`;
        hoursSavings.textContent = `${hours} Hrs / Yr`;
    }

    if (sliderCalls) sliderCalls.addEventListener("input", calculateSavings);
    if (sliderServices) sliderServices.addEventListener("input", calculateSavings);
    calculateSavings();

    if (calcDeployBtn) {
        calcDeployBtn.addEventListener("click", () => {
            openAuth(true);
            showToast("Calculated savings profile attached to demo deployment.");
        });
    }

    // 8. ANNUAL PRICING TOGGLE
    const pricingToggle = document.getElementById("pricingToggle");
    const devPrice = document.getElementById("devPrice");
    const devCycle = document.getElementById("devCycle");
    const teamPrice = document.getElementById("teamPrice");
    const teamCycle = document.getElementById("teamCycle");
    const entPrice = document.getElementById("entPrice");
    const entCycle = document.getElementById("entCycle");
    const billingMonthLabel = document.getElementById("billingMonthLabel");
    const billingYearLabel = document.getElementById("billingYearLabel");

    if (pricingToggle) {
        pricingToggle.addEventListener("change", function () {
            if (this.checked) {
                // Annual (20% Savings: ₹1,999 -> ₹1,599/mo, saves ₹4,800/yr)
                if (teamPrice) {
                    teamPrice.style.transition = "transform 0.2s ease, opacity 0.2s ease";
                    teamPrice.style.opacity = "0.4";
                    teamPrice.style.transform = "scale(0.92)";
                    setTimeout(() => {
                        teamPrice.innerHTML = '₹1,599 <small>/ month</small>';
                        teamPrice.style.opacity = "1";
                        teamPrice.style.transform = "scale(1)";
                    }, 140);
                }
                if (teamCycle) teamCycle.textContent = 'billed annually (save ₹4,800/yr · ₹19,188/yr)';
                billingMonthLabel?.classList.remove("active");
                billingYearLabel?.classList.add("active");
                showToast("Annual discount (20%) enabled: ₹1,599/mo across cluster plans.");
            } else {
                // Monthly
                if (teamPrice) {
                    teamPrice.style.transition = "transform 0.2s ease, opacity 0.2s ease";
                    teamPrice.style.opacity = "0.4";
                    teamPrice.style.transform = "scale(0.92)";
                    setTimeout(() => {
                        teamPrice.innerHTML = '₹1,999 <small>/ month</small>';
                        teamPrice.style.opacity = "1";
                        teamPrice.style.transform = "scale(1)";
                    }, 140);
                }
                if (teamCycle) teamCycle.textContent = 'billed monthly';
                billingYearLabel?.classList.remove("active");
                billingMonthLabel?.classList.add("active");
                showToast("Switched to standard monthly billing (₹1,999/mo).");
            }
        });
    }

    // Connect Tier Buttons to Modal
    document.querySelectorAll("[data-signup-tier]").forEach(btn => {
        btn.addEventListener("click", () => {
            const tier = btn.getAttribute("data-signup-tier") || "Team Growth";
            openAuth(true);
            showToast(`Selected ${tier} tier. Complete deployment setup.`);
        });
    });

    // 9. FAQ ACCORDION
    document.querySelectorAll(".faq-trigger").forEach(button => {
        button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const pane = button.nextElementSibling;

            document.querySelectorAll(".faq-trigger").forEach(btn => {
                btn.setAttribute("aria-expanded", "false");
                if (btn.nextElementSibling) btn.nextElementSibling.style.maxHeight = null;
            });

            if (!isExpanded && pane) {
                button.setAttribute("aria-expanded", "true");
                pane.style.maxHeight = pane.scrollHeight + "px";
            }
        });
    });

    // 10. AUTHENTICATION / DEMO MODAL
    let isSignupTab = false;

    function openAuth(signup = false) {
        if (!authModal) return;
        isSignupTab = signup;
        updateModalTabs();
        clearErrors();
        authModal.hidden = false;
        authModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeAuth() {
        if (!authModal) return;
        authModal.classList.remove("open");
        setTimeout(() => {
            authModal.hidden = true;
            document.body.style.overflow = "";
            authForm?.reset();
            clearErrors();
        }, 250);
    }

    function updateModalTabs() {
        if (isSignupTab) {
            btnTabSignin?.classList.remove("active");
            btnTabSignup?.classList.add("active");
            if (modalHeading) modalHeading.textContent = "Deploy Enterprise Workspace";
            if (modalSubheading) modalSubheading.textContent = "Start your 14-day dedicated cluster sandbox.";
            if (orgGroup) orgGroup.hidden = false;
            if (authSubmitBtn) authSubmitBtn.textContent = "Deploy Cluster Workspace ↗";
        } else {
            btnTabSignup?.classList.remove("active");
            btnTabSignin?.classList.add("active");
            if (modalHeading) modalHeading.textContent = "Console Authentication";
            if (modalSubheading) modalSubheading.textContent = "Sign in with your enterprise credentials to access NEXORA.";
            if (orgGroup) orgGroup.hidden = true;
            if (authSubmitBtn) authSubmitBtn.textContent = "Authenticate Session ↗";
        }
    }

    function clearErrors() {
        if (orgError) orgError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (passwordError) passwordError.textContent = "";
        if (authMessage) {
            authMessage.className = "auth-message";
            authMessage.textContent = "";
        }
    }

    // Modal triggers
    document.querySelectorAll("#loginBtn").forEach(b => b.addEventListener("click", () => openAuth(false)));
    document.querySelectorAll("#demoBtn, #heroStartBtn").forEach(b => b.addEventListener("click", () => openAuth(true)));
    document.querySelectorAll("[data-signup-tier]").forEach(btn => {
        btn.addEventListener("click", () => {
            const tier = btn.dataset.signupTier;
            openAuth(true);
            showToast(`Selected tier: ${tier}`);
        });
    });

    if (btnTabSignin) btnTabSignin.addEventListener("click", () => { isSignupTab = false; updateModalTabs(); });
    if (btnTabSignup) btnTabSignup.addEventListener("click", () => { isSignupTab = true; updateModalTabs(); });
    if (modalExitBtn) modalExitBtn.addEventListener("click", closeAuth);
    if (authModal) {
        authModal.addEventListener("click", e => {
            if (e.target === authModal) closeAuth();
        });
    }
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && authModal && !authModal.hidden) closeAuth();
    });

    // Form submission
    if (authForm) {
        authForm.addEventListener("submit", event => {
            event.preventDefault();
            clearErrors();

            let valid = true;
            const email = userEmail.value.trim();
            const password = userPassword.value.trim();
            const org = orgName?.value.trim();

            if (isSignupTab && (!org || org.length < 2)) {
                orgError.textContent = "Please enter your organization name.";
                valid = false;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailError.textContent = "Please enter a valid work email.";
                valid = false;
            }

            if (!password || password.length < 6) {
                passwordError.textContent = "Password token must be at least 6 characters.";
                valid = false;
            }

            if (!valid) return;

            authSubmitBtn.disabled = true;
            authSubmitBtn.textContent = "Verifying Enclave Tokens...";

            setTimeout(() => {
                try {
                    const session = {
                        user: email,
                        org: isSignupTab ? org : "NEXORA-CONSOLE",
                        authenticated: true,
                        timestamp: new Date().toISOString()
                    };
                    localStorage.setItem("nexora_session", JSON.stringify(session));
                } catch {
                    // Ignore quota limits
                }

                authMessage.className = "auth-message success";
                authMessage.textContent = isSignupTab
                    ? `Cluster created for ${org}! Loading sandbox telemetry...`
                    : `Session authorized for ${email}. Accessing console...`;

                showToast(isSignupTab ? "Workspace cluster initialized" : "Session authenticated");

                setTimeout(() => {
                    authSubmitBtn.disabled = false;
                    closeAuth();
                }, 1300);
            }, 700);
        });
    }

    // 11. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // 12. SMOOTH INTERNAL ANCHOR NAVIGATION
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
