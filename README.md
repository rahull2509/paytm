# Paytm - Money Transfer App

A full-stack digital wallet application built with **React** and **Node.js** that enables users to sign up, sign in, search for other users, and transfer money between accounts.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v7, Axios |
| Backend | Node.js, Express.js, Mongoose, JWT, Zod |
| Database | MongoDB (Docker) |

## Project Structure

```
paytm/
├── backend/
│   ├── index.js            # Express server (port 3000)
│   ├── db.js               # Mongoose connection + User & Account schemas
│   ├── config.js           # JWT secret
│   ├── middleware.js        # Auth middleware (JWT verification)
│   └── routes/
│       ├── index.js         # Root router (/api/v1)
│       ├── user.js          # Signup, Signin, Update, Bulk search
│       └── account.js       # Balance check, Money transfer
├── frontend/
│   ├── src/
│   │   ├── main.jsx         # React entry point
│   │   └── App.jsx          # Router setup
│   ├── pages/
│   │   ├── Signup.jsx       # User registration
│   │   ├── Signin.jsx       # User login
│   │   ├── Dashboard.jsx    # Balance + user list
│   │   └── SendMoney.jsx    # P2P money transfer
│   └── components/
│       ├── Appbar.jsx       # Navigation bar
│       ├── Balance.jsx      # Balance display
│       ├── Users.jsx        # User search + list
│       ├── Button.jsx       # Reusable button
│       ├── InputBox.jsx     # Reusable input field
│       ├── Heading.jsx      # Heading text
│       ├── SubHeading.jsx   # Subheading text
│       └── BottomWarning.jsx # Navigation link
└── Dockerfile               # MongoDB replica set setup
```

## API Endpoints

### User Routes (`/api/v1/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | ❌ | Register a new user |
| POST | `/signin` | ❌ | Login and get JWT token |
| PUT | `/` | ✅ | Update user profile |
| GET | `/bulk?filter=` | ❌ | Search users by name |

### Account Routes (`/api/v1/account`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/balance` | ✅ | Get account balance |
| POST | `/transfer` | ✅ | Transfer money to another user |

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker

### 1. Start MongoDB

```bash
# Build and run MongoDB container
docker build -t paytm-mongo .
docker run -d -p 27017:27017 --name paytm-mongo-rs paytm-mongo
```

### 2. Start Backend

```bash
cd backend
npm install
node index.js
```

Server runs on `http://localhost:3000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Features

- **User Registration** — Sign up with email, password, first name, and last name
- **User Authentication** — JWT-based authentication with Bearer token
- **Dashboard** — View balance and search for other users
- **Money Transfer** — Send money to any registered user
- **User Search** — Filter users by first or last name
- **Input Validation** — Zod schema validation on all API inputs