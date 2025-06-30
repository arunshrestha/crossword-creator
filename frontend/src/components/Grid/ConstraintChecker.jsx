import React from 'react';

/**
 * Checks crossword grid constraints like symmetry and blocked cell rules.
 * Returns an object with any errors found.
 */
const ConstraintChecker = ({ grid, isSymmetric }) => {
    const errors = [];

    // Check symmetry if enabled
    if (isSymmetric) {
        const rows = grid.length;
        const cols = grid[0]?.length || 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c].isBlocked !== grid[rows - 1 - r][cols - 1 - c].isBlocked) {
                    errors.push(`Symmetry violated at cell (${r}, ${c})`);
                }
            }
        }
    }

    // Add other constraint checks here (e.g., no isolated cells)

    return (
        <div data-testid="constraint-errors">
            {errors.length > 0 ? (
                <ul>
                    {errors.map((err, i) => (
                        <li key={i} style={{ color: 'red' }}>
                            {err}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No constraint errors.</p>
            )}
        </div>
    );
};

export default ConstraintChecker;
