# Ride Evee Backend Assignment

This is a Node.js and Express.js backend application for managing user resources with CRUD operations. The project includes MongoDB as the database, authentication middleware, and validation with Joi, with additional unit and integration tests using Jest.

## Features

- **CRUD operations** on user data in MongoDB.
- **JWT authentication** for securing update and delete operations.
- **Input validation** using Joi for request validation.
- **Error handling** for improved response clarity.
- **Testing** using Jest for unit and integration testing.

## Requirements

- Node.js (v14 or later)
- MongoDB
- Environment file for storing sensitive data (`.env`)

## Installation and Setup

1. Clone the Repository
   ```bash
   git clone https://github.com/vikaas-sharma/Ride-Evee-Backend-Assignment.git
   cd Ride-Evee-Backend-Assignment

2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory with the following values:
   ```bash
   PORT=8080
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
4. Start the Server
   ```bash
   npm start
5. The server will start on the specified PORT (default: 8080) and can be accessed at http://localhost:8080.

## API Endpoints

| Method | Endpoint        | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/users`    | Create a new user               |
| GET    | `/api/users`    | Retrieve all users              |
| GET    | `/api/users/:id` | Retrieve a user by ID          |
| PUT    | `/api/users/:id` | Update a user by ID (secured)  |
| DELETE | `/api/users/:id` | Delete a user by ID (secured)  |

## Authentication
Include the JWT token in the Authorization header for secured routes:
 ```bash
 Authorization: Bearer <your_jwt_token>

