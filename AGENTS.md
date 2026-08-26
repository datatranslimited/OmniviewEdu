# Omniviewedu Business & Project Rules

This is a living document that we will update as the project evolves. It contains core business logic, architectural constraints, and behavioral rules.

## Core Behavioral Rules
1. **Explicit Approval Required**: The AI must not write, generate, or execute any code until the user gives explicit permission. Always discuss the technical strategy, approach, and plan first.
2. **Proactive Skill Suggestion**: Since the user may not know all available skills, the AI must proactively suggest relevant skills when proposing a plan or tackling a task.
3. **Living Business Rules**: The AI must proactively update this AGENTS.md file whenever a new architectural decision, business constraint, or workflow pattern is established during conversation, ensuring the context remains perfectly up to date.

## Architectural & Business Constraints
* **Tech Stack**: Next.js 14+ (App Router), Tailwind CSS, Supabase PostgreSQL, Prisma/Drizzle.
* **Multi-Tenancy**: Data isolation must be enforced via Supabase Row-Level Security (RLS).
* *(More business rules to be added as we build...)*
