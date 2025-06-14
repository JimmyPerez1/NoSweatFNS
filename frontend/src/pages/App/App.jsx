import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import ServicesPage from '../ServicesPage/ServicesPage';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import FaqPage from '../FaqPage/FaqPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import SearchClientsPage from '../Admin/SearchClientPage';
import ServiceRequestIndex from '../ServiceRequestPage/ServiceRequestIndexPage';
import ServiceRequestShow from '../ServiceRequestPage/ServiceRequestShowPage';
import ServiceRequestEdit from '../ServiceRequestPage/ServiceRequestEditPage';
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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/FAQ" element={<FaqPage />} />

          {!user && (
            <>
              <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
            </>
          )}

          {user && 
          <>
            <Route path="/profile/:profileId" element={<ProfilePage user={user} />} />
            <Route path="/admin/search" element={<SearchClientsPage />} />
            <Route path="/requests" element={<ServiceRequestIndex />} />
            <Route path="/requests/:requestId" element={<ServiceRequestShow />} />
            <Route path="/requests/:requestId/edit" element={<ServiceRequestEdit />} />

            <Route path="/signup" element={<Navigate to={`/profile/${user.profile}`} />} />
            <Route path="/login" element={<Navigate to={`/profile/${user.profile}`} />} />
          </>
          }

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </main>
  );
}