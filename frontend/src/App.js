import React, { useState } from 'react';
import CrosswordGrid from './components/CrosswordGrid';
import ClueInput from './components/ClueInput';
import './App.css';

function App() {
  const [gridSize, setGridSize] = useState(5); // Default grid size
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill({ isDark: false, value: "" })));
  const [clues, setClues] = useState([]);

  const handleGridSizeChange = (event) => {
    const size = parseInt(event.target.value, 10);
    setGridSize(size);
    const newGrid = Array(size).fill(null).map(() => Array(size).fill({ isDark: false, value: "" }));
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <h1>Crossword Creator</h1>
      <div>
        <label htmlFor="grid-size">Grid Size: </label>
        <input
          id="grid-size"
          type="number"
          min="2"
          max="20"
          value={gridSize}
          onChange={handleGridSizeChange}
        />
      </div>
      <CrosswordGrid grid={grid} setGrid={setGrid} />
      <ClueInput grid={grid} clues={clues} setClues={setClues} />
    </div>
  );
}

export default App;
