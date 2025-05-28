import { create } from 'zustand';

const usePuzzleStore = create((set) => ({
    title: '',
    rows: 0,
    cols: 0,
    gridData: [], // 2D array: [{ value: 'A', isBlock: false }, ...]

    acrossClues: [], // [{ number, text }]
    downClues: [],   // [{ number, text }]

    setTitle: (title) => set({ title }),
    setRows: (rows) => set({ rows }),
    setCols: (cols) => set({ cols }),
    setGridData: (gridData) => set({ gridData }),

    setAcrossClues: (clues) => set({ acrossClues: clues }),
    setDownClues: (clues) => set({ downClues: clues }),

    resetPuzzle: () =>
        set({
            title: '',
            rows: 0,
            cols: 0,
            gridData: [],
            acrossClues: [],
            downClues: [],
        }),
}));

export default usePuzzleStore;
