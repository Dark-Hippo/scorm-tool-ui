import './App.css';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Courses } from './pages/Courses';
import { Upload } from './pages/Upload';
import { Site } from './pages/Site';
import { AuthenticationGuard } from './components/AuthenticationGuard';
import { HealthPage } from './pages/Health';
import NotFound from './pages/404';
import ProfilePage from './pages/Profile';
import { UsersPage } from './pages/Users';

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
            path="upload"
            element={<AuthenticationGuard component={Upload} />}
          />
          <Route
            path="courses"
            element={<AuthenticationGuard component={Courses} />}
          />
          <Route
            path="site"
            element={<AuthenticationGuard component={Courses} />}
          />
          <Route path="site/:id/:guid/webcontent" element={<Site />} />
          <Route
            path="health"
            element={<AuthenticationGuard component={HealthPage} />}
          ></Route>
          <Route
            path="profile"
            element={<AuthenticationGuard component={ProfilePage} />}
          />
          <Route
            path="users"
            element={<AuthenticationGuard component={UsersPage} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
