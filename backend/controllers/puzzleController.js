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

// Get puzzle by ID
exports.getPuzzleById = async (req, res) => {
    try {
        const puzzle = await Puzzle.findById(req.params.id);
        if (!puzzle) {
            return res.status(404).json({ message: 'Puzzle not found' });
        }
        res.json(puzzle);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch puzzle', error });
    }
};