# The Royal To-Do List

A prestigious digital task manager for His Royal Highness, Prince Adebayo of Nigeria. This full-stack application manages royal decrees and tasks with sophisticated business logic including inauspicious date detection, palindrome curse handling, and automatic resets.

## 🏛️ Project Overview

This application consists of three independent services:

- **Frontend**: Angular 20 application with real-time WebSocket communication
- **Backend**: NestJS API with sophisticated business logic and validations
- **Database**: MySQL 8.0 with automated migrations and Docker containerization

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 18+ and npm
node --version  # v18.0.0+
npm --version   # 9.0.0+

# Docker and Docker Compose
docker --version
docker-compose --version
```

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd prince-adebayo-tasks

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
# Navigate to backend directory
cd ../backend

# Copy environment template
cp .env.template .env

# Edit environment variables (optional - defaults work for local development)
nano .env
```

**Default environment variables:**
```env
PORT=3000
HOST_API=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=royal_user
DB_PASSWORD=royal_password_2025
DB_NAME=royal_todo_db

# Prisma
DATABASE_URL="mysql://royal_user:royal_password_2025@localhost:3306/royal_todo_db"
```

### 3. Start the Application

#### Option A: Start All Services (Recommended)

```bash
# From project root directory
cd prince-adebayo-tasks

# Start database
cd backend
npm run db:up

# Wait for MySQL to be ready (30-60 seconds)
# Verify database is running
docker ps | grep royal-todo-db

# Start backend (includes automatic migrations)
npm run start:dev

# In a new terminal, start frontend
cd ../frontend
npm start
```

#### Option B: Manual Step-by-Step

```bash
# Terminal 1: Start Database
cd backend
npm run db:up

# Terminal 2: Start Backend
cd backend
npm run start:dev

# Terminal 3: Start Frontend
cd frontend
npm start
```

### 4. Verify Installation

```bash
# Backend API
curl http://localhost:3000/api/v1/notes

# Frontend Application
open http://localhost:4200

# API Documentation
open http://localhost:3000/docs
```

## 🏗️ Architecture

### Project Structure

```
prince-adebayo-tasks/
├── backend/                 # NestJS API
│   ├── src/                # Source code
│   ├── prisma/             # Database schema and migrations
│   ├── docker-compose.yml  # MySQL container
│   └── README.md           # Backend documentation
├── frontend/               # Angular application
│   ├── src/                # Source code
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

### Technology Stack

- **Frontend**: Angular 20 + TypeScript + Tailwind CSS
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Database**: MySQL 8.0 + Docker
- **Real-time**: WebSockets (Socket.io)
- **Validation**: Joi + Class-validator

## 🛠️ Development

### Backend Development

```bash
cd backend

# Development with hot-reload
npm run start:dev

# Debug mode
npm run start:debug

# Production build
npm run build
npm run start:prod

# Database operations
npm run db:up          # Start MySQL
npm run db:migrate     # Run migrations
npm run prisma:reset   # Reset database
```

### Frontend Development

```bash
cd frontend

# Development server
npm start

# Build for production
npm run build

# Watch mode
npm run watch
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if MySQL is running
docker ps | grep royal-todo-db

# Restart database
cd backend
npm run db:up

# Check database logs
docker logs royal-todo-db
```

### Port Conflicts

```bash
# Check what's using port 3000
lsof -i :3000

# Check what's using port 4200
lsof -i :4200

# Kill processes if needed
kill -9 <PID>
```

### Environment Issues

```bash
# Verify environment variables
cd backend
cat .env

# Regenerate Prisma client
npx prisma generate

# Reset and migrate database
npm run prisma:reset
```

## 📚 Documentation

- **Backend API**: [Backend README](backend/README.md)
- **Frontend App**: [Frontend README](frontend/README.md)
- **API Documentation**: http://localhost:3000/docs (when running)

## 🌐 Application Features

### Core Functionality
- ✅ Create, read, update, delete notes
- ✅ Priority-based ordering
- ✅ Date validation (Nigerian holidays, inauspicious dates)
- ✅ Real-time WebSocket notifications
- ✅ Automatic reset system

### Special Business Logic
- 🚫 **Inauspicious Dates**: Rejects dates whose digits sum to prime numbers
- 🚫 **Nigerian Holidays**: Prevents scheduling on national holidays
- ⚠️ **Palindrome Curse**: Auto-deletes notes with palindromic titles
- 🔄 **Great Reset**: Automatic cleanup every minute with database optimization

## 🚀 Production Deployment

### Backend Production

```bash
cd backend

# Build application
npm run build

# Start production server
npm run start:prod
```

### Frontend Production

```bash
cd frontend

# Build for production
npm run build

# Serve static files
npx http-server dist/frontend/browser -p 4200
```

## 📝 API Endpoints

### REST API (http://localhost:3000/api/v1)

- `GET /notes` - Get all notes
- `POST /notes` - Create new note
- `GET /notes/:id` - Get note by ID
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `POST /notes/reset` - Manual notes reset

### WebSocket (ws://localhost:3000/royal-todo)

- Real-time notifications
- Automatic reset events
- Live data synchronization

## 🔧 Available Scripts

### Root Level
```bash
# No root-level scripts - navigate to backend/frontend directories
```

### Backend Scripts
```bash
cd backend
npm run start:dev      # Development with hot-reload
npm run start:debug    # Development with debugger
npm run build          # Build application
npm run start:prod     # Production mode
npm run db:up          # Start MySQL with Docker
npm run db:migrate     # Run database migrations
npm run prisma:reset   # Reset database
```

### Frontend Scripts
```bash
cd frontend
npm start              # Development server
npm run build         # Production build
npm run watch         # Build with file watching
npm test              # Run unit tests
```

## 🎯 Success Criteria

After following these instructions, you should have:

1. ✅ MySQL database running on port 3306
2. ✅ Backend API running on port 3000
3. ✅ Frontend application running on port 4200
4. ✅ WebSocket connection established
5. ✅ API documentation accessible at http://localhost:3000/docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.

---

**For detailed documentation, see the individual README files in the `backend/` and `frontend/` directories.**
