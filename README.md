Mini Postman – Backend Application

This repository contains the backend implementation for the Mini Postman assignment. The backend is designed to provide secure authentication and RESTful APIs for managing API requests created from the frontend application.
It follows a clean, scalable architecture with proper file separation and is deployed as a serverless function on Vercel.
"https://first-server-nine.vercel.app/"

repo link -> https://github.com/ManchadiY/firstServer
frontend repo link -> https://github.com/ManchadiY/MiniPostman

Tech Stack
Node.js – JavaScript runtime
Express.js – Web framework for building REST APIs
Prisma ORM – Database ORM
Supabase PostgreSQL – Database
JWT (JSON Web Token) – Authentication and authorization
Vercel – Serverless deployment "https://first-server-nine.vercel.app/"

Architecture Overview

The project follows a modular and maintainable structure:
Controllers – Business logic and request handling
Routes – RESTful API endpoints
Middlewares – Authentication, authorization, and request validation

Prisma Client – Database access layer
All APIs are designed following RESTful standards with proper HTTP methods and status codes.
Authentication
Token-based authentication using JWT
Secure protected routes using authentication middleware
JWT validation on every private API request

Features
User authentication (Signup & Login)
Secure token-based access control
CRUD APIs for API request management
RESTful API structure
Scalable and clean file separation
Serverless-ready backend deployment

How to Run the Project Locally
Prerequisites
Node.js (v18 or higher)
npm or yarn
Supabase PostgreSQL database

Setup Steps

# Clone the repository

git clone <repository-url>

# Install dependencies

npm install

# Setup environment variables

Update the .env file with:

DATABASE_URL=your_supabase_postgres_url
DIRECT_URL=your_supabase_postgres_direct_url
JWT_SECRET=your_jwt_secret

Prisma Setup

# Generate Prisma client

npx prisma generate

Start the Server
npm run dev

it will show error as the env is not shared , for tesing please refer the deployment link vercel "https://first-server-nine.vercel.app/"

The server will run on:
http://localhost:3000

Deployment
The backend is deployed on Vercel as a serverless function, enabling:
Automatic scaling
Fast cold starts
Easy CI/CD integration
No additional infrastructure management is required.

Future Improvements
Multi-Factor Authentication (MFA)
Migration from monolithic architecture to microservices
Email services (verification, alerts, notifications)
Advanced logging and monitoring
Rate limiting and API usage analytics
Role-based access control (RBAC)
API versioning
