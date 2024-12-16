# Dilfoods Management System

This project is a backend application that manages users, menus, and orders. It is built using **Express.js** and **MongoDB**, with JWT-based authentication and authorization.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
  - [User Routes](#user-routes)
  - [Menu Routes](#menu-routes)
  - [Order Routes](#order-routes)
- [Middleware](#middleware)
- [Database Configuration](#database-configuration)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)
- [Contribution Guidelines](#contribution-guidelines)

---

## Prerequisites

Ensure the following tools are installed:

- **Node.js** (v16.x or above)
- **npm** (bundled with Node.js)
- **MongoDB** (local or cloud instance)

---

## Project Structure

```
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
```

---

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_secret_key>
   ```

4. **Database Configuration**

   - Ensure MongoDB is running and accessible using the `MONGO_URI` specified in your `.env` file.
   - The `connectDB` function in `config/db.js` handles the database connection.

---

## Running the Project

Start the server:

```bash
npm start
```

The server will run on the port specified in the `.env` file (default: `5000`).

---

## API Documentation

### User Routes

| Endpoint                | Method | Description                    | Body Example                                                            |
| ----------------------- | ------ | ------------------------------ | ----------------------------------------------------------------------- |
| `/api/users/register`   | POST   | Registers a new user           | `{"username": "john_doe","email": "john.doe@example.com","password": "securePassword123!","phoneNumber": "+1234567890","role": "admin"}` |
| `/api/users/login`      | POST   | Logs in a user                 | `{ "email": "john@example.com", "password": "123456" }`                 |
| `/api/users/send-otp`   | POST   | Sends an OTP to a phone number | `{ "phoneNumber": "+1234567890" }`                                      |
| `/api/users/verify-otp` | POST   | Verifies the OTP               | `{ "phoneNumber": "+1234567890", "otp": "123456" }`                     |

### Menu Routes

| Endpoint        | Method | Description               | Protected | Body Example                       |
| --------------- | ------ | ------------------------- | --------- | ---------------------------------- |
| `/api/menu`     | GET    | Retrieves the menu        | Yes       | N/A                                |
| `/api/menu`     | POST   | Creates a new menu item   | Admin     | `{ "name": "Pizza", "price": 10 }` |
| `/api/menu/:id` | PUT    | Updates a menu item by ID | Admin     | `{ "name": "Pasta", "price": 15 }` |
| `/api/menu/:id` | DELETE | Deletes a menu item by ID | Admin     | N/A                                |

### Order Routes

| Endpoint          | Method | Description                      | Protected | Body Example                                        |
| ----------------- | ------ | -------------------------------- | --------- | --------------------------------------------------- |
| `/api/orders`     | POST   | Creates a new order              | Yes       | `{ "items": [{ "menuId": "id1", "quantity": 2 }] }` |
| `/api/orders`     | GET    | Retrieves all orders             | Admin     | N/A                                                 |
| `/api/orders/:id` | GET    | Retrieves a specific order by ID | Yes/Admin | N/A                                                 |
| `/api/orders/:id` | PUT    | Updates a specific order by ID   | Admin     | `{ "status": "Completed" }`                         |
| `/api/orders/:id` | DELETE | Deletes a specific order by ID   | Admin     | N/A                                                 |

---

## Middleware

**authMiddleware.js**

- `protect`: Ensures the user is authenticated by validating the JWT token.
- `admin`: Ensures the user has admin privileges.

---

## Database Configuration

**File:** `config/db.js`

```javascript
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
```

---

## Error Handling

Error handling is included in controllers to ensure appropriate HTTP status codes and meaningful error messages are returned.

---

## Future Improvements

- Add unit tests for routes and middleware.
- Implement rate limiting and input validation.
- Enhance API documentation using tools like Swagger.

---

## Contribution Guidelines

1. **Fork the repository.**
2. **Create a feature branch.**
3. **Commit changes with descriptive messages.**
4. **Submit a pull request for review.**

---




