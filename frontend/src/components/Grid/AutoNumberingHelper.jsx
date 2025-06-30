// Utility component or function for auto-numbering clues
// This is typically a pure function, so no rendering needed

/**
 * Auto-number the crossword grid clues
 * @param {Array<Array<string>>} grid - 2D grid of letters/blocks (blocks as empty or special char)
 * @param {Set<string>} blocks - Set of blocked cell keys ("row-col")
 * @returns {Object} numbers - Map of cell keys to clue numbers
 */
export function autoNumberGrid(grid, blocks = new Set()) {
    let number = 1;
    const numbers = {};

    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    const isBlock = (r, c) => blocks.has(`${r}-${c}`);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (isBlock(r, c)) continue;

            // Clue number if:
            // 1. Cell is first in row or preceded by a block horizontally AND
            // 2. Cell is first in column or preceded by a block vertically

            const startsAcross =
                c === 0 || isBlock(r, c - 1);
            const startsDown =
                r === 0 || isBlock(r - 1, c);

            if (startsAcross || startsDown) {
                numbers[`${r}-${c}`] = number;
                number++;
            }
        }
    }

    return numbers;
}
