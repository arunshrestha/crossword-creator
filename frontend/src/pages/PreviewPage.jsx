import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import usePuzzleStore from '../store/puzzleStore';
import { autoNumberGrid } from '../utils/autoNumberGrid';
import { exportToPDF } from '../utils/pdfExport';
import CrosswordGrid from '../components/Grid/CrosswordGrid';

const API_BASE = process.env.REACT_APP_API_URL;

export default function PreviewPage() {
    const navigate = useNavigate();
    const { title, rows, cols, gridData, acrossClues, downClues } = usePuzzleStore();
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);

    if (!gridData || !acrossClues || !downClues) {
        return <p className="p-6 text-center">No puzzle data found.</p>;
    }

    // Generate cell numbers for the preview grid
    const { cellHasNumber } = autoNumberGrid(gridData);

    // Convert data for CrosswordGrid component
    const grid = gridData.map(row => row.map(cell => cell.value || ''));
    const blocks = new Set();
    const numbers = {};

    gridData.forEach((row, rIdx) =>
        row.forEach((cell, cIdx) => {
            if (cell.isBlock) {
                blocks.add(`${rIdx}-${cIdx}`);
            }
            if (cellHasNumber[rIdx][cIdx]) {
                numbers[`${rIdx}-${cIdx}`] = cellHasNumber[rIdx][cIdx];
            }
        })
    );

    const renderClueList = (label, list) => (
        <div>
            <h3 className="text-xl font-semibold mb-2">{label}</h3>
            <ul className="space-y-1 max-h-[300px] overflow-auto pr-2">
                {list.map((clue) => (
                    <li key={`${label}-${clue.number}`}>
                        <strong>{clue.number}.</strong> {clue.text || <em>[No clue]</em>}
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${API_BASE}/api/puzzles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    rows,
                    cols,
                    gridData,
                    acrossClues,
                    downClues,
                }),
            });
            const data = await response.json();
            if (response.ok && data._id) {
                navigate(`/success/${data._id}`);
            } else {
                alert('Failed to save puzzle.');
            }
        } catch (err) {
            alert('Error saving puzzle.');
        } finally {
            setSaving(false);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            const puzzleData = {
                title: title || 'Crossword Puzzle',
                grid: grid,
                numbers: numbers,
                blocks: blocks,
                acrossClues: acrossClues,
                downClues: downClues
            };

            exportToPDF(puzzleData, title || 'crossword-puzzle');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Failed to export PDF. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center">{title || 'Puzzle Preview'}</h1>

            <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center">
                {/* Puzzle Grid - Using player variant */}
                <div className="flex justify-center">
                    <CrosswordGrid
                        grid={grid}
                        blocks={blocks}
                        numbers={numbers}
                        showValues={true}
                        variant="player" // Add this line
                    />
                </div>

                {/* Clues */}
                <div className="flex-1 max-w-md">
                    {renderClueList('Across', acrossClues)}
                    <div className="mt-6" />
                    {renderClueList('Down', downClues)}
                </div>
            </div>

            <div className="text-center mt-8 space-x-4">
                <button
                    className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                    onClick={() => navigate('/clues')}
                >
                    Edit Clues
                </button>
                <button
                    className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={handleExportPDF}
                    disabled={exporting}
                >
                    {exporting ? 'Exporting...' : 'Export PDF'}
                </button>
                <button
                    className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Puzzle'}
                </button>
            </div>
        </div>
    );
}