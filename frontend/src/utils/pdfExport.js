import jsPDF from 'jspdf';

const GRID_CELL_SIZE = 20; // mm per cell
const PAGE_WIDTH = 210; // A4 width in mm
const PAGE_HEIGHT = 297; // A4 height in mm
const MARGIN = 20; // mm
const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
const CONTENT_HEIGHT = PAGE_HEIGHT - (MARGIN * 2);

const TITLE_HEIGHT = 20;
const CLUE_LINE_HEIGHT = 5;
const SECTION_SPACING = 10;

export const exportToPDF = (puzzle, filename = 'crossword-puzzle') => {
    const pdf = new jsPDF();
    const gridCols = puzzle.grid[0].length;
    const gridRows = puzzle.grid.length;

    // Calculate grid dimensions in mm
    const gridWidth = gridCols * GRID_CELL_SIZE;
    const gridHeight = gridRows * GRID_CELL_SIZE;

    // Calculate clue space needed
    const totalClues = puzzle.acrossClues.length + puzzle.downClues.length;
    const cluesHeight = (totalClues * CLUE_LINE_HEIGHT) + (2 * SECTION_SPACING) + 20; // +20 for headers

    // Determine layout based on size
    const layout = determineLayout(gridWidth, gridHeight, cluesHeight);

    switch (layout.type) {
        case 'side-by-side':
            renderSideBySide(pdf, puzzle, layout);
            break;
        case 'stacked':
            renderStacked(pdf, puzzle, layout);
            break;
        case 'multi-page':
            renderMultiPage(pdf, puzzle, layout);
            break;
        default:
            renderStacked(pdf, puzzle, layout);
            break;
    }

    pdf.save(`${filename}.pdf`);
};

const determineLayout = (gridWidth, gridHeight, cluesHeight) => {
    const minClueWidth = 80; // Minimum width needed for readable clues

    // Check if grid + clues can fit side by side
    if (gridWidth + minClueWidth + 20 <= CONTENT_WIDTH &&
        Math.max(gridHeight, cluesHeight) + TITLE_HEIGHT <= CONTENT_HEIGHT) {
        return {
            type: 'side-by-side',
            gridWidth,
            gridHeight,
            clueWidth: CONTENT_WIDTH - gridWidth - 20,
            availableHeight: CONTENT_HEIGHT - TITLE_HEIGHT
        };
    }

    // Check if grid and clues can fit stacked on one page
    if (gridWidth <= CONTENT_WIDTH &&
        gridHeight + cluesHeight + TITLE_HEIGHT + 10 <= CONTENT_HEIGHT) {
        return {
            type: 'stacked',
            gridWidth,
            gridHeight,
            clueWidth: CONTENT_WIDTH,
            availableHeight: CONTENT_HEIGHT - TITLE_HEIGHT - gridHeight - 10
        };
    }

    // Multi-page layout needed
    return {
        type: 'multi-page',
        gridWidth,
        gridHeight,
        clueWidth: CONTENT_WIDTH,
        availableHeight: CONTENT_HEIGHT - TITLE_HEIGHT
    };
};

const renderSideBySide = (pdf, puzzle, layout) => {
    // Title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(puzzle.title || 'Crossword Puzzle', PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });

    const startY = MARGIN + TITLE_HEIGHT;

    // Grid on left
    renderGrid(pdf, puzzle, MARGIN, startY, layout.gridWidth, layout.gridHeight);

    // Clues on right
    const clueX = MARGIN + layout.gridWidth + 20;
    renderClues(pdf, puzzle, clueX, startY, layout.clueWidth);
};

const renderStacked = (pdf, puzzle, layout) => {
    // Title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(puzzle.title || 'Crossword Puzzle', PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });

    let currentY = MARGIN + TITLE_HEIGHT;

    // Grid on top, centered
    const gridX = (PAGE_WIDTH - layout.gridWidth) / 2;
    renderGrid(pdf, puzzle, gridX, currentY, layout.gridWidth, layout.gridHeight);

    // Clues below
    currentY += layout.gridHeight + 15;
    renderClues(pdf, puzzle, MARGIN, currentY, layout.clueWidth);
};

const renderMultiPage = (pdf, puzzle, layout) => {
    // Page 1: Title and Grid
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(puzzle.title || 'Crossword Puzzle', PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });

    const gridX = (PAGE_WIDTH - layout.gridWidth) / 2;
    const gridY = MARGIN + TITLE_HEIGHT + 10;
    renderGrid(pdf, puzzle, gridX, gridY, layout.gridWidth, layout.gridHeight);

    // Page 2: Clues
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Clues', PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });

    renderClues(pdf, puzzle, MARGIN, MARGIN + 20, layout.clueWidth);
};

const renderGrid = (pdf, puzzle, x, y, width, height) => {
    const { grid, numbers = {}, blocks = new Set() } = puzzle;
    const cellSize = GRID_CELL_SIZE;

    // Individual cells with player-style borders
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(156, 163, 175); // gray-400 for cell borders

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellX = x + (colIndex * cellSize);
            const cellY = y + (rowIndex * cellSize);
            const key = `${rowIndex}-${colIndex}`;
            const isBlock = blocks.has(key);
            const number = numbers[key];

            // Draw cell background and border (player style)
            if (isBlock) {
                pdf.setFillColor(0, 0, 0); // Black background for blocks
                pdf.rect(cellX, cellY, cellSize, cellSize, 'FD');
            } else {
                pdf.setFillColor(255, 255, 255); // White background for regular cells
                pdf.rect(cellX, cellY, cellSize, cellSize, 'FD');

                // Add number if present (player style - smaller, in corner)
                if (number) {
                    pdf.setFontSize(6);
                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(75, 85, 99); // gray-600
                    pdf.text(number.toString(), cellX + 1, cellY + 4);
                }

                // Add cell value if present (player style - semibold, uppercase)
                if (cell && cell !== '') {
                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(0, 0, 0);
                    const upperCell = cell.toUpperCase();
                    const textWidth = pdf.getTextWidth(upperCell);
                    const textX = cellX + (cellSize - textWidth) / 2;
                    const textY = cellY + (cellSize / 2) + 2;
                    pdf.text(upperCell, textX, textY);
                }
            }
        });
    });
};

const renderClues = (pdf, puzzle, x, y, width) => {
    let currentY = y;

    // Across clues
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Across', x, currentY);
    currentY += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    puzzle.acrossClues.forEach(clue => {
        const text = `${clue.number}. ${clue.text}`;
        const lines = pdf.splitTextToSize(text, width - 10);

        lines.forEach(line => {
            if (currentY > PAGE_HEIGHT - MARGIN) {
                pdf.addPage();
                currentY = MARGIN;
            }
            pdf.text(line, x, currentY);
            currentY += CLUE_LINE_HEIGHT;
        });
    });

    currentY += 5;

    // Down clues
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Down', x, currentY);
    currentY += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    puzzle.downClues.forEach(clue => {
        const text = `${clue.number}. ${clue.text}`;
        const lines = pdf.splitTextToSize(text, width - 10);

        lines.forEach(line => {
            if (currentY > PAGE_HEIGHT - MARGIN) {
                pdf.addPage();
                currentY = MARGIN;
            }
            pdf.text(line, x, currentY);
            currentY += CLUE_LINE_HEIGHT;
        });
    });
};