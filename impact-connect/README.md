# ImpactConnect

A full-stack **MERN** platform that connects volunteers, NGOs and donors. Volunteers discover verified organizations and sign up for events; NGO accounts manage their own listings. All data lives in MongoDB and is served through a REST API.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with Mongoose |
| Auth and security | JWT, bcrypt password hashing, Helmet, rate limiting, CORS |

## How it works

```
React (browser)  ->  Express on Node.js  ->  Mongoose  ->  MongoDB Atlas
   what you see      routes, rules, auth      queries       stored data
```

## Features

- Register and log in with role-based accounts (Volunteer, Donor, NGO, Corporate)
- Passwords hashed with bcrypt; sessions use signed JWT tokens
- Browse, search and filter 30 NGOs; each NGO page lists its own events
- Event registration with live seat counts and capacity checks
- NGO accounts can create, edit and delete their own organizations (ownership enforced on the server)
- Personal dashboard showing joined events
- Live stats on the home page, computed in MongoDB with aggregation pipelines
- Server status page at `http://localhost:5000` with live request log and endpoint list

## Project structure

```
server/
  server.js        app setup and middleware
  routes/          URL definitions
  controllers/     the logic behind each route
  middleware/      auth guard, logger, async error handler
  models/          Mongoose schemas (User, NGO, Event)
  seed/            sample data (30 NGOs, 30 events)
  views/           status page
impact-connect/    React app (src/pages, src/components, src/context, src/lib)
```

## Run it locally

1. Create a free MongoDB Atlas cluster, a database user, and allow network access. Copy the connection string.
2. Backend:
   ```bash
   cd server
   cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
   npm install
   npm run seed
   npm run dev              # http://localhost:5000
   ```
3. Frontend (second terminal):
   ```bash
   cd impact-connect
   npm install
   npm run dev              # http://localhost:5173
   ```

## API overview

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Login |
| GET | /api/ngos, /api/ngos/:id | Public |
| POST / PUT / DELETE | /api/ngos | NGO owner |
| GET | /api/events | Public |
| POST | /api/events/:id/register | Login |
| GET | /api/stats, /api/status, /api/health | Public |

## Roadmap

- Event creation and management for NGO accounts
- Server-side search and pagination
- Input validation with express-validator
- Deployment (Render for the API, Vercel or Netlify for the website)
