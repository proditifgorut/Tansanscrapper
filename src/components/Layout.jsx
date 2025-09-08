import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const getTitleFromPath = (path) => {
  if (path.startsWith('/app/dashboard')) return 'Dashboard';
  if (path.startsWith('/app/scrape')) return 'Scrape Baru';
  if (path.startsWith('/app/history')) return 'Riwayat Scraping';
  if (path.startsWith('/app/profile')) return 'Profil Pengguna';
  if (path.startsWith('/app/social-media-ads')) return 'Info Iklan Media Sosial';
  if (path.startsWith('/app/ads/create')) return 'Buat Kampanye Iklan'; // Judul baru
  return 'Dashboard';
};

const Layout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // The ProtectedRoute now handles the loading and auth check,
  // but we can keep a fallback just in case.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const pageTitle = getTitleFromPath(location.pathname);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
