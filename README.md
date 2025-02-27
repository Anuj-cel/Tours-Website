# Airbnb-like Website

## Overview
This is a **full-stack web application** similar to Airbnb, allowing users to list, review, and book properties. It is built using **Node.js, Express, MongoDB, and EJS**.

## Features
- **User Authentication** (Sign up, Login, Logout) using Passport.js
- **Listings Management** (Create, Update, Delete properties)
- **Reviews & Ratings** for Listings
- **Session Management** using MongoDB Store
- **Flash Messages** for better user experience
- **Error Handling & Security Improvements**
- **Responsive UI** using EJS and Bootstrap

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap, CSS
- **Authentication:** Passport.js, Passport-Local
- **Session & Flash Messages:** Express-Session, Connect-Mongo, Connect-Flash
- **Deployment Ready** (Supports environment variables & production setup)

## Installation & Setup

### Prerequisites
- **Node.js** installed
- **MongoDB Atlas** or a local MongoDB instance
- **Git** (optional for cloning the repo)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Anuj-cel/MajorProject.git
   cd MajorProject
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the root directory and add the following:
   ```env
   NODE_ENV=development
   ATLASDB_URL=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```
4. **Run the application**
   ```sh
   npm start
   ```
   Or using nodemon:
   ```sh
   nodemon index.js
   ```

5. **Open in Browser**
   ```
   http://localhost:8080
   ```

## Project Structure
```
MajorProject/
│── controllers/       # Controllers for handling logic
│── models/            # Mongoose models
│── routes/            # Express routes
│── views/             # EJS templates
│── public/            # Static assets (CSS, JS, Images)
│── utils/             # Utility files
│── .env               # Environment variables
│── index.js           # Main entry point
│── package.json       # Dependencies
```

## API Routes
### Listings
- `GET /listings` - View all listings
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View a single listing
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Delete a listing

### Reviews
- `POST /listings/:id/reviews` - Add a review
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

### User Authentication
- `GET /register` - User signup page
- `POST /register` - Register a new user
- `GET /login` - User login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Deployment
To deploy, set the `NODE_ENV=production` and host on **Render, Vercel, or Heroku**.

## Contributing
Feel free to contribute by opening an issue or pull request.

## License
This project is licensed under the **MIT License**.

---
### 🚀 Happy Coding!

