# The Royal To-Do List Frontend

A sophisticated Angular application for His Royal Highness, Prince Adebayo of Nigeria. This frontend provides an elegant and responsive interface for managing royal decrees with real-time WebSocket communication, Nigerian-themed design, and advanced state management.

## 🏛️ Project Overview

This frontend is built with **Angular 20** and **TypeScript**, implementing a modern and scalable architecture to manage Prince Adebayo's royal tasks. The application includes:

- **Responsive Angular SPA** with lazy loading and routing
- **Real-time WebSocket communication** with the backend
- **Nigerian-themed design** with custom CSS and typography
- **Advanced state management** with Angular signals
- **HTTP client integration** with error handling
- **Toast notifications** system
- **Mobile-first responsive design**

## 🏗️ Architectural Decisions

### Modern Angular Architecture

- **Angular 20** with standalone components and zoneless change detection
- **Lazy loading** for optimal performance and code splitting
- **Signal-based state management** for reactive programming
- **Dependency injection** with modern Angular patterns
- **TypeScript strict mode** for type safety

### Design Patterns Implemented

- **Service Layer Pattern**: Centralized business logic in services
- **Repository Pattern**: HTTP service abstraction
- **Observer Pattern**: Reactive programming with signals
- **Component Communication**: Parent-child and service-based communication
- **Error Handling Pattern**: Global error management with toast notifications

### Specialized Features

- **Nigerian cultural theming**: Colors, typography, and design elements
- **Real-time updates**: WebSocket integration for live data
- **Responsive design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance optimization**: Lazy loading and onPush change detection

## 🚀 Runtime Justification: Angular + TypeScript

### Complete Technology Stack

- **Framework**: Angular 20.x (Progressive Web Framework)
- **Language**: TypeScript 5.9.x (Typed JavaScript)
- **Styling**: Tailwind CSS 4.x + Custom Nigerian Theme
- **HTTP Client**: Angular HttpClient with fetch API
- **WebSockets**: Socket.io-client for real-time communication
- **State Management**: Angular Signals (reactive programming)
- **Build Tool**: Angular CLI with Vite (fast builds)

## 🛠️ Build and Run Instructions

### Prerequisites

```bash
# Node.js 18+ and npm
node --version  # v18.0.0+
npm --version   # 9.0.0+

# Angular CLI (optional, can use npx)
npm install -g @angular/cli@20
```

### 1. Clone and Configure the Project

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Verify Angular CLI
ng version
```

### 2. Configure Environment Variables

The application uses environment files for configuration:

```typescript
// src/environments/environment.ts (production)
export const environment = {
  production: true,
  environment: 'production',
  name: 'Royal To-Do List',
  princeName: 'Prince Adebayo',
  apiUrl: 'http://localhost:3000/api/v1',
};

// src/environments/environment.development.ts (development)
export const environment = {
  production: false,
  environment: 'development',
  name: 'Royal To-Do List',
  princeName: 'Prince Adebayo',
  apiUrl: 'http://localhost:3000/api/v1',
};
```

**Note**: Adjust `apiUrl` according to your backend configuration.

### 3. Start the Backend Services

Before running the frontend, ensure the backend is running:

```bash
# From the project root, start the backend
cd ../backend

# Start MySQL database
npm run db:up

# Start the backend API
npm run start:dev

# Verify backend is running
curl http://localhost:3000/api/v1/notes
```

### 4. Run the Frontend Application

#### Development Mode

```bash
# From the frontend directory
cd frontend

# Development server with hot-reload
npm start
# or
ng serve

# Development with specific port
ng serve --port 4201

# Development with host binding
ng serve --host 0.0.0.0 --port 4200
```

#### Production Build

```bash
# Build for production
npm run build
# or
ng build

# Build with specific configuration
ng build --configuration production

# Preview production build locally
npx http-server dist/frontend/browser -p 4200
```

### 5. Verify the Application

```bash
# Open in browser
open http://localhost:4200

# Test API connectivity
# Check browser console for any errors
# Verify WebSocket connection in Network tab
```

## 🐛 Debugging Instructions

### Angular Development Tools

```bash
# Run with debug configuration
ng serve --configuration development

# Enable source maps for debugging
ng build --source-map

# Run tests with coverage
ng test --code-coverage
```

### VS Code Debugging Setup

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}/frontend/src",
      "sourceMaps": true
    },
    {
      "name": "Attach to Chrome",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "webRoot": "${workspaceFolder}/frontend/src"
    }
  ]
}
```

### Browser Developer Tools

1. **Angular DevTools**: Install browser extension for component inspection
2. **Network Tab**: Monitor API calls and WebSocket connections
3. **Console**: Check for TypeScript errors and runtime issues
4. **Sources**: Set breakpoints in TypeScript files

### Common Debugging Scenarios

