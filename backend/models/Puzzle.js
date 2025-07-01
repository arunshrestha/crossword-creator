const mongoose = require('mongoose');

const GridCellSchema = new mongoose.Schema({
    value: { type: String, default: '' },      // e.g., "A"
    isBlock: { type: Boolean, default: false } // true for black squares
});

const ClueSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    text: { type: String, required: true }
});

const PuzzleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },

    // 2D array of cells
    gridData: [[GridCellSchema]],

    acrossClues: [ClueSchema],
    downClues: [ClueSchema],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);
