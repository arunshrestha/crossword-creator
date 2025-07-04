import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import PuzzleSetupPage from './pages/PuzzleSetupPage';
import PuzzleEditorPage from './pages/PuzzleEditorPage';
import ClueEntryPage from './pages/ClueEntryPage';
import PreviewPage from './pages/PreviewPage';
import PuzzleCreateSuccessPage from './pages/PuzzleCreateSuccessPage';
import PuzzlePlayerPage from './pages/PuzzlePlayerPage';
import CompletionPage from './pages/CompletionPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Creator Flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<PuzzleSetupPage />} />
        <Route path="/editor" element={<PuzzleEditorPage />} />
        <Route path="/clues" element={<ClueEntryPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/success/:id" element={<PuzzleCreateSuccessPage />} />

        {/* Player Flow */}
        <Route path="/play/:id" element={<PuzzlePlayerPage />} />
        <Route path="/complete/:id" element={<CompletionPage />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
