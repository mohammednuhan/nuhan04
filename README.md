# Mohammed Nuhan — Portfolio

A fully responsive personal portfolio website for **Mohammed Nuhan** — AI/ML Engineer & Full-Stack Developer.

**Live:** [Deployed on Vercel](https://nuhanportfolio04.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, react-icons |
| Backend | Node.js, Express 4, Prisma ORM |
| Database | PostgreSQL (Neon) |
| Deployment | Vercel (frontend), Render/Railway (backend) |

## Project Structure

```
Nuhanportfolio04/
├── frontend/              # React + Vite SPA
│   ├── public/images/     # Static images & SVGs
│   ├── src/
│   │   ├── components/    # Navbar, Hero, About, Skills, Education, Projects, Beyond, Contact, Footer
│   │   ├── styles/        # CSS modules per component
│   │   ├── lib/api.js     # API helper (fetch wrapper)
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML shell
│   └── vite.config.js     # Vite config with /api proxy
│
├── backend/               # Express + Prisma API
│   ├── src/
│   │   ├── index.js       # Server entry, CORS, routes
│   │   ├── routes/        # skills, projects, education, beyond, contact, siteInfo
│   │   └── middleware/    # Error handler
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.js        # Seed script
│   └── .env.example       # Environment template
│
├── package.json           # Root scripts (dev, build, install:all)
├── vercel.json            # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database (local or Neon/Supabase)

### Installation

```bash
# Clone the repo
git clone https://github.com/mohammednuhan/Nuhanportfolio04.git
cd Nuhanportfolio04

# Install all dependencies (frontend + backend)
npm run install:all
```

### Environment Setup

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env — set DATABASE_URL, PORT, FRONTEND_URL
```

**`backend/.env`**
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`** (optional)
```
VITE_API_URL=/api
```

### Database

```bash
# Push schema to database
npm run db:push

# Seed with default data
npm run db:seed
```

### Run Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

Vite proxies `/api` requests to the backend in development.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/skills` | List all skills |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/featured` | Featured projects only |
| GET | `/api/education` | Education history |
| GET | `/api/beyond/traits` | Beyond-the-keyboard traits |
| GET | `/api/beyond/sports` | Sports achievements |
| GET | `/api/site-info` | Static site information |
| POST | `/api/contact` | Submit contact message |

## Deployment

### Frontend (Vercel)

The root `vercel.json` handles the build:

```json
{
  "installCommand": "cd frontend && npm install",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite"
}
```

1. Push to GitHub
2. Import on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects the config and deploys

### Backend (Render / Railway)

```bash
# Set environment variables in the platform dashboard
# Build command: npm install && npx prisma generate
# Start command: npm start
```

## License

Personal project — Mohammed Nuhan.
