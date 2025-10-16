# 🧠 Mini CMS – Remix + Prisma + Supabase

A lightweight **Content Management System (CMS)** built with **Remix v7**, **Prisma**, and **Supabase (Postgres)**.  
Users can create, edit, delete, and browse articles arranged in a **category → sub-article tree**.

---

## 🚀 Features

- ✏️ CRUD operations for articles  
- 🌳 Tree structure (parent/child hierarchy)  
- 🪶 Markdown / Rich Text editing (extendable)  
- 🔐 Optional Supabase Auth (email/password)  
- 🌀 Remix SSR with Prisma ORM  
- 🎨 TailwindCSS styling  
- ☁️ Deployable on **Vercel**

---

## 🧩 Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | Remix v7 + React |
| Backend | Remix Loaders/Actions |
| ORM | Prisma |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| Auth (Optional) | Supabase Auth |
| Deployment | Vercel |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/remix-supabase-cms.git
cd remix-supabase-cms
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in the project root with the following:

```bash
# Database (from Supabase)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/dbname"

# Supabase (optional)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"


SEED_SECRET=

VITE_TINYMCE_API_KEY=

```

---

### 4️⃣ Database Setup (Prisma + Supabase)

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Optionally, open Prisma Studio to inspect data:

```bash
npx prisma studio
```

---

### 5️⃣ Run the Development Server

```bash
npm run dev
```

---

# 🌀 Welcome to React Router!

A modern, production-ready template for building full-stack React applications using **React Router**.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

---

## 🌟 Features

- 🚀 Server-side rendering  
- ⚡️ Hot Module Replacement (HMR)  
- 📦 Asset bundling and optimization  
- 🔄 Data loading and mutations  
- 🔒 TypeScript by default  
- 🎉 TailwindCSS for styling  
- 📖 [React Router docs](https://reactrouter.com/)

---

## 🧱 Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your app will be available at **http://localhost:5173**.

---

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

---

## 🚢 Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

The containerized app can be deployed to any platform that supports Docker, such as:

- AWS ECS  
- Google Cloud Run  
- Azure Container Apps  
- Digital Ocean App Platform  
- Fly.io  
- Railway

---

### DIY Deployment

If you prefer a manual setup, the built-in Remix app server is **production-ready**.  
Ensure you deploy the output from `npm run build`:

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

---

## 🎨 Styling

This template comes with **[Tailwind CSS](https://tailwindcss.com/)** preconfigured for simplicity.  
You can extend or replace it with any CSS framework you prefer.

---

Built with ❤️ using **React Router** and **Remix**.
