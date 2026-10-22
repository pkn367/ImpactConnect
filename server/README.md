# ImpactConnect server (Express + MongoDB)

1. Copy `.env.example` to `.env` and fill in MONGO_URI (from MongoDB Atlas) and JWT_SECRET.
2. `npm install`
3. `npm run seed`   (loads the NGOs and events into MongoDB; run once)
4. `npm run dev`    (starts the API on http://localhost:5000)

You should see: "MongoDB connected" and "Server listening on http://localhost:5000".
