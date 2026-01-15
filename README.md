# Service Platform

A full-stack service-based web application featuring secure authentication, role-based access control, and an admin dashboard for managing services.

---

## Features

- User authentication using JWT (access & refresh tokens)
- Role-based authorization (Admin / Client)
- Admin dashboard to manage services
- Protected routes with middleware
- Responsive UI built with modern frontend tools
- RESTful API architecture

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Authentication Flow

- Secure login and signup
- Access token for API requests
- Refresh token for session persistence
- Protected routes based on user roles

---

## Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
