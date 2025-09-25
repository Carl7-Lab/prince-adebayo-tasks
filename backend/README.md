<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🏰 The Royal To-Do List API - NestJS Project

**A prestigious digital task manager for His Royal Highness, Prince Adebayo of Nigeria**

This is a sophisticated REST API project developed with NestJS to manage royal decrees and tasks with a MySQL database using Prisma ORM. The application serves as a modern replacement for the traditional parchment-and-quill system, providing full CRUD operations for notes with advanced business logic including inauspicious date detection, palindrome curse handling, and automatic resets.

## 👑 Royal Context

This application was commissioned by The Royal Tech Consortium to serve Prince Adebayo's specific needs and superstitions, including:

- **Inauspicious Date Detection**: Rejects dates whose digits sum to prime numbers
- **Days of Celebration**: Prevents scheduling on Nigerian national holidays
- **Palindrome Curse**: Handles cursed palindromic titles with automatic deletion
- **The Great Reset**: Automatic clearing every minute with index refresh on prime minutes

## 📋 Prerequisites

Before serving His Royal Highness, ensure you have installed:

- **Node.js** (version 20.15.1 or higher) - The chosen TypeScript runtime
- **npm** (version 10.7.0 or higher)
- **Docker** and **Docker Compose** (for MySQL database)
- **Git** (for version control)

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd prince-adebayo-tasks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL database

The project includes a `docker-compose.yml` file that automatically configures MySQL. Run:

```bash
docker compose up -d
```

This will start MySQL on port 3306 with the following configuration:

- Database name: `royal_todo_db`
- Container name: `royal-todo-db`
- MySQL 8.0 with native password authentication

### 4. Configure environment variables

Copy the `.env.template` file and rename the copy to `.env`:

```bash
cp .env.template .env
```

**Required environment variables:**

```bash
# Application Configuration
PORT=3000
HOST_API=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=royal_user
DB_PASSWORD=royal_password_2025
DB_NAME=royal_todo_db

# Prisma Configuration
DATABASE_URL="mysql://royal_user:royal_password_2025@localhost:3306/royal_todo_db"
```

### 5. Run database migrations

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npm run db:migrate

# Start the database (if not already running)
npm run db:up
```

### 6. Run the project

#### In development mode:

```bash
npm run start:dev
```

### 7. Available Scripts

```bash
# Development
npm run start:dev        # Start in development mode with watch
npm run start:debug      # Start in debug mode

# Database
npm run db:migrate      # Run database migrations
npm run db:up          # Start MySQL database container
npm run prisma:reset   # Reset database (⚠️ destructive)

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

### 8. Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Format Prisma schema
npm run prisma:format

# Reset database (⚠️ This will delete all data)
npm run prisma:reset
```

- `GET /docs` - API Documentation (Swagger)

## 📁 Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts               # Application entry point
├── notes/                # Notes module
│   ├── dto/              # Data Transfer Objects
│   │   ├── create-note.dto.ts
│   │   ├── update-note.dto.ts
│   │   └── index.ts
│   ├── entities/          # Swagger/API entities
│   │   └── note.entity.ts
│   ├── notes.controller.ts
│   ├── notes.module.ts
│   └── notes.service.ts
├── prisma/               # Prisma service
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── config/               # Configuration
│   ├── app.config.ts
│   └── joi.validation.ts
└── prisma-client-exception.filter.ts  # Prisma exception filter
```

## 🛠️ Royal Technology Stack

### Core Framework & Language

- **NestJS v11.0.1** - Modern Node.js framework with TypeScript (chosen for its enterprise-grade architecture)
- **TypeScript v5.7.3** - Type-safe JavaScript with advanced features
- **Node.js v20.15.1+** - Runtime environment (chosen for its maturity, ecosystem, and performance)

### Database & ORM

- **MySQL v8.0** - Robust relational database with native password authentication (as specified in requirements)
- **Prisma v6.12.0** - Next-generation ORM with type safety and automated migrations
- **Docker & Docker Compose** - Containerized MySQL database setup for royal portability

