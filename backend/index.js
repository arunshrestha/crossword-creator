// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const puzzleRoutes = require('./routes/puzzleRoutes'); // <-- add this file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
};

async function connectToDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('✅ MongoDB connected and ping successful');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Base test route
app.get('/', (req, res) => {
    res.send('🚀 Crossword backend is running');
});

// Register routes
app.use('/api/puzzles', puzzleRoutes); // <-- all crossword routes here

// Start server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}`);
    });
});
