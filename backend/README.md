# The Royal To-Do List API

A world-class task management application for His Royal Highness, Prince Adebayo of Nigeria. This backend implements sophisticated business logic including inauspicious date detection, palindrome curse handling, and automatic resets with database optimization.

## 🏛️ Project Overview

This backend is built with **NestJS** and **TypeScript**, implementing a modular and scalable architecture to manage Prince Adebayo's royal tasks. The application includes:

- **Complete REST API** with Swagger documentation
- **WebSockets** for real-time notifications
- **Sophisticated validations** for dates (Nigerian holidays and inauspicious dates)
- **Automatic reset system** with advanced mathematical logic
- **MySQL database** with Prisma ORM
- **Robust logging** and error handling system

## 🏗️ Architectural Decisions

### Modular Architecture

- **Independent modules**: `NotesModule`, `EventModule`, `PrismaModule`
- **Separation of concerns**: Controllers, Services, DTOs, Entities
- **Native dependency injection** from NestJS
- **Centralized configuration** with Joi validation

### Implemented Design Patterns

- **Repository Pattern**: PrismaService as data abstraction layer
- **Gateway Pattern**: EventGateway for WebSockets
- **DTO Pattern**: Data validation and transformation
- **Filter Pattern**: Global Prisma exception handling

### Specialized Business Logic

- **Inauspicious date validation**: Sum of date digits cannot be a prime number
- **Nigerian holiday validation**: National holidays database
- **Automatic reset system**: Every minute with conditional optimization
- **Real-time notifications**: WebSocket for system events

## 🚀 Runtime Justification: Node.js + NestJS

### Why Node.js?

1. **I/O Performance**: Excellent for database operations and WebSockets
2. **Mature ecosystem**: NPM with over 2 million packages
3. **JavaScript/TypeScript**: Single language for frontend and backend
4. **Scalability**: Efficient handling of concurrent connections
5. **Active community**: Continuous support and regular updates

### Why NestJS?

1. **Scalable architecture**: Based on decorators and modules
2. **Native TypeScript**: Strong typing and autocompletion
3. **Integrated ecosystem**: Swagger, WebSockets, Scheduling, Validation
4. **Enterprise patterns**: Dependency injection, interceptors, guards
5. **Excellent documentation**: Complete guides and practical examples

### Complete Technology Stack

- **Runtime**: Node.js 18+ (JavaScript V8 Engine)
- **Framework**: NestJS 11.x (Progressive Node.js Framework)
- **ORM**: Prisma 6.x (Next-generation ORM)
- **Database**: MySQL 8.0 (Relational Database)
- **WebSockets**: Socket.io (Real-time communication)
- **Validation**: Joi + Class-validator (Schema validation)
- **Documentation**: Swagger/OpenAPI (API documentation)

## 🛠️ Build and Run Instructions

### Prerequisites

```bash
# Node.js 18+ and npm
node --version  # v18.0.0+
npm --version   # 9.0.0+

# Docker and Docker Compose
docker --version
docker-compose --version
```

### 1. Clone and Configure the Project

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Install Prisma CLI globally (optional)
npm install -g prisma
```

### 2. Configure Environment Variables

Copy the template file and configure variables:

```bash
# Copy the template file
cp .env.template .env

# Edit variables according to your configuration
nano .env  # or use your preferred editor
```

The `.env.template` file contains:

```env
PORT=3000
HOST_API=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=royal_user
DB_PASSWORD=royal_password_2025
DB_NAME=royal_todo_db

# Prisma
DATABASE_URL="mysql://royal_user:royal_password_2025@localhost:3306/royal_todo_db"
```

**Note**: Adjust values according to your local configuration, especially database credentials.

### 3. Configure Database

```bash
# Start MySQL with Docker
npm run db:up

# Wait for MySQL to be ready (30-60 seconds)
# Verify connection
docker logs royal-todo-db

# Run Prisma migrations
npm run db:migrate

# (Optional) Reset database
npm run prisma:reset
```

### 4. Run the Application

#### Development

```bash
# Development mode with hot-reload
npm run start:dev

# Debug mode with breakpoints
npm run start:debug
```

#### Production

```bash
# Build the application
npm run build

# Run in production
npm run start:prod
```

### 5. Verify the Application

```bash
# REST API
curl http://localhost:3000/api/v1/notes

# Swagger documentation
open http://localhost:3000/docs

# WebSocket (using wscat)
npm install -g wscat
wscat -c ws://localhost:3000/royal-todo
```

## 🐛 Debugging Instructions

```bash
# Run in debug mode
npm run start:debug

# Connect debugger in VS Code
# Create .vscode/launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug NestJS",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```

## 📊 Project Estructure

```
backend/
├── src/
│   ├── app.module.ts              # Main module
│   ├── main.ts                    # Entry point
│   ├── config/                    # Configuration
│   │   ├── app.config.ts         # Environment variables
│   │   └── joi.validation.ts     # Schema validation
│   ├── notes/                     # Notes module
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── entities/              # Response entities
│   │   ├── notes.controller.ts   # REST Controller
│   │   ├── notes.service.ts      # Business logic
│   │   └── notes.module.ts       # Notes module
│   ├── event/                     # Events module
│   │   ├── event.gateway.ts      # WebSocket Gateway
│   │   ├── event.service.ts      # Event service
│   │   └── event.module.ts       # Events module
│   ├── prisma/                    # Database module
│   │   ├── prisma.service.ts     # Prisma service
│   │   └── prisma.module.ts      # Prisma module
│   └── prisma-client-exception.filter.ts # Exception filter
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── holidays.ts               # Nigerian holidays data
│   └── migrations/               # DB migrations
├── docker-compose.yml            # Docker configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Development with hot-reload
npm run start:debug        # Development with debugger

# Production
npm run build              # Build application
npm run start:prod         # Run in production

# Database
npm run db:up              # Start MySQL with Docker
npm run db:migrate         # Run migrations
npm run prisma:reset       # Reset database
npm run prisma:format      # Format Prisma schema

# Code quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier
```

## 🌐 API Endpoints

### REST API (http://localhost:3000/api/v1)

- `GET /notes` - Get all notes
- `POST /notes` - Create new note
- `GET /notes/:id` - Get note by ID
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `POST /notes/reset` - Manual notes reset

### WebSocket (ws://localhost:3000/royal-todo)

- `connection` - Connection event
- `great_reset` - Automatic reset notification
- `message` - Custom message

### Documentation

- Swagger UI: http://localhost:3000/docs

## 🚨 Common Troubleshooting

### Database connection error

```bash
# Verify MySQL is running
docker ps | grep royal-todo-db

# Restart container
docker restart royal-todo-db

# Verify environment variables
echo $DATABASE_URL
```

### Migration errors

```bash
# Reset migrations
npm run prisma:reset

# Regenerate Prisma client
npx prisma generate
```

### WebSocket errors

```bash
# Verify port 3000
lsof -i :3000

# Verify CORS in event.gateway.ts
```

### Validation errors

```bash
# Verify Joi schema
# Check required environment variables
```

---
