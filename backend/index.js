require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const puzzleRoutes = require('./routes/puzzleRoutes');

const app = express();
const port = process.env.PORT || 5000;

// const allowedOrigins = [
//     process.env.CLIENT_ORIGIN,           // for production
//     'http://localhost:3000'              // for local dev
// ];

const corsOptions = {
    origin: ['http://localhost:3000'], // or use process.env.CLIENT_ORIGIN for prod
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