### Development & Build Tools

- **SWC v1.10.7** - Ultra-fast TypeScript/JavaScript compiler
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript v5.7.3** - Type-safe JavaScript

### API & Validation

- **class-validator v0.14.2** - Input validation and DTOs
- **class-transformer v0.5.1** - Object transformation
- **Joi v17.13.3** - Environment configuration validation

### API & Documentation

- **Swagger/OpenAPI** - Auto-generated API documentation at `/docs`

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **ts-node** - TypeScript execution
- **dotenv-cli** - Environment variable management

## 📝 Important Notes

### Database & Infrastructure

- **MySQL 8.0**: Primary database with Docker containerization
- **Prisma ORM**: Modern database toolkit with type-safe queries and migrations
- **Docker Compose**: Automated MySQL database setup with persistent volumes
- **Connection Management**: Automatic connection handling with lifecycle hooks

### API & Validation

- **Input Validation**: Comprehensive validation with class-validator for all DTOs
- **Object Transformation**: Data transformation with class-transformer for API responses
- **Error Handling**: Custom Prisma exception filter for consistent error responses

### Development & Code Quality

- **TypeScript**: Full type safety throughout the royal application
- **API Documentation**: Auto-generated Swagger documentation at `/docs`
- **Error Handling**: Custom Prisma exception filters for consistent royal error responses
- **Code Formatting**: ESLint and Prettier for consistent royal code style
- **Environment Validation**: Joi schema validation for royal configuration
- **Royal Business Logic**: Sophisticated validation and processing rules

### Royal Environment Configuration

- **Development**: `.env` file for local royal development
- **Production**: Environment variables for royal deployment
- **Database**: Configurable MySQL connection with Docker support
- **Royal Settings**: Configurable business logic parameters for royal requirements

### Royal Features

- **Modular Architecture**: Clean separation of concerns with NestJS modules
- **Royal Decree Management**: Full CRUD operations with priority and date management
- **Type Safety**: End-to-end TypeScript with Prisma-generated types
- **API Documentation**: Interactive Swagger UI at `/docs` for testing royal endpoints
- **Database Management**: Prisma Studio for visual database management
- **Docker Integration**: Containerized MySQL database for easy royal setup
- **Royal Validation**: Comprehensive input validation with custom error messages
- **Business Logic**: Sophisticated royal rules including:
  - Inauspicious date detection (prime number digit sums)
  - Nigerian holiday blocking
  - Palindrome curse handling with automatic deletion
  - Automatic minute-based resets with index refresh
- **Error Handling**: Custom Prisma exception filters for royal error responses

## 👑 Royal Business Logic Implementation

This API implements sophisticated business logic as specified in the Royal Tech Consortium requirements:

### 🔮 Inauspicious Date Detection

- **Rule**: Dates whose digits sum to prime numbers are considered unlucky
- **Example**: 2025-09-22 → 2+0+2+5+0+9+2+2 = 22 (not prime) ✅
- **Example**: 2025-09-23 → 2+0+2+5+0+9+2+3 = 23 (prime) ❌
- **Implementation**: Custom validation decorator with prime number checking

### 🎉 Days of Celebration

- **Rule**: Nigerian national holidays are blocked for task scheduling
- **Implementation**: Holiday validation service with configurable holiday list
- **Holidays**: New Year's Day, Independence Day, Christmas, etc.

### 🔮 Palindrome Curse

- **Rule**: Titles that are palindromes trigger automatic deletion after confirmation
- **Example**: "racecar", "level", "madam" → Cursed titles
- **Implementation**: Palindrome detection with confirmation toast and delayed deletion

### ⏰ The Great Reset

- **Rule**: Every minute, all tasks are automatically cleared
- **Prime Minute Enhancement**: When current minute is prime, database indexes are refreshed
- **Implementation**: Cron job with minute-based scheduling and prime number detection
