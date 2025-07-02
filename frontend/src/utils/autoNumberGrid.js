/**
 * Returns clue objects and cell numbers for a crossword grid.
 * @param {Array<Array<{isBlock: boolean}>>} grid
 * @returns {{ clues: {across: Array, down: Array}, cellHasNumber: Array<Array<number|null>> }}
 */
export function autoNumberGrid(grid) {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    const clues = { across: [], down: [] };
    let clueNumber = 1;
    const cellHasNumber = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(null));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c]?.isBlock) continue;

            const startsAcross =
                (c === 0 || grid[r][c - 1]?.isBlock) &&
                c + 1 < cols &&
                !grid[r][c + 1]?.isBlock;

            const startsDown =
                (r === 0 || grid[r - 1][c]?.isBlock) &&
                r + 1 < rows &&
                !grid[r + 1][c]?.isBlock;

            if (startsAcross || startsDown) {
                cellHasNumber[r][c] = clueNumber;

                if (startsAcross) clues.across.push({ number: clueNumber, text: '' });
                if (startsDown) clues.down.push({ number: clueNumber, text: '' });

                clueNumber++;
            }
        }
    }

    return { clues, cellHasNumber };
}