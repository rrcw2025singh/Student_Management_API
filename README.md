# Student Management API

## Project Description
This is a RESTful API built using Node.js, Express, and TypeScript to manage student records.

## Features
- Health check endpoint
- Create a student
- Get all students
- Get student by ID
- Update a student
- Delete a student
- Unit testing with Jest and Supertest
- GitHub Actions CI workflow

## API Endpoints

### Health
- GET /api/v1/health

### Students
- GET /api/v1/students
- GET /api/v1/students/:id
- POST /api/v1/students
- PUT /api/v1/students/:id
- DELETE /api/v1/students/:id

## Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

## Run Tests
```bash
npm test