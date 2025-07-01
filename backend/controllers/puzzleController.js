const Puzzle = require('../models/Puzzle');

// Create puzzle
exports.createPuzzle = async (req, res) => {
    try {
        const puzzle = new Puzzle(req.body);
        await puzzle.save();
        res.status(201).json(puzzle);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save puzzle', error });
    }
};

// Get all puzzles
exports.getAllPuzzles = async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch puzzles', error });
    }
};