#### API Connection Issues

```bash
# Check if backend is running
curl http://localhost:3000/api/v1/notes

# Verify CORS configuration in backend
# Check browser console for CORS errors
```

#### WebSocket Connection Issues

```bash
# Test WebSocket connection
# Open browser console and check for connection errors
# Verify Socket.io client is properly initialized
```

#### Build Issues

```bash
# Clear Angular cache
ng cache clean

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
ng build --verbose
```

## 📊 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.config.ts              # Application configuration
│   │   ├── app.routes.ts              # Route definitions
│   │   ├── app.ts                     # Main app component
│   │   ├── app.html                   # Main app template
│   │   ├── notes/                     # Notes feature module
│   │   │   ├── interfaces/            # TypeScript interfaces
│   │   │   ├── pages/                 # Page components
│   │   │   │   ├── notes-list/        # Notes list page
│   │   │   │   ├── create-note/       # Create note page
│   │   │   │   └── update-note/       # Update note page
│   │   │   └── services/              # Notes service
│   │   ├── shared/                    # Shared components
│   │   │   ├── components/            # Reusable components
│   │   │   ├── services/              # Shared services
│   │   │   └── constants/             # Application constants
│   │   ├── utils/                     # Utility functions
│   │   └── not-found/                 # 404 page
│   ├── environments/                  # Environment configurations
│   │   ├── environment.ts             # Production environment
│   │   └── environment.development.ts # Development environment
│   ├── styles.css                    # Global styles and Nigerian theme
│   ├── index.html                    # Main HTML file
│   └── main.ts                      # Application entry point
├── angular.json                      # Angular CLI configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🔧 Available Scripts

```bash
# Development
npm start                    # Start development server
ng serve                     # Start development server
ng serve --port 4201        # Start on specific port
ng serve --host 0.0.0.0     # Start with host binding

# Building
npm run build               # Build for production
ng build                    # Build for production
ng build --watch           # Build with file watching
ng build --configuration development # Build for development

# Testing
ng test                     # Run unit tests
ng test --watch            # Run tests in watch mode
ng test --code-coverage    # Run tests with coverage

# Linting and Formatting
ng lint                     # Run ESLint
npm run format             # Format code with Prettier
```

## 🌐 Application Features

### User Interface

- **Responsive Design**: Mobile-first approach with breakpoints
- **Nigerian Theme**: Custom CSS with national colors and typography
- **Real-time Updates**: WebSocket integration for live data
- **Toast Notifications**: User feedback system
- **Loading States**: Visual feedback during API calls

### Navigation

- **Lazy Loading**: Route-based code splitting
- **Nested Routes**: Hierarchical navigation structure
- **Route Guards**: Protection for authenticated routes
- **404 Handling**: Custom not-found page

### Data Management

- **HTTP Client**: RESTful API communication
- **WebSocket Client**: Real-time data synchronization
- **State Management**: Angular signals for reactive state
- **Error Handling**: Global error management system

## 🚨 Common Troubleshooting

### Development Server Issues

```bash
# Port already in use
ng serve --port 4201

# Clear Angular cache
ng cache clean

# Check for port conflicts
lsof -i :4200
```

### Build Issues

```bash
# TypeScript compilation errors
ng build --verbose

# Clear build cache
rm -rf dist/
ng build

# Check for dependency issues
npm audit
npm audit fix
```

### API Connection Issues

```bash
# Verify backend is running
curl http://localhost:3000/api/v1/notes

# Check CORS configuration
# Verify environment.apiUrl in browser console
```

### WebSocket Issues

```bash
# Check WebSocket connection in browser DevTools
# Verify Socket.io client initialization
# Check for CORS issues with WebSocket
```

### Styling Issues

```bash
# Verify Tailwind CSS compilation
# Check for CSS conflicts
# Ensure proper import order in styles.css
```

## 🔗 Integration with Backend

### API Endpoints

The frontend communicates with the backend through:

- **REST API**: `http://localhost:3000/api/v1`

  - `GET /notes` - Fetch all notes
  - `POST /notes` - Create new note
  - `GET /notes/:id` - Get specific note
  - `PATCH /notes/:id` - Update note
  - `DELETE /notes/:id` - Delete note

- **WebSocket**: `ws://localhost:3000/royal-todo`
  - Real-time notifications
  - Automatic reset events
  - Live data synchronization

### Environment Configuration

```typescript
// Development
apiUrl: 'http://localhost:3000/api/v1';

// Production
apiUrl: 'https://your-api-domain.com/api/v1';
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

### Nigerian Theme Features

- **Color Palette**: Green, white, and red (Nigerian flag colors)
- **Typography**: Elegant serif fonts for royal aesthetic
- **Animations**: Smooth transitions and hover effects
- **Cultural Elements**: Nigerian-inspired design patterns

---
