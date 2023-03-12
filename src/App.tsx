import { useState } from 'react';
import './App.css';
import { FileUploader } from './FileUploader';
import TopBar from './TopBar';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
