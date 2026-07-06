# 🛒 Next.js 16 Ecommerce App (Platzi Integration)

This is a modern, high-performance Full-Stack Ecommerce web application built using **Next.js 16 (App Router)** and optimized with **Turbopack**. It features state management via **Zustand**, secure **Middleware Authentication**, and a streamlined custom checkout workflow.

---

## ✨ Features

* **⚡ Next.js 16 & Turbopack:** Blazing fast build times and Hot Module Replacement (HMR).
* **🛒 Advanced Cart System:** Powered by Zustand for global state management with persistent storage syncing.
* **🔒 Hybrid Middleware Auth:** Custom route protection (`/checkout`, `/profile`, etc.) checking both `document.cookie` and `localStorage` to sync client and server state seamlessly.
* **💳 Dynamic Checkout & Payment UI:**
  * Cash on Delivery (COD) configuration.
  * Mobile Banking option (KBZPay / WavePay) featuring an elegant dark-themed layout and interactive **QR Code integration**.
* **🎨 UI Component Library:** Integrated with **PrimeReact** and **Tailwind CSS** for responsive, smooth, and beautiful user interfaces.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Build Tool:** Turbopack
* **State Management:** Zustand
* **Styling:** Tailwind CSS & PrimeReact
* **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and Docker installed on your machine.

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
Install dependencies:

Bash
npm install
Run the development server locally:

Bash
npm run dev --turbo
Open http://localhost:3000 with your browser to see the result.

🐳 Running with Docker
Whenever you make changes to core components like Zustand stores, Auth cookies, or Middlewares, you need to rebuild the image and rerun the container to apply the updates.

Option 1: Using Docker Compose (Recommended & Easiest)
If you have a docker-compose.yml file, this single command will automatically stop the old container, rebuild your latest code changes, and start the app fresh:

Bash
docker compose up -d --build
Option 2: Using Standard Docker Commands (Step-by-Step)
If you prefer running via regular Docker commands, follow these precise steps:

Build the Docker Image from your source code:

Bash
docker build -t nextjs-ecommerce-image .
Run the fresh container in Production Mode (Background):

Bash
docker run -d \
  --name nextjs-ecommerce-app \
  -p 3000:3000 \
  --restart unless-stopped \
  nextjs-ecommerce-image
Run in Development Mode (With Hot-Reload / Volume Mount):
Use this if you want code edits on your local machine to sync instantly inside the running Docker container.

Bash
# For Linux/macOS
docker run -it \
  --name nextjs-ecommerce-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/.next \
  -v /app/node_modules \
  nextjs-ecommerce-image \
  npm run dev --turbo
🛑 Managing the Container
To stop, restart, or clean up the running container:

Bash
# Restart the container quickly
docker restart nextjs-ecommerce-app

# Run the container
sudo docker run -p 3000:3000 --name my-ecommerce-app ecommerce-frontend

# Stop the running container
docker stop nextjs-ecommerce-app

# Remove the container from the system (Does not delete your image)
docker rm nextjs-ecommerce-app
📂 Project Architecture Notes
🔑 Authentication Sync Mechanism
To prevent route-blocking issues on protected pages, the authentication store (useAuthStore) writes tokens to both:

localStorage (For Client-side Zustand persistence)

document.cookie (For Server-side Next.js Middleware validation)

🗺️ Middleware Placement
The middleware.ts file must be located directly under the src/ directory (src/middleware.ts) or the root directory, not inside src/app/.

📝 License
This project is licensed under the MIT License.