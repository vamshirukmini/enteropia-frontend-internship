// EduFlow — Bright Modern Campus Operating Platform Controller
// Multi-Role Architecture for Enteropia LLP Internship Challenge

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  let currentRole = "Admin";
  let currentPage = "overview";
  let toastTimer = null;

  // Mock Data Store
  const defaultData = {
    students: [
      { name: "Aarav Sharma", id: "STU001", course: "Computer Science", detail: "1st Year", status: "Active", attendance: "96.4%" },
      { name: "Ananya Rao", id: "STU002", course: "Commerce & Finance", detail: "2nd Year", status: "Active", attendance: "94.2%" },
      { name: "Rohan Kumar", id: "STU003", course: "Computer Science", detail: "3rd Year", status: "Active", attendance: "89.0%" },
      { name: "Meera Nair", id: "STU004", course: "Business Studies", detail: "1st Year", status: "Pending", attendance: "91.5%" },
      { name: "Ishaan Patel", id: "STU005", course: "Computer Science", detail: "2nd Year", status: "Active", attendance: "97.8%" },
      { name: "Diya Reddy", id: "STU006", course: "Commerce & Finance", detail: "3rd Year", status: "Active", attendance: "93.1%" }
    ],
    faculty: [
      { name: "Dr. Priya Menon", id: "FAC001", course: "Computer Science", detail: "Head of Dept (HOD)", status: "Active" },
      { name: "Prof. Rahul Verma", id: "FAC002", course: "Mathematics", detail: "Senior Faculty", status: "Active" },
      { name: "Dr. Arjun Das", id: "FAC003", course: "Physics & Electronics", detail: "Associate Professor", status: "Active" },
      { name: "Ms. Kavya Rao", id: "FAC004", course: "Commerce & Business", detail: "Faculty", status: "Active" }
    ],
    attendance: [
      { name: "Aarav Sharma", id: "STU001", course: "Data Structures & Algorithms", detail: "Section A", status: "Present" },
      { name: "Ananya Rao", id: "STU002", course: "Data Structures & Algorithms", detail: "Section A", status: "Present" },
      { name: "Rohan Kumar", id: "STU003", course: "Data Structures & Algorithms", detail: "Section A", status: "Absent" },
      { name: "Ishaan Patel", id: "STU005", course: "Data Structures & Algorithms", detail: "Section A", status: "Present" }
    ],
    admissions: [
      { name: "Sana Ahmed", id: "APP001", course: "B.Tech Computer Science", detail: "2026 Intake", status: "Pending", gpa: "3.92" },
      { name: "Kabir Shah", id: "APP002", course: "B.Com Honors", detail: "2026 Intake", status: "Approved", gpa: "3.75" },
      { name: "Tara Joseph", id: "APP003", course: "B.Sc Data Science", detail: "2026 Intake", status: "Pending", gpa: "3.88" },
      { name: "Nikhil Gupta", id: "APP004", course: "B.Tech AI & Robotics", detail: "2026 Intake", status: "Pending", gpa: "3.60" }
    ],
    exams: [
      { name: "Mid-Term Assessment", id: "EXM001", course: "Data Structures & Algorithms", detail: "18 Nov 2026", status: "Completed", studentScore: "94 / 100 (Grade A+)" },
      { name: "Mid-Semester Examination", id: "EXM002", course: "Database Management Systems", detail: "25 Nov 2026", status: "Scheduled", studentScore: "Pending Evaluation" },
      { name: "Practical Assessment", id: "EXM003", course: "Web Architecture & APIs", detail: "02 Dec 2026", status: "Scheduled", studentScore: "Upcoming" }
    ],
    marks: [
      { studentId: "STU001", studentName: "Aarav Sharma", subject: "Data Structures", score: 94, grade: "A+" },
      { studentId: "STU002", studentName: "Ananya Rao", subject: "Data Structures", score: 88, grade: "A" },
      { studentId: "STU003", studentName: "Rohan Kumar", subject: "Data Structures", score: 76, grade: "B+" },
      { studentId: "STU005", studentName: "Ishaan Patel", subject: "Data Structures", score: 92, grade: "A+" }
    ]
  };

  let campusData = { ...defaultData };
  try {
    const a = localStorage.getItem("eduflow_admissions");
    if (a) campusData.admissions = JSON.parse(a);
    const b = localStorage.getItem("eduflow_attendance");
    if (b) campusData.attendance = JSON.parse(b);
    const m = localStorage.getItem("eduflow_marks");
    if (m) campusData.marks = JSON.parse(m);
  } catch (e) {}

  function persistAdmissions() {
    try { localStorage.setItem("eduflow_admissions", JSON.stringify(campusData.admissions)); } catch (e) {}
  }
  function persistAttendance() {
    try { localStorage.setItem("eduflow_attendance", JSON.stringify(campusData.attendance)); } catch (e) {}
  }
  function persistMarks() {
    try { localStorage.setItem("eduflow_marks", JSON.stringify(campusData.marks)); } catch (e) {}
  }

  // Toast feedback
  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  // Overlay management
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    const hasOpen = Array.from(document.querySelectorAll(".modal-backdrop")).some((m) => !m.hidden);
    if (!hasOpen) document.body.style.overflow = "";
  }

  // Role Navigation Map
  const ROLE_NAV = {
    Admin: [
      { id: "overview", label: "Home Overview", icon: "⌂" },
      { id: "students", label: "Students", icon: "♙" },
      { id: "faculty", label: "Faculty Directory", icon: "♧" },
      { id: "admissions", label: "Admissions Hub", icon: "✚" },
      { id: "attendance", label: "Daily Attendance", icon: "◷" },
      { id: "fees", label: "Fees & Finance", icon: "₹" },
      { id: "timetable", label: "Master Timetable", icon: "▦" },
      { id: "lms", label: "Learning Hub", icon: "▤" },
      { id: "exams", label: "Examinations", icon: "✎" }
    ],
    Teacher: [
      { id: "overview", label: "Teacher Desk", icon: "⌂" },
      { id: "attendance", label: "Class Roll-Call", icon: "◷" },
      { id: "marks", label: "Enter Marks & Grades", icon: "✎" },
      { id: "students", label: "My Students", icon: "♙" },
      { id: "timetable", label: "Teaching Hours", icon: "▦" },
      { id: "lms", label: "Courseware & LMS", icon: "▤" },
      { id: "exams", label: "Proctoring Duties", icon: "✎" }
    ],
    Student: [
      { id: "overview", label: "My Dashboard", icon: "⌂" },
      { id: "timetable", label: "My Class Timetable", icon: "▦" },
      { id: "exams", label: "Scores & Answer Keys", icon: "✎" },
      { id: "lms", label: "My Courses & Syllabi", icon: "▤" },
      { id: "attendance", label: "My Attendance Log", icon: "◷" },
      { id: "fees", label: "My Fee Receipts", icon: "₹" }
    ]
  };

  // Render Sidebar Navigation
  function renderSidebarNav() {
    const container = $("#sideNavLinks");
    if (!container) return;

    const list = ROLE_NAV[currentRole] || ROLE_NAV.Admin;
    container.innerHTML = list.map((item) => `
      <button class="app-link ${item.id === currentPage ? 'selected' : ''}" data-page="${item.id}">
        <span>${item.icon}</span> ${item.label}
      </button>
    `).join("");

    container.querySelectorAll(".app-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = btn.getAttribute("data-page");
        renderPage(p);
        const sidebar = $("#appSidebar");
        if (sidebar) sidebar.classList.remove("open");
      });
    });

    // Profile details
    const profiles = {
      Admin: { name: "Jamie Davis", role: "Dean of Campus", avatar: "JD" },
      Teacher: { name: "Prof. Rahul Verma", role: "Faculty of Mathematics", avatar: "RV" },
      Student: { name: "Aarav Sharma", role: "Computer Science (Sem 3)", avatar: "AS" }
    };
    const info = profiles[currentRole] || profiles.Admin;

    const sideName = $("#sideProfileName");
    const sideRoleLabel = $("#sideProfileRoleLabel");
    const sideAvatar = $("#sideProfileAvatar");
    const headerAvatar = $("#headerProfileAvatar");
    const roleBadge = $("#profileRole");

    if (sideName) sideName.textContent = info.name;
    if (sideRoleLabel) sideRoleLabel.textContent = info.role;
    if (sideAvatar) sideAvatar.textContent = info.avatar;
    if (headerAvatar) headerAvatar.textContent = info.avatar;
    if (roleBadge) roleBadge.textContent = `${currentRole} Console`;
  }

  // Render Page Handler
  function renderPage(p) {
    currentPage = p;

    const crumb = $("#crumbPage");
    const title = $("#welcomeTitle");
    const text = $("#welcomeText");
    const newRecordBtn = $("#newRecord");
    const pageContainer = $("#appPage");

    const pageMeta = {
      overview: {
        Admin: [`Hey Jamie, happy Monday! <span>✳</span>`, "Here's a little snapshot of what's happening across Sunrise Campus today."],
        Teacher: [`Welcome to your classroom desk, Prof. Verma! <span>✳</span>`, "You have 2 lectures remaining today and 1 class marks evaluation pending."],
        Student: [`Good day, Aarav! Keep up the momentum <span>✳</span>`, "Your semester attendance is high (96.4%) and GPA stands strong at 3.92 / 4.0."]
      },
      students: [`Student Directory & Profiles <span>✳</span>`, "View learner credentials, courses, and standing."],
      faculty: [`Faculty Directory & Staff <span>✳</span>`, "Staff profiles, departments, and assigned guides."],
      admissions: [`Admissions Pipeline & Approvals <span>✳</span>`, "Review incoming applications and grant authorized approvals."],
      attendance: [`Attendance Tracker & Roll-Call <span>✳</span>`, "Take daily attendance and review verified logs."],
      fees: [`Fees & Financial Hub <span>✳</span>`, "Tuition collection progress and verified student receipts."],
      timetable: [`Weekly Academic Timetable <span>✳</span>`, "Organized lecture times and lab room schedules."],
      lms: [`Learning Hub & Syllabi <span>✳</span>`, "Explore learning modules, lecture notes, and downloadable syllabi."],
      exams: [`Examinations & Answer Key Review <span>✳</span>`, "Review assessment results, points, and verified answer keys."],
      marks: [`Faculty Marks & Gradebook <span>✳</span>`, "Enter assessment scores with automatic letter grade calculation."],
      settings: [`Campus Settings & Demo Roles <span>✳</span>`, "Manage institution preferences and active user views."]
    };

    const activeMeta = pageMeta[p];
    if (activeMeta) {
      if (typeof activeMeta === "object" && !Array.isArray(activeMeta)) {
        const rm = activeMeta[currentRole] || activeMeta.Admin;
        if (title) title.innerHTML = rm[0];
        if (text) text.textContent = rm[1];
      } else {
        if (title) title.innerHTML = activeMeta[0];
        if (text) text.textContent = activeMeta[1];
      }
    }

    if (crumb) crumb.textContent = p.charAt(0).toUpperCase() + p.slice(1);

    if (newRecordBtn) {
      const allowedAdd = currentRole === "Admin" && ["students", "faculty", "admissions", "exams"].includes(p);
      newRecordBtn.hidden = !allowedAdd;
    }

    document.querySelectorAll(".app-link").forEach((btn) => {
      btn.classList.toggle("selected", btn.getAttribute("data-page") === p);
    });

    if (!pageContainer) return;

    if (p === "overview") pageContainer.innerHTML = renderOverview();
    else if (p === "admissions") pageContainer.innerHTML = renderAdmissions();
    else if (p === "attendance") pageContainer.innerHTML = renderAttendance();
    else if (p === "marks") pageContainer.innerHTML = renderMarks();
    else if (p === "exams") pageContainer.innerHTML = renderExams();
    else if (p === "fees") pageContainer.innerHTML = renderFees();
    else if (p === "timetable") pageContainer.innerHTML = renderTimetable();
    else if (p === "lms") pageContainer.innerHTML = renderLMS();
    else if (p === "students" || p === "faculty") pageContainer.innerHTML = renderDirectory(p);
    else pageContainer.innerHTML = renderSettings();

    wireDynamicEvents();
  }

  // 1. OVERVIEW
  function renderOverview() {
    if (currentRole === "Admin") {
      return `
        <div class="stats">
          <article class="stat">
            <div class="stat-head"><span>Total students</span><span class="stat-icon">♙</span></div>
            <strong>2,480</strong><small>12% growth this semester</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Faculty members</span><span class="stat-icon">♧</span></div>
            <strong>148</strong><small>8 new faculty members</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Today's attendance</span><span class="stat-icon">◷</span></div>
            <strong>94.8%</strong><small>3.2% up this week</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Fee collection</span><span class="stat-icon">₹</span></div>
            <strong>₹18.4 Lakhs</strong><small>9.4% up this month</small>
          </article>
        </div>

        <div class="app-grid">
          <section class="widget">
            <div class="widget-head"><h3>A week at a glance</h3><span>THIS WEEK</span></div>
            <div class="bars">
              ${[55, 78, 62, 90, 70, 98, 84].map((v, i) => `
                <div class="bar-day"><i style="height:${v}%"></i><small>${["M","T","W","T","F","S","S"][i]}</small></div>
              `).join("")}
            </div>
            <div class="legend">● Weekly verified campus attendance activity</div>
          </section>

          <section class="widget">
            <div class="widget-head"><h3>Attendance by department</h3><span>OVERVIEW</span></div>
            ${[["Computer Science", 88], ["Commerce & Management", 76], ["Business Studies", 68], ["Sciences & Biotech", 82]].map(([n, v]) => `
              <div class="mini-progress">
                <label><span>${n}</span><span>${v}%</span></label>
                <div class="track"><i style="width:${v}%"></i></div>
              </div>
            `).join("")}
          </section>
        </div>

        <section class="table-widget">
          <div class="widget-head"><h3>Pending Admissions Waiting Approval</h3><span>AUTHORIZE ACTION</span></div>
          <p style="font-size:11px;color:var(--muted);margin-bottom:12px;">Review qualified candidates and authorize immediate admissions enrollment.</p>
          ${renderAdmissionsTable(true)}
        </section>
      `;
    }

    if (currentRole === "Teacher") {
      return `
        <div class="stats">
          <article class="stat">
            <div class="stat-head"><span>My students</span><span class="stat-icon">♙</span></div>
            <strong>148</strong><small>Across assigned classes</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Today's classes</span><span class="stat-icon">▦</span></div>
            <strong>4</strong><small>2 classes remaining</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Attendance marked</span><span class="stat-icon">◷</span></div>
            <strong>92.5%</strong><small>Section A completed</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Evaluation pending</span><span class="stat-icon">✎</span></div>
            <strong>1 Class</strong><small>Data structures marks</small>
          </article>
        </div>

        <div class="app-grid">
          <section class="widget">
            <div class="widget-head"><h3>Today's lecture schedule</h3><span>CLASSROOMS</span></div>
            <div class="feed">
              <div class="feed-item">
                <span class="feed-icon">09</span>
                <div><b>Data Structures Lecture (Section A)</b><small>09:00 AM · Hall 204</small></div>
              </div>
              <div class="feed-item">
                <span class="feed-icon">11</span>
                <div><b>Algorithms Tutorial & Mentorship</b><small>11:00 AM · Seminar Hall 108</small></div>
              </div>
              <div class="feed-item">
                <span class="feed-icon">02</span>
                <div><b>Computing Lab Practical (Section B)</b><small>02:00 PM · Computing Lab 2</small></div>
              </div>
            </div>
          </section>

          <section class="widget">
            <div class="widget-head"><h3>Quick faculty actions</h3><span>WORKFLOWS</span></div>
            <p style="font-size:11px;color:var(--muted);margin-bottom:14px;">Instant classroom management shortcuts.</p>
            <button class="pill-btn full-btn" data-nav="attendance" style="margin-bottom:10px;">Take Attendance Roll-Call ↗</button>
            <button class="outline-btn full-btn" data-open="teacherMarksModal">Enter Student Marks & Grades ↗</button>
          </section>
        </div>
      `;
    }

    // Student Role
    return `
      <div class="stats">
        <article class="stat">
          <div class="stat-head"><span>My attendance</span><span class="stat-icon">◷</span></div>
          <strong>96.4%</strong><small>Exceeds university threshold</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Cumulative GPA</span><span class="stat-icon">★</span></div>
          <strong>3.92 / 4.0</strong><small>Top 5% of class</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Enrolled courses</span><span class="stat-icon">▤</span></div>
          <strong>6</strong><small>18 Credits active</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Fee balance</span><span class="stat-icon">₹</span></div>
          <strong>Paid in Full</strong><small>Receipt ready</small>
        </article>
      </div>

      <div class="app-grid">
        <section class="widget">
          <div class="widget-head"><h3>Today's schedule</h3><span>MY TIMETABLE</span></div>
          <div class="feed">
            <div class="feed-item">
              <span class="feed-icon">09</span>
              <div><b>Data Structures & Algorithms</b><small>Prof. Rahul Verma · Hall 204</small></div>
            </div>
            <div class="feed-item">
              <span class="feed-icon">11</span>
              <div><b>Database Systems & Optimization</b><small>Dr. Priya Menon · Hall 108</small></div>
            </div>
            <div class="feed-item">
              <span class="feed-icon">02</span>
              <div><b>Computer Architecture Lab</b><small>Dr. Arjun Das · Lab 2</small></div>
            </div>
          </div>
        </section>

        <section class="widget">
          <div class="widget-head"><h3>Mid-term exam score</h3><span>LATEST EVALUATION</span></div>
          <div style="background:#f7f5ff;border:1px solid #e5dcff;border-radius:14px;padding:16px;margin-bottom:14px;">
            <span class="eyebrow">ASSESSMENT RESULTS</span>
            <h4 style="font-size:16px;margin:5px 0 8px;">Data Structures & Algorithms</h4>
            <div style="font-size:24px;font-weight:900;color:var(--purple);">94 / 100 <small style="font-size:13px;color:var(--green);">(Grade A+)</small></div>
            <p style="font-size:10px;color:var(--muted);margin-top:6px;">Exam Date: 18 Nov 2026 · Class Rank: 2nd</p>
          </div>
          <button class="pill-btn full-btn" data-open="studentExamModal">Inspect Question Paper & Answer Key ↗</button>
        </section>
      </div>
    `;
  }

  // 2. ADMISSIONS
  function renderAdmissions() {
    return `
      <section class="table-widget">
        <div class="widget-head">
          <div>
            <h3>Admissions Hub & Approval Roster</h3>
            <span style="font-size:10px;color:var(--muted);">${campusData.admissions.length} active applicant portfolios</span>
          </div>
        </div>
        ${renderAdmissionsTable(false)}
      </section>
    `;
  }

  function renderAdmissionsTable(compact = false) {
    const list = compact ? campusData.admissions.filter((a) => a.status === "Pending") : campusData.admissions;
    if (!list.length) return `<div class="empty">No matching applicant records discovered.</div>`;

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>APPLICANT</th>
            <th>PROGRAM</th>
            <th>SESSION</th>
            <th>ENTRANCE GPA</th>
            <th>STATUS</th>
            ${currentRole === "Admin" ? `<th>AUTHORIZED APPROVAL ACTION</th>` : ""}
          </tr>
        </thead>
        <tbody>
          ${list.map((adm) => `
            <tr>
              <td>
                <div class="person">
                  <span class="initial">${adm.name.slice(0, 2).toUpperCase()}</span>
                  <div><b>${adm.name}</b><small>${adm.id}</small></div>
                </div>
              </td>
              <td>${adm.course}</td>
              <td>${adm.detail}</td>
              <td><b>${adm.gpa || "3.80"}</b> / 4.0</td>
              <td>
                <span class="status ${adm.status.toLowerCase()}">${adm.status}</span>
              </td>
              ${currentRole === "Admin" ? `
                <td>
                  ${adm.status === "Pending" ? `
                    <button class="btn-approve" data-adm="approve" data-id="${adm.id}">Approve ✓</button>
                    <button class="btn-reject" data-adm="reject" data-id="${adm.id}">Reject ✕</button>
                  ` : `
                    <span style="font-size:10px;color:var(--muted);">Decision Logged</span>
                  `}
                </td>
              ` : ""}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // 3. ATTENDANCE
  function renderAttendance() {
    const isTeacher = currentRole === "Teacher";
    return `
      <section class="table-widget">
        <div class="widget-head">
          <div>
            <h3>Daily Classroom Attendance Roll-Call</h3>
            <span style="font-size:10px;color:var(--muted);">Section A · Data Structures</span>
          </div>
          ${isTeacher ? `
            <span style="color:var(--green);font-weight:800;font-size:11px;">● Active Roll-Call (Click status to toggle)</span>
          ` : `
            <span style="color:var(--muted);font-size:11px;">Verified Attendance Sheet</span>
          `}
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>COURSE</th>
              <th>SECTION</th>
              <th>STATUS</th>
              ${isTeacher ? `<th>TEACHER 1-CLICK ROLL-CALL</th>` : ""}
            </tr>
          </thead>
          <tbody>
            ${campusData.attendance.map((att, idx) => `
              <tr>
                <td>
                  <div class="person">
                    <span class="initial">${att.name.slice(0, 2).toUpperCase()}</span>
                    <div><b>${att.name}</b><small>${att.id}</small></div>
                  </div>
                </td>
                <td>${att.course}</td>
                <td>${att.detail}</td>
                <td><span class="status ${att.status.toLowerCase()}">${att.status}</span></td>
                ${isTeacher ? `
                  <td>
                    <button class="roll-btn present ${att.status === 'Present' ? 'active' : ''}" data-roll="present" data-idx="${idx}">Present ✓</button>
                    <button class="roll-btn absent ${att.status === 'Absent' ? 'active' : ''}" data-roll="absent" data-idx="${idx}">Absent ✕</button>
                  </td>
                ` : ""}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 4. MARKS ENTRY
  function renderMarks() {
    return `
      <section class="table-widget">
        <div class="widget-head">
          <div>
            <h3>Internal Assessment Gradebook</h3>
            <span style="font-size:10px;color:var(--muted);">Course: Data Structures · Max Score: 100</span>
          </div>
          <button class="pill-btn" data-open="teacherMarksModal">Enter Student Scores ↗</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>ID</th>
              <th>SUBJECT</th>
              <th>INTERNAL SCORE</th>
              <th>GRADE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            ${campusData.marks.map((m) => `
              <tr>
                <td><b>${m.studentName}</b></td>
                <td><small>${m.studentId}</small></td>
                <td>${m.subject}</td>
                <td><b>${m.score}</b> / 100</td>
                <td><span class="status">${m.grade}</span></td>
                <td><span style="color:var(--green);font-weight:700;font-size:10px;">✓ Published in SIS</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 5. EXAMINATIONS
  function renderExams() {
    return `
      <section class="table-widget">
        <div class="widget-head">
          <div>
            <h3>Campus Examination Schedule & Scores</h3>
            <span style="font-size:10px;color:var(--muted);">Semester 1 Examination Window</span>
          </div>
          ${currentRole === "Student" ? `
            <button class="pill-btn" data-open="studentExamModal">View Mid-Term Answer Key ↗</button>
          ` : ""}
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>EXAM TITLE</th>
              <th>SUBJECT</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>RECORDED RESULT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${campusData.exams.map((ex) => `
              <tr>
                <td><b>${ex.name}</b></td>
                <td>${ex.course}</td>
                <td>${ex.detail}</td>
                <td><span class="status ${ex.status === 'Completed' ? '' : 'pending'}">${ex.status}</span></td>
                <td><b>${ex.studentScore}</b></td>
                <td>
                  ${ex.status === 'Completed' ? `
                    <button class="action-link" data-open="studentExamModal" style="color:var(--purple);font-weight:800;">Inspect Key ↗</button>
                  ` : `
                    <span style="color:var(--muted);font-size:10px;">Scheduled</span>
                  `}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 6. FEES
  function renderFees() {
    if (currentRole === "Student") {
      return `
        <div class="stats">
          <article class="stat">
            <div class="stat-head"><span>Semester Tuition</span><span class="stat-icon">₹</span></div>
            <strong>₹85,000</strong><small>Term 1 B.Tech Tuition</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Amount Settled</span><span class="stat-icon">✓</span></div>
            <strong>₹85,000</strong><small>Cleared on 15 Oct 2026</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Due Balance</span><span class="stat-icon">◷</span></div>
            <strong>₹0.00</strong><small>No outstanding dues</small>
          </article>
          <article class="stat">
            <div class="stat-head"><span>Receipt</span><span class="stat-icon">▤</span></div>
            <strong>Official</strong><small>Ref: EDU-2026-8812</small>
          </article>
        </div>

        <section class="panel-block">
          <div class="widget-head"><h3>Tuition Payment Receipt</h3><span>VERIFIED RECORD</span></div>
          <p style="margin-bottom:14px;">Your semester fee has been confirmed by the campus bursar. You may inspect and print your receipt below.</p>
          <button class="pill-btn" data-open="studentFeeReceiptModal">Open & Print Official Receipt ↗</button>
        </section>
      `;
    }

    // Admin Fees View
    return `
      <div class="stats">
        <article class="stat">
          <div class="stat-head"><span>Total demand</span><span class="stat-icon">₹</span></div>
          <strong>₹24.8 Lakhs</strong><small>Current academic year</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Collected</span><span class="stat-icon">✓</span></div>
          <strong>₹18.4 Lakhs</strong><small>74% of goal realized</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Pending</span><span class="stat-icon">◷</span></div>
          <strong>₹6.4 Lakhs</strong><small>Awaiting remittance</small>
        </article>
        <article class="stat">
          <div class="stat-head"><span>Invoices</span><span class="stat-icon">▤</span></div>
          <strong>842</strong><small>Student payments</small>
        </article>
      </div>

      <div class="app-grid">
        <section class="widget">
          <div class="widget-head"><h3>Fee realization progress</h3><span>BUDGET</span></div>
          <div class="mini-progress">
            <label><span>Tuition Fees Collected</span><span>78%</span></label>
            <div class="track"><i style="width:78%"></i></div>
          </div>
          <div class="mini-progress">
            <label><span>Lab & Computing Facilities</span><span>68%</span></label>
            <div class="track"><i style="width:68%"></i></div>
          </div>
          <div class="mini-progress">
            <label><span>Transport & Meal Subscriptions</span><span>62%</span></label>
            <div class="track"><i style="width:62%;background:var(--pink)"></i></div>
          </div>
        </section>

        <section class="widget">
          <div class="widget-head"><h3>Recent campus settlements</h3><span>CAMPUS BURSAR</span></div>
          <div class="feed">
            <div class="feed-item">
              <span class="feed-icon">✓</span>
              <div><b>Aarav Sharma (STU001)</b><small>₹85,000 Tuition Settled · NetBanking</small></div>
            </div>
            <div class="feed-item">
              <span class="feed-icon">✓</span>
              <div><b>Ananya Rao (STU002)</b><small>₹85,000 Tuition Settled · UPI Transfer</small></div>
            </div>
            <div class="feed-item">
              <span class="feed-icon">✓</span>
              <div><b>Ishaan Patel (STU005)</b><small>₹85,000 Tuition Settled · Card Gateway</small></div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // 7. TIMETABLE
  function renderTimetable() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const lessons = [
      ["Data Structures & Algorithms", "09:00 AM", "Room 204"],
      ["Discrete Mathematics", "11:00 AM", "Room 108"],
      ["Database Systems Lab", "02:00 PM", "Computing Lab 2"]
    ];

    return `
      <section class="panel-block">
        <div class="widget-head">
          <h3>Weekly Academic Timetable</h3>
          <span>SEMESTER 1 · 2026</span>
        </div>
        <div class="schedule">
          ${days.map((d, i) => `
            <div class="day-card">
              <b>${d}</b>
              ${lessons.slice(0, i === 4 ? 2 : 3).map((l) => `
                <div class="lesson">
                  <b>${l[0]}</b>
                  <small>${l[1]} · ${l[2]}</small>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  // 8. LMS HUB
  function renderLMS() {
    const courses = [
      ["Java & Object-Oriented Design", "Computer Science", "14 Lessons · 4 Assignments", "Prof. Rahul Verma"],
      ["Relational Database Management", "Computer Science", "12 Lessons · 3 Lab Sheets", "Dr. Priya Menon"],
      ["Discrete Mathematics & Logic", "Mathematics", "16 Lessons · 5 Problem Sets", "Prof. Rahul Verma"],
      ["Web Development & REST APIs", "Computer Science", "10 Lessons · 2 Projects", "Dr. Arjun Das"],
      ["Business Economics & Accounting", "Commerce", "8 Lessons · 2 Case Studies", "Ms. Kavya Rao"],
      ["Professional Communication Skills", "Humanities", "6 Lessons · 1 Presentation", "Dr. Ananya Sen"]
    ];

    return `
      <section class="panel-block">
        <div class="widget-head">
          <h3>Courseware & Syllabus Repository</h3>
          <span>SEMESTER 1 COURSES</span>
        </div>
        <div class="info-grid">
          ${courses.map((c, i) => `
            <article class="info-card">
              <span>COURSE 0${i + 1}</span>
              <b style="font-size:14px;margin:6px 0 3px;">${c[0]}</b>
              <small style="color:var(--muted);">${c[1]} · ${c[3]}</small>
              <div style="font-size:10px;margin:8px 0;color:var(--purple);font-weight:800;">${c[2]}</div>
              <button class="pill-btn" style="padding:6px 14px;font-size:9px;" data-course-download="${c[0]}">Download Syllabus (PDF) ↗</button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  // 9. DIRECTORY (STUDENTS / FACULTY)
  function renderDirectory(key) {
    const isStudents = key === "students";
    const list = isStudents ? campusData.students : campusData.faculty;

    return `
      <section class="table-widget">
        <div class="widget-head">
          <div>
            <h3>${isStudents ? "Enrolled Student Profiles" : "Faculty Staff Directory"}</h3>
            <span style="font-size:10px;color:var(--muted);">${list.length} verified records</span>
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
          <tbody>
            ${list.map((item) => `
              <tr>
                <td>
                  <div class="person">
                    <span class="initial">${item.name.slice(0, 2).toUpperCase()}</span>
                    <div><b>${item.name}</b><small>${item.id}</small></div>
                  </div>
                </td>
                <td>${item.course}</td>
                <td>${item.detail}</td>
                <td><span class="status">${item.status}</span></td>
                <td><button class="action-link" style="color:var(--purple);font-weight:800;" data-view="${item.id}">Inspect Profile</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  // 10. SETTINGS
  function renderSettings() {
    return `
      <section class="panel-block">
        <div class="widget-head"><h3>Campus Workspace Settings</h3><span>CONFIGURATION</span></div>
        <div class="info-grid">
          <article class="info-card">
            <span>ACTIVE ROLE</span>
            <b>${currentRole}</b>
            <small>Permissions active</small>
          </article>
          <article class="info-card">
            <span>ACADEMIC TERM</span>
            <b>2026–2027</b>
            <small>Fall Session</small>
          </article>
          <article class="info-card">
            <span>CAMPUS HUB</span>
            <b>Sunrise Campus</b>
            <small>Main University Site</small>
          </article>
        </div>
      </section>
    `;
  }

  // Dynamic Event Handlers
  function wireDynamicEvents() {
    // 1. Admissions Approval / Rejection
    document.querySelectorAll("[data-adm]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-adm");
        const id = btn.getAttribute("data-id");
        const app = campusData.admissions.find((x) => x.id === id);
        if (!app) return;

        if (action === "approve") {
          app.status = "Approved";
          toast(`Authorized Admission Approved for ${app.name} (${app.id})!`);
        } else if (action === "reject") {
          app.status = "Rejected";
          toast(`Application rejected for ${app.name}.`);
        }
        persistAdmissions();
        renderPage(currentPage);
      });
    });

    // 2. Teacher Roll-Call Clicks
    document.querySelectorAll("[data-roll]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-roll");
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (isNaN(idx) || !campusData.attendance[idx]) return;

        campusData.attendance[idx].status = action === "present" ? "Present" : "Absent";
        persistAttendance();
        toast(`${campusData.attendance[idx].name} marked ${campusData.attendance[idx].status}`);
        renderPage(currentPage);
      });
    });

    // 3. Modal Openers
    document.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open");
        if (id === "teacherMarksModal") openTeacherMarksModal();
        else if (id === "studentExamModal") openStudentExamModal();
        else if (id === "studentFeeReceiptModal") openStudentFeeReceiptModal();
      });
    });

    // 4. Quick Nav Links
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => renderPage(btn.getAttribute("data-nav")));
    });

    // 5. Syllabus Download Simulation
    document.querySelectorAll("[data-course-download]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toast(`Generating syllabus PDF package for ${btn.getAttribute("data-course-download")}...`);
      });
    });
  }

  // Modal 1: Teacher Marks Entry
  function openTeacherMarksModal() {
    const wrap = $("#marksTableWrap");
    if (!wrap) return;

    wrap.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>STUDENT NAME</th>
            <th>ID</th>
            <th>SCORE (OUT OF 100)</th>
            <th>GRADE PREVIEW</th>
          </tr>
        </thead>
        <tbody>
          ${campusData.marks.map((m, idx) => `
            <tr>
              <td><b>${m.studentName}</b></td>
              <td>${m.studentId}</td>
              <td>
                <input class="marks-input-field" type="number" min="0" max="100" value="${m.score}" data-m-idx="${idx}" style="width:75px;padding:6px;text-align:center;">
              </td>
              <td><b id="gradePrev-${idx}">${m.grade}</b></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    wrap.querySelectorAll(".marks-input-field").forEach((inp) => {
      inp.addEventListener("input", () => {
        const idx = parseInt(inp.getAttribute("data-m-idx"), 10);
        const val = parseInt(inp.value, 10) || 0;
        let grade = "F";
        if (val >= 90) grade = "A+";
        else if (val >= 80) grade = "A";
        else if (val >= 70) grade = "B+";
        else if (val >= 60) grade = "B";
        else if (val >= 50) grade = "C";

        const preview = document.getElementById(`gradePrev-${idx}`);
        if (preview) preview.textContent = grade;
      });
    });

    openModal("teacherMarksModal");
  }

  const saveGradesBtn = $("#saveGradesBtn");
  if (saveGradesBtn) {
    saveGradesBtn.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".marks-input-field");
      inputs.forEach((inp) => {
        const idx = parseInt(inp.getAttribute("data-m-idx"), 10);
        const val = Math.min(100, Math.max(0, parseInt(inp.value, 10) || 0));
        if (campusData.marks[idx]) {
          campusData.marks[idx].score = val;
          let grade = "F";
          if (val >= 90) grade = "A+";
          else if (val >= 80) grade = "A";
          else if (val >= 70) grade = "B+";
          else if (val >= 60) grade = "B";
          else if (val >= 50) grade = "C";
          campusData.marks[idx].grade = grade;
        }
      });
      persistMarks();
      closeModal("teacherMarksModal");
      toast("Internal assessment grades saved & published to student portal!");
      if (currentPage === "marks" || currentPage === "overview") renderPage(currentPage);
    });
  }

  // Modal 2: Student Exam Answer Key Review
  function openStudentExamModal() {
    const wrap = $("#examKeyContent");
    if (!wrap) return;

    const questions = [
      {
        qNum: "Q1",
        question: "What is the worst-case runtime complexity for search in an AVL or Red-Black Tree?",
        studentAns: "O(log n)",
        correctAns: "O(log n)",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Balanced binary search trees maintain a maximum height strictly proportional to log2(n)."
      },
      {
        qNum: "Q2",
        question: "Which data structure operates on Last-In, First-Out (LIFO) discipline?",
        studentAns: "Stack",
        correctAns: "Stack",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Stacks adhere to LIFO order, essential for function recursion and undo-redo stacks."
      },
      {
        qNum: "Q3",
        question: "Which algorithm finds single-source shortest paths in weighted graphs without negative edges?",
        studentAns: "Dijkstra's Algorithm",
        correctAns: "Dijkstra's Algorithm",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Dijkstra's algorithm uses a priority queue with runtime O((V + E) log V)."
      },
      {
        qNum: "Q4",
        question: "What is the expected average lookup time in a Hash Table?",
        studentAns: "O(1) Constant Time",
        correctAns: "O(1) Constant Time",
        isCorrect: true,
        points: "5 / 5 Marks",
        explanation: "Direct hash indexing offers near instant average constant time retrieval."
      }
    ];

    wrap.innerHTML = `
      <div style="background:#f7f4ff;padding:14px;border-radius:12px;margin-bottom:16px;border:1px solid #e7dfff;">
        <b>Subject:</b> Data Structures & Algorithms &nbsp;|&nbsp;
        <b>Candidate:</b> Aarav Sharma (STU001) &nbsp;|&nbsp;
        <b>Verified Score:</b> <span style="color:var(--green);font-weight:800;">94 / 100</span>
      </div>

      ${questions.map((q) => `
        <div class="qa-tile">
          <div class="qa-tile-head">
            <b>${q.qNum}: Conceptual Assessment</b>
            <span class="status">${q.points}</span>
          </div>
          <p><b>Question:</b> ${q.question}</p>
          <div class="qa-answers">
            <div><span>Your Answer:</span> <b>${q.studentAns}</b> <span style="color:var(--green)">✓ Correct</span></div>
            <div><span>Answer Key:</span> <strong>${q.correctAns}</strong></div>
          </div>
          <small style="display:block;color:var(--muted);margin-top:6px;border-top:1px dashed var(--line);padding-top:4px;">
            <em>Note:</em> ${q.explanation}
          </small>
        </div>
      `).join("")}
    `;

    openModal("studentExamModal");
  }

  // Modal 3: Student Fee Receipt
  function openStudentFeeReceiptModal() {
    const wrap = $("#receiptBody");
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="receipt-box">
        <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:14px;">
          <div>
            <h3 style="font:800 18px var(--display);color:var(--purple);">SUNRISE CAMPUS EDUCATION TRUST</h3>
            <p style="font-size:10px;color:var(--muted);">Approved by UGC · Higher Education Council</p>
          </div>
          <div style="text-align:right;">
            <strong style="color:var(--green);font-size:13px;">PAID IN FULL</strong>
            <p style="font-size:9px;color:var(--muted);">RECEIPT NO: EDU-2026-8812</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:11px;margin-bottom:14px;">
          <div><b>Student Name:</b> Aarav Sharma</div>
          <div><b>Roll ID:</b> STU001</div>
          <div><b>Program:</b> B.Tech Computer Science (Sem 3)</div>
          <div><b>Remittance Date:</b> 15 Oct 2026</div>
        </div>

        <div class="receipt-row"><span>Semester Tuition Fee</span><b>₹65,000</b></div>
        <div class="receipt-row"><span>Advanced Computing Laboratory Fee</span><b>₹12,000</b></div>
        <div class="receipt-row"><span>Digital Library & Examination Fund</span><b>₹8,000</b></div>
        <div class="receipt-row" style="font-size:13px;border-top:1px solid var(--line);padding-top:10px;color:var(--purple);font-weight:900;">
          <span>TOTAL CLEARED AMOUNT</span>
          <span>₹85,000</span>
        </div>
      </div>
    `;

    openModal("studentFeeReceiptModal");
  }

  const printReceiptBtn = $("#printReceiptBtn");
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", () => {
      toast("Receipt formatted for printing / PDF download spooler.");
      try { window.print(); } catch (e) {}
    });
  }

  // Role Switching Control
  const rolePicker = $("#rolePicker");
  if (rolePicker) {
    rolePicker.addEventListener("change", (e) => {
      currentRole = e.target.value;
      renderSidebarNav();
      renderPage("overview");
      toast(`Switched view to ${currentRole}`);
    });
  }

  // Add Record Modal Flow (Admin)
  const newRecordBtn = $("#newRecord");
  const recordForm = $("#recordForm");
  const recordFields = $("#recordFields");

  if (newRecordBtn) {
    newRecordBtn.addEventListener("click", () => {
      if (!recordFields) return;
      const key = currentPage;
      const heading = $("#recordHeading");
      if (heading) heading.textContent = `Add Record to ${key.toUpperCase()}`;

      recordFields.innerHTML = `
        <label>Full Legal Name / Title
          <input name="name" required placeholder="Student or Faculty Name">
        </label>
        <label>Course / Department
          <input name="course" required placeholder="Computer Science or Commerce">
        </label>
        <label>Detail / Designation
          <input name="detail" required placeholder="1st Year or Assistant Professor">
        </label>
        <label>Record Status
          <select name="status">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
      `;
      openModal("recordModal");
    });
  }

  if (recordForm) {
    recordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(recordForm);
      const name = fd.get("name").trim();
      const course = fd.get("course").trim();
      const detail = fd.get("detail").trim();
      const status = fd.get("status");

      if (!name || !course) return;

      const key = currentPage;
      const prefix = key === "students" ? "STU" : key === "faculty" ? "FAC" : "REC";
      const targetList = key === "students" ? campusData.students : campusData.faculty;

      if (targetList) {
        targetList.unshift({
          name: name,
          id: prefix + String(targetList.length + 1).padStart(3, "0"),
          course: course,
          detail: detail || "Current Session",
          status: status
        });
        toast(`Added ${name} to ${key}!`);
      }

      recordForm.reset();
      closeModal("recordModal");
      renderPage(currentPage);
    });
  }

  // Marketing to Dashboard Flow
  const openDashboardBtn = $("#openDashboard");
  const heroDashboardBtn = $("#heroDashboard");
  const numbersDemoBtn = $("#numbersDemo");
  const contactDashboardBtn = $("#contactDashboard");
  const returnSiteBtn = $("#returnSite");
  const loginOpenBtn = $("#loginOpen");
  const loginForm = $("#loginForm");
  const loginRole = $("#loginRole");

  function launchDashboard(role = "Admin") {
    currentRole = role;
    if (rolePicker) rolePicker.value = role;
    if (loginRole) loginRole.value = role;

    const pub = $("#publicSite");
    const pubHeader = $("#siteHeader");
    const app = $("#workspaceApp");

    if (pub) pub.hidden = true;
    if (pubHeader) pubHeader.hidden = true;
    if (app) app.hidden = false;

    renderSidebarNav();
    renderPage("overview");
    window.scrollTo(0, 0);
  }

  function returnToSite() {
    const pub = $("#publicSite");
    const pubHeader = $("#siteHeader");
    const app = $("#workspaceApp");

    if (pub) pub.hidden = false;
    if (pubHeader) pubHeader.hidden = false;
    if (app) app.hidden = true;
    window.scrollTo(0, 0);
  }

  [openDashboardBtn, heroDashboardBtn, numbersDemoBtn, contactDashboardBtn].forEach((btn) => {
    if (btn) btn.addEventListener("click", () => launchDashboard("Admin"));
  });

  if (loginOpenBtn) loginOpenBtn.addEventListener("click", () => openModal("loginModal"));

  if (loginForm && loginRole) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const r = loginRole.value;
      closeModal("loginModal");
      launchDashboard(r);
      toast(`Welcome to EduFlow as ${r}`);
    });
  }

  if (returnSiteBtn) returnSiteBtn.addEventListener("click", returnToSite);

  // Mobile Toggles
  const menuBtn = $("#menuBtn");
  const mainNav = $("#mainNav");
  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mainNav.classList.remove("open"));
    });
  }

  const appMenu = $("#appMenu");
  const appSidebar = $("#appSidebar");
  if (appMenu && appSidebar) {
    appMenu.addEventListener("click", () => appSidebar.classList.toggle("open"));
  }

  // Close Modal handlers
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.getAttribute("data-close")));
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop").forEach((m) => {
        if (!m.hidden) closeModal(m.id);
      });
    }
  });

  const bell = $("#bellButton");
  if (bell) {
    bell.addEventListener("click", () => toast("All campus notifications are caught up!"));
  }

  // Pricing plan triggers
  document.querySelectorAll("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toast(`${btn.getAttribute("data-plan")} plan selected — enquiry sent`);
    });
  });

  // Init
  renderSidebarNav();
})();
