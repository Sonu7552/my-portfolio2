This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# Hybrid DevOps Portfolio & Engineering Showcase

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins_CI/CD-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A dual-pipeline engineering portfolio demonstrating the transition from Software Engineering to DevOps. This project implements a **Hybrid Architecture** combining Modern Serverless (Vercel) with Traditional Enterprise Infrastructure (AWS/Jenkins).

## 🏗️ Architecture Overview

### 1. Frontend (The "Control Plane")
* **Framework:** Next.js 15 (React)
* **Deployment:** Vercel Edge Network (GitOps)
* **Observability:** Custom Serverless API (`/api/health`) for real-time container metrics.
* **Dashboard:** Visualizes latency, memory pressure, and simulated pipeline logs.

### 2. Backend Infrastructure (The "Workload")
* **Host:** AWS EC2 (t2.micro / Ubuntu Linux)
* **Containerization:** Docker (Multi-stage builds, Node 20 Alpine)
* **Orchestration:** Jenkins (Declarative Pipeline)
* **Networking:** Nginx Reverse Proxy (Port 80 -> 3000)

---

## 🛠️ Key Engineering Challenges Solved

### 🟢 1. The "Swap Memory" Fix (Linux Admin)
**Problem:** The AWS Free Tier t2.micro instance (1GB RAM) repeatedly crashed during `npm run build` due to Out-Of-Memory (OOM) errors.
**Solution:**
* Diagnosed the crash using `htop` and system logs.
* Created a **2GB Swap File** to offload inactive memory pages to disk.
* Result: Stable builds with zero additional cost.

### 🟡 2. Live Volume Expansion (Storage)
**Problem:** The default 8GB EBS volume filled up with Docker image layers, causing CI failures.
**Solution:**
* Modified the EBS Volume in AWS Console to 20GB.
* Used `lsblk`, `growpart`, and `resize2fs` to resize the Linux partition **live without downtime**.

### 🔵 3. Hybrid Monitoring Strategy
**Problem:** Needed to display metrics from a Serverless environment on the client side.
**Solution:**
* Built a self-introspection API (`/api/health`) that queries the Node.js `process` object.
* Exposes Real-time Uptime, Region, and Memory Usage to the frontend dashboard.

---

## 🚀 CI/CD Pipelines

### Pipeline A: Modern GitOps (Frontend)
* **Trigger:** Push to `main` branch.
* **Action:** Vercel builds Next.js app and deploys to Global Edge CDN.
* **Feature:** Instant Rollbacks and Preview Environments.

### Pipeline B: Enterprise Automation (Backend)
* **Tool:** Self-Hosted Jenkins on EC2.
* **Stages:**
    1.  `Checkout SCM`
    2.  `Build Docker Image`
    3.  `Stop Old Container`
    4.  `Run New Container`
    5.  `System Prune` (Cleanup)

---

## 💻 Tech Stack

* **Cloud:** AWS (EC2, Security Groups, EBS), Vercel
* **DevOps:** Docker, Jenkins, Linux (Bash), Git
* **Frontend:** TypeScript, Tailwind CSS, Framer Motion
* **Monitoring:** Custom Health API, Simulated Log Aggregation

---

*Built by Muhammad Saqib Afzal - Software Engineer Transitioning to DevOps*

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
