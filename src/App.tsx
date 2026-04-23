import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { GuessWordSetup } from './pages/GuessWordSetup/GuessWordSetup';
import { GuessWordPlay } from './pages/GuessWordPlay/GuessWordPlay';
import { GuessFigure } from './pages/GuessFigure/GuessFigure';
import { Stats } from './pages/Stats/Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guess-word/setup" element={<GuessWordSetup />} />
          <Route path="guess-word/play" element={<GuessWordPlay />} />
          <Route path="guess-figure" element={<GuessFigure />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;