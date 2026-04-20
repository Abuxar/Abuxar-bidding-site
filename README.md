# 🏛️ Prestige: MERN Luxury Auction Platform

A highly responsive, real-time encrypted auction bidding platform built globally with the MERN stack (MongoDB, Express, React, Node.js). Engineered flawlessly for absolute concurrency, security, and prestige aesthetics.

## 🏗️ Master Architecture & Features

### 1. Market Mechanics
- **Real-time Bidding**: Instant, sub-millisecond updates leveraging `Socket.io` paired with `Redis` pub/sub for massive horizontal cluster scaling.
- **Atomic Anti-Snipe Engines**: Database operations automatically block simultaneous bidding race conditions. If an elite buyer places a bid within the final 60 seconds of a market, the countdown dynamically extends by 2 minutes to prevent sniping operations.

### 2. Encryption & Security
- **Full-Stack Cryptography**: Passwords natively hashed via `bcryptjs`. Authentication runs on HTTP-only, secure rotating `JWTs` that cannot be hijacked via XSS.
- **Network Guards**: Protected by `helmet` payload headers, nested CORS resolutions, and strict `express-rate-limit` engines to halt autonomous probing.

### 3. Integrated Microservices
- **Background Mailer Queues**: Leveraging asynchronous `Bull` queues over `Redis`, system transactions (such as outbid notices or `auction_won` finalities) seamlessly trigger HTML `Nodemailer` dispatches without blocking the main event loop asynchronously.
- **Cloudinary CDN Integration**: Verified users run direct `multipart/form-data` uploads handling profile `avatars` mapped securely to high-availability external storage.

### 4. Admin Command Center
- Built-in `AdminDashboard` frontend mapped securely over verified context arrays.
- Features absolute master execution blocks to issue database `bans` and evaluate aggregate system economics instantaneously via private GUI nodes.

### 5. UI/UX: Luxury Aesthetics 
- Visualized completely via TailwindCSS framework, Framer Motion element logic, and glassmorphism styling parameters. Custom beige, gold, and dark bronze stardust color schemas.

## ⚙️ Environment Variables Setup

For security reasons, all production configuration credentials and secrets must be injected dynamically via `.env` files (`server/.env`, `client/.env`) or handled through your deployment platform's secrets manager. 
**Never commit real credentials to public source control.**

## 🛠️ Local Development

1. Setup the backend dependencies:
   ```bash
   cd server
   npm install
   ```
2. Spin up Local DB & Cache:
   Ensure Docker is running, then inside the project root run to trigger Upstash defaults:
   ```bash
   docker-compose up -d
   ```
3. Run the Node.js server:
   ```bash
   npm run dev
   ```
4. Setup the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🚀 Deployment (Serverless Delivery)

### Frontend (Vercel)
1. Push your repository to GitHub.
2. Sign in to Vercel and import the `client` directory as the build root.
3. The included `vercel.json` guarantees strict React-Router paths resolve dynamically to your index payload.

### Backend (Render.com)
1. In Render, deploy a new "Web Service".
2. Plug all corresponding environment variables into Render's secured vaults.

### ⚠️ UptimeRobot Cold-Start Mitigation
Render's free tier aggressively sleeps your Node.js server after 15 minutes of inactivity. To ensure your real-time WebSocket connection does not stall:
- Create a free account at [UptimeRobot.com](https://uptimerobot.com).
- Create an HTTP(s) Monitor pointing to your Render.com domain REST URL.
- Set the active ping interval to exactly **5 minutes**. 

---
_Developed and Maintained as a Master-Class implementation of full-stack scalability protocols._
