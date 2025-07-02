import { create } from 'zustand';

const createEmptyGrid = (rows, cols) =>
    Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: '', isBlock: false }))
    );

const usePuzzleStore = create((set) => ({
    title: '',
    rows: 0,
    cols: 0,
    gridData: [],

    acrossClues: [],
    downClues: [],

    setTitle: (title) => set({ title }),
    setRows: (rows) => set({ rows }),
    setCols: (cols) => set({ cols }),
    setGridData: (gridData) => set({ gridData }),

    initializePuzzle: ({ title, rows, cols }) =>
        set({
            title,
            rows,
            cols,
            gridData: createEmptyGrid(rows, cols),
            acrossClues: [],
            downClues: [],
        }),

    initializeGrid: (rows, cols) =>
        set((state) => {
            // Only initialize if empty or different size
            if (
                state.gridData.length === 0 ||
                state.rows !== rows ||
                state.cols !== cols
            ) {
                return {
                    gridData: createEmptyGrid(rows, cols),
                    rows,
                    cols,
                };
            }
            return {};
        }),

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
