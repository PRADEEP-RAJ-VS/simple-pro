# Match Lineup Tool

An advanced full-stack application for managing sports team lineups and match information. Built with React for the frontend and Node.js with Express for the backend.

## Project Structure

```
simple-pro/
├── backend/                 # Node.js Backend
│   ├── models/             # MongoDB Models
│   ├── routes/             # API Routes
│   ├── middleware/         # Authentication & Custom Middleware
│   ├── server.js           # Express Server
│   ├── package.json        # Backend Dependencies
│   └── .env.example        # Environment Variables Template
│
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Reusable React Components
    │   ├── pages/          # Page Components
    │   ├── store/          # Zustand State Management
    │   ├── services/       # API Service Calls
    │   ├── utils/          # Utility Functions
    │   ├── App.jsx         # Main App Component
    │   ├── main.jsx        # Entry Point
    │   └── index.css       # Tailwind Styles
    ├── index.html          # HTML Template
    ├── vite.config.js      # Vite Configuration
    └── package.json        # Frontend Dependencies
```

## Features

### Backend (Node.js + Express + MongoDB)
- **User Authentication**: Register, Login with JWT tokens
- **Team Management**: Create and manage sports teams
- **Player Management**: Add players with detailed stats (pace, passing, shooting, etc.)
- **Match Scheduling**: Create and manage matches
- **Lineup Builder**: Set team lineups with player positions
- **Role-Based Access**: Admin, Coach, and Analyst roles
- **RESTful API**: Full CRUD operations for all resources

### Frontend (React + Vite + Tailwind CSS)
- **Authentication**: User login/registration with JWT
- **Dashboard**: Overview of matches and statistics
- **Team Management**: View and create teams
- **Player Management**: Add players with skill ratings
- **Match Management**: Create and manage matches
- **Lineup Builder**: Interactive interface to select players and set formations
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **State Management**: Zustand for global auth state
- **Error Handling**: Toast notifications for user feedback

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/match-lineup
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Players
- `GET /api/players` - Get all players
- `GET /api/players/team/:teamId` - Get players by team
- `POST /api/players` - Create player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get single match
- `POST /api/matches` - Create match
- `PUT /api/matches/:id` - Update match

### Lineups
- `GET /api/lineups` - Get all lineups
- `GET /api/lineups/match/:matchId` - Get lineups for match
- `POST /api/lineups` - Create lineup
- `PUT /api/lineups/:id` - Update lineup

## Usage Guide

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Teams**: Add teams with name, country, and formation
3. **Add Players**: Create players with skill ratings (pace, passing, shooting, etc.)
4. **Schedule Matches**: Create matches between teams
5. **Set Lineups**: Use the lineup builder to select players and set formations
6. **View Dashboard**: Monitor match statistics and upcoming matches

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB + Mongoose - Database
- JWT - Authentication
- bcryptjs - Password hashing
- Cors - Cross-origin requests

### Frontend
- React 18 - UI library
- Vite - Build tool
- React Router - Navigation
- Zustand - State management
- Tailwind CSS - Styling
- Axios - HTTP client
- React Hot Toast - Notifications
- React Icons - Icon library

## Development

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Future Enhancements

- Live match tracking and statistics
- Player substitution management
- Advanced analytics and reports
- Video integration for match highlights
- Mobile app with React Native
- Real-time notifications with WebSockets
- Player injury tracking
- Tactical analysis tools
- AI-powered lineup recommendations

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
