# Paytm Clone - End-to-End Modern Payment App

This is a comprehensive, production-ready payment application built inside a **Turborepo** monorepo. It features a User Wallet, P2P Money Transfers, a Merchant Dashboard, and a Bank Webhook system for simulating secure money deposits.

## 🚀 Features

*   **P2P Transfers**: Send money to other users securely using their phone number.
*   **Wallet Balance**: View current balance and locked funds (during active transactions).
*   **On-Ramp Transactions**: Simulate adding money from a bank account into the internal wallet.
*   **Secure Authentication**: NextAuth.js for secure user sessions and Merchant logins (OAuth support).
*   **Monorepo Architecture**: Managed with Turborepo, isolating apps and shared configuration (UI, ESLint, TypeScript, Database).
*   **Robust Database**: PostgreSQL setup managed completely by Prisma ORM.

## 🛠️ Tech Stack

*   **Framework:** Next.js (App Router), Express.js (Webhooks)
*   **Language:** TypeScript
*   **Monorepo:** Turborepo, npm Workspaces
*   **Database:** PostgreSQL, Prisma ORM
*   **Styling:** Tailwind CSS (within Next.js apps)
*   **Authentication:** NextAuth.js
*   **Containerization:** Docker

## 📁 Repository Structure

### Apps (`apps/`)
*   `user-app`: Main Next.js application for users (Dashboard, P2P Transfers, Add Money, Transactions).
*   `merchant-app`: Next.js application for merchant access.
*   `bank-webhook`: Express server simulating real bank APIs that confirm success/failure of On-Ramp money deposits into the wallet.

### Shared Packages (`packages/`)
*   `db`: Prisma schema, database migrations, and generated Prisma Client.
*   `ui`: Shared React components (`Appbar`, `Button`, `TextInput`, `Card`, etc.).
*   `store`: Centralized State Management/Stores.
*   `eslint-config` & `typescript-config`: Shared static analysis constraints across all TS/JS code.

## ⚙️ Getting Started

### Prerequisites
*   Node.js (>= 18)
*   Docker & Docker Compose (or a local PostgreSQL instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd paytm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup (PostgreSQL):**
   Start the Postgres database using Docker:
   ```bash
   docker-compose up -d
   ```
   
   *You'll need a `.env` file with `DATABASE_URL` configured internally pointing to the Postgres instance.*

4. **Initialize Prisma:**
   Run the following commands to create the tables and generate the Prisma client:
   ```bash
   cd packages/db
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the Development Server:**
   Go back to the root folder:
   ```bash
   cd ../../
   npm run dev
   ```
   *This single command will spin up the `user-app`, `merchant-app`, and `bank-webhook` simultaneously.*

## 🏦 How Money Gets Added (On-Ramp Flow)
1. The user initiates an "Add Money" request from the `user-app`.
2. A unique dummy token is generated and recorded in the database as `Processing` (OnRampTransaction).
3. The mock `bank-webhook` receives this token alongside the user ID and amount.
4. The webhook verifies, updates the transaction status to `Success`, and atomically credits the user's `Balance` using Prisma transactions.

## 📜 Scripts
- `npm run dev`: Starts all applications in development mode.
- `npm run build`: Builds all apps via Turborepo.
- `npm run lint`: Lints the entire monorepo.

---
*Built utilizing Next.js & Turborepo.*
