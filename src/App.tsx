import './App.css';
import { FileUploader } from './FileUploader';
import TopBar from './TopBar';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Courses from './Courses';

function App() {
  return (
    <div className="App">
      <header>
        <TopBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FileUploader />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
