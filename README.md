Project Documentation

This document provides a step-by-step guide to set up, run, and manage the project that includes user, menu, and order management functionality using Express.js and MongoDB.

Prerequisites

Ensure the following tools are installed on your system:

Node.js (v16.x or above)

npm (bundled with Node.js)

MongoDB (local or cloud instance)

Project Structure

project-folder/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── menuController.js
│   └── orderController.js
├── middlewares/
│   └── authMiddleware.js
├── routes/
│   ├── userRoutes.js
│   ├── menuRoutes.js
│   └── orderRoutes.js
├── .env
├── server.js
├── package.json
└── README.md

Setup Instructions

1. Clone the Repository

git clone <repository-url>
cd <project-folder>

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add the following variables:

PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>

4. Database Configuration

Ensure MongoDB is running and accessible using the MONGO_URI specified in your .env file. The connectDB function in config/db.js handles the database connection.

Running the Project

Start the Server

npm start

The server will start on the port specified in .env (default: 5000).

API Documentation

User Routes

File: routes/userRoutes.js

POST /api/users/register

Registers a new user.

Request Body: { name, email, password }

POST /api/users/login

Logs in a user.

Request Body: { email, password }

POST /api/users/send-otp

Sends an OTP to the provided phone number.

Request Body: { phoneNumber }

POST /api/users/verify-otp

Verifies the OTP.

Request Body: { phoneNumber, otp }

Menu Routes

File: routes/menuRoutes.js

GET /api/menu

Retrieves the menu.

Protected Route: Requires user authentication.

POST /api/menu

Creates a new menu item.

Protected Route: Requires admin privileges.

PUT /api/menu/:id

Updates a menu item by ID.

Protected Route: Requires admin privileges.

DELETE /api/menu/:id

Deletes a menu item by ID.

Protected Route: Requires admin privileges.

Order Routes

File: routes/orderRoutes.js

POST /api/orders

Creates a new order.

Protected Route: Requires user authentication.

GET /api/orders

Retrieves all orders.

Protected Route: Requires admin privileges.

GET /api/orders/:id

Retrieves a specific order by ID.

Protected Route: Requires user authentication.

PUT /api/orders/:id

Updates a specific order by ID.

Protected Route: Requires admin privileges.

DELETE /api/orders/:id

Deletes a specific order by ID.

Protected Route: Requires admin privileges.

Middleware

authMiddleware.js

protect: Ensures the user is authenticated by validating the JWT token.

admin: Ensures the user has admin privileges.

Database Configuration

File: config/db.js

This file contains the function to connect to MongoDB:

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

Error Handling

Each controller includes error handling to ensure appropriate HTTP status codes and error messages are returned for failed operations.

Future Improvements

Add unit tests for routes and middleware.

Implement rate limiting and input validation.

Enhance API documentation using tools like Swagger.

Contribution Guidelines

Fork the repository.

Create a feature branch.

Commit your changes with descriptive messages.

Submit a pull request for review.

