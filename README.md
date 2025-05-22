# Crossword Creator App 🧩

A full-stack web app for building and sharing crossword puzzles using unique session IDs. Built with **React**, **Express**, and **MongoDB**.

## Features

- Create custom crossword puzzles in the browser
- Save and access puzzles with a session ID
- REST API for puzzle management
- Responsive and user-friendly design

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js, Express
- **Database**: MongoDB (MongoDB Atlas)
- **Deployment (planned)**:
  - Frontend: Vercel / Netlify
  - Backend: Render / Fly.io
  - Database: MongoDB Atlas

## Folder Structure

```plaintext
crossword-creator/
├── frontend/      # React app
├── backend/       # Express server
└── README.md      # Project overview

## Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/arunshrestha/crossword-creator.git
    cd crossword-creator
    ```

2. Set up environment variables

    Create a `.env` file in the `backend/` folder with:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```

    Create a `.env` file in the `frontend/` folder with:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000
    ```

3. Install dependencies

    #### Frontend

    ```bash
    cd frontend
    npm install
    ```

    #### Backend

    ```bash
    cd ../backend
    npm install
    ```

4. Run the app locally

    Open two terminals:

    **Terminal 1 (Frontend)**

    ```bash
    cd frontend
    npm start
    ```

    **Terminal 2 (Backend)**

    ```bash
    cd backend
    npm run dev
    ```

The frontend runs at [http://localhost:3000](http://localhost:3000) and connects to the backend at [http://localhost:5000](http://localhost:5000).
