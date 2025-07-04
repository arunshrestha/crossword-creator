import { autoNumberGrid } from '../../components/Grid/AutoNumberingHelper';

describe('autoNumberGrid', () => {
    it('correctly assigns clue numbers based on block positions in a 5x5 grid', () => {
        // 5x5 grid with some blocks
        const grid = [
            ['A', 'B', '', 'C', 'D'],
            ['E', '', 'F', '', 'G'],
            ['H', 'I', 'J', '', 'K'],
            ['', 'L', '', 'M', 'N'],
            ['O', 'P', 'Q', 'R', ''],
        ];

        // Blocks are cells with empty string value
        const blocks = new Set([
            '0-2', '1-1', '1-3', '2-3', '3-0', '3-2', '4-4'
        ]);

        const numbers = autoNumberGrid(grid, blocks);

        console.log(numbers);

        // Check a few expected numbered cells (these will depend on your numbering logic)
        expect(numbers['0-0']).toBe(1); // starts across and down
        expect(numbers['0-3']).toBe(2); // starts across and down
        expect(numbers['1-2']).toBe(3); // starts across and down
        expect(numbers['1-4']).toBe(4); // starts across and down
        expect(numbers['2-0']).toBe(5); // starts across and down
        expect(numbers['2-1']).toBe(6); // starts across
        expect(numbers['2-4']).toBe(7); // starts across and down
        expect(numbers['3-1']).toBe(8); // starts across and down
        expect(numbers['3-3']).toBe(9); // starts across and down
        expect(numbers['4-0']).toBe(10); // starts across and down

        // Check that a blocked cell is not numbered
        expect(numbers['0-2']).toBeUndefined();
        expect(numbers['1-1']).toBeUndefined();
        expect(numbers['1-3']).toBeUndefined();
        expect(numbers['2-3']).toBeUndefined();
        expect(numbers['3-0']).toBeUndefined();
        expect(numbers['3-2']).toBeUndefined();
        expect(numbers['4-4']).toBeUndefined();
    });

    it('returns empty map when grid is empty', () => {
        const numbers = autoNumberGrid([], new Set());
        expect(numbers).toEqual({});
    });

    it('returns empty map when all cells are blocked', () => {
        const grid = [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        const blocks = new Set([
            '0-0', '0-1', '0-2', '0-3', '0-4',
            '1-0', '1-1', '1-2', '1-3', '1-4',
            '2-0', '2-1', '2-2', '2-3', '2-4',
            '3-0', '3-1', '3-2', '3-3', '3-4',
            '4-0', '4-1', '4-2', '4-3', '4-4'
        ]);
        const numbers = autoNumberGrid(grid, blocks);
        expect(numbers).toEqual({});
    });
});