import './App.css';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Courses } from './pages/Courses';
import { Upload } from './pages/Upload';
import { Site } from './pages/Site';
import { AuthenticationGuard } from './components/AuthenticationGuard';

function App() {
  return (
    <div className="App">
      <header>
        <TopBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={<AuthenticationGuard component={Upload} />}
          />
          <Route
            path="/courses"
            element={<AuthenticationGuard component={Courses} />}
          />
          <Route
            path="/site"
            element={<AuthenticationGuard component={Courses} />}
          />
          <Route path="/site/:id/:guid/webcontent" element={<Site />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
