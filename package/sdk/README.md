# bugtrace-sdk

A lightweight, universal error tracking SDK for modern JavaScript and TypeScript applications. Seamlessly integrate with BugTrace to monitor application stability in real-time.

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

MIT © [Ankit Kumar](https://github.com/ankitdeveloper7)
