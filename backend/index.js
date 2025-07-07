require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToDB = require('./config/db');

// Import routes
const puzzleRoutes = require('./routes/puzzleRoutes');

const app = express();
const port = process.env.PORT || 5000;

// const allowedOrigins = [
//     process.env.CLIENT_ORIGIN,           // for production
//     'http://localhost:3000'              // for local dev
// ];

const corsOptions = {
    origin: ['http://localhost:3000', process.env.CLIENT_ORIGIN], // or use process.env.CLIENT_ORIGIN for prod
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base test route
app.get('/', (req, res) => {
    res.send('🚀 Crossword backend is running');
});

// Register routes
app.use('/api/puzzles', puzzleRoutes); // <-- all crossword routes here

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}`);
    });
});
