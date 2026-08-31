<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Omniviewedu Business & Project Rules

This is a living document that we will update as the project evolves. It contains core business logic, architectural constraints, and behavioral rules.

## Core Behavioral Rules
1. **Explicit Approval Required**: The AI must not write, generate, or execute any code until the user gives explicit permission. Always discuss the technical strategy, approach, and plan first.
2. **Proactive Skill Suggestion**: Since the user may not know all available skills, the AI must proactively suggest relevant skills when proposing a plan or tackling a task.
3. **Living Business Rules**: The AI must proactively update this AGENTS.md file whenever a new architectural decision, business constraint, or workflow pattern is established during conversation, ensuring the context remains perfectly up to date.

## Architectural & Business Constraints
* **Tech Stack**: Next.js 14+ (App Router), Tailwind CSS, Supabase PostgreSQL, Prisma/Drizzle.
* **Authentication**: Supabase Auth (GoTrue) is used for all session and credential management. The public `users` table maps to `auth.users` via UUID and does NOT store passwords.
* **Multi-Tenancy**: Data isolation must be enforced via Supabase Row-Level Security (RLS).
* **Routing Strategy**: Multi-tenancy routing will use simple path-based routing (e.g., `/tenant/[slug]`) for now. Subdomain routing is explicitly deferred to a later phase.
* **Student Logins**: Unlike Staff, students DO NOT receive a Supabase Auth login account automatically upon enrollment. Their data exists as standalone records managed by admins/teachers. A "Generate Login" feature for older students is deferred to a much later phase.
* **Development Workflow (Frontend-First)**: To maximize speed and UI iteration, we will prioritize building the Frontend UI (dashboards, modals, tables) using mocked/dummy data first. Backend integration (Prisma/Server Actions) will be deferred until the UI slice is approved.
* **Universal Date Formatting**: To prevent any regional confusion (US vs EU formats), ALL dates across the entire application MUST be formatted unambiguously by spelling out the month (e.g., "August 27, 2026"). Always use `src/lib/formatDate.ts`.
* **Mobile-First Responsiveness**: 100% of the application MUST be fully functional and visually perfect on mobile screens. Teachers and Admins will primarily use their phones. All tables must be horizontally scrollable, navigation must include a mobile hamburger menu, and all modals/forms must adapt to small screens.
* **Historical Data & SCDs (Slowly Changing Dimensions)**: The backend database must support looking back at historical student data (e.g. knowing what class a student was in two years ago). Do not solely rely on a single `current_class_id` on the student record. Use enrollment tracking tables (like `StudentSessionEnrollment`) mapped to specific Academic Sessions/Terms to maintain historical fidelity over the years.
* **Parent-Student Linking Strategy (Link Codes)**: We will use a Parent-Driven linking model. The system will generate a unique "Secure Linking PIN" for each student. Parents will independently create their own accounts, log into the Parent Portal, and enter the PINs to link their children to their dashboard. This avoids administrative overhead and duplicate accounts.
* **Future Roadmap Requirements**:
  1. **Parent Portal**: A dedicated UI (`/tenant/parent`) where parents can log in to view their ward's data.
  2. **Online Payment Integration**: Parents must be able to pay school fees directly online (e.g., via Paystack/Stripe).
  3. **Automated Notifications**: The system must support automated Email/SMS blasts (e.g., "School Fees Overdue" reminders).
  4. **AI Parent Engagement Engine (Core AI Feature)**: Teachers manually write and submit lesson plans. The Principal reviews and approves/rejects them with feedback. Once approved, the AI reads the lesson plan and automatically drafts "Weekly Nuggets" (summaries of what was taught + engaging questions for parents to ask their kids at home). These nuggets are pushed to the Parent Portal or WhatsApp.
  5. **Assignments & Exams**: Dedicated modules for posting daily homework and scheduling CBT/written exams.
