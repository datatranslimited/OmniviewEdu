# Implementation Plan - Phase 1: Project Scaffolding & Database Setup for Omniviewedu (Full Multi-Role Edition)

We are initializing the **Omniviewedu** codebase inside `C:\Users\HP Folio\Desktop\desktop\omniviewedu`. This phase establishes the full-stack foundation: Next.js (App Router), Tailwind CSS, shadcn/ui, and Prisma ORM configured with all 15 modules (Academics, CBT Exams, Assignments, Bursary, Staff/HR, Payroll, Expenses, and Store Inventory) connected to your live Supabase database (`idiqejvfvwcjsgrvuear`).

## User Review Required

> [!IMPORTANT]
> The database schema now covers:
> 1. **Student Portal & CBT Engine**: Admission Number + PIN login, Timed CBT Quizzes with Instant Grading, Homework Submissions (text/image uploads), and Termly Report Card viewing.
> 2. **School Operations & Business Suite**: Staff HR, Attendance, Payroll, Generator/Bus Expenses, Vendors, and Store Inventory.
> 3. **Parent & Academic Suite**: Dedicated Virtual Bank Accounts, Nigerian CA + Exam Grading, Stamped PDF Broadsheets, and AI Weekly Digests via WhatsApp.

---

## Proposed Changes & Setup Steps

### 1. Next.js 14/15 + Tailwind CSS Scaffolding
- Initialize Next.js in `C:\Users\HP Folio\Desktop\desktop\omniviewedu` using TypeScript, Tailwind CSS, ESLint, and App Router (`src/` directory).
- Configure Tailwind theme with Omniviewedu brand colors and responsive mobile-first navigation for phones and tablets.

### 2. Core Dependencies
- Install UI & helper packages:
  - `lucide-react` (icons)
  - `clsx`, `tailwind-merge`, `class-variance-authority` (shadcn utility foundation)
  - `zod`, `react-hook-form` (form validation)
  - `@supabase/supabase-js` (Supabase client SDK)
- Install Database & ORM packages:
  - `prisma` (Dev dependency)
  - `@prisma/client`

### 3. Comprehensive Database Schema & Prisma Configuration
- Create `prisma/schema.prisma` containing all 15 modules:
  1. `Tenants` & Branding
  2. `Users` & Multi-Tenant RBAC (supports Email, Phone, or Admission Number login)
  3. `StaffDepartments`, `StaffProfiles`, `StaffAttendance`, `StaffLeaveRequests`
  4. `PayrollRuns`, `StaffPayslips` (Allowances, Deductions, Net Salary)
  5. `AcademicSessions`, `AcademicTerms`, `ClassLevels`, `ClassArms`
  6. `Students`, `Guardians`, `StudentGuardians` (Multi-child linking)
  7. `Subjects`, `ClassSubjects` (Teacher allocations)
  8. `Assignments`, `AssignmentSubmissions` (Student homework submission & teacher grading)
  9. `CbtExams`, `CbtQuestions`, `CbtStudentAttempts` (Timed CBT tests, question shuffling, instant grading)
  10. `FeeCategories`, `FeeStructures`, `Invoices`, `StudentVirtualAccounts`, `Payments`
  11. `ExpenseCategories`, `Vendors`, `SchoolExpenses` (Diesel, Bus, Maintenance, Printing)
  12. `InventoryItems`, `InventoryTransactions` (Uniforms, Books, Badges, Assets)
  13. `StudentSubjectScores`, `StudentTermReports` (CA + Exam scoring, Broadsheets, Stamped PDF Reports)
  14. `WeeklyLessonNotes`, `AiWeeklyDigests` (Friday AI summary & dinner conversation starters)
  15. `NotificationLogs` (WhatsApp / SMS audit trail)

### 4. Project Structure Layout
```
omniviewedu/
├── docs/
│   └── system_blueprint_and_schema.md
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (auth)/             # Multi-role Login (Admin, Teacher, Parent, Student by Admission No)
│   │   ├── (dashboard)/        
│   │   │   ├── admin/          # Proprietor / Principal / Bursar / HR
│   │   │   ├── teacher/        # Scores, Lesson Plans, CBT Creator, Attendance
│   │   │   ├── student/        # Active CBT Tests, Assignments, Term Results
│   │   │   └── parent/         # Fees & Virtual Accounts, AI Weekly Digest, Progress
│   │   ├── api/                # API routes & Webhooks (Paystack/Monnify, Termii)
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing page & Portal Selector
│   ├── components/
│   │   ├── ui/                 # Reusable shadcn UI components
│   │   ├── shared/             # Navbar, Sidebar, Header, Mobile Nav
│   │   └── cbt/                # CBT Countdown Timer, Question Navigator, Option Selector
│   ├── lib/
│   │   ├── prisma.ts           # Global Prisma Client singleton
│   │   ├── supabase.ts         # Supabase Client
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.example
├── .env.local
├── package.json
└── tailwind.config.ts
```

---

## Verification Plan

### Automated Checks
- Run `npx prisma validate` to ensure all 15 modules compile with zero errors.
- Run `npm run build` or `npm run lint` to verify clean TypeScript compilation.

### Manual Verification
- Start local dev server (`npm run dev`) and test loading `http://localhost:3000`.
- Verify the responsive multi-portal landing page (Admin, Teacher, Student, Parent).
