# 👑 The Royal To-Do List - Frontend

**A prestigious Angular frontend for His Royal Highness, Prince Adebayo's digital task management system**

This is the frontend application for "The Royal To-Do List" - a sophisticated task management system developed with Angular 20. The application provides a modern, responsive interface that seamlessly integrates with the NestJS backend API, featuring royal Nigerian theming and advanced form validation.

## 🎯 Features

### 📝 Note Management

- **Complete CRUD Operations**: Create, Read, Update, Delete royal decrees
- **Form Validation**: Comprehensive validation with real-time feedback
  - Title: 5-100 characters
  - Content: 10-250 characters
  - Priority: 1-5 scale (1=low, 5=high)
  - Date: Required with custom validation
- **Dynamic Form States**: Submit blocking and button state management

### 🎨 User Interface

- **Royal Nigerian Theme**: Green, white, and red color scheme
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: Success, error, and alert notifications
- **Navigation Bar**: Clean navigation between pages
- **404 Page**: Custom not-found page for better UX

### 🔧 Technical Features

- **Angular 20.3.0** with standalone components
- **Zoneless Change Detection** for optimal performance
- **Reactive Forms** with comprehensive validation
- **Tailwind CSS 4.1.13** for responsive styling
- **TypeScript 5.9.2** for type safety

## 📋 Prerequisites

Before serving His Royal Highness, ensure you have installed:

- **Node.js** (version 20.15.1 or higher)
- **npm** (version 10.7.0 or higher)
- **Angular CLI** (version 20.3.2 or higher)

## 🚀 Installation and Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### 3. Backend Integration

Ensure the NestJS backend is running on `http://localhost:3000` for full functionality.

## 🏗️ Project Structure

```
src/app/
├── notes/                          # Notes module
│   ├── components/
│   │   └── note-form/             # Reusable form component
│   ├── pages/
│   │   ├── create-note/           # Note creation page
│   │   ├── update-note/           # Note editing page
│   │   └── notes-list/            # Notes listing page
│   ├── services/
│   │   ├── note-form.service.ts   # Form management service
│   │   └── notes.ts               # API integration service
│   └── interfaces/notes.ts        # Type definitions
├── shared/                         # Shared components and services
│   ├── components/
│   │   ├── navbar/                # Navigation component
│   │   ├── toast/                 # Toast notification component
│   │   └── toast-container/       # Toast container
│   ├── services/toast.service.ts  # Notification management
│   └── constants/navigation-paths.ts # Route definitions
├── utils/                          # Utility functions
│   ├── date-formatter.ts          # Date utility functions
│   ├── form-utils.ts              # Form helper functions
│   └── http.service.ts            # HTTP client service
└── environments/                   # Environment configurations
```

## 🛠️ Available Scripts

### Development

```bash
ng serve                    # Start development server
ng serve --port 4201       # Start on custom port
```

### Building

```bash
ng build                    # Build for production
ng build --configuration development  # Build for development
ng build --watch           # Build with file watching
```

### Code Quality

```bash
ng lint                     # Run ESLint
ng format                   # Format code with Prettier
```

## 🔗 API Integration

The frontend integrates with the NestJS backend API:

- `GET /notes` - Fetch all notes
- `POST /notes` - Create new note
- `PATCH /notes/:id` - Update existing note
- `DELETE /notes/:id` - Delete note

### Environment Configuration

Configure API endpoints in `src/environments/`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

## 🔮 Royal Business Logic

The frontend seamlessly integrates with backend royal business rules:

- **Inauspicious Date Detection**: Client-side validation for prime number dates
- **Palindrome Curse**: Toast notifications for cursed titles
- **Priority System**: Visual priority indicators (1-5 scale)
- **Date Scheduling**: Proper date input and validation

## 📝 Development Guidelines

### Code Style

- **ESLint**: Enforced code linting rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Angular Standards**: Following Angular best practices

### Component Structure

- **Standalone Components**: Modern Angular architecture
- **Reactive Forms**: FormGroup and FormControl usage
- **Services**: Injectable services for business logic
- **Interfaces**: Type definitions for data models

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 👑 Royal Context

This application was commissioned by The Royal Tech Consortium to serve Prince Adebayo's specific needs, featuring:

- **Royal Nigerian Theming**: Authentic color scheme and styling
- **Sophisticated Validation**: Advanced form validation rules
- **Modern Architecture**: Latest Angular features and best practices
- **Production Ready**: Optimized for deployment and scaling

---

**Version**: 0.0.0  
**Angular**: 20.3.0  
**Node.js**: 20.15.1+  
**License**: UNLICENSED
