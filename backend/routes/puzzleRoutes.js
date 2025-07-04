const express = require('express');
const router = express.Router();
const {
    createPuzzle,
    getAllPuzzles,
    getPuzzleById
} = require('../controllers/puzzleController');

router.post('/', createPuzzle);
router.get('/', getAllPuzzles);
router.get('/:id', getPuzzleById);

module.exports = router;
