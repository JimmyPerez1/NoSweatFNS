import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
// import ServicesPage from '../ServicesPage/ServicesPage';
// import AboutPage from '../AboutPage/AboutPage';
import ProfilePage from '../ProfilePage/ProfilePAge';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
 <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} /> */}

          {!user && (
            <>
              <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
            </>
          )}

          {user && 
            <Route path="/profile/:profileId" element={<ProfilePage user={user} />} />
          }

          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </section>
    </main>
  );
}