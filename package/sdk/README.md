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

```bash
npm install bugtrace-sdk
# or
pnpm add bugtrace-sdk
# or
yarn add bugtrace-sdk
```

## 🚀 Quick Start

### Browser Integration (React, Next.js, Vue)

Initialize the SDK in your application's entry point (e.g., `layout.tsx`, `App.tsx`, or `main.ts`).

```typescript
import { init } from 'bugtrace-sdk';

init({
  projectId: "YOUR_PROJECT_ID",
  user_id: "anonymous", // Optional: Identifier for the current user
  Environment: "Production" // "Development" | "Staging" | "Production"
});
```

### Node.js Integration

The SDK automatically detects the environment. Use the same initialization method for your backend services.

```typescript
import { init } from 'bugtrace-sdk';

init({
  projectId: "YOUR_PROJECT_ID",
  user_id: "server-1",
  Environment: "Production"
});
```

## ⚙️ Configuration

The `init` function accepts a configuration object with the following properties:

| Option | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectId` | `string` | **Yes** | Your unique project identifier from the BugTrace dashboard. |
| `user_id` | `string` | No | An identifier for the user affected by the error (e.g., email, ID). |
| `Environment` | `string` | No | The environment where the app is running (default: `Production`). |

## 🛡️ Features

- **Automatic Error Capture**: Automatically listens for `window.onerror` and `unhandledRejection` in the browser, and `uncaughtException` in Node.js.
- **Cross-Platform**: Works seamlessly in both browser and server-side environments.
- **Lightweight**: Minimal footprint to ensure no impact on application performance.
- **TypeScript Support**: Built with TypeScript for excellent type safety and autocompletion.

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/ankitkodes">Ankit Kumar</a></sub>
</div>
