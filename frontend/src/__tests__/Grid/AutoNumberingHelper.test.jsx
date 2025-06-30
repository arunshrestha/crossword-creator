import { autoNumberGrid } from '../../components/Grid/AutoNumberingHelper';

describe('autoNumberGrid', () => {
    it('correctly assigns clue numbers based on block positions', () => {
        // Grid 3x3 with blocks at (0,2) and (1,1)
        const grid = [
            ['A', 'B', ''],    // empty string means block or black square
            ['C', '', 'D'],
            ['E', 'F', 'G'],
        ];

        // Blocks are cells with empty string value
        const blocks = new Set(['0-2', '1-1']);

        const numbers = autoNumberGrid(grid, blocks);

        // Expected numbering logic:
        // (0,0): starts across (col 0) and down (row 0) -> 1
        // (0,1): preceded by non-block horizontally (0,0) and vertically (no block above), so no new number
        // (1,0): starts down (row 1, col 0), because cell above is not blocked? Actually (0,0) is not blocked so no new number for down? 
        //   Wait, per code, startsDown = (r === 0 || isBlock(r-1,c)) → here r=1, c=0, isBlock(0,0) false, so startsDown false
        //   startsAcross = (c===0 || isBlock(r,c-1)) → c=0 so true
        // So (1,0) starts across → should get a number 2
        // (1,2): starts across? c=2, preceded by (1,1) which is blocked → true, startsDown? r=1, preceded by (0,2) blocked → true
        //   So (1,2) gets number 3
        // (2,0): r=2,c=0, startsAcross true (c=0), startsDown? r=2, check (1,0) not blocked → false
        //   So number 4
        // (2,1): preceded by (2,0) not blocked horizontally and (1,1) blocked vertically, so startsDown false, startsAcross false
        // (2,2): preceded by (2,1) no block horizontally, so false

        expect(numbers['0-0']).toBe(1);
        expect(numbers['1-0']).toBe(2);
        expect(numbers['1-2']).toBe(3);
        expect(numbers['2-0']).toBe(4);

        // Check that other cells are not numbered
        expect(numbers['0-1']).toBeUndefined();
        expect(numbers['2-1']).toBeUndefined();
        expect(numbers['2-2']).toBeUndefined();
    });

    it('returns empty map when grid is empty', () => {
        const numbers = autoNumberGrid([], new Set());
        expect(numbers).toEqual({});
    });

    it('returns empty map when all cells are blocked', () => {
        const grid = [
            ['', ''],
            ['', ''],
        ];
        const blocks = new Set(['0-0', '0-1', '1-0', '1-1']);
        const numbers = autoNumberGrid(grid, blocks);
        expect(numbers).toEqual({});
    });
});
