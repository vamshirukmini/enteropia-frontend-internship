# ESCHULU — Enterprise Education Management SaaS (Task 4 — Design 1)

> **Enteropia LLP Frontend Development Internship Challenge**  
> **Assignment 4:** Education Management SaaS Platform  
> **Design Version 1:** ESCHULU (Dark Enterprise Academic OS Aesthetic)

---

## 1. Project Overview & Role Architecture

**ESCHULU** is an enterprise campus management platform engineered to connect administrative deans, professors, and students into one unified digital workspace. Styled in a professional navy-slate and cobalt theme (`#0d172e`, `#4f64f4`, `#f4f6fb`), it provides an institutional look and feel suited for universities and polytechnics.

### Authentic Multi-Role Differentiation
Unlike static dashboards that present identical tables regardless of user context, ESCHULU implements genuine permissions and role-specific workflows:
- **Admin (Dean / Registrar):**
  - High-level campus metrics (2,480 Students, 148 Faculty, 94.8% Attendance, ₹18.4L Tuition).
  - **Authorized Admissions Approvals:** Interactive *Approve Admission ✓* and *Reject ✕* actions that modify applicant status live and persist to browser storage.
  - Institutional fee reconciliation progress bars.
  - Student and faculty master directories with modal creation.
- **Teacher (Professor):**
  - Teaching-centric overview (Assigned Students, Today's Lectures, Attendance Status).
  - **Interactive 1-Click Roll-Call:** Mark individual students *Present* or *Absent* directly from the table with real-time state synchronization.
  - **Internal Marks & Gradebook Portal:** Enter numerical assessment scores (0–100) with real-time automatic letter grade computation (A+, A, B+, B, C, F) and publish grades to student SIS.
  - Lecture schedule and proctoring rosters.
- **Student (Learner):**
  - Personal academic metrics (GPA 3.92/4.0, Verified 96.4% Attendance, 6 Enrolled Courses).
  - **Question-by-Question Exam Performance & Answer Key Review:** Modal displaying actual computer science assessment questions, student's selected answer, verified correct answer keys, and evaluator explanation notes.
  - **Official Fee Receipt Inspection:** Printable digital tuition fee receipt with official breakdown and cleared seal.

---

## 2. Key Modules & Functional Workflows

1. **Admissions & Approvals:** Review incoming applicant profiles, entrance GPA, and execute administrative approvals with `localStorage` persistence under `eschulu_admissions`.
2. **Attendance Roll-Call:** Record and toggle daily student physical presence with `localStorage` persistence under `eschulu_attendance`.
3. **Faculty Gradebook:** Dynamic score input table with immediate letter grade recalculation saved to `eschulu_marks`.
4. **Examination & Answer Key Review:** Comprehensive assessment answer keys with clear correct/incorrect indicators.
5. **Fee & Receipt Management:** Tuition demands, collection percentages, and downloadable receipt simulation.
6. **Master Timetable:** Conflict-free weekly schedules with room and professor allocations.
7. **LMS Courseware:** Downloadable course syllabi and lesson summaries.

---

## 3. Technology Stack

- **Semantic HTML5:** Public landing page (`<header>`, `<main>`, `<section>`, `<article>`) + `<aside>` application dashboard.
- **Vanilla CSS3:** Custom design tokens, glassmorphism hero cards, responsive CSS grid, and print-ready receipts.
- **Modern ES6+ JavaScript:** Modular role routing, dynamic DOM injection, table filtering, and `localStorage` state management.
- **Dependencies:** 100% native vanilla code. No frameworks or external dependencies.

---

## 4. How to Run Locally

1. Open this directory in **VS Code**:
   ```bash
   cd "04-eschulu-design"
   ```
2. Start the **Live Server** extension on `index.html`.
3. Open in your browser:
   ```
   http://127.0.0.1:5500/04-eschulu-design/index.html
   ```
4. Use the **SWITCH ROLE** selector in the top bar to inspect Admin, Teacher, and Student workflows.

---

## 5. Verification Checklist

- [x] Distinct dark enterprise identity with responsive desktop and mobile layouts.
- [x] Real role differentiation across Admin, Teacher, and Student interfaces.
- [x] Interactive admissions approval workflow with persistent state updates.
- [x] 1-click teacher attendance roll-call with immediate UI feedback.
- [x] Assessment marks entry modal with live letter grade calculation.
- [x] Student examination answer key review modal with authentic question and answer pairs.
- [x] Printable official tuition fee receipt modal with breakdown.
- [x] Accessible modal handling (Escape key, ARIA dialog roles).
