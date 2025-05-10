# Reservation System

For Chinese, [README.md](./README.md)

## Project Introduction

This project focuses on building a complete front-end and back-end application through engineering practices, suitable for the development requirements of medium to large projects. For specific UI and business logic, simpler logic implementations are adopted.

The backend primarily uses Node.js + Koa + GraphQL + MongoDB + codegen + jest.

The frontend uses React + TypeScript + Tailwind CSS + Vitest.

## Quick Start with Docker Compose

```bash
# init env
cp .env.example .env

# Development Environment
docker-compose up --build

# Production Environment
docker-compose -f docker-compose.yml up --build
```

There are two seed users used for login, detail to see `backend/scripts/seed.ts`
```text
john@example.com
111111

employee@example.com
111111
```

## Local Start

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables, Note: MongoDB dependency, MongoDB needs to be started first
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 📝 API Documentation
``` text
http://localhost:4000/graphql
```

## Project Structure
```text
reservation-system/
├── backend/                # Backend Service
│   ├── scripts/            #   Script files, init db, seeds
│   ├── src/                #   Source code directory
│   │   ├── __tests__/      #     Unit tests
│   │   ├── config/         #     Configuration files
│   │   ├── controllers/    #     Controllers
│   │   ├── graphql/        #     GraphQL related
│   │   ├── middlewares/    #     Middlewares
│   │   ├── models/         #     Data models
│   │   ├── routes/         #     Route definitions
│   │   ├── types/          #     TypeScript types
│   │   └── utils/          #     Utility functions
│   └── test/               #   Test configuration
├── frontend/               # Frontend Application
│   ├── public/             #   Static resources
│   ├── src/                #   Source code directory
│   │   ├── __tests__/      #     Unit tests
│   │   ├── apps/           #     Application configuration
│   │   ├── assets/         #     Asset files
│   │   ├── constants/      #     Constant definitions
│   │   ├── features/       #     Business features
│   │   │   ├── reservation/ #       Reservation feature
│   │   │   │   ├── components/ #       Components
│   │   │   │   └── pages/      #       Pages
│   │   ├── hooks/          #     Custom Hooks
│   │   ├── layouts/        #     Layout components
│   │   ├── routes/         #     Route configuration
│   │   ├── services/       #     API services
│   │   ├── styles/         #     Style files
│   │   ├── test/           #     Test files
│   │   └── types/          #     TypeScript types
```

## Further optimization

### Backend

- Unified Error Handling : Set up a unified error handling mechanism and develop detailed error codes based on business needs for easier debugging and maintenance.
- Project Structure Optimization : Further optimize the project structure to ensure code modularity and maintainability, consider introducing more design patterns to improve code quality.
- Performance Optimization : Enhance system performance by analyzing and optimizing database queries, caching strategies, etc.
- Log Management : Implement more comprehensive log recording and management for problem tracking and system monitoring.

### Frontend

- Component Optimization : The current component content needs discussion, it is recommended to refactor components to improve reusability and readability.
- State Management : Introduce more efficient state management solutions, such as SWR, Redux, etc., to manage complex application states.
- UI/UX Improvements : Improve the user interface and user experience to ensure consistency and responsiveness across different devices.
- Test Coverage : Increase unit and integration test coverage to ensure application stability and reliability.