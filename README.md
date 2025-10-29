# Red Abierta Challenge - Parking API

Backend API application built with NestJS, PostgreSQL, and Prisma ORM. Provides a RESTful API with Swagger documentation for parking management system.

## Database Schema

The application uses PostgreSQL with the following schema:

```
┌─────────────────────────┐
│         User            │
├─────────────────────────┤
│ id: String (UUID) PK    │
│ username: String UNIQUE │
│ password: String        │
│ role: Role (enum)       │
│ isActive: Boolean       │
│ createdAt: DateTime     │
│ updatedAt: DateTime     │
└─────────────────────────┘

        Role Enum
    ┌──────────────┐
    │ ADMIN        │
    │ USER         │
    └──────────────┘


┌──────────────────────────┐
│    Vehicle_Rates         │
├──────────────────────────┤
│ id: Int PK               │
│ vehicule_type: Enum      │
│   (UNIQUE)               │
│ hourly_Rate: Float       │
└──────────────────────────┘
            │
            │ 1
            │
            │
            │ N
            ▼
┌──────────────────────────┐
│   Parking_Records        │
├──────────────────────────┤
│ id: Int PK               │
│ license_plate: String    │
│ vehicle_typeId: Int FK   │──┐
│ entry_time: DateTime     │  │
│ exit_time: DateTime?     │  │
│ status: Parking_Status   │  │
│ total_cost: Float        │  │
└──────────────────────────┘  │
                              │
                              └─ References Vehicle_Rates(id)

    Vehicle_Type Enum       Parking_Status Enum
    ┌──────────────┐       ┌──────────────┐
    │ CAR          │       │ PARKED       │
    │ MOTORCYCLE   │       │ EXITED       │
    │ SPECIAL      │       └──────────────┘
    └──────────────┘
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Configure environment (.env.local)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Setup database
pnpm run prisma-genrate:dev
pnpx prisma generate

# Run application
pnpm run start:dev

# Access API
# http://localhost:3000
# http://localhost:3000/api (Swagger)
```

## Essential Commands

```bash
# Development
pnpm run start:dev        # Start with hot reload
pnpx prisma studio         # Database GUI

# Testing
pnpm run test            # Unit tests
pnpm run test:e2e        # E2E tests

# Code Quality
pnpm run lint            # Lint and fix
pnpm run format          # Format code
```

## Tech Stack

- NestJS 11.x + TypeScript 5.7.x
- PostgreSQL + Prisma 6.18.x
- Zod validation + Swagger docs
