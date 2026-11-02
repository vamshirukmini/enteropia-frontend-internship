/**
 * ============================================================================
 * TASKFLOW BY NEXORA — DESIGN 1 JAVASCRIPT
 * Interactive Dashboard, Live Telemetry, Annual Billing & Auth Modal
 * ============================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM REFERENCES
    const navbar = document.getElementById("navbar");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const currentYear = document.getElementById("currentYear");
    const toast = document.getElementById("toast");

    // Auth Modal Elements
    const authOverlay = document.getElementById("authOverlay");
    const closeModal = document.getElementById("closeModal");
    const tabSignIn = document.getElementById("tabSignIn");
    const tabSignUp = document.getElementById("tabSignUp");
    const authTitle = document.getElementById("authTitle");
    const authDescription = document.getElementById("authDescription");
    const nameFieldGroup = document.getElementById("nameFieldGroup");
    const authName = document.getElementById("authName");
    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");
    const authSubmit = document.getElementById("authSubmit");
    const authSwitch = document.getElementById("authSwitch");
    const authSwitchText = document.getElementById("authSwitchText");
    const authForm = document.getElementById("authForm");
    const authStatus = document.getElementById("authStatus");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Dynamic Copyright Year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 2. NAVBAR SCROLL EFFECT
    function handleNavScroll() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();

    // 3. RESPONSIVE MOBILE NAVIGATION
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "☰";
            });
        });

        document.addEventListener("click", event => {
            if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "☰";
            }
        });
    }

    // 4. TOAST HELPER
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

    // 5. AUTHENTICATION MODAL STATE & CONTROLS
    let isSignupMode = false;

    function openAuthModal(signup = false) {
        if (!authOverlay) return;
        isSignupMode = signup;
        updateAuthTabUI();
        clearAuthErrors();
        authOverlay.hidden = false;
        authOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            (signup ? authName : authEmail)?.focus();
        }, 150);
    }

    function closeAuthModal() {
        if (!authOverlay) return;
        authOverlay.classList.remove("active");
        setTimeout(() => {
            authOverlay.hidden = true;
            document.body.style.overflow = "";
            authForm?.reset();
            clearAuthErrors();
        }, 250);
    }

    function updateAuthTabUI() {
        if (isSignupMode) {
            tabSignIn?.classList.remove("active");
            tabSignUp?.classList.add("active");
            if (authTitle) authTitle.textContent = "Create Your Account 🚀";
            if (authDescription) authDescription.textContent = "Start your 14-day free trial. No credit card required.";
            if (nameFieldGroup) nameFieldGroup.hidden = false;
            if (authSubmit) authSubmit.textContent = "Create Free Account →";
            if (authSwitchText) authSwitchText.textContent = "Already have an account?";
            if (authSwitch) authSwitch.textContent = "Sign In";
        } else {
            tabSignUp?.classList.remove("active");
            tabSignIn?.classList.add("active");
            if (authTitle) authTitle.textContent = "Welcome Back 👋";
            if (authDescription) authDescription.textContent = "Sign in to access your TaskFlow workspace.";
            if (nameFieldGroup) nameFieldGroup.hidden = true;
            if (authSubmit) authSubmit.textContent = "Sign In →";
            if (authSwitchText) authSwitchText.textContent = "Don't have an account?";
            if (authSwitch) authSwitch.textContent = "Create Account";
        }
    }

    function clearAuthErrors() {
        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (passwordError) passwordError.textContent = "";
        if (authStatus) {
            authStatus.className = "auth-status";
            authStatus.textContent = "";
        }
    }

    // Bind triggers to Auth Modal (Replacing disruptive alert() dialogs!)
    document.querySelectorAll(".login-btn, #navLoginBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            openAuthModal(false);
        });
    });

    document.querySelectorAll(".signup-btn, #navSignupBtn, #heroStartBtn, #ctaSignupBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            openAuthModal(true);
        });
    });

    document.querySelectorAll(".plan-btn[data-plan]").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const plan = btn.dataset.plan;
            if (plan === "Enterprise") {
                showToast("Sales inquiry opened: Contacting enterprise team.");
                openAuthModal(false);
            } else {
                openAuthModal(true);
            }
        });
    });

    if (tabSignIn) tabSignIn.addEventListener("click", () => { isSignupMode = false; updateAuthTabUI(); });
    if (tabSignUp) tabSignUp.addEventListener("click", () => { isSignupMode = true; updateAuthTabUI(); });
    if (authSwitch) {
        authSwitch.addEventListener("click", e => {
            e.preventDefault();
            isSignupMode = !isSignupMode;
            updateAuthTabUI();
        });
    }

    if (closeModal) closeModal.addEventListener("click", closeAuthModal);
    if (authOverlay) {
        authOverlay.addEventListener("click", e => {
            if (e.target === authOverlay) closeAuthModal();
        });
    }
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && authOverlay && !authOverlay.hidden) {
            closeAuthModal();
        }
    });

    // Form Submission & Validation
    if (authForm) {
        authForm.addEventListener("submit", event => {
            event.preventDefault();
            clearAuthErrors();

            let isValid = true;
            const email = authEmail.value.trim();
            const password = authPassword.value.trim();
            const name = authName?.value.trim();

            if (isSignupMode && (!name || name.length < 2)) {
                nameError.textContent = "Please enter your full name.";
                isValid = false;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailError.textContent = "Please enter a valid work email address.";
                isValid = false;
            }

            if (!password || password.length < 6) {
                passwordError.textContent = "Password must be at least 6 characters.";
                isValid = false;
            }

            if (!isValid) return;

            authSubmit.disabled = true;
            authSubmit.textContent = isSignupMode ? "Creating Workspace..." : "Verifying Credentials...";

            setTimeout(() => {
                try {
                    const currentUser = {
                        name: isSignupMode ? name : email.split("@")[0],
                        email: email,
                        loggedIn: true,
                        loginTime: new Date().toISOString()
                    };
                    localStorage.setItem("taskflow_user", JSON.stringify(currentUser));
                } catch {
                    // Ignore quota limits
                }

                authStatus.className = "auth-status success";
                authStatus.textContent = isSignupMode
                    ? `Account created! Welcome to TaskFlow, ${name || 'Team Lead'}.`
                    : `Welcome back, ${email}! Loading workspace...`;

                showToast(isSignupMode ? "Account registered successfully" : "Signed in to TaskFlow");

                setTimeout(() => {
                    authSubmit.disabled = false;
                    closeAuthModal();
                }, 1200);
            }, 600);
        });
    }

    // 6. INTERACTIVE DASHBOARD TELEMETRY ENGINE
    const chartBars = document.getElementById("chartBars");
    const chartSubtitle = document.getElementById("chartSubtitle");
    const growthMetric = document.getElementById("growthMetric");
    const completionPercentage = document.getElementById("completionPercentage");
    const heroProgressNum = document.getElementById("heroProgressNum");
    const heroProgressBar = document.getElementById("heroProgressBar");

    // Task list data
    let tasks = [
        { id: 1, title: "Website Design System Audit", category: "Design · UI/UX", status: "completed" },
        { id: 2, title: "Microservices Telemetry & Tracing", category: "Backend · DevOps", status: "completed" },
        { id: 3, title: "Enterprise Security Audit (SOC2)", category: "Security · Governance", status: "in-progress" },
        { id: 4, title: "CI/CD Deployment Pipeline Automation", category: "DevOps · Cloud", status: "completed" },
        { id: 5, title: "Payment Gateway Sandbox Integration", category: "Billing · API", status: "completed" },
        { id: 6, title: "Customer Onboarding Interactive Tour", category: "Growth · Product", status: "pending" }
    ];

    const telemetryData = {
        week: {
            subtitle: "Displaying completion analytics for Current Sprint (7 Days)",
            growth: "↑ 12.5% this cycle",
            bars: [
                { label: "Mon", height: "45%" },
                { label: "Tue", height: "65%" },
                { label: "Wed", height: "55%" },
                { label: "Thu", height: "85%" },
                { label: "Fri", height: "70%" },
                { label: "Sat", height: "95%" },
                { label: "Sun", height: "78%" }
            ]
        },
        month: {
            subtitle: "Displaying velocity metrics for October 2026 (4 Sprints)",
            growth: "↑ 18.2% vs Q3 average",
            bars: [
                { label: "W1", height: "62%" },
                { label: "W2", height: "74%" },
                { label: "W3", height: "88%" },
                { label: "W4", height: "92%" }
            ]
        },
        quarter: {
            subtitle: "Displaying cumulative quarterly delivery velocity (Q4 2026)",
            growth: "↑ 24.5% year-over-year",
            bars: [
                { label: "Aug", height: "68%" },
                { label: "Sep", height: "82%" },
                { label: "Oct", height: "94%" }
            ]
        }
    };

    function renderChart(range = "week") {
        if (!chartBars) return;
        const config = telemetryData[range];
        if (!config) return;

        if (chartSubtitle) chartSubtitle.textContent = config.subtitle;
        if (growthMetric) growthMetric.textContent = config.growth;

        chartBars.innerHTML = config.bars.map(b => `
            <div class="chart-bar-item">
                <i style="height: ${b.height}" title="${b.label}: ${b.height}"></i>
                <span>${b.label}</span>
            </div>
        `).join("");
    }

    function renderTasks() {
        const container = document.getElementById("interactiveTaskList");
        if (!container) return;

        container.innerHTML = tasks.map(task => `
            <div class="interactive-task-item ${task.status}" data-task-id="${task.id}">
                <div class="task-checkbox-custom" aria-label="Toggle task status">
                    ${task.status === "completed" ? "✓" : task.status === "in-progress" ? "●" : "○"}
                </div>
                <div class="task-desc">
                    <strong>${task.title}</strong>
                    <small>${task.category}</small>
                </div>
                <span class="task-pill ${task.status === 'completed' ? 'done' : task.status === 'in-progress' ? 'progress' : 'pending'}">
                    ${task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </span>
            </div>
        `).join("");

        updateSummaryMetrics();
    }

    function updateSummaryMetrics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const inProgress = tasks.filter(t => t.status === "in-progress").length;
        const pending = tasks.filter(t => t.status === "pending").length;

        const percentage = Math.round((completed / total) * 100);

        const totalTaskCount = document.getElementById("totalTaskCount");
        const completedTaskCount = document.getElementById("completedTaskCount");
        const inProgressTaskCount = document.getElementById("inProgressTaskCount");
        const pendingTaskCount = document.getElementById("pendingTaskCount");

        if (totalTaskCount) totalTaskCount.textContent = total;
        if (completedTaskCount) completedTaskCount.textContent = completed;
        if (inProgressTaskCount) inProgressTaskCount.textContent = inProgress;
        if (pendingTaskCount) pendingTaskCount.textContent = pending;

        if (completionPercentage) completionPercentage.textContent = `${percentage}%`;
        if (heroProgressNum) heroProgressNum.textContent = `${percentage}%`;
        if (heroProgressBar) heroProgressBar.style.width = `${percentage}%`;
    }

    // Timeframe selector buttons
    document.querySelectorAll(".time-tab[data-range]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".time-tab").forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
            renderChart(btn.dataset.range);
        });
    });

    // Task click interaction (Toggle task state)
    const taskListContainer = document.getElementById("interactiveTaskList");
    if (taskListContainer) {
        taskListContainer.addEventListener("click", event => {
            const item = event.target.closest(".interactive-task-item");
            if (!item) return;

            const taskId = parseInt(item.dataset.taskId, 10);
            const targetTask = tasks.find(t => t.id === taskId);
            if (!targetTask) return;

            // Cycle: pending -> in-progress -> completed -> pending
            if (targetTask.status === "pending") {
                targetTask.status = "in-progress";
                showToast(`Task marked In Progress: ${targetTask.title}`);
            } else if (targetTask.status === "in-progress") {
                targetTask.status = "completed";
                showToast(`Task marked Completed: ${targetTask.title}`);
            } else {
                targetTask.status = "pending";
                showToast(`Task reset to Pending: ${targetTask.title}`);
            }

            renderTasks();
        });
    }

    // Initial Dashboard render
    renderChart("week");
    renderTasks();

    // 7. BILLING CYCLE TOGGLE (MONTHLY / YEARLY)
    const billingToggle = document.getElementById("billingToggle");
    const professionalPrice = document.getElementById("professionalPrice");
    const professionalCycle = document.getElementById("professionalCycle");
    const starterPrice = document.getElementById("starterPrice");
    const starterCycle = document.getElementById("starterCycle");
    const enterprisePrice = document.getElementById("enterprisePrice");
    const enterpriseCycle = document.getElementById("enterpriseCycle");
    const monthlyLabel = document.getElementById("monthlyLabel");
    const yearlyLabel = document.getElementById("yearlyLabel");

    if (billingToggle) {
        billingToggle.addEventListener("change", function () {
            if (this.checked) {
                // Annual (Save 20%): ₹499 -> ₹399/mo (₹4,788 billed annually, saving ₹1,200/yr)
                if (professionalPrice) {
                    professionalPrice.style.transition = "transform 0.2s ease, opacity 0.2s ease";
                    professionalPrice.style.opacity = "0.4";
                    professionalPrice.style.transform = "scale(0.92)";
                    setTimeout(() => {
                        professionalPrice.innerHTML = '₹399 <small>/ month</small>';
                        professionalPrice.style.opacity = "1";
                        professionalPrice.style.transform = "scale(1)";
                    }, 150);
                }
                if (professionalCycle) professionalCycle.textContent = 'billed annually (₹4,788/yr · Save 20%)';
                if (starterPrice) starterPrice.textContent = '₹0';
                if (starterCycle) starterCycle.textContent = 'free forever';
                if (enterprisePrice) enterprisePrice.textContent = 'Custom';
                if (enterpriseCycle) enterpriseCycle.textContent = 'tailored annual contract';
                monthlyLabel?.classList.remove("active");
                yearlyLabel?.classList.add("active");
                showToast("Annual billing applied: 20% discount unlocked (₹399/mo)!");
            } else {
                // Monthly: ₹499/mo
                if (professionalPrice) {
                    professionalPrice.style.transition = "transform 0.2s ease, opacity 0.2s ease";
                    professionalPrice.style.opacity = "0.4";
                    professionalPrice.style.transform = "scale(0.92)";
                    setTimeout(() => {
                        professionalPrice.innerHTML = '₹499 <small>/ month</small>';
                        professionalPrice.style.opacity = "1";
                        professionalPrice.style.transform = "scale(1)";
                    }, 150);
                }
                if (professionalCycle) professionalCycle.textContent = 'billed monthly';
                if (starterPrice) starterPrice.textContent = '₹0';
                if (starterCycle) starterCycle.textContent = 'free forever';
                if (enterprisePrice) enterprisePrice.textContent = 'Custom';
                if (enterpriseCycle) enterpriseCycle.textContent = 'billed monthly or annually';
                yearlyLabel?.classList.remove("active");
                monthlyLabel?.classList.add("active");
                showToast("Switched to standard monthly billing (₹499/mo).");
            }
        });
    }

    // Connect Plan Buttons to Auth Modal
    document.querySelectorAll(".plan-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const plan = btn.getAttribute("data-plan") || "Professional";
            if (typeof openAuthModal === "function") {
                openAuthModal(true);
            }
            showToast(`Selected ${plan} plan. Create your workspace to begin.`);
        });
    });

    // 8. FAQ ACCORDION INTERACTION
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const answer = button.nextElementSibling;

            // Close all open FAQs
            document.querySelectorAll(".faq-question").forEach(btn => {
                btn.setAttribute("aria-expanded", "false");
                if (btn.nextElementSibling) {
                    btn.nextElementSibling.style.maxHeight = null;
                }
            });

            // If it wasn't open, open it
            if (!isExpanded && answer) {
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 9. SCROLL REVEAL OBSERVER
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

    // 10. SMOOTH INTERNAL ANCHOR NAVIGATION
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
