# Personal Notes Application

## Project Overview

This is a full stack web application that allows users to manage their personal notes. Users can register, login securely, and perform full CRUD operations on notes.

## Features

* User authentication using JWT
* Create, read, update, and delete notes
* Category-based note organization
* Protected routes for secure access

## Technologies Used

Frontend:

* React (Vite)
* Axios
* React Router

Backend:

* Node.js
* Express.js
* MySQL (XAMPP)

## API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/notes
* POST /api/notes
* PUT /api/notes/:id
* DELETE /api/notes/:id

## Setup Instructions

### Backend

1. Navigate to backend folder
2. Run `npm install`
3. Create `.env` file
4. Run `npm start`

### Frontend

1. Navigate to frontend folder
2. Run `npm install`
3. Run `npm run dev`

### Database

* Use XAMPP phpMyAdmin
* Create database: personal_notes
* Import tables using SQL file

## Notes

* JWT is used for authentication
* All routes are protected using middleware
* Data is stored in MySQL database
