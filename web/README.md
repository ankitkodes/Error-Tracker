<div align="center">

  # ⚡ BugTrace Web Dashboard

  **Next-Generation, Developer-Centric Real-Time Error Tracking Platform**

  [![Next.js 15](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Prisma ORM](https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Neon Postgres](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
  [![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
  [![NextAuth](https://img.shields.io/badge/NextAuth-v4-5A0FC8?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://next-auth.js.org/)

  <br />

  <p align="center">
    <b>BugTrace Web</b> is a sleek, dark-mode native web application built to monitor, diagnose, and triage production & development application errors in real time. Designed for maximum developer velocity and aesthetic polish.
  </p>

</div>

---

## 📑 Table of Contents

- [✨ Overview \& Core Capabilities](#-overview--core-capabilities)
- [🛠️ Architecture \& Tech Stack](#️-architecture--tech-stack)
- [📂 Project Directory Architecture](#-project-directory-architecture)
- [📊 Database Schema Overview](#-database-schema-overview)
- [🚀 Quickstart \& Installation](#-quickstart--installation)
- [📦 SDK Integration](#-sdk-integration)
- [🔑 Environment Variables](#-environment-variables)
- [🎨 Design Engine \& System Tokens](#-design-engine--system-tokens)
- [🛡️ Security \& Auth Workflow](#️-security--auth-workflow)
- [👥 Maintainers](#-maintainers)

---

## ✨ Overview & Core Capabilities

BugTrace Web provides a centralized control tower for software development teams to capture error telemetry directly from client and server environments. It features automated deduplication, deep stack trace parsing, project health scoring, and customizable alert rules.

### 🌟 Highlights

- ⚡ **Real-Time Telemetry Intake**: Seamless HTTP API ingestion layer processing raw exception stacks sent by `bugtrace-sdk`.
- 🔍 **Deep Stack Trace Inspection**: Automatic frame parsing via `error-stack-parser` and `stacktrace-parser` with file names, line numbers, and error categorization.
- 📈 **Interactive Visual Analytics**: High-performance metric charts powered by **ApexCharts** and **TanStack React Query**, showing error spikes, occurrence trends, and uptime metrics.
- 🛡️ **Multi-Tenant & Multi-Environment**: Organize tracking by project boundaries (`Production`, `Staging`, `Development`) with auto-generated secure API keys.
- 🔔 **Custom Rule Alert Engine**: Define health conditions and trigger automated alerts based on issue severity and frequency.
- 🎨 **Dark-Mode Developer UX**: Engineered using glassmorphic surfaces (`backdrop-blur-md`), dark metallic gradients, smooth **Framer Motion** transitions, and custom micro-interactions.

---

## 🛠️ Architecture & Tech Stack

```
 ┌─────────────────────────────────────────────────────────┐
 │                   bugtrace-sdk                          │
 └────────────────────────────┬────────────────────────────┘
                              │ Real-Time Exception HTTP Payload
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                  Next.js 15 App Router                  │
 │   ┌──────────────────────┐   ┌──────────────────────┐   │
 │   │  API Route Handlers  │   │ React Server Components│  │
 │   └──────────┬───────────┘   └──────────┬───────────┘   │
 └──────────────┼──────────────────────────┼───────────────┘
                │                          │
                ▼                          ▼
 ┌──────────────────────────┐   ┌──────────────────────────┐
 │  TanStack Query v5 /     │   │   NextAuth v4 Session    │
 │  Zustand Global State    │   │   & Bcrypt Security      │
 └──────────────┬───────────┘   └──────────┬───────────────┘
                │                          │
                └─────────────┬────────────┘
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                 Prisma ORM (v7) Adapter                 │
 └────────────────────────────┬────────────────────────────┘
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │            Neon Serverless PostgreSQL DB                │
 └─────────────────────────────────────────────────────────┘
```

| Layer | Technologies & Tools Used |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router with Turbopack bundler) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling & UI** | Tailwind CSS v4, Headless UI, Radix UI Primitives, Lucide Icons, Tabler Icons |
| **Animations** | Framer Motion & Motion Engine |
| **State Management** | TanStack React Query v5 & Zustand |
| **Database & ORM** | Prisma v7 ORM with Neon Serverless Postgres Adapter (`@prisma/adapter-neon`) |
| **Auth & Security** | NextAuth.js (JWT Strategy), Bcrypt Password Hashing, API Key Generation |
| **Visualization** | React ApexCharts |
| **Error Parsing** | `error-stack-parser`, `stacktrace-parser`, MD5 Hash generation |

---

## 📂 Project Directory Architecture

```
web/
├── prisma/
│   └── schema.prisma         # Enterprise database models & enums
├── public/                    # Static assets & brand media
├── src/
│   ├── app/                  # Next.js 15 App Router directory
│   │   ├── (app)/            # Authenticated Application Routes
│   │   │   ├── alerts/       # Rule configuration & history logs
│   │   │   ├── analytics/    # High-level analytical charts & metrics
│   │   │   ├── issue/        # Detailed stack trace & issue management
│   │   │   ├── profile/      # User settings & org configuration
│   │   │   ├── project/      # Multi-project workspace dashboard
│   │   │   ├── report/       # Telemetry breakdown reports
│   │   │   └── setup/        # Interactive SDK onboarding wizard
│   │   ├── (auth)/           # Authentication (Sign In / Sign Up)
│   │   ├── (home)/           # Dark-mode developer landing page
│   │   ├── actions/          # Server Actions for mutations
│   │   └── api/              # Ingestion & platform REST API endpoints
│   ├── components/           # Modular atomic UI design system
│   │   ├── landingpage/      # Glassmorphic marketing components
│   │   ├── project/          # Project management UI cards & modals
│   │   └── ui/               # Reusable primitives (Buttons, Modals, Inputs)
│   ├── config/               # Platform constants & API route specs
│   ├── context/              # React Context providers (QueryClient, Auth)
│   ├── layout/               # Navbars, Sidebars, and Page Headers
│   ├── lib/                  # Database client instantiation & helpers
│   ├── modules/              # Domain-driven feature business logic
│   ├── types/                # Shared TypeScript definitions
│   └── utils/                # Stack trace parsing & hash generation helpers
├── DESIGN_GUIDE.md           # UI/UX design playbook & styling rules
├── Dockerfile                # Containerized deployment blueprint
├── package.json              # Dependencies & npm scripts
└── tsconfig.json             # TypeScript config
```

---

## 📊 Database Schema Overview

The underlying database domain model is structured to handle high-frequency exception reporting with optimized relation lookups:

```mermaid
erDiagram
    User ||--o{ Project : owns
    User ||--o{ ErrorAnalytics : tracks
    User ||--o{ ErrorType : categorizes
    Project ||--o{ Error : captures
    Project ||--o{ ProjectHealth : computes
    Project ||--o{ AlertRule : configures
    AlertRule ||--o{ AlertHistory : logs

    User {
        int id PK
        string name
        string email UK
        string organizationName
        Role role
    }
    Project {
        string id PK
        string name
        string apikey UK
        Language language
        Environment environment
        string team
    }
    Error {
        int id PK
        string errorType
        string message
        string fileName
        int lineNumber
        string issuehashId UK
        Severity severity
        Status status
    }
    ProjectHealth {
        int id PK
        int totalerrors
        int resolvederror
        float uptimepercentage
        Projectstatus status
    }
    AlertRule {
        string id PK
        string name
        string condition
        boolean active
    }
```

---

## 🚀 Quickstart & Installation

Follow these steps to configure and launch **BugTrace Web** locally.

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **PostgreSQL**: Neon DB connection string or local PostgreSQL instance

### 1. Clone & Navigate

```bash
git clone https://github.com/ankitdeveloper7/Error-Tracker.git
cd Error-Tracker/web
```

### 2. Environment Setup

Create a `.env` file inside the `web` directory:

```bash
cp .env.example .env
```

Ensure your `.env` contains the required keys:

```env
DATABASE_URL="postgresql://user:password@ep-sample-123456.neon.tech/bugtrace?sslmode=require"
NEXTAUTH_SECRET="your-super-secret-jwt-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Migration & Prisma Generation

Generate the Prisma Client and sync the schema with your PostgreSQL database:

```bash
npx prisma generate
npx prisma db push
```

### 4. Launch Development Server

Start Next.js with Turbopack enabled:

```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 📦 SDK Integration

To send error events from any application to this dashboard, install and initialize `bugtrace-sdk`:

```bash
npm install bugtrace-sdk
```

Initialize it at your application's entry point:

```typescript
import { init } from "bugtrace-sdk";

init({
  projectId: "YOUR_PROJECT_ID_FROM_DASHBOARD",
  user_id: "optional-user-id",
  Environment: "Production", // "Production" | "Staging" | "Development"
});
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
| :--- | :--- | :---: |
| `DATABASE_URL` | PostgreSQL DB connection URI (Neon DB compatible) | Yes |
| `NEXTAUTH_SECRET` | Cryptographic secret for signing NextAuth JWT sessions | Yes |
| `NEXTAUTH_URL` | Canonical root URL of the web dashboard | Yes |

---

## 🎨 Design Engine & System Tokens

BugTrace Web follows strict architectural design guidelines defined in [`DESIGN_GUIDE.md`](./DESIGN_GUIDE.md):

- **60-30-10 Color Balance**: 60% neutral surfaces (`#000000`, `#09090b`), 30% structured borders & card fills (`#18181b`), and 10% high-contrast action pops (`#00E599` emerald green & electric neon).
- **Glassmorphism Layering**: `backdrop-blur-md bg-black/50` floating navigation bar for clear spatial hierarchy.
- **Micro-Animations**: Framer motion state transitions on buttons, interactive list items, and modal dialogs.
- **Defensive UI Rendering**: Built-in empty states, loading skeletons, and graceful fallback handling for untracked error parameters.

---

## 🛡️ Security & Auth Workflow

- **Password Encryption**: All user passwords are salted and hashed using `bcrypt`.
- **Stateless Sessions**: Authentication is handled seamlessly using NextAuth JWT strategy.
- **Secure Project Scoping**: Every error intake request verifies the incoming project API Key (`apikey`) before committing records to the database.

---

## 👥 Maintainers

| Developer | Role | Profile |
| :--- | :--- | :--- |
| **Ankit Kumar** | Core Full-Stack Developer | [@ankitkodes](https://github.com/ankitkodes) |
| **Abhijeet Kumar** | Infrastructure & Deployment | [@abhijeet32](https://github.com/abhijeet32) |

<br />

<div align="center">
  <sub>Built with ❤️ for developers who demand clean interfaces and rapid bug resolution.</sub>
</div>
