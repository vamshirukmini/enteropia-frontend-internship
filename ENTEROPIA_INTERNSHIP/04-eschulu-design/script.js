// ESCHULU — Enterprise Education Management SaaS Controller
// Multi-Role Architecture (Admin, Teacher, Student) for Enteropia LLP Challenge

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  // Initial State and Storage Keys
  let currentRole = "Admin";
  let currentPage = "overview";
  let toastTimer = null;

  // Initial Mock Data (with LocalStorage Hydration)
  const defaultData = {
    students: [
      { name: "Aarav Sharma", id: "STU001", course: "Computer Science", year: "1st Year", status: "Active", attendance: "96.4%" },
      { name: "Ananya Rao", id: "STU002", course: "Commerce & Finance", year: "2nd Year", status: "Active", attendance: "94.2%" },
      { name: "Rohan Kumar", id: "STU003", course: "Computer Science", year: "3rd Year", status: "Active", attendance: "89.0%" },
      { name: "Meera Nair", id: "STU004", course: "Business Studies", year: "1st Year", status: "Pending", attendance: "91.5%" },
      { name: "Ishaan Patel", id: "STU005", course: "Computer Science", year: "2nd Year", status: "Active", attendance: "97.8%" },
      { name: "Diya Reddy", id: "STU006", course: "Commerce & Finance", year: "3rd Year", status: "Active", attendance: "93.1%" }
    ],
    faculty: [
      { name: "Dr. Priya Menon", id: "FAC001", course: "Computer Science", year: "Head of Dept (HOD)", status: "Active" },
      { name: "Prof. Rahul Verma", id: "FAC002", course: "Mathematics", year: "Senior Faculty", status: "Active" },
      { name: "Dr. Arjun Das", id: "FAC003", course: "Physics & Electronics", year: "Associate Professor", status: "Active" },
      { name: "Ms. Kavya Rao", id: "FAC004", course: "Business & Commerce", year: "Assistant Faculty", status: "Active" }
    ],
    admissions: [
      { name: "Sana Ahmed", id: "APP101", course: "B.Tech Computer Science", year: "Fall 2026", status: "Pending", gpa: "3.92" },
      { name: "Kabir Shah", id: "APP102", course: "B.Com Honors", year: "Fall 2026", status: "Approved", gpa: "3.75" },
      { name: "Tara Joseph", id: "APP103", course: "B.Sc Data Science", year: "Fall 2026", status: "Pending", gpa: "3.88" },
      { name: "Nikhil Gupta", id: "APP104", course: "B.Tech AI & Robotics", year: "Fall 2026", status: "Pending", gpa: "3.64" }
    ],
    attendance: [
      { name: "Aarav Sharma", id: "STU001", course: "CS 301 - Data Structures", year: "Section A", status: "Present" },
      { name: "Ananya Rao", id: "STU002", course: "CS 301 - Data Structures", year: "Section A", status: "Present" },
      { name: "Rohan Kumar", id: "STU003", course: "CS 301 - Data Structures", year: "Section A", status: "Absent" },
      { name: "Ishaan Patel", id: "STU005", course: "CS 301 - Data Structures", year: "Section A", status: "Present" }
    ],
    exams: [
      { name: "Mid-Term Assessment", id: "EXM001", course: "Data Structures & Algorithms", year: "18 Nov 2026", status: "Completed", studentScore: "94 / 100 (Grade A+)" },
      { name: "Theory Examination", id: "EXM002", course: "Database Management Systems", year: "25 Nov 2026", status: "Scheduled", studentScore: "Pending Evaluation" },
      { name: "Practical Lab Viva", id: "EXM003", course: "Web Architecture & APIs", year: "02 Dec 2026", status: "Scheduled", studentScore: "Upcoming" }
    ],
    marksRecords: [
      { studentId: "STU001", studentName: "Aarav Sharma", subject: "Data Structures", score: 94, grade: "A+" },
      { studentId: "STU002", studentName: "Ananya Rao", subject: "Data Structures", score: 88, grade: "A" },
      { studentId: "STU003", studentName: "Rohan Kumar", subject: "Data Structures", score: 76, grade: "B+" },
      { studentId: "STU005", studentName: "Ishaan Patel", subject: "Data Structures", score: 92, grade: "A+" }
    ]
  };

  // Hydrate from localStorage
  let appData = { ...defaultData };
  try {
    const savedAdmissions = localStorage.getItem("eschulu_admissions");
    if (savedAdmissions) appData.admissions = JSON.parse(savedAdmissions);
    const savedAttendance = localStorage.getItem("eschulu_attendance");
    if (savedAttendance) appData.attendance = JSON.parse(savedAttendance);
    const savedMarks = localStorage.getItem("eschulu_marks");
    if (savedMarks) appData.marksRecords = JSON.parse(savedMarks);
  } catch (e) {
    console.warn("Storage restricted", e);
  }

  function persistAdmissions() {
    try { localStorage.setItem("eschulu_admissions", JSON.stringify(appData.admissions)); } catch (e) {}
  }
  function persistAttendance() {
    try { localStorage.setItem("eschulu_attendance", JSON.stringify(appData.attendance)); } catch (e) {}
  }
  function persistMarks() {
    try { localStorage.setItem("eschulu_marks", JSON.stringify(appData.marksRecords)); } catch (e) {}
  }

  // Toast feedback
  function showToast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  // Overlay management
  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    const anyOpen = Array.from(document.querySelectorAll(".overlay")).some((o) => !o.hidden);
    if (!anyOpen) document.body.style.overflow = "";
  }

  // Role Definitions & Navigation Map
  const ROLE_NAV = {
    Admin: [
      { id: "overview", label: "Overview", icon: "▦" },
      { id: "students", label: "Students", icon: "♙" },
      { id: "faculty", label: "Faculty Directory", icon: "♧" },
      { id: "admissions", label: "Admissions & Approvals", icon: "✚" },
      { id: "attendance", label: "Campus Attendance", icon: "◷" },
      { id: "fees", label: "Fees & Finance", icon: "₹" },
      { id: "timetable", label: "Master Timetable", icon: "▦" },
      { id: "lms", label: "Learning / LMS Hub", icon: "▤" },
      { id: "exams", label: "Examinations", icon: "✎" }
    ],
    Teacher: [
      { id: "overview", label: "Faculty Hub", icon: "▦" },
      { id: "attendance", label: "Class Roll-Call", icon: "◷" },
      { id: "marks", label: "Enter Marks & Grades", icon: "✎" },
      { id: "students", label: "My Students", icon: "♙" },
      { id: "timetable", label: "Teaching Schedule", icon: "▦" },
      { id: "lms", label: "Courseware & LMS", icon: "▤" },
      { id: "exams", label: "Proctoring Duties", icon: "✎" }
    ],
    Student: [
      { id: "overview", label: "Student Dashboard", icon: "▦" },
      { id: "timetable", label: "My Timetable", icon: "▦" },
      { id: "exams", label: "Grades & Answer Keys", icon: "✎" },
      { id: "lms", label: "My Enrolled Courses", icon: "▤" },
      { id: "attendance", label: "My Attendance Log", icon: "◷" },
      { id: "fees", label: "My Fee Receipts", icon: "₹" }
    ]
  };

  // Update Sidebar Navigation based on Role
  function renderSidebarNav() {
    const navContainer = $("#sideNavItems");
    if (!navContainer) return;

    const navItems = ROLE_NAV[currentRole] || ROLE_NAV.Admin;
    navContainer.innerHTML = navItems.map((item) => `
      <button class="side-link ${item.id === currentPage ? 'active' : ''}" data-page="${item.id}">
        <span>${item.icon}</span> ${item.label}
      </button>
    `).join("");

    // Wire clicks
    navContainer.querySelectorAll(".side-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = btn.getAttribute("data-page");
        renderPage(page);
        const sidebar = $("#sidebar");
        if (sidebar) sidebar.classList.remove("open");
      });
    });

    // Update user identity in sidebar & header
    const roleBadges = {
      Admin: { name: "Dr. K. Srinivas", title: "Dean / Campus Admin", avatar: "AD" },
      Teacher: { name: "Prof. Rahul Verma", title: "Faculty of Mathematics & CS", avatar: "RV" },
      Student: { name: "Aarav Sharma", title: "B.Tech Computer Science (3rd Sem)", avatar: "AS" }
    };

    const info = roleBadges[currentRole] || roleBadges.Admin;
    const sideUserName = $("#sideUserName");
    const sideUserRole = $("#sideUserRole");
    const sideUserAvatar = $("#sideUserAvatar");
    const headerAvatar = $("#headerAvatar");
    const workspaceRoleBadge = $("#workspaceRoleBadge");

    if (sideUserName) sideUserName.textContent = info.name;
    if (sideUserRole) sideUserRole.textContent = info.title;
    if (sideUserAvatar) sideUserAvatar.textContent = info.avatar;
    if (headerAvatar) headerAvatar.textContent = info.avatar;
    if (workspaceRoleBadge) workspaceRoleBadge.textContent = `${currentRole} Console`;
  }

  // Page Switcher
  function renderPage(page) {
    currentPage = page;

    // Breadcrumb and Titles
    const bcrumb = $("#breadcrumb");
    const pageTitle = $("#pageTitle");
    const pageSubtitle = $("#pageSubtitle");
    const addRecordBtn = $("#addRecord");
    const pageContainer = $("#dashboardPage");

    const titles = {
      overview: {
        Admin: ["Campus Operational Overview", "Here's what's happening across your institution today."],
        Teacher: ["Faculty Classroom Portal", "Review your assigned lectures, attendance roll-calls, and pending grade evaluations."],
        Student: ["Welcome back, Aarav! 🎓", "Track your semester GPA, weekly timetable, attendance, and exam scores."]
      },
      students: ["Student Directory & Records", "Manage profiles, departmental enrollments, and academic standings."],
      faculty: ["Faculty & Departmental Directory", "View teaching responsibilities, research guides, and faculty allocations."],
      admissions: ["Admissions Pipeline & Authorized Approvals", "Review incoming student applications and grant authorized admissions."],
      attendance: ["Attendance Roll-Call & Tracking", "Record daily class attendance and monitor student presence trends."],
      fees: ["Fees, Invoicing & Institutional Finance", "Review tuition schedules, collected funds, and verified fee receipts."],
      timetable: ["Academic Timetable & Classroom Allocations", "Organized schedules ensuring clash-free student and faculty hours."],
      lms: ["Learning Management System (LMS)", "Access courseware, lecture repositories, and syllabus modules."],
      exams: ["Examinations, Marks & Performance", "Review assessment schedules, question papers, and answer keys."],
      marks: ["Faculty Marks & Gradebook Entry", "Submit internal assessment scores with automated grade calculation."],
      settings: ["Campus Governance & System Roles", "Manage demo user permissions, institutional settings, and academic years."]
    };

    const activeMeta = titles[page];
    if (activeMeta) {
      if (typeof activeMeta === "object" && !Array.isArray(activeMeta)) {
        const roleMeta = activeMeta[currentRole] || activeMeta.Admin;
        if (pageTitle) pageTitle.textContent = roleMeta[0];
        if (pageSubtitle) pageSubtitle.textContent = roleMeta[1];
      } else {
        if (pageTitle) pageTitle.textContent = activeMeta[0];
        if (pageSubtitle) pageSubtitle.textContent = activeMeta[1];
      }
    }

    if (bcrumb) bcrumb.textContent = page.charAt(0).toUpperCase() + page.slice(1);

    // Add Record button visibility
    if (addRecordBtn) {
      const allowedAdd = currentRole === "Admin" && ["students", "faculty", "admissions", "exams"].includes(page);
      addRecordBtn.hidden = !allowedAdd;
    }

    // Active class in sidebar
    document.querySelectorAll(".side-link").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-page") === page);
    });

    if (!pageContainer) return;

    // Render Role-Appropriate Content
    if (page === "overview") {
      pageContainer.innerHTML = renderOverviewContent();
    } else if (page === "admissions") {
      pageContainer.innerHTML = renderAdmissionsContent();
    } else if (page === "attendance") {
      pageContainer.innerHTML = renderAttendanceContent();
    } else if (page === "marks") {
      pageContainer.innerHTML = renderMarksEntryContent();
    } else if (page === "exams") {
      pageContainer.innerHTML = renderExamsContent();
    } else if (page === "fees") {
      pageContainer.innerHTML = renderFeesContent();
    } else if (page === "timetable") {
      pageContainer.innerHTML = renderTimetableContent();
    } else if (page === "lms") {
      pageContainer.innerHTML = renderLMSContent();
    } else if (page === "students" || page === "faculty") {
      pageContainer.innerHTML = renderGenericDirectoryContent(page);
    } else {
      pageContainer.innerHTML = renderSettingsContent();
    }

    wireDynamicPageEvents();
  }

  // 1. OVERVIEW PAGE (GENUINE ROLE SPECIFIC)
  function renderOverviewContent() {
    if (currentRole === "Admin") {
      return `
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-top"><span>Total Enrolled</span><span class="stat-icon">♙</span></div>
            <strong>2,480</strong><small>↑ 12.5% this semester</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Active Faculty</span><span class="stat-icon">♧</span></div>
            <strong>148</strong><small>Across 6 departments</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Today's Attendance</span><span class="stat-icon">◷</span></div>
            <strong>94.8%</strong><small>Campus verified</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Tuition Realized</span><span class="stat-icon">₹</span></div>
            <strong>₹18.4 Lakhs</strong><small>74% collection goal</small>
          </div>
        </div>

        <div class="dashboard-grid">
          <section class="panel">
            <div class="panel-heading"><h3>Campus Attendance Matrix</h3><span>PAST 7 DAYS</span></div>
            <div class="attendance-chart">
              ${[74, 88, 92, 95, 91, 96, 94].map((h, i) => `
                <div class="chart-day"><i style="height:${h}%"></i><small>${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</small></div>
              `).join("")}
            </div>
            <div class="chart-legend">● Daily aggregate student and faculty physical presence</div>
          </section>

          <section class="panel">
            <div class="panel-heading"><h3>Department Enrollment</h3><span>ALL DISCIPLINES</span></div>
            <div class="progress-row">
              <div class="progress-label"><span>Computer Science & Engineering</span><span>880 Students</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:85%"></div></div>
            </div>
            <div class="progress-row">
              <div class="progress-label"><span>Commerce & Management</span><span>640 Students</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:72%"></div></div>
            </div>
            <div class="progress-row">
              <div class="progress-label"><span>Sciences & Electronics</span><span>520 Students</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:64%"></div></div>
            </div>
            <div class="progress-row">
              <div class="progress-label"><span>Humanities & Languages</span><span>440 Students</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:55%"></div></div>
            </div>
          </section>
        </div>

        <section class="panel">
          <div class="panel-heading"><h3>Pending Admissions Waiting Authorization</h3><span class="eyebrow">ACTION REQUIRED</span></div>
          <p style="font-size:11px;color:var(--muted);margin-bottom:12px;">The following applicants have passed departmental entrance criteria and await authorized administrative sign-off.</p>
          ${renderAdmissionsTable(true)}
        </section>
      `;
    }

    if (currentRole === "Teacher") {
      return `
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-top"><span>My Students</span><span class="stat-icon">♙</span></div>
            <strong>148</strong><small>Assigned in 3 sections</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Lectures Today</span><span class="stat-icon">▦</span></div>
            <strong>4</strong><small>2 Morning, 2 Afternoon</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Today's Roll-Call</span><span class="stat-icon">◷</span></div>
            <strong>92.5%</strong><small>CS Section A marked</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Pending Evaluation</span><span class="stat-icon">✎</span></div>
            <strong>1 Class</strong><small>Data Structures Mid-term</small>
          </div>
        </div>

        <div class="dashboard-grid">
          <section class="panel">
            <div class="panel-heading"><h3>Today's Teaching Schedule</h3><span>SEMESTER 1 · 2026</span></div>
            <div class="activity-list">
              <div class="activity">
                <span class="activity-icon">09</span>
                <div><strong>CS 301: Data Structures Lecture</strong><small>09:00 AM – 10:30 AM · Lecture Hall 204</small></div>
              </div>
              <div class="activity">
                <span class="activity-icon">11</span>
                <div><strong>CS 302: Algorithms Tutorial & Doubt Session</strong><small>11:00 AM – 12:30 PM · Seminar Room 108</small></div>
              </div>
              <div class="activity">
                <span class="activity-icon">02</span>
                <div><strong>Data Structures Programming Lab (Section B)</strong><small>02:00 PM – 04:00 PM · Computing Lab 4</small></div>
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-heading"><h3>Quick Actions</h3><span>FACULTY SHORTCUTS</span></div>
            <p style="font-size:11px;color:var(--muted);margin-bottom:14px;">Instant faculty administrative actions for your active sections.</p>
            <button class="primary-btn full" data-nav="attendance" style="margin-bottom:10px;">Take Attendance Roll-Call ↗</button>
            <button class="outline-btn full" data-open-modal="marksModal">Enter Student Assessment Marks ↗</button>
          </section>
        </div>
      `;
    }

    // Student Role
    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-top"><span>My Attendance</span><span class="stat-icon">◷</span></div>
          <strong>96.4%</strong><small>Exceeds 75% minimum criterion</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Current GPA</span><span class="stat-icon">★</span></div>
          <strong>3.92 / 4.0</strong><small>Top 5% of class</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Enrolled Courses</span><span class="stat-icon">▤</span></div>
          <strong>6</strong><small>18 Credit Hours</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Tuition Status</span><span class="stat-icon">₹</span></div>
          <strong>Verified Paid</strong><small>Receipt available</small>
        </div>
      </div>

      <div class="dashboard-grid">
        <section class="panel">
          <div class="panel-heading"><h3>My Weekly Lecture Timetable</h3><span>TODAY'S CLASSES</span></div>
          <div class="activity-list">
            <div class="activity">
              <span class="activity-icon">09</span>
              <div><strong>Data Structures & Algorithms</strong><small>Prof. Rahul Verma · Hall 204 · 09:00 AM</small></div>
            </div>
            <div class="activity">
              <span class="activity-icon">11</span>
              <div><strong>Database Systems & Query Optimization</strong><small>Dr. Priya Menon · Hall 108 · 11:00 AM</small></div>
            </div>
            <div class="activity">
              <span class="activity-icon">02</span>
              <div><strong>Computer Architecture Lab</strong><small>Dr. Arjun Das · Lab 2 · 02:00 PM</small></div>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-heading"><h3>Recent Examination Grade</h3><span>RELEASED SCORE</span></div>
          <div style="background:#f4f6ff;border:1px solid #dce4ff;border-radius:10px;padding:16px;margin-bottom:14px;">
            <span class="eyebrow">MID-TERM ASSESSMENT</span>
            <h4 style="font-size:16px;margin:4px 0 8px;">Data Structures & Algorithms</h4>
            <div style="font-size:24px;font-weight:800;color:var(--blue);">94 / 100 <small style="font-size:14px;color:var(--green);">(Grade A+)</small></div>
            <p style="font-size:10px;color:var(--muted);margin-top:6px;">Exam Date: 18 Nov 2026 · Class Rank: 2nd</p>
          </div>
          <button class="primary-btn full" data-open-modal="answerKeyModal">Inspect Verified Question Paper & Answer Key ↗</button>
        </section>
      </div>
    `;
  }

  // 2. ADMISSIONS PAGE WITH AUTHORIZED APPROVAL WORKFLOWS
  function renderAdmissionsContent() {
    return `
      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h3>Admissions Applications & Approval Roster</h3>
            <span style="font-size:10px;color:var(--muted);">${appData.admissions.length} active applicant portfolios</span>
          </div>
          <div class="table-tools">
            <input type="text" id="admSearch" placeholder="Filter applicant by name/course...">
            <select id="admFilter">
              <option value="all">All Applications</option>
              <option value="Pending">Pending Decision</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div id="admTableWrap">
          ${renderAdmissionsTable(false)}
        </div>
      </section>
    `;
  }

  function renderAdmissionsTable(compact = false) {
    const list = compact ? appData.admissions.filter((a) => a.status === "Pending") : appData.admissions;
    if (!list.length) return `<div class="empty-table">No matching applicant records discovered.</div>`;

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>APPLICANT NAME & ID</th>
            <th>PROGRAM APPLIED</th>
            <th>INTAKE SESSION</th>
            <th>ENTRANCE GPA</th>
            <th>STATUS</th>
            ${currentRole === "Admin" ? `<th>AUTHORIZED APPROVAL ACTION</th>` : ""}
          </tr>
        </thead>
        <tbody>
          ${list.map((adm) => `
            <tr>
              <td>
                <div class="person-cell">
                  <span class="person-initial">${adm.name.slice(0, 2).toUpperCase()}</span>
                  <div><strong>${adm.name}</strong><small>${adm.id}</small></div>
                </div>
              </td>
              <td>${adm.course}</td>
              <td>${adm.year}</td>
              <td><strong>${adm.gpa || "3.80"}</strong> / 4.0</td>
              <td>
                <span class="status-pill ${adm.status.toLowerCase()}">${adm.status}</span>
              </td>
              ${currentRole === "Admin" ? `
                <td>
                  ${adm.status === "Pending" ? `
                    <button class="btn-approve" data-adm-action="approve" data-id="${adm.id}">Approve Admission ✓</button>
                    <button class="btn-reject" data-adm-action="reject" data-id="${adm.id}">Reject ✕</button>
                  ` : `
                    <span style="font-size:10px;color:var(--muted);">Decision Finalized</span>
                  `}
                </td>
              ` : ""}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // 3. ATTENDANCE PAGE WITH INTERACTIVE ROLL-CALL
  function renderAttendanceContent() {
    const isTeacher = currentRole === "Teacher";
    return `
      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h3>Daily Classroom Attendance Roll-Call</h3>
            <span style="font-size:10px;color:var(--muted);">Class CS 301 — Lecture Room 204</span>
          </div>
          ${isTeacher ? `
            <div style="font-size:11px;color:var(--green);font-weight:700;">● Active Roll-Call Mode (Click to mark)</div>
          ` : `
            <div style="font-size:11px;color:var(--muted);">Read-Only Verified Records</div>
          `}
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>STUDENT NAME & ROLL NO</th>
              <th>SUBJECT & SESSION</th>
              <th>SECTION</th>
              <th>RECORDED STATUS</th>
              ${isTeacher ? `<th>TEACHER 1-CLICK ROLL-CALL</th>` : ""}
            </tr>
          </thead>
          <tbody>
            ${appData.attendance.map((att, idx) => `
              <tr>
                <td>
                  <div class="person-cell">
                    <span class="person-initial">${att.name.slice(0, 2).toUpperCase()}</span>
                    <div><strong>${att.name}</strong><small>${att.id}</small></div>
                  </div>
                </td>
                <td>${att.course}</td>
                <td>${att.year}</td>
                <td>
                  <span class="status-pill ${att.status.toLowerCase()}" id="attStatusBadge-${idx}">${att.status}</span>
                </td>
                ${isTeacher ? `
                  <td>
                    <button class="roll-btn present ${att.status === 'Present' ? 'active' : ''}" data-roll-action="present" data-idx="${idx}">Present ✓</button>
                    <button class="roll-btn absent ${att.status === 'Absent' ? 'active' : ''}" data-roll-action="absent" data-idx="${idx}">Absent ✕</button>
                  </td>
                ` : ""}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 4. TEACHER MARKS ENTRY PAGE
  function renderMarksEntryContent() {
    return `
      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h3>Internal Assessment Gradebook</h3>
            <span style="font-size:10px;color:var(--muted);">Course: CS 301 Data Structures · Max Marks: 100</span>
          </div>
          <button class="primary-btn" data-open-modal="marksModal">Launch Quick Marks Input ↗</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>ROLL ID</th>
              <th>COURSE</th>
              <th>INTERNAL SCORE (100)</th>
              <th>CALCULATED GRADE</th>
              <th>EVALUATION STATUS</th>
            </tr>
          </thead>
          <tbody>
            ${appData.marksRecords.map((m) => `
              <tr>
                <td><strong>${m.studentName}</strong></td>
                <td><small>${m.studentId}</small></td>
                <td>${m.subject}</td>
                <td><strong>${m.score}</strong> / 100</td>
                <td><span class="status-pill">${m.grade}</span></td>
                <td><span style="color:var(--green);font-weight:600;font-size:10px;">✓ Recorded in SIS</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 5. EXAMINATIONS PAGE (WITH STUDENT QUESTION PAPER & ANSWER KEY INSPECTION)
  function renderExamsContent() {
    return `
      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h3>Academic Examination Schedule & Performance</h3>
            <span style="font-size:10px;color:var(--muted);">Semester 1 · Official University Cycle</span>
          </div>
          ${currentRole === "Student" ? `
            <button class="primary-btn" data-open-modal="answerKeyModal">Inspect Mid-Term Answer Key ↗</button>
          ` : ""}
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>EXAMINATION TITLE</th>
              <th>SUBJECT / DEPARTMENT</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>RESULT / SCORE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${appData.exams.map((ex) => `
              <tr>
                <td><strong>${ex.name}</strong></td>
                <td>${ex.course}</td>
                <td>${ex.year}</td>
                <td><span class="status-pill ${ex.status === 'Completed' ? '' : 'pending'}">${ex.status}</span></td>
                <td><strong>${ex.studentScore}</strong></td>
                <td>
                  ${ex.status === 'Completed' ? `
                    <button class="row-action" data-open-modal="answerKeyModal" style="color:var(--blue);font-weight:700;">View Answer Key ↗</button>
                  ` : `
                    <span style="font-size:10px;color:var(--muted);">Awaiting Exam</span>
                  `}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 6. FEES & FINANCE PAGE (WITH OFFICIAL RECEIPT DOWNLOAD)
  function renderFeesContent() {
    if (currentRole === "Student") {
      return `
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-top"><span>Tuition Demand</span><span class="stat-icon">₹</span></div>
            <strong>₹85,000</strong><small>Semester 1 Tuition Fee</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Amount Paid</span><span class="stat-icon">✓</span></div>
            <strong>₹85,000</strong><small>Paid on 15 Oct 2026</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Outstanding Due</span><span class="stat-icon">◷</span></div>
            <strong>₹0.00</strong><small>Cleared with no fine</small>
          </div>
          <div class="stat-card">
            <div class="stat-top"><span>Receipt Status</span><span class="stat-icon">▤</span></div>
            <strong>Verified</strong><small>Ref: REC-2026-9481</small>
          </div>
        </div>

        <section class="panel">
          <div class="panel-heading"><h3>Institutional Tuition Fee Receipt</h3><span>OFFICIAL COPY</span></div>
          <p style="font-size:11px;color:var(--muted);margin-bottom:14px;">Your semester tuition has been verified by the campus finance bursar. You may inspect or print your receipt for education tax records.</p>
          <button class="primary-btn" data-open-modal="receiptModal">View & Download Official Fee Receipt (PDF) ↗</button>
        </section>
      `;
    }

    // Admin Fees View
    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-top"><span>Total Fee Demand</span><span class="stat-icon">₹</span></div>
          <strong>₹24.8 Lakhs</strong><small>Current Academic Cycle</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Collected Revenue</span><span class="stat-icon">✓</span></div>
          <strong>₹18.4 Lakhs</strong><small>74% Realization</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Outstanding Dues</span><span class="stat-icon">◷</span></div>
          <strong>₹6.4 Lakhs</strong><small>Due by 30 Nov 2026</small>
        </div>
        <div class="stat-card">
          <div class="stat-top"><span>Verified Receipts</span><span class="stat-icon">▤</span></div>
          <strong>842</strong><small>Bank reconciliations</small>
        </div>
      </div>

      <div class="dashboard-grid">
        <section class="panel">
          <div class="panel-heading"><h3>Collection Realization</h3><span>BUDGET 2026-27</span></div>
          <div class="progress-row">
            <div class="progress-label"><span>Tuition Fees Collected</span><span>78%</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:78%"></div></div>
          </div>
          <div class="progress-row">
            <div class="progress-label"><span>Laboratory & Computer Center Dues</span><span>68%</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:68%"></div></div>
          </div>
          <div class="progress-row">
            <div class="progress-label"><span>Campus Hostel & Transport Subscriptions</span><span>62%</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:62%;background:var(--orange)"></div></div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-heading"><h3>Recent Financial Receipts</h3><span>CAMPUS BURSAR</span></div>
          <div class="activity-list">
            <div class="activity">
              <span class="activity-icon">₹</span>
              <div><strong>Aarav Sharma (STU001)</strong><small>₹85,000 Tuition Settled · Online NetBanking</small></div>
            </div>
            <div class="activity">
              <span class="activity-icon">₹</span>
              <div><strong>Ananya Rao (STU002)</strong><small>₹85,000 Tuition Settled · UPI Transaction</small></div>
            </div>
            <div class="activity">
              <span class="activity-icon">₹</span>
              <div><strong>Ishaan Patel (STU005)</strong><small>₹85,000 Tuition Settled · NEFT Clearing</small></div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // 7. TIMETABLE PAGE
  function renderTimetableContent() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const classes = [
      ["CS 301: Data Structures", "09:00 AM – 10:30 AM", "Lecture Hall 204"],
      ["MA 202: Discrete Mathematics", "11:00 AM – 12:30 PM", "Hall 108"],
      ["CS 303: Database Management Lab", "02:00 PM – 04:00 PM", "Computing Lab 2"]
    ];

    return `
      <section class="page-panel">
        <div class="panel-heading">
          <h3>Weekly Academic Timetable</h3>
          <span>SEMESTER 1 · ACTIVE SESSION</span>
        </div>
        <div class="schedule-grid">
          ${days.map((day, dIdx) => `
            <div class="schedule-day">
              <strong>${day}</strong>
              ${classes.slice(0, dIdx === 4 ? 2 : 3).map((c) => `
                <div class="schedule-event">
                  <b>${c[0]}</b>
                  <small>${c[1]}<br>${c[2]}</small>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  // 8. LMS LEARNING HUB
  function renderLMSContent() {
    const courses = [
      ["Data Structures & Algorithms", "Computer Science", "14 Lectures · 4 Assignments", "Prof. Rahul Verma"],
      ["Relational Database Systems", "Computer Science", "12 Lectures · 3 Lab Sheets", "Dr. Priya Menon"],
      ["Discrete Mathematics & Logic", "Mathematics", "16 Lectures · 5 Problem Sets", "Prof. Rahul Verma"],
      ["Web Architecture & Modern APIs", "Computer Science", "10 Lectures · 2 Projects", "Dr. Arjun Das"],
      ["Business Finance Fundamentals", "Commerce", "8 Lectures · 2 Case Studies", "Ms. Kavya Rao"],
      ["Professional Communication", "Humanities", "6 Lectures · 1 Presentation", "Dr. Ananya Sen"]
    ];

    return `
      <section class="page-panel">
        <div class="panel-heading">
          <h3>Digital Courseware & Syllabus Modules</h3>
          <span>SEMESTER 1 SYLLABI</span>
        </div>
        <div class="simple-grid">
          ${courses.map((c, i) => `
            <article class="info-tile">
              <span>COURSE CS-0${i + 1}</span>
              <strong style="font-size:14px;margin:6px 0 3px;">${c[0]}</strong>
              <small style="color:var(--muted);">${c[1]} · ${c[3]}</small>
              <div style="font-size:10px;margin:8px 0;color:var(--blue);font-weight:600;">${c[2]}</div>
              <button class="primary-btn" style="padding:6px 12px;font-size:9px;" data-action="download-syllabus" data-course="${c[0]}">Download Syllabus (PDF) ↗</button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  // 9. GENERIC DIRECTORY (STUDENTS / FACULTY)
  function renderGenericDirectoryContent(key) {
    const isStudents = key === "students";
    const list = isStudents ? appData.students : appData.faculty;

    return `
      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h3>${isStudents ? "Enrolled Student Directory" : "Faculty Staff Directory"}</h3>
            <span style="font-size:10px;color:var(--muted);">${list.length} verified institution records</span>
          </div>
          <div class="table-tools">
            <input type="text" id="dirSearch" placeholder="Search directory...">
            <select id="dirFilter">
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>NAME & ID</th>
              <th>DEPARTMENT / COURSE</th>
              <th>YEAR / DESIGNATION</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody id="dirTableBody">
            ${list.map((item) => `
              <tr>
                <td>
                  <div class="person-cell">
                    <span class="person-initial">${item.name.slice(0, 2).toUpperCase()}</span>
                    <div><strong>${item.name}</strong><small>${item.id}</small></div>
                  </div>
                </td>
                <td>${item.course}</td>
                <td>${item.year}</td>
                <td><span class="status-pill">${item.status}</span></td>
                <td><button class="row-action" data-view-item="${item.id}" style="color:var(--blue);">Inspect Profile</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 10. SETTINGS & ROLES PAGE
  function renderSettingsContent() {
    return `
      <section class="page-panel">
        <div class="panel-heading"><h3>Campus Governance & Role Simulator</h3><span>ENTERPRISE CONFIGURATION</span></div>
        <p style="font-size:11px;color:var(--muted);margin-bottom:14px;">Switch between simulated roles to inspect genuine permissions, approval authorization, and examination results.</p>
        <div class="simple-grid">
          <div class="info-tile">
            <span>ACTIVE ROLE</span>
            <strong>${currentRole}</strong>
            <small>Permissions active</small>
          </div>
          <div class="info-tile">
            <span>ACADEMIC YEAR</span>
            <strong>2026–2027</strong>
            <small>Fall Cycle</small>
          </div>
          <div class="info-tile">
            <span>INSTITUTION</span>
            <strong>Campus One</strong>
            <small>Bangalore, Karnataka</small>
          </div>
        </div>
      </section>
    `;
  }

  // Event Listeners on Dynamically Rendered Dashboard Elements
  function wireDynamicPageEvents() {
    // 1. Admissions Approval / Rejection
    document.querySelectorAll("[data-adm-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-adm-action");
        const id = btn.getAttribute("data-id");
        const applicant = appData.admissions.find((a) => a.id === id);
        if (!applicant) return;

        if (action === "approve") {
          applicant.status = "Approved";
          showToast(`Authorized Admission Approved for ${applicant.name} (${applicant.id})!`);
        } else if (action === "reject") {
          applicant.status = "Rejected";
          showToast(`Application Rejected for ${applicant.name}.`);
        }
        persistAdmissions();
        renderPage(currentPage);
      });
    });

    // 2. Teacher Roll-Call Clicks
    document.querySelectorAll("[data-roll-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-roll-action");
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (isNaN(idx) || !appData.attendance[idx]) return;

        appData.attendance[idx].status = action === "present" ? "Present" : "Absent";
        persistAttendance();
        showToast(`Attendance updated: ${appData.attendance[idx].name} marked ${appData.attendance[idx].status}.`);
        renderPage(currentPage);
      });
    });

    // 3. Modals Opening from Buttons
    document.querySelectorAll("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-open-modal");
        if (modalId === "marksModal") openMarksModal();
        else if (modalId === "answerKeyModal") openAnswerKeyModal();
        else if (modalId === "receiptModal") openReceiptModal();
      });
    });

    // 4. Quick Nav Links
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderPage(btn.getAttribute("data-nav"));
      });
    });

    // 5. Syllabus Download Simulation
    document.querySelectorAll("[data-action='download-syllabus']").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast(`Generating course syllabus package for ${btn.getAttribute("data-course")}...`);
      });
    });
  }

  // Teacher Marks Modal Handlers
  function openMarksModal() {
    const container = $("#marksTableContainer");
    if (!container) return;

    container.innerHTML = `
      <table class="marks-table">
        <thead>
          <tr>
            <th>STUDENT NAME</th>
            <th>ID</th>
            <th>SCORE (OUT OF 100)</th>
            <th>GRADE PREVIEW</th>
          </tr>
        </thead>
        <tbody>
          ${appData.marksRecords.map((m, idx) => `
            <tr>
              <td><strong>${m.studentName}</strong></td>
              <td>${m.studentId}</td>
              <td>
                <input class="marks-input" type="number" min="0" max="100" value="${m.score}" data-marks-idx="${idx}">
              </td>
              <td><strong id="gradePreview-${idx}">${m.grade}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    // Dynamic grade recalculation on change
    container.querySelectorAll(".marks-input").forEach((inp) => {
      inp.addEventListener("input", () => {
        const idx = parseInt(inp.getAttribute("data-marks-idx"), 10);
        const val = parseInt(inp.value, 10) || 0;
        let grade = "F";
        if (val >= 90) grade = "A+";
        else if (val >= 80) grade = "A";
        else if (val >= 70) grade = "B+";
        else if (val >= 60) grade = "B";
        else if (val >= 50) grade = "C";

        const previewEl = document.getElementById(`gradePreview-${idx}`);
        if (previewEl) previewEl.textContent = grade;
      });
    });

    openOverlay("marksModal");
  }

  const saveMarksBtn = $("#saveMarksBtn");
  if (saveMarksBtn) {
    saveMarksBtn.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".marks-input");
      inputs.forEach((inp) => {
        const idx = parseInt(inp.getAttribute("data-marks-idx"), 10);
        const val = Math.min(100, Math.max(0, parseInt(inp.value, 10) || 0));
        if (appData.marksRecords[idx]) {
          appData.marksRecords[idx].score = val;
          let grade = "F";
          if (val >= 90) grade = "A+";
          else if (val >= 80) grade = "A";
          else if (val >= 70) grade = "B+";
          else if (val >= 60) grade = "B";
          else if (val >= 50) grade = "C";
          appData.marksRecords[idx].grade = grade;
        }
      });
      persistMarks();
      closeOverlay("marksModal");
      showToast("Internal assessment grades saved and published to Student SIS!");
      if (currentPage === "marks" || currentPage === "overview") renderPage(currentPage);
    });
  }

  // Student Examination Answer Key Modal
  function openAnswerKeyModal() {
    const container = $("#answerKeyContent");
    if (!container) return;

    const questions = [
      {
        qNum: "Q1",
        question: "What is the worst-case time complexity of searching an element in a balanced Red-Black Tree or AVL Tree?",
        studentAns: "O(log n)",
        correctAns: "O(log n)",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "In balanced binary search trees, the height is mathematically guaranteed to be O(log n), making both lookup, insertion, and deletion strictly logarithmic."
      },
      {
        qNum: "Q2",
        question: "Which abstract data structure operates strictly on the Last-In, First-Out (LIFO) sequencing discipline?",
        studentAns: "Stack",
        correctAns: "Stack",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Stacks adhere to LIFO ordering, commonly employed in function call call-stacks, depth-first search, and expression parsing."
      },
      {
        qNum: "Q3",
        question: "Which graph algorithm efficiently finds the shortest path between nodes in a weighted graph with non-negative edge weights?",
        studentAns: "Dijkstra's Algorithm",
        correctAns: "Dijkstra's Algorithm",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Dijkstra's algorithm employs a min-priority queue to determine single-source shortest path trees with time complexity O((V + E) log V)."
      },
      {
        qNum: "Q4",
        question: "What is the primary advantage of a Hash Table over an Array for key-based lookups?",
        studentAns: "Average O(1) constant time retrieval",
        correctAns: "Average O(1) constant time retrieval",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Direct hashing maps arbitrary keys to bucket indices directly, providing near-instantaneous O(1) expected time lookup."
      }
    ];

    container.innerHTML = `
      <div style="background:#f4f6ff;padding:14px;border-radius:10px;margin-bottom:16px;border:1px solid #dce4ff;">
        <strong>Subject:</strong> CS 301 Data Structures & Algorithms &nbsp;|&nbsp;
        <strong>Candidate:</strong> Aarav Sharma (STU001) &nbsp;|&nbsp;
        <strong>Verified Score:</strong> <span style="color:var(--green);font-weight:700;">94 / 100</span>
      </div>

      ${questions.map((q) => `
        <div class="qa-card">
          <div class="qa-card-head">
            <strong>${q.qNum}: Conceptual Assessment</strong>
            <span class="status-pill">${q.points}</span>
          </div>
          <p><strong>Question:</strong> ${q.question}</p>
          <div class="qa-row">
            <div><span>Your Answer:</span> <strong class="qa-student">${q.studentAns}</strong> ${q.isCorrect ? '<span style="color:var(--green)">✓ Correct</span>' : '<span style="color:var(--red)">✕ Incorrect</span>'}</div>
            <div><span>Verified Key:</span> <strong class="qa-correct">${q.correctAns}</strong></div>
          </div>
          <p style="font-size:10px;color:var(--muted);margin-top:6px;border-top:1px dashed var(--line);padding-top:6px;">
            <em>Evaluator Note:</em> ${q.explanation}
          </p>
        </div>
      `).join("")}
    `;

    openOverlay("answerKeyModal");
  }

  // Student Fee Receipt Modal
  function openReceiptModal() {
    const container = $("#receiptContent");
    if (!container) return;

    container.innerHTML = `
      <div class="receipt-paper">
        <div class="receipt-header">
          <div>
            <h3 style="font:800 18px var(--head);color:var(--navy);">CAMPUS ONE HIGHER EDUCATION TRUST</h3>
            <p style="font-size:10px;color:var(--muted);">Approved by AICTE & UGC · Affiliated Campus</p>
          </div>
          <div style="text-align:right;">
            <strong style="color:var(--green);font-size:14px;">PAID IN FULL</strong>
            <p style="font-size:9px;color:var(--muted);">RECEIPT NO: REC-2026-9481</p>
          </div>
        </div>

        <div class="receipt-meta">
          <div><strong>Student Name:</strong> Aarav Sharma</div>
          <div><strong>Enrollment ID:</strong> STU001</div>
          <div><strong>Course / Semester:</strong> B.Tech Computer Science (3rd Sem)</div>
          <div><strong>Payment Date:</strong> 15 Oct 2026</div>
        </div>

        <table class="receipt-table">
          <thead>
            <tr>
              <th style="text-align:left;">FEE HEAD DESCRIPTION</th>
              <th style="text-align:right;">AMOUNT (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Semester Academic Tuition Fee</td>
              <td style="text-align:right;">₹65,000</td>
            </tr>
            <tr>
              <td>Advanced Computing Laboratory Fee</td>
              <td style="text-align:right;">₹12,000</td>
            </tr>
            <tr>
              <td>University Examination & Library Fund</td>
              <td style="text-align:right;">₹8,000</td>
            </tr>
            <tr style="font-weight:800;font-size:12px;">
              <td style="padding-top:12px;">TOTAL SETTLED AMOUNT</td>
              <td style="text-align:right;padding-top:12px;color:var(--blue);">₹85,000</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top:20px;font-size:9px;color:var(--muted);text-align:center;">
          Generated electronically by ESCHULU Enterprise Billing Gateway. Verified authentic.
        </div>
      </div>
    `;

    openOverlay("receiptModal");
  }

  const printReceiptBtn = $("#printReceiptBtn");
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", () => {
      showToast("Receipt formatted and dispatched to printer spooler / PDF download.");
      try { window.print(); } catch (e) {}
    });
  }

  // Add Record Modal Flow (Admin)
  const addRecordBtn = $("#addRecord");
  const formOverlay = $("#formOverlay");
  const recordForm = $("#recordForm");
  const formFields = $("#formFields");

  if (addRecordBtn) {
    addRecordBtn.addEventListener("click", () => {
      if (!formFields) return;
      const key = currentPage;
      const titleEl = $("#formTitle");
      if (titleEl) titleEl.textContent = `Add Record to ${key.toUpperCase()}`;

      formFields.innerHTML = `
        <label>Full Legal Name / Title
          <input name="name" required placeholder="Dr. Sarah Connor or Student Name">
        </label>
        <label>Course / Department
          <input name="course" required placeholder="Computer Science or Commerce">
        </label>
        <label>Academic Year / Designation
          <input name="year" required placeholder="1st Year or Associate Professor">
        </label>
        <label>Record Status
          <select name="status">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
      `;
      openOverlay("formOverlay");
    });
  }

  if (recordForm) {
    recordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(recordForm);
      const name = fd.get("name").trim();
      const course = fd.get("course").trim();
      const year = fd.get("year").trim();
      const status = fd.get("status");

      if (!name || !course) return;

      const key = currentPage;
      const prefix = key === "students" ? "STU" : key === "faculty" ? "FAC" : "REC";
      const targetList = key === "students" ? appData.students : appData.faculty;

      if (targetList) {
        targetList.unshift({
          name: name,
          id: prefix + String(targetList.length + 1).padStart(3, "0"),
          course: course,
          year: year || "Current Session",
          status: status
        });
        showToast(`Successfully added ${name} to ${key}!`);
      }

      recordForm.reset();
      closeOverlay("formOverlay");
      renderPage(currentPage);
    });
  }

  // Role Switching Control
  const roleSelect = $("#roleSelect");
  if (roleSelect) {
    roleSelect.addEventListener("change", (e) => {
      currentRole = e.target.value;
      renderSidebarNav();
      renderPage("overview");
      showToast(`Switched active portal view to: ${currentRole}`);
    });
  }

  // Public Nav & Auth Modals
  const showLoginBtn = $("#showLogin");
  const demoButton = $("#demoButton");
  const heroDemo = $("#heroDemo");
  const contactDemo = $("#contactDemo");
  const backPublicBtn = $("#backPublic");
  const loginForm = $("#loginForm");
  const loginRole = $("#loginRole");

  function openDashboard(role = "Admin") {
    currentRole = role;
    if (roleSelect) roleSelect.value = role;
    if (loginRole) loginRole.value = role;

    const marketing = $("#marketingPage");
    const pubHeader = $("#publicHeader");
    const appShell = $("#appShell");

    if (marketing) marketing.hidden = true;
    if (pubHeader) pubHeader.hidden = true;
    if (appShell) appShell.hidden = false;

    renderSidebarNav();
    renderPage("overview");
    window.scrollTo(0, 0);
  }

  function returnToPublic() {
    const marketing = $("#marketingPage");
    const pubHeader = $("#publicHeader");
    const appShell = $("#appShell");

    if (marketing) marketing.hidden = false;
    if (pubHeader) pubHeader.hidden = false;
    if (appShell) appShell.hidden = true;
    window.scrollTo(0, 0);
  }

  [demoButton, heroDemo, contactDemo].forEach((btn) => {
    if (btn) btn.addEventListener("click", () => openDashboard("Admin"));
  });

  if (showLoginBtn) showLoginBtn.addEventListener("click", () => openOverlay("loginOverlay"));

  if (loginForm && loginRole) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const role = loginRole.value;
      closeOverlay("loginOverlay");
      openDashboard(role);
      showToast(`Signed into ESCHULU as ${role}`);
    });
  }

  if (backPublicBtn) backPublicBtn.addEventListener("click", returnToPublic);

  // Mobile Toggles
  const publicMenu = $("#publicMenu");
  const publicNav = $("#publicNav");
  if (publicMenu && publicNav) {
    publicMenu.addEventListener("click", () => publicNav.classList.toggle("active"));
    publicNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => publicNav.classList.remove("active"));
    });
  }

  const dashMenu = $("#dashMenu");
  const sidebar = $("#sidebar");
  if (dashMenu && sidebar) {
    dashMenu.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  // Global Overlay Close Listeners
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeOverlay(btn.getAttribute("data-close")));
  });

  document.querySelectorAll(".overlay").forEach((ov) => {
    ov.addEventListener("click", (e) => {
      if (e.target === ov) closeOverlay(ov.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".overlay").forEach((o) => {
        if (!o.hidden) closeOverlay(o.id);
      });
    }
  });

  const notifBtn = $("#notificationBtn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      showToast("Campus Notifications: 1 new admission awaiting approval, 1 gradebook pending.");
    });
  }

  // Pricing CTA feedback
  document.querySelectorAll("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(`${btn.getAttribute("data-plan")} plan selected. Demo enquiry dispatched.`);
    });
  });

  // Init
  renderSidebarNav();
})();
