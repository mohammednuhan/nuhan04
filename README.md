# Mohammed Nuhan — Portfolio

A fully responsive personal portfolio for **Mohammed Nuhan** — AI/ML Engineer & Full-Stack Developer.

## Stack
- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express + Prisma
- **Database:** PostgreSQL (Neon)

## Structure
```
backend/   Express + Prisma API (port 5000)
frontend/  React + Vite app     (port 5173)
```

## Quick Start
```bash
npm run install:all   # install dependencies
npm run db:push       # apply schema
npm run db:seed       # seed data
npm run dev           # run frontend + backend
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Config
- `backend/.env` → `DATABASE_URL`, `PORT`, `FRONTEND_URL`
- `frontend/.env` → `VITE_API_URL` (default `/api`)

## Deploy
- Frontend: `npm run build` → host `frontend/dist` (Vercel/Netlify)
- Backend: Node host (Render/Railway/Vercel) → `npm start`
