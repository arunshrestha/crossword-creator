const express = require('express');
const router = express.Router();
const {
    createPuzzle,
    getAllPuzzles,
} = require('../controllers/puzzleController');

router.post('/', createPuzzle);
router.get('/', getAllPuzzles);

module.exports = router;
