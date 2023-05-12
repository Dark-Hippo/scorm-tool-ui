import './App.css';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Courses from './pages/Courses';
import { Upload } from './pages/Upload';

function App() {
  return (
    <div className="App">
      <header>
        <TopBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
