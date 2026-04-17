# 🚀 MERN Stack Auction Bidding Platform

A highly responsive, real-time auction bidding platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 🏗️ Architecture & Features

- **Real-time Bidding**: Instant updates leveraging `Socket.io` paired with `Redis` pub/sub for massive horizontal scaling.
- **Anti-Snipe Guard**: Atomic database operations automatically protect against simultaneous bidding race conditions and auto-extends the auction by 2 minutes if bids are placed within the final 60 seconds.
- **Security First**: Bulletproof `bcryptjs` cryptography, JWT HTTP-only rotations, `helmet` header defenses, and `express-rate-limit`.
- **Background Queues**: Asynchronous `Bull` queues for high-throughput Nodemailer transactional emails.
- **Premium UI**: Glassmorphism aesthetic built natively using TailwindCSS + Framer Motion.

## ⚙️ Environment Variables Setup

For security reasons, all production configuration credentials and secrets must be injected dynamically via `.env` files (`server/.env`, `client/.env`) or handled through your deployment platform's secrets manager. Never commit real credentials to public source control.

## 🛠️ Local Development

1. Setup the backend dependencies:
   \`\`\`bash
   cd server
   npm install
   \`\`\`
2. Spin up Local DB & Cache:
   Ensure Docker is running, then inside the project root run:
   \`\`\`bash
   docker-compose up -d
   \`\`\`
3. Run the Node.js server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Setup the frontend:
   \`\`\`bash
   cd client
   npm install
   npm run dev
   \`\`\`

## 🚀 Deployment Guide (Zero Cost Tier)

### Frontend (Vercel)

1. Push your repository to GitHub.
2. Sign in to Vercel and import the `client` directory.
3. The included `vercel.json` guarantees React Router paths resolve directly to `index.html`.

### Backend (Render.com)

1. In Render, create a new "Web Service".
2. Set root directory to `server` and execution build command to `npm install`.
3. Set start command to `node server.js`.
4. Plug all corresponding environment variables into Render's dashboard.

### ⚠️ UptimeRobot Cold-Start Mitigation

Render's free tier aggressively sleeps your Node.js server after 15 minutes of inactivity. To ensure the presentation video does not contain a slow 60-second delay:

- Create a free account at [UptimeRobot.com](https://uptimerobot.com).
- Create an HTTP(s) Monitor pointing to your Render.com domain URL.
- Set the interval to exactly **5 minutes**. This prevents the hardware from spinning down.
