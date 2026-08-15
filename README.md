<div align="center">

  <h1>🐞 BugTrace Engine</h1>

  <p><b>Enterprise-Grade, Open-Source Real-Time Error Tracking & Application Health Platform</b></p>

  <p>
    <i>A lightweight, developer-centric alternative to Sentry and Rollbar — built for modern full-stack web applications and cloud infrastructure.</i>
  </p>

  <br />

  [![Next.js 15](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Prisma ORM](https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Neon Postgres](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
  [![Kubernetes](https://img.shields.io/badge/Kubernetes-Native-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
  [![Helm](https://img.shields.io/badge/Helm-Supported-0F1689?style=for-the-badge&logo=helm&logoColor=white)](https://helm.sh/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  <br />

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-system-architecture">System Architecture</a> •
    <a href="#-monorepo-structure">Monorepo Structure</a> •
    <a href="#-quick-start-guide">Quick Start</a> •
    <a href="#-sdk-integration--usage">SDK Integration</a> •
    <a href="#-api-specifications">API Reference</a> •
    <a href="#-infrastructure--devops-deployment">DevOps & Cloud</a> •
    <a href="#-database-domain-model">Database ERD</a> •
    <a href="#-the-core-engineering-team">Maintainers</a>
  </p>

</div>

---

## ⚡ Executive Summary

**BugTrace** is a self-hostable, full-stack application stability and error monitoring platform designed to collect, aggregate, diagnose, and triage runtime errors in real time. It empowers developers and DevOps teams to maintain high software reliability by providing instant visibility into stack traces, user contexts, environment breakdowns, and system health metrics.

With an engineered monorepo architecture featuring a high-throughput Next.js 15 ingestion API, a customizable TypeScript SDK (`bugtrace-sdk`), and Infrastructure-as-Code blueprints (Terraform, Kubernetes, Helm), BugTrace seamlessly integrates into modern production workflows.

---

## 🚀 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🔍 Deep Stack Trace Inspection</h3>
      <p>Automated stack trace parsing extracts precise line numbers, file paths, and function call chains using <code>error-stack-parser</code> and <code>stacktrace-parser</code>.</p>
    </td>
    <td width="50%">
      <h3>⚡ Real-Time Ingestion & Hash Deduplication</h3>
      <p>Generates unique MD5 issue fingerprints (<code>issuehashId</code>) to group identical exception occurrences, reducing telemetry noise and payload overhead.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📈 Interactive Analytics Dashboard</h3>
      <p>Visualize error spikes, historical trends, and distribution by severity and status using high-performance <b>ApexCharts</b> and <b>TanStack React Query v5</b>.</p>
    </td>
    <td width="50%">
      <h3>🔔 Dynamic Alert Engine</h3>
      <p>Configure custom health condition alert rules with execution tracking and status reporting to proactively notify engineering teams of critical failures.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🛡️ Workspace Isolation & Multi-Environment</h3>
      <p>Manage multiple projects with unique secure API keys across segregated deployment environments (<code>Production</code>, <code>Staging</code>, <code>Development</code>).</p>
    </td>
    <td width="50%">
      <h3>☁️ Cloud-Native Deployment</h3>
      <p>Production-ready Docker containerization, Kubernetes manifests, Helm charts, and Terraform IaC modules for cloud infrastructure provisioning.</p>
    </td>
  </tr>
</table>

---

## 🏗️ System Architecture

The following diagram illustrates the end-to-end data flow from client exception capture to database storage and dashboard visualization:

```mermaid
graph TD
    subgraph Client Applications
        A1["Browser App"] -->|Captures Runtime Error| B["bugtrace-sdk"]
        A2["Node.js / Express"] -->|Uncaught Exception| B
        A3["Next.js Application"] -->|Unhandled Rejection| B
    end

    subgraph Telemetry Ingestion Layer
        B -->|POST JSON Payload / API Key| C["/api/ingest Endpoint"]
        C -->|Validate API Key| D["Project Scoping Guard"]
        D -->|Parse Frame Data| E["Stack Trace Parser"]
        E -->|Generate MD5 Hash| F["Issue Fingerprint Engine"]
    end

    subgraph Storage & Persistence Layer
        F -->|Upsert / Increment Count| G["Prisma ORM v7"]
        G -->|Persist Records| H[("Neon Serverless PostgreSQL")]
    end

    subgraph Monitoring & Visualization UI
        H -->|Optimized SQL Query| I["TanStack React Query v5"]
        I -->|Server & Client Hydration| J["Next.js 15 Dashboard"]
        J -->|Render Histograms & Charts| K["ApexCharts & Motion UI"]
        J -->|Evaluate Rules| L["Alerting Engine"]
    end
```

---

## 📂 Monorepo Structure

BugTrace is organized as a clean, modular monorepo containing the web application dashboard, client SDK, and infrastructure blueprints:

```
Error-Tracker/
├── web/                               # Next.js 15 Real-Time Dashboard & Ingestion Server
│   ├── prisma/                        # Database schema definitions & Prisma Client generator
│   │   └── schema.prisma              # Database domain models (User, Project, Error, AlertRule, etc.)
│   ├── public/                        # Static assets, branding & icons
│   ├── src/
│   │   ├── app/                       # Next.js App Router (Authenticated App, Auth, & Ingestion API)
│   │   │   ├── (app)/                 # Application pages (projects, issue details, analytics, alerts, reports)
│   │   │   ├── (auth)/                # Authentication routes (Login, Signup)
│   │   │   ├── (home)/                # Developer landing page
│   │   │   └── api/                   # REST API routes (/api/ingest, /api/projects, /api/alerts, /api/analytics)
│   │   ├── components/                # Modular UI component hierarchy (Atomic design system)
│   │   ├── context/                   # Global React Providers (QueryClient, Auth session)
│   │   ├── layout/                    # Navbars, sidebars, headers, and modal wrappers
│   │   ├── lib/                       # Database connection singletons & core utilities
│   │   └── utils/                     # Stack trace parsers, MD5 hash generators, API response helpers
│   ├── DESIGN_GUIDE.md                # Platform UI/UX design tokens and style guide
│   ├── Dockerfile                     # Optimized multi-stage Docker build config
│   └── package.json                   # Web application dependencies & scripts
│
├── package/
│   └── sdk/                           # bugtrace-sdk TypeScript client package
│       ├── src/
│       │   ├── browser/               # Browser window.onerror & unhandledrejection handlers
│       │   ├── core/                  # Core telemetry collector & HTTP transport layer
│       │   └── node/                  # Node.js process uncaughtException & rejection handlers
│       ├── package.json               # Published SDK package configuration
│       └── tsconfig.json              # TypeScript compilation setup
│
├── infrastructure/                    # DevOps Infrastructure-as-Code & Deployment
│   ├── Terraform/                     # Terraform AWS / Cloud provisioning scripts
│   │   ├── main.tf                    # Core infrastructure definitions
│   │   ├── outputs.tf                 # Terraform deployment outputs
│   │   └── variables.tf               # Terraform input parameters
│   ├── helm/                          # Helm charts for Kubernetes deployment
│   │   └── error-tracker-chart/       # Declarative Helm values and templates
│   └── k8s/                           # Raw Kubernetes manifests
│       ├── deployment.yaml            # Deployment definition with health probes
│       └── service.yaml               # ClusterIP & LoadBalancer service setup
│
├── LICENSE                            # MIT License file
└── README.md                          # Platform root documentation
```

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router with Turbopack for high performance and fast telemetry handling |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end static type safety across Web, SDK, and Infrastructure |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Modern utility-first styling with custom dark-mode tokens |
| **UI Components** | [Headless UI](https://headlessui.com/) & [Radix UI](https://www.radix-ui.com/) | Unstyled, fully accessible UI primitives |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Fluid UI micro-interactions, page transitions, and status highlights |
| **Database & ORM** | [Prisma v7](https://www.prisma.io/) & [Neon Postgres](https://neon.tech/) | Serverless PostgreSQL database with automated ORM migrations |
| **State Management** | [TanStack Query v5](https://tanstack.com/query) & [Zustand](https://github.com/pmndrs/zustand) | Asynchronous state management, caching, and global UI state |
| **Auth & Security** | [NextAuth.js v4](https://next-auth.js.org/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | JWT session management, salted password hashing, and API Key validation |
| **Analytics & Data** | [ApexCharts](https://apexcharts.com/) | Interactive error volume histograms and system health visualizations |
| **Container & Cloud** | Docker, Kubernetes, Helm, Terraform | Cloud-native deployment tooling for scalable enterprise hosting |

---

## 🏁 Quick Start Guide

Follow these instructions to set up and run BugTrace locally.

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm** (v9+) or **pnpm** (v8+)
- **PostgreSQL Database**: A running local PostgreSQL server or a free [Neon Serverless Postgres](https://neon.tech/) database URL.

### 1. Clone the Repository

```bash
git clone https://github.com/ankitdeveloper7/Error-Tracker.git
cd Error-Tracker
```

### 2. Install Monorepo Dependencies

```bash
# Install root and workspace dependencies
cd web
npm install
```

### 3. Environment Configuration

Create a `.env` file inside the `web` directory:

```bash
cp .env.example .env
```

Populate the `.env` file with your credentials:

```env
# Database connection string (PostgreSQL / Neon Postgres)
DATABASE_URL="postgresql://username:password@ep-sample-123456.neon.tech/bugtrace?sslmode=require"

# NextAuth Authentication Secret
NEXTAUTH_SECRET="your-super-secret-jwt-signing-key-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Application Public URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Prisma Migration

Generate the Prisma Client and apply the database schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Launch the Development Server

Start the Next.js development server with Turbopack acceleration:

```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** to access the BugTrace Web Dashboard.

---

## 🔑 Environment Variables Reference

| Variable | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `DATABASE_URL` | PostgreSQL or Neon DB connection string with SSL parameters | **Yes** | — |
| `NEXTAUTH_SECRET` | Secret key used to encrypt and sign NextAuth JWT sessions | **Yes** | — |
| `NEXTAUTH_URL` | Canonical root URL for authentication callbacks | **Yes** | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Base public URL of the application dashboard | **No** | `http://localhost:3000` |

---

## 📦 SDK Integration & Usage

The `bugtrace-sdk` package allows you to automatically track errors in client and server JavaScript/TypeScript applications.

### Installation

```bash
npm install bugtrace-sdk
```

### Node.js / Express / Next.js Setup

Initialize the SDK at your application entry point:

```typescript
import { init, captureException } from "bugtrace-sdk";

// Initialize SDK with your project API Key and Environment
init({
  projectId: "YOUR_PROJECT_ID_FROM_DASHBOARD",
  user_id: "user_12345", // Optional: Track affected user ID
  Environment: "Production", // Options: "Production" | "Staging" | "Development"
});

// Manual exception capture
try {
  // Business logic code
  throw new Error("Payment gateway connection timeout");
} catch (error) {
  captureException(error, {
    additionalContext: "Order Checkout Page",
  });
}
```

### Automatic Capture Capabilities

When initialized, `bugtrace-sdk` automatically attaches handlers for:
- 🌐 **Browser**: `window.onerror` and `window.onunhandledrejection` events.
- ⚙️ **Node.js**: `process.on('uncaughtException')` and `process.on('unhandledRejection')`.

---

## 📡 API Specifications

BugTrace provides RESTful APIs for telemetry ingestion, project administration, and alerting.

### 1. Error Ingestion Endpoint

- **URL**: `/api/ingest`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Request Payload Schema

```json
{
  "apikey": "proj_api_key_abc123xyz",
  "errorType": "TypeError",
  "message": "Cannot read property 'id' of undefined",
  "fileName": "app/services/checkout.ts",
  "lineNumber": 142,
  "error": "TypeError: Cannot read property 'id' of undefined\n  at processOrder (app/services/checkout.ts:142:12)",
  "severity": "Error",
  "environment": "Production"
}
```

#### Successful Response (`200 OK`)

```json
{
  "success": true,
  "issuehashId": "e99a18c428cb38d5f260853678922e03",
  "message": "Error logged successfully"
}
```

### 2. Platform Endpoints Summary

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/projects` | `GET` | Fetch all registered projects for the authenticated user |
| `/api/projects` | `POST` | Create a new project workspace and auto-generate an API key |
| `/api/analytics` | `GET` | Retrieve aggregate error statistics and daily trend metrics |
| `/api/alerts` | `GET` | List active notification alert rules |
| `/api/alerts` | `POST` | Define new alert conditions and failure thresholds |
| `/api/search` | `GET` | Perform full-text search across errors by message or file name |

---

## 📊 Database Domain Model

The database is built on PostgreSQL via Prisma ORM v7, organized around multi-tenant projects, error tracking, analytics, and alerting:

```mermaid
erDiagram
    User ||--o{ Project : "owns"
    User ||--o{ ErrorAnalytics : "tracks"
    User ||--o{ ErrorType : "categorizes"
    Project ||--o{ Error : "captures"
    Project ||--o{ ProjectHealth : "computes"
    Project ||--o{ AlertRule : "configures"
    AlertRule ||--o{ AlertHistory : "logs"

    User {
        int id PK
        string name
        string email UK
        string password
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
        int userId FK
    }

    Error {
        int id PK
        string errorType
        string message
        string fileName
        int lineNumber
        string error
        int occurrence
        string issuehashId UK
        Severity severity
        Status status
        datetime createdAt
        datetime updatedAt
        string projectId FK
    }

    ProjectHealth {
        int id PK
        int totalerrors
        int resolvederror
        float uptimepercentage
        Projectstatus status
        string projectId FK
    }

    AlertRule {
        string id PK
        string name
        string condition
        boolean destination
        boolean active
        datetime lastTriggered
        string projectId FK
    }

    AlertHistory {
        string id PK
        string ruleName
        string project
        string triggeredAt
        Status status
        string details
        string alertruleId FK
    }
```

---

## ☁️ Infrastructure & DevOps Deployment

BugTrace includes complete production-grade deployment scripts inside the `infrastructure/` directory.

### 🐳 Docker Containerization

To build and run the web dashboard using Docker:

```bash
# Build Docker image
docker build -t bugtrace-web:latest ./web

# Run container with environment variables
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-nextauth-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  --name bugtrace-app \
  bugtrace-web:latest
```

### ☸️ Kubernetes Deployment

Deploy to any Kubernetes cluster (`kubectl`):

```bash
# Apply deployment and service manifests
kubectl apply -f infrastructure/k8s/deployment.yaml
kubectl apply -f infrastructure/k8s/service.yaml
```

### ☸️ Helm Chart Deployment

Deploy using the provided Helm chart:

```bash
helm install error-tracker infrastructure/helm/error-tracker-chart
```

### 🏗️ Terraform Infrastructure Provisioning

Provision cloud resources automatically using Terraform:

```bash
cd infrastructure/Terraform
terraform init
terraform plan
terraform apply
```

---

## 🎨 UI/UX Design Engine

BugTrace Web follows strict architectural design principles to deliver a modern, high-polish developer dashboard:

> [!NOTE]
> **Design Philosophy & Visual Polish**
> - **60-30-10 Color System**: Built around deep dark surfaces (`#000000`, `#09090b`), sleek card containers (`#18181b`), and vibrant emerald accent highlights (`#00E599`).
> - **Glassmorphic Elevations**: Translucent backdrops with backdrop blur filters (`backdrop-blur-md bg-black/50`).
> - **Smooth Animations**: Motion-driven state transitions powered by **Framer Motion**.
> - **Defensive UX**: Comprehensive loading skeletons, empty state illustrations, and robust fallback views for incomplete stack traces.

---

## 🤝 Contributing

Contributions to BugTrace are welcome and highly appreciated! To contribute:

1. **Fork** the Repository
2. Create a Feature Branch (`git checkout -b feature/AwesomeFeature`)
3. Commit your Changes (`git commit -m 'Add some AwesomeFeature'`)
4. Push to the Branch (`git push origin feature/AwesomeFeature`)
5. Open a **Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.

---

## 👥 The Core Engineering Team

| Developer | Role | GitHub Profile |
| :--- | :--- | :--- |
| **Ankit Kumar** | 💻 Core Full-Stack Developer | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ankitkodes) |
| **Abhijeet Kumar** | 🚀 DevOps & Infrastructure | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhijeet32) |

<br />

<div align="center">
  <sub>Engineered with precision for developers who value performance, reliability, and clean software architecture.</sub>
</div>
