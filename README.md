# Express Forge CLI

**Generate a ready-to-use Express.js backend with PostgreSQL and Prisma ORM in seconds.**

Express Forge CLI is a command-line tool that helps developers quickly set up an Express.js backend without manually creating the initial project structure, configuring dependencies, or setting up Prisma.

It generates a structured backend project with PostgreSQL integration, Prisma ORM, environment configuration, middleware, routes, and database seeding.

## Why Express Forge?

Setting up a backend project from scratch involves repetitive tasks:

- Creating the project structure.
- Installing and configuring dependencies.
- Setting up Express and middleware.
- Configuring PostgreSQL and Prisma.
- Managing environment variables.
- Creating database schemas and seed scripts.

Express Forge automates this initial setup so you can focus on building your application instead of configuring boilerplate.

## Before vs After

### Before: Manual Backend Setup

Normally, starting a new Express backend requires you to:

1. Create a project directory.
2. Initialize npm.
3. Install Express and other dependencies.
4. Configure the Express server.
5. Set up PostgreSQL.
6. Install and configure Prisma ORM.
7. Create the Prisma schema.
8. Configure environment variables.
9. Set up routes, middleware, and database seeding.

You have to repeat these steps for every new backend project.

### After: Express Forge CLI

With Express Forge, you only need one command:

```bash
npx express-forge-cli my-backend
```

Answer a few configuration prompts, and your backend project is generated automatically.

No repetitive setup. Just install dependencies, connect your database, and start developing.

## Features

- Express.js 5 backend boilerplate.
- PostgreSQL database integration.
- Prisma ORM 7.10.1 configuration.
- Prisma Client with PostgreSQL adapter.
- Environment variable configuration.
- Configurable server port.
- Configurable frontend URL and CORS.
- Organized routes and middleware structure.
- Centralized error-handling middleware.
- Health check endpoint.
- Sample database model and seed script.
- Graceful server shutdown and database disconnection.
- Development server with Nodemon.

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

You should also have a PostgreSQL database created before running the generated backend.

## Usage

### 1. Generate a Project

Run the following command:

```bash
npx express-forge-cli my-backend
```

Replace `my-backend` with your preferred project name.

### 2. Configure Your Backend

Express Forge will ask you for the following details:

| Configuration | Default Value |
|---|---|
| Server Port | `5001` |
| PostgreSQL URL | `postgresql://postgres:password@localhost:5432/mydb` |
| Frontend URL | `http://localhost:5173` |

Enter your own configuration values when prompted.

### 3. Generated Project

Express Forge creates the following structure:

```text
my-backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── prisma.config.js
```

## Getting Started

After generating your project, follow these steps.

### 1. Navigate to the Project

```bash
cd my-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

The CLI automatically creates a `.env` file using the values you entered during project generation.

Make sure your `DATABASE_URL` points to an existing PostgreSQL database.

Example:

```env
PORT=5001
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
FRONTEND_URL=http://localhost:5173
```

Replace the database credentials and database name with your own values.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This creates the database tables based on your Prisma schema.

### 6. Seed the Database

```bash
npm run db:seed
```

This inserts a sample admin user into the database.

Default sample user:

| Field | Value |
|---|---|
| Name | Admin |
| Email | admin@example.com |

The seed operation uses `upsert`, so running it again will not create duplicate users with the same email.

### 7. Start the Development Server

```bash
npm run dev
```

Your backend will be available at:

```text
http://localhost:5001
```

The port depends on your configuration.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server using Nodemon |
| `npm start` | Start the production server |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run development database migrations |
| `npm run db:deploy` | Apply pending migrations in production |
| `npm run db:seed` | Seed the database |

## Default API Endpoints

Express Forge provides two default endpoints.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check server health |
| GET | `/api` | Check API status |

### Health Check

**Request:**

```http
GET /health
```

**Response:**

```json
{
  "success": true,
  "message": "Express server is running",
  "timestamp": "2026-11-22T00:00:00.000Z"
}
```

### API Status

**Request:**

```http
GET /api
```

**Response:**

```json
{
  "success": true,
  "message": "Express Forge API is working!"
}
```

## Default Database Schema

Express Forge includes a sample `User` model in `prisma/schema.prisma`.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

You can modify this schema and add your own models, fields, and relationships according to your application requirements.

After modifying the schema, run:

```bash
npx prisma migrate dev --name your-migration-name
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js 5 | Backend framework |
| PostgreSQL | Relational database |
| Prisma ORM 7.10.1 | Database ORM |
| Nodemon | Development server |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

## Project Goals

Express Forge aims to make backend development easier by providing a consistent starting point for Express.js applications.

Instead of spending time on repetitive boilerplate configuration, developers can start building APIs, implementing business logic, and working with their database immediately.

## Contributing

Contributions, issues, and feature suggestions are welcome.

If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Built to make Express.js backend setup faster and simpler.**