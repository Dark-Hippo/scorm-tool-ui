import { useState } from 'react';
import './App.css';
import { FileUploader } from './FileUploader';
import TopBar from './TopBar';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <header>
        <TopBar />
      </header>
      <main>
        <FileUploader />
      </main>
    </div>
  );
}

export default App;
