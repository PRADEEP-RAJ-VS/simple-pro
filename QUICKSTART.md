# Match Lineup Tool - Setup Instructions

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- Git

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values
# Start development server
npm run dev
```

Backend runs on: http://localhost:5000

### 2. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:3000

## First Time Setup

1. Start MongoDB service
2. Open backend folder and run `npm install && npm run dev`
3. Open new terminal, navigate to frontend folder and run `npm install && npm run dev`
4. Access http://localhost:3000 in your browser
5. Register a new account or use test credentials

## Default Roles
- **Admin**: Full access to all features
- **Coach**: Can create and manage teams and lineups
- **Analyst**: View-only access to match data

## Environment Variables (Backend)

Create `.env` file in backend folder:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/match-lineup
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## Troubleshooting

- **Port Already in Use**: Change PORT in .env
- **MongoDB Connection Error**: Ensure MongoDB is running
- **CORS Error**: Check API proxy settings in `frontend/vite.config.js`

## Project Features

✅ User Authentication (JWT)
✅ Team Management
✅ Player Management with Stats
✅ Match Scheduling
✅ Lineup Builder
✅ Dashboard with Analytics
✅ Responsive UI
✅ Error Handling
✅ Role-Based Access

Enjoy building your Match Lineup Tool! 🎯⚽
