import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewScrape from './pages/NewScrape';
import ScrapingHistory from './pages/ScrapingHistory';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import SocialMediaAds from './pages/SocialMediaAds';
import AdsCreator from './pages/AdsCreator'; // Import baru
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="scrape" element={<NewScrape />} />
                <Route path="history" element={<ScrapingHistory />} />
                <Route path="profile" element={<Profile />} />
                <Route path="social-media-ads" element={<SocialMediaAds />} />
                <Route path="ads/create" element={<AdsCreator />} /> {/* Route baru */}
              </Route>
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
