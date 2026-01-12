# BugTrace 🐞

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.0-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)

**BugTrace** is a powerful, self-hosted error tracking solution designed for modern web applications. It provides real-time insights into application stability, helping developers identify, diagnose, and fix bugs faster.

## 🚀 Features

- **Real-time Error Tracking**: Instantly capture and log errors from your web applications.
- **Detailed Bug Reports**: View stack traces, user context, and environment details.
- **Interactive Dashboard**: Visualize error trends and project health.
- **Custom SDK**: Lightweight TypeScript SDK (`bugtrace-sdk`) for easy integration.
- **Secure Authentication**: Built-in user management and project isolation.
- **Modern UI**: Built with Next.js 15 and Tailwind CSS 4 for a premium user experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Headless UI](https://headlessui.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

## 📂 Project Structure

This project is organized as a monorepo:

- **`web/`**: The main Next.js dashboard application.
- **`packages/sdk/`**: The `bugtrace-sdk` library for client/server integration.

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn
- A database (PostgreSQL/MySQL) supported by Prisma

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/ankitdeveloper7/Error-Tracker.git
    cd Error-Tracker
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `web` directory:

    ```bash
    cp web/.env.example web/.env
    ```

    Update the `.env` file with your database credentials and other secrets.

4.  **Database Setup**
    Initialize the database using Prisma:

    ```bash
    cd web
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The website will be available at `http://localhost:3000`.

## 📦 SDK Integration

To track errors in your application, install and initialize the SDK:

```bash
npm install bugtrace-sdk
```

```typescript
import { init } from "bugtrace-sdk";

init({
  projectId: "YOUR_PROJECT_ID",
  user_id: "USER_ID", // Optional: For tracking affected users
  Environment: "Production", // or "Development"
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Meet the Team

| Name | Role | GitHub |
| :--- | :--- | :--- |
| **Ankit Kumar** | 💻 Development | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ankitkodes) |
| **Abhijeet Kumar** | 🚀 Deployment | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhijeet32) |

