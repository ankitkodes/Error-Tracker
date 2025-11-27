# BugTrace SDK

<div align="center">

![Version](https://img.shields.io/npm/v/bugtrace-sdk?style=for-the-badge&color=blue)
![License](https://img.shields.io/npm/l/bugtrace-sdk?style=for-the-badge&color=green)
![Downloads](https://img.shields.io/npm/dt/bugtrace-sdk?style=for-the-badge&color=orange)
![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue?style=for-the-badge&logo=typescript)

**The Universal Error Tracking Solution for Modern Applications.**

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Configuration](#-configuration) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Introduction

**BugTrace SDK** is a powerful, lightweight, and universal error tracking library designed to give you complete visibility into your application's stability. Whether you're running a high-traffic Node.js backend or a dynamic React frontend, BugTrace seamlessly integrates to capture, analyze, and report errors in real-time.

Stop guessing why your app crashed. Start tracing bugs with precision.

## ✨ Features

- **🌍 Universal Compatibility**: A single SDK that intelligently adapts to both **Browser** and **Node.js** environments.
- **⚡ Zero-Config Auto-Capture**: Automatically hooks into `window.onerror`, `unhandledRejection`, and `uncaughtException` to catch every crash.
- **🛡️ Type-Safe Architecture**: Built entirely in **TypeScript**, providing first-class type definitions and autocomplete support.
- **🚀 Ultra Lightweight**: Minimal footprint ensures your application's performance remains uncompromised.
- **🔍 Environment Context**: Distinguish clearly between `Development`, `Staging`, and `Production` errors.

## 📦 Installation

Install the SDK via npm:

```bash
npm install bugtrace-sdk
```

## 🚀 Quick Start

Initialize BugTrace once at the root of your application, and let it handle the rest.

### 🌐 Browser Integration (React, Next.js, Vue, Angular)

Add this to your main entry file (e.g., `main.ts`, `App.tsx`, or `layout.tsx`):

```typescript
import { init } from 'bugtrace-sdk';

init({
  projectId: "YOUR_PROJECT_ID",
  user_id: "user_123", // Optional: Track which user experienced the error
  environment: "Production" // Optional: Defaults to Production
});
```

### 🖥️ Node.js Integration (Express, NestJS, Fastify)

For backend services, initialize it as early as possible in your server's startup script:

```typescript
import { init } from 'bugtrace-sdk';

init({
  projectId: "YOUR_PROJECT_ID",
  user_id: "server-instance-01",
  environment: "Production"
});
```

## ⚙️ Configuration

The `init` function accepts a strictly typed `SDKconfig` object:

| Option | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectId` | `string` | **Yes** | Your unique project API key from the BugTrace dashboard. |
| `user_id` | `string` | **Yes** | Identifier for the user or system entity (e.g., email, UUID). |
| `environment` | `Environment` | **Yes** | The runtime environment. Values: `Production`, `Staging`, `Development`. |

### Environment Enum

```typescript
enum Environment {
  Production,
  Staging,
  Development
}
```

## 🛠️ Tech Stack

BugTrace SDK is engineered with a focus on reliability and modern standards:

- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.9+) - For robust, type-safe code.
- **Networking**: [Axios](https://axios-http.com/) - For efficient, promise-based HTTP requests.
- **Runtime**: Node.js & Modern Browsers.

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/ankitkodes">Ankit Kumar</a></sub>
</div>
